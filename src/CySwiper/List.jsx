import * as echarts from 'echarts';
import ReactEcharts from 'echarts-for-react';
import { useEffect, useRef, useState } from 'react';

const BarList = (props) => {
  const { data } = props;

  let ref = useRef(null);
  const [option, setOption] = useState({});
  const [cdata, setCdata] = useState({
    index: 0,
    data: data?.slice(0, 5) || [],
  });
  let myChart = ref?.current?.getEchartsInstance();

  const [currentIndex, setCurrentIndex] = useState(-1);
  let { height, yLabel, mouthNum, filter, sliceLength = 14, omit = 0 } = props;
  let showLabel = '{value}亿';
  let timer = null;
  let len = props.data?.length;

  useEffect(() => {
    const datas = cdata?.data || [];
    const lineData = datas?.map((item) => item?.lineValue);
    const lineDataEffect = datas?.map((item) => [item?.name, item?.lineValue]);
    const barData = datas?.map((item) => item?.barValue);
    const xData = datas?.map((item) => item?.name);
    let max = Math.max(...barData) + 30;
    let optionNew = {
      animation: true,
      animationDurationUpdate: 1500,
      // animationEasing: animationEasingList[getRandomNumber(1, 30)],
      backgroundColor: 'transparent',
      color: ['#07B0F1', '#D0DEEE'],
      // dataZoom: [
      //   {
      //     type: "inside",
      //     show: false,
      //     startValue: 0,
      //     endValue: 7,
      //     minValueSpan: 7,
      //     maxValueSpan: 7,
      //   },
      // ],

      grid: {
        left: '5',
        right: 0,
        bottom: '3%',
        top: '15%',
        containLabel: true,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
        },
        textStyle: {
          fontSize: 24,
        },
      },
      legend: {
        textStyle: {
          color: '#fff',
          fontSize: 26,
        },
        right: '0%',
        top: '0%',
        data: ['交易额', '供应商数'],
        show: true,
      },
      xAxis: {
        type: 'category',
        data: xData, //数据
        axisLabel: {
          color: 'white',
          formatter: (value) => {
            let a = value.slice(0, sliceLength);
            let b = value.slice(sliceLength);
            let c = `${a}\n${b}`;
            return c;
          },
          fontSize: 24,
          interval: 0,
        },
        axisLine: {
          show: true,
        },
        axisTick: false,
      },
      yAxis: [
        {
          type: 'value',
          axisLine: {
            //坐标轴样式
            show: false, //不显示
          },
          axisLabel: {
            color: 'white',
            formatter: showLabel,
            fontSize: 26,
          },
          splitLine: {
            //分隔辅助线
            lineStyle: {
              type: 'dashed', //线的类型 虚线0
              opacity: 0.2, //透明度
            },
          },
        },
        {
          type: 'value',
          // min: 0, // 设置Y轴的最小值
          // max: 750, // 设置Y轴的最大值
          // interval: 150, // 设置Y轴的间隔
          axisLine: {
            //坐标轴样式
            show: false, //不显示
          },
          axisLabel: {
            formatter: '{value}',
            color: 'white',
            fontSize: 26,
          },
          splitLine: {
            //分隔辅助线
            lineStyle: {
              type: 'dashed', //线的类型 虚线0
              opacity: 0, //透明度
            },
          },
        },
      ],
      series: [
        {
          type: 'bar',
          z: 2,
          showBackground: true,
          backgroundStyle: {
            // color: "rgba(108, 128, 151,0)",
            borderColor: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(108, 128, 151, 1)', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: 'rgba(108, 128, 151, 0)', // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
            borderWidth: 40,
            opacity: '0.1',
            shadowOffsetY: 30,
          },
          name: '订单额',
          barWidth: 40,
          data: barData,
          itemStyle: {
            color: (params, api) => {
              return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#1EE7E7',
                },
                {
                  offset: 1,
                  color: '#1890FF',
                },
              ]);
            },
          },
        },
        // {
        //   type: "pictorialBar",
        //   symbol: "rect",
        //   symbolSize: [68, "100%"],
        //   symbolOffset: [0, 0],
        //   symbolPosition: "start",
        //   itemStyle: {
        //     color: "rgba(108, 128, 151, 0.11)",
        //   },
        //   tooltip: { show: false },
        //   data: barData?.map((item) => 290),
        // },
        {
          type: 'line',
          name: '订单数',
          yAxisIndex: 1,

          data: lineData,
          lineStyle: {
            width: 4,
          },
          symbolSize: 30,
          symbol:
            'image://https://zhgd-morning-meeting.oss-cn-hangzhou.aliyuncs.com/2025/01/07/408f0904082b458994bf4aad97d269ec.png',
          itemStyle: {
            // color: "#D0DEEE",
            color: 'rgba(255, 192, 97, 1)',
            shadowColor: '#00d3fd',
            shadowBlur: 10,
            borderColor: '#00d3fd',
            borderWidth: 12,
          },
        },
        {
          tooltip: { show: false },
          type: 'effectScatter',
          name: '涟漪特效散点',
          xAxisIndex: 0, //由于我这里只有一个x轴和y轴，所以不指定axisindex也可以
          yAxisIndex: 1, //如果有多个x轴和y轴，那么一定要指明使用的是哪个索引轴
          data: lineDataEffect,
          rippleEffect: {
            color: 'rgba(255,255,255,.5)',
            scale: 7,
            brushType: 'fill',
          },
        },
      ],
    };
    setOption(optionNew);
  }, [cdata?.data, props.name]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCdata((cdata) => {
        return {
          index: (cdata.index % data?.length) + 1,
          data: data
            ?.concat(data)
            ?.slice(cdata.index % data?.length, (cdata.index % data?.length) + 5),
        };
      });
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <ReactEcharts
      ref={ref}
      option={option}
      theme="Imooc"
      style={{ height: props.height || '550px' }}
    />
  );
};

export default BarList;
