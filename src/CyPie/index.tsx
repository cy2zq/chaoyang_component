import { useEffect, useRef } from 'react';

import styles from './index.module.less';
// 防抖函数
function debounce(fn, delay) {
  let handle = null;
  return function (...e) {
    // 取消之前的延时调用
    clearTimeout(handle);
    handle = setTimeout(() => {
      fn.call(this, ...e);
    }, delay);
  };
}
function PieChart(props) {
  const chartRef = useRef(null);
  const divRef = useRef(null);
  useEffect(() => {
    let chartInstance = echarts.init(chartRef.current);
    function getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, height) {
      // 计算
      let midRatio = (startRatio + endRatio) / 2;

      let startRadian = startRatio * Math.PI * 2;
      let endRadian = endRatio * Math.PI * 2;
      let midRadian = midRatio * Math.PI * 2;

      // 如果只有一个扇形，则不实现选中效果。
      if (startRatio === 0 && endRatio === 1) {
        isSelected = false;
      }

      // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
      k = typeof k !== 'undefined' ? k : 1 / 3;

      // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
      let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
      let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;

      // 计算高亮效果的放大比例（未高亮，则比例为 1）
      let hoverRate = isHovered ? 1.05 : 1;

      // 返回曲面参数方程
      return {
        u: {
          min: -Math.PI,
          max: Math.PI * 3,
          step: Math.PI / 32,
        },

        v: {
          min: 0,
          max: Math.PI * 2,
          step: Math.PI / 20,
        },

        x: function (u, v) {
          if (u < startRadian) {
            return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
          }
          if (u > endRadian) {
            return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
          }
          return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
        },

        y: function (u, v) {
          if (u < startRadian) {
            return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
          }
          if (u > endRadian) {
            return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
          }
          return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
        },

        z: function (u, v) {
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
    // 生成模拟 3D 饼图的配置项
    function getPie3D(pieData, internalDiameterRatio) {
      let series = [];
      let sumValue = 0;
      let startValue = 0;
      let endValue = 0;
      let legendData = [];
      let k =
        typeof internalDiameterRatio !== 'undefined'
          ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
          : 1 / 3;

      // 为每一个饼图数据，生成一个 series-surface 配置
      for (let i = 0; i < pieData.length; i++) {
        sumValue += pieData[i].value;

        let seriesItem = {
          name: typeof pieData[i].name === 'undefined' ? `series${i}` : pieData[i].name,
          type: 'surface',
          parametric: true,
          wireframe: {
            show: false,
          },
          pieData: pieData[i],
          pieStatus: {
            selected: false,
            hovered: false,
            k: k,
          },
        };

        if (typeof pieData[i].itemStyle != 'undefined') {
          let itemStyle = {};

          typeof pieData[i].itemStyle.color != 'undefined'
            ? (itemStyle.color = pieData[i].itemStyle.color)
            : null;
          typeof pieData[i].itemStyle.opacity != 'undefined'
            ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
            : null;

          seriesItem.itemStyle = itemStyle;
        }
        series.push(seriesItem);
      }

      // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
      // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
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
      // // 补充一个透明的圆环，用于支撑高亮功能的近似实现。
      // series.push({
      //     name: 'mouseoutSeries',
      //     type: 'surface',
      //     parametric: true,
      //     wireframe: {
      //         show: false,
      //     },
      //     itemStyle: {
      //         opacity: 0.1,
      //         color: '#05CFF7',
      //     },
      //     parametricEquation: {
      //         u: {
      //             min: 0,
      //             max: Math.PI * 2,
      //             step: Math.PI / 20,
      //         },
      //         v: {
      //             min: 0,
      //             max: Math.PI*5,
      //             step: Math.PI / 20,
      //         },
      //         x: function (u, v) {
      //             return ((Math.sin(v) * Math.sin(u) + Math.sin(u)) / Math.PI) * 2;
      //         },
      //         y: function (u, v) {
      //             return ((Math.sin(v) * Math.cos(u) + Math.cos(u)) / Math.PI) * 2;
      //         },
      //         z: function (u, v) {
      //             return Math.cos(v) > 0 ? -0.5 : -5;
      //         },
      //     },
      // });
      // series.push({
      //     name: 'mouseoutSeries',
      //     type: 'surface',
      //     parametric: true,
      //     wireframe: {
      //         show: false,
      //     },
      //     itemStyle: {
      //         opacity: 0.1,
      //         color: '#009BFF',
      //     },
      //     parametricEquation: {
      //         u: {
      //             min: 0,
      //             max: Math.PI * 2,
      //             step: Math.PI / 20,
      //         },
      //         v: {
      //             min: 0,
      //             max: Math.PI,
      //             step: Math.PI / 20,
      //         },
      //         x: function (u, v) {
      //             return ((Math.sin(v) * Math.sin(u) + Math.sin(u)) / Math.PI) * 2.2;
      //         },
      //         y: function (u, v) {
      //             return ((Math.sin(v) * Math.cos(u) + Math.cos(u)) / Math.PI) * 2.2;
      //         },
      //         z: function (u, v) {
      //             return Math.cos(v) > 0 ? -7 : -7;
      //         },
      //     },
      // });
      return series;
    }
    // 传入数据生成 option
    let r = 100;

    const optionsData = props?.optionsData;
    const series = getPie3D(optionsData, 0.8, 240, 28, 26, 0.5);
    series.push({
      name: 'pie2d',
      type: 'pie',
      label: {
        show: false,
        opacity: 1,
        fontSize: 14,
        lineHeight: 20,
        textStyle: {
          fontSize: 14,
          color: '#fff',
        },
      },
      labelLine: {
        length: 30,
        length2: 30,
      },
      startAngle: -30, //起始角度，支持范围[0, 360]。
      clockwise: false, //饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
      radius: ['40%', '60%'],
      center: ['50%', '50%'],
      data: optionsData,
      itemStyle: {
        opacity: 0,
      },
    });
    // 准备待返回的配置项，把准备好的 legendData、series 传入。
    let option = {
      legend: {
        show: true,
        tooltip: {
          show: true,
        },
        orient: 'vertical',
        data: optionsData,
        // top: "center",
        itemGap: 30,
        itemHeight: 18,
        itemWidth: 17,
        right: 10,
        top: 60,
        textStyle: {
          color: '#fff',
          fontSize: 20,
        },
        formatter: (params) => {
          let e = optionsData?.find((item) => params == item?.name);
          let name = params.padEnd(6, ' ');
          //文字和空格宽度不同
          if (e.name.length < 7) {
            name = name + '  ';
          }
          return name + e.value / 100 + '%';
        },
      },
      animation: true,
      tooltip: {
        formatter: (params) => {
          if (params.seriesName !== 'mouseoutSeries' && params.seriesName !== 'pie2d') {
            return `${
              params.seriesName
            }<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${
              params.color
            };"></span>${option.series[params.seriesIndex].pieData.value / 100 + '%'}`;
          }
        },
        textStyle: {
          fontSize: 14,
        },
      },
      title: {
        x: 'center',
        top: '20',
        textStyle: {
          color: '#fff',
          fontSize: 22,
        },
      },
      graphic: {
        type: 'text',
        ...props.titleStyle,
      },
      labelLine: {
        show: true,
        lineStyle: {
          color: '#7BC0CB',
        },
        normal: {
          show: true,
          length: 10,
          length2: 10,
        },
      },
      label: {
        show: true,
        position: 'outside',
        formatter: '{b} \n{d}%',
        textStyle: {
          color: '#fff',
          fontSize: '14px',
        },
      },
      xAxis3D: {
        min: -1,
        max: 1,
      },
      yAxis3D: {
        min: -1,
        max: 1,
      },
      zAxis3D: {
        min: -1,
        max: 1,
      },
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
          autoRotate: true, // 自动旋转
        },
      },
      series: series,
    };
    if (props.optionsData) {
      chartInstance.setOption(option);
    }
  }, [props.optionsData]);
  useEffect(() => {
    const div = divRef.current;
    // 创建一个ResizeObserver实例并定义回调函数
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (chartRef.current) {
          chartRef.current.style.transform = `scaleX(${width / 800}) scaleY(${height / 500})`;
        }
      }
    });
    // 开始监听div的尺寸变化
    resizeObserver.observe(div);
    return () => {
      //组件销毁停止监听
      resizeObserver.disconnect();
    };
  }, []);
  return (
    <div className={styles.container} {...props} ref={divRef}>
      <div ref={chartRef} className={styles.main}></div>
    </div>
  );
}

export default PieChart;
