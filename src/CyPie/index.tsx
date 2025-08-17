import * as echarts from 'echarts';
import 'echarts-gl';
import React, { useEffect, useRef } from 'react';
import styles from './index.module.less';

// 定义 props 类型
interface PieDataItem {
  name: string;
  value: number;
  itemStyle?: {
    color?: string;
    opacity?: number;
  };
  startRatio?: number;
  endRatio?: number;
}

interface IProps {
  optionsData: PieDataItem[];
  titleStyle?: React.CSSProperties;
}

// 防抖函数
function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
  let handle: ReturnType<typeof setTimeout> | null = null;
  return function (...e: Parameters<T>) {
    if (handle) {
      clearTimeout(handle);
    }
    handle = setTimeout(() => {
      fn.call(this, ...e);
    }, delay);
  };
}

const PieChart: React.FC<IProps> = (props) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current || !props.optionsData) return;

    let chartInstance = echarts.init(chartRef.current);

    function getParametricEquation(
      startRatio: number,
      endRatio: number,
      isSelected: boolean,
      isHovered: boolean,
      k: number,
      height: number,
    ) {
      let midRatio = (startRatio + endRatio) / 2;
      let startRadian = startRatio * Math.PI * 2;
      let endRadian = endRatio * Math.PI * 2;
      let midRadian = midRatio * Math.PI * 2;

      if (startRatio === 0 && endRatio === 1) {
        isSelected = false;
      }

      k = typeof k !== 'undefined' ? k : 1 / 3;
      let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
      let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;
      let hoverRate = isHovered ? 1.05 : 1;

      return {
        u: { min: -Math.PI, max: Math.PI * 3, step: Math.PI / 32 },
        v: { min: 0, max: Math.PI * 2, step: Math.PI / 20 },
        x: (u: number, v: number) => {
          if (u < startRadian) {
            return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
          }
          if (u > endRadian) {
            return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
          }
          return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
        },
        y: (u: number, v: number) => {
          if (u < startRadian) {
            return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
          }
          if (u > endRadian) {
            return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
          }
          return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
        },
        z: (u: number, v: number) => {
          if (u < -Math.PI * 0.5) {
            return Math.sin(u);
          }
          if (u > Math.PI * 2.5) {
            return Math.sin(u);
          }
          return Math.sin(v) > 0 ? 1 * height : -1;
        },
      };
    }

    function getPie3D(pieData: PieDataItem[], internalDiameterRatio: number) {
      let series: any[] = [];
      let sumValue = 0;
      let startValue = 0;
      let endValue = 0;
      let legendData: string[] = [];
      let k =
        typeof internalDiameterRatio !== 'undefined'
          ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
          : 1 / 3;

      for (let i = 0; i < pieData.length; i++) {
        sumValue += pieData[i].value;
        let seriesItem: any = {
          name: typeof pieData[i].name === 'undefined' ? `series${i}` : pieData[i].name,
          type: 'surface',
          parametric: true,
          wireframe: { show: false },
          pieData: pieData[i],
          pieStatus: { selected: false, hovered: false, k: k },
        };
        if (pieData[i].itemStyle) {
          let itemStyle: any = {};
          if (pieData[i].itemStyle?.color) itemStyle.color = pieData[i].itemStyle.color;
          if (pieData[i].itemStyle?.opacity) itemStyle.opacity = pieData[i].itemStyle.opacity;
          seriesItem.itemStyle = itemStyle;
        }
        series.push(seriesItem);
      }

      for (let i = 0; i < series.length; i++) {
        endValue = startValue + series[i].pieData.value;
        series[i].pieData.startRatio = startValue / sumValue;
        series[i].pieData.endRatio = endValue / sumValue;
        series[i].parametricEquation = getParametricEquation(
          series[i].pieData.startRatio,
          series[i].pieData.endRatio,
          false,
          false,
          k,
          series[i].pieData.value,
        );
        startValue = endValue;
        legendData.push(series[i].name);
      }
      return series;
    }

    const optionsData = props.optionsData;
    const series = getPie3D(optionsData, 0.8);
    series.push({
      name: 'pie2d',
      type: 'pie',
      label: {
        show: false,
        opacity: 1,
        fontSize: 14,
        lineHeight: 20,
      },
      labelLine: { length: 30, length2: 30 },
      startAngle: -30,
      clockwise: false,
      radius: ['40%', '60%'],
      center: ['50%', '50%'],
      data: optionsData,
      itemStyle: { opacity: 0 },
    });

    let option: echarts.EChartsOption = {
      legend: {
        show: true,
        tooltip: { show: true },
        orient: 'vertical',
        data: optionsData.map((item) => item.name),
        itemGap: 30,
        itemHeight: 18,
        itemWidth: 17,
        right: 10,
        top: 60,
        textStyle: { color: '#fff', fontSize: 20 },
        formatter: (params) => {
          let e = optionsData.find((item) => params === item.name);
          if (!e) return '';
          let name = params.padEnd(6, ' ');
          if (e.name.length < 7) {
            name = name + '  ';
          }
          return name + e.value / 100 + '%';
        },
      },
      animation: true,
      tooltip: {
        formatter: (params: any) => {
          if (params.seriesName !== 'mouseoutSeries' && params.seriesName !== 'pie2d') {
            return `${
              params.seriesName
            }<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${
              params.color
            };"></span>${(option.series as any[])[params.seriesIndex].pieData.value / 100 + '%'}`;
          }
        },
        textStyle: { fontSize: 14 },
      },
      title: {
        left: 'center',
        top: '20',
        textStyle: { color: '#fff', fontSize: 22 },
      },
      graphic: {
        type: 'text',
        ...(() => {
          const { transition, clipPath, ...rest } = props.titleStyle || {};
          return rest;
        })(),
      },
      labelLine: {
        show: true,
        lineStyle: { color: '#7BC0CB' },
      },
      label: {
        show: true,
        position: 'outside',
        formatter: '{b} \n{d}%',
        textStyle: { color: '#fff', fontSize: '14px' },
      },
      xAxis3D: { min: -1, max: 1 },
      yAxis3D: { min: -1, max: 1 },
      zAxis3D: { min: -1, max: 1 },
      grid3D: {
        show: false,
        boxHeight: 0.01,
        left: '-18%',
        viewControl: {
          distance: 180,
          minDistance: 180,
          maxDistance: 180,
          alpha: 25,
          beta: 100,
          autoRotate: true,
        },
      },
      series: series,
    };

    chartInstance.setOption(option);

    return () => {
      chartInstance.dispose();
    };
  }, [props.optionsData, props.titleStyle]);

  return (
    <div className={styles.container} ref={divRef}>
      <div ref={chartRef} className={styles.main}></div>
    </div>
  );
};

export default PieChart;
