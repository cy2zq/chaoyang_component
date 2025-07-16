---
title: EChart
group:
  title: 数据展示
order: 6
---

# 雷达图

雷达-富文本标签（使用问题，统一背景-border，不能写 border-top 等;背景图如果分割拼接的有间隔；）

```jsx
import { DiyChart } from 'chaoyang_component';
import img from './rardar.png';
let data = [
  {
    id: 1,
    text: '语文成绩',
    comName: '平均值',
    count: '130',
    no: 'NO.1',
    backgroundColor: 'top',
    index: 1,
  },
  {
    id: 2,
    text: '数学成绩',
    comName: '完成率',
    count: '220.51%',
    no: 'NO.17',
    backgroundColor: 'center',
    index: 17,
  },
  {
    id: 3,
    text: '英语成绩',
    comName: '完成率',
    count: '230.51%',
    no: 'NO.13',
    backgroundColor: 'last',
    index: 13,
  },
  {
    id: 4,
    text: '生物成绩',
    comName: '完成率',
    count: '120.51%',
    no: 'NO.17',
    backgroundColor: 'last',
    index: 17,
  },
  {
    id: 5,
    text: '物理成绩',
    comName: '完成率',
    count: '20.51%',
    no: 'NO.7',
    backgroundColor: 'last',
    index: 7,
  },
  {
    id: 6,
    text: '化学成绩',
    comName: '完成率',
    count: '10.51%',
    no: 'NO.6',
    backgroundColor: 'last',
    index: 6,
  },
];
let arrIndex = data?.map((item, index) => index + 1);
const Data = data?.map((item) => 20 - item?.index);

function setData() {
  return [
    {
      value: Data,
      areaStyle: {
        normal: {
          // 单项区域填充样式
          color: {
            type: 'radial',
            x: 0.5, //右
            y: 0.5, //下
            r: 1,
            //数据包裹区域
            colorStops: [
              {
                offset: 1,

                color: 'rgba(39,77,149,.3)',
              },
              {
                offset: 0,
                // color: 'blue',
                color: 'rgba(39,77,149,1)',
              },
            ],
            globalCoord: false,
          },
          opacity: 0.8, // 区域透明度
        },
      },
    },
  ];
}
function setSpot() {
  var scatterData = [];
  let color = 'red' || '#1EF9FD';
  let itemStyle = {
    normal: {
      // color,
      startAngle: 0,
    },
  };
  for (let i = 0; i < 15; i++) {
    scatterData.push(
      {
        value: [20, -i],
        itemStyle,
      },
      {
        value: [20, i],
        itemStyle,
      },
      {
        value: [10, i],
        itemStyle: {
          normal: {
            // color,

            startAngle: 0,
          },
        },
      },
      {
        value: [10, -i],
        itemStyle,
      },
      {
        value: [5, i],
        itemStyle,
      },
      {
        value: [5, -i],
        itemStyle,
      },
      {
        value: [15, -i],
        itemStyle,
      },
      {
        value: [15, i],
        itemStyle,
      },
    );
  }
  return scatterData;
}
let option = {
  // graphic: {
  //   type: 'image',
  //   id: 'myImage',
  //   left: '32%',
  //   top: '60',
  //   z: -100,
  //   bounding: 'raw',
  //   origin: [0, 0], // 图片的中心位置
  //   style: {
  //     image: img, // 图片的URL
  //     width: 360,
  //     height: 360,
  //     opacity: 1,
  //   },
  // },
  polar: {
    center: ['50%', '40%'],
    radius: '40%',
  },
  radar: {
    shape: 'circle',
    // shape: "polygon",
    center: ['50%', '40%'],
    radius: '40%',
    indicator: data,
    nameGap: 60,
    splitNumber: 4,
    splitArea: {
      // 坐标轴在 grid 区域中的分隔区域，默认不显示。
      show: true,
      areaStyle: {
        // 整个圆形。
        // color: ['rgba(27, 50, 66, 0.4)'],
      },
    },
    name: {
      formatter: function (param, item) {
        let { text, backgroundColor } = item;
        let n = 'no';
        let title = 'title';
        let comName = 'comName';
        let count = 'count';
        if (backgroundColor === 'top') {
          n = 'no_green';
          title = 'title_green';
          count = 'count_green';
          comName = 'comName_green';
        } else if (backgroundColor === 'last') {
          n = 'no_red';
          title = 'title_red';
          comName = 'comName_red';
          count = 'count_red';
        }
        return [
          `{${title}|${item?.text}}{${n}|${item?.no}}`,
          `{${comName}|${item?.comName}}{${count}|${item?.count}}`,
        ].join('\n');
      },
      rich: {
        title: {
          color: 'white',
          height: 30,
          width: 120,
          align: 'left',
          fontSize: 18,
          backgroundColor: '#0E4D77',
          padding: [0, 0, 0, 12],
          borderWidth: 1,
          // borderColor: "#FF8484",
        },
        title_green: {
          color: 'white',
          height: 30,
          width: 120,
          align: 'left',
          fontSize: 18,
          padding: [0, 0, 0, 12],
          borderWidth: 1,
          backgroundColor: 'rgb(47,100,110)',
          borderColor: 'rgb(47,100,110)',
        },
        title_red: {
          color: 'white',
          height: 30,
          width: 120,
          align: 'left',
          fontSize: 18,
          padding: [0, 0, 0, 12],
          borderWidth: 1,
          backgroundColor: 'rgb(97,65,81)',
          borderColor: 'rgb(97,65,81)',
        },
        no: {
          color: '#E3ECFF',
          borderWidth: 0,
          // padding: 2,
          width: 70,
          height: 30,
          align: 'center',
          fontSize: 16,
          fontWeight: 700,
          // backgroundColor: "rgb(53,120,299)",
          backgroundColor: '#008BFD',
        },
        no_green: {
          color: 'white',
          borderWidth: 0,
          // padding: 2,
          width: 70,
          height: 30,
          align: 'center',
          fontSize: 16,
          fontWeight: 700,
          // backgroundColor: "#00E5FF",
          backgroundColor: '#02CC7F',
        },
        no_red: {
          color: '#E3ECFF',
          borderWidth: 0,
          // padding: 2,
          width: 70,
          height: 30,
          align: 'center',
          fontSize: 16,
          fontWeight: 700,
          backgroundColor: '#E24A3B',
        },
        comName: {
          padding: [0, 0, 0, 12],
          color: 'white',
          height: 40,
          width: 120,
          align: 'left',
          fontSize: 16,
          borderWidth: 0,
          backgroundColor: '#0E4D77',
        },
        comName_green: {
          padding: [0, 0, 0, 12],
          color: 'white',
          height: 40,
          width: 120,
          align: 'left',
          fontSize: 16,
          borderWidth: 1,
          backgroundColor: 'rgb(47,100,110)',
          borderColor: 'rgb(47,100,110)',
        },
        comName_red: {
          padding: [0, 0, 0, 12],
          color: 'white',
          height: 40,
          width: 120,
          align: 'left',
          fontSize: 16,
          borderWidth: 1,
          backgroundColor: 'rgb(97,65,81)',
          borderColor: 'rgb(97,65,81)',
        },
        count: {
          color: '#E3ECFF',
          borderRadius: 0,
          width: 70,
          height: 40,
          align: 'right',
          fontSize: 18,
          fontWeight: 700,
          backgroundColor: '#0E4D77',
        },
        count_green: {
          color: '#E3ECFF',
          borderRadius: 0,
          width: 70,
          height: 40,
          align: 'right',
          fontSize: 18,
          fontWeight: 700,
          borderWidth: 1,
          backgroundColor: 'rgb(47,100,110)',
          borderColor: 'rgb(47,100,110)',
        },
        count_red: {
          color: '#E3ECFF',
          borderRadius: 0,
          width: 70,
          height: 40,
          align: 'right',
          fontSize: 18,
          fontWeight: 700,
          borderWidth: 1,
          backgroundColor: 'rgb(97,65,81)',
          borderColor: 'rgb(97,65,81)',
        },
      },
      // backgroundColor: {
      //   image: require("@/assets/images/test.png"),
      // },
      // borderColor: "#2EB3F0",
      // borderWidth: 1,
      // padding: [0, 0, 5, 10],
    },
    axisLine: {
      show: true,
      // symbol: "arrow",
      // symbolSize: [10, 5],
      //指向外圈文本的分隔线样式
      lineStyle: {
        color: 'rgb(0, 188, 255)',
      },
    },
    splitLine: {
      lineStyle: {
        color: '#0073FF', // 分隔线颜色-圆
        width: 2, // 分隔线线宽
      },
    },
    startAngle: 0,
  },
  angleAxis: {
    type: 'category',
    data: arrIndex,
    // minInterval: 1,
    startAngle: 0,
    boundaryGap: false,
    axisTick: {
      show: false,
    },
    axisLabel: {
      show: false,
    },
    axisLine: {
      show: false,
    },
    splitLine: {
      show: false,
    },
  },
  //一根刻度线
  radiusAxis: {
    // min,
    // max,
    // interval: 5,
    splitLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLine: {
      //指向外圈文本的分隔线样式-
      lineStyle: {
        color: '#5aa3d0',
      },
    },
    axisLabel: {
      show: false,
      fontSize: 15,
      color: 'red',
      align: 'left',
      margin: -5,
    },
  },
  series: [
    {
      type: 'radar',
      silent: true,
      lineStyle: {
        color: '#2870FF',
        width: 7,
      },
      labelStyle: {
        background: 'red',
      },
      data: setData(),
    },
    {
      type: 'scatter',
      coordinateSystem: 'polar',
      symbolSize: 4,
      data: setSpot(),
    },
  ],
};

export default () => (
  <DiyChart
    option={option}
    style={{
      // background: '#0a264d',
      height: 600,
      width: 800,
      minWidth: 800,
    }}
  />
);
```

# EChart-Bar

柱状图

```jsx
import { CyBar } from 'chaoyang_component';

export default () => (
  <CyBar
    data={[
      {
        name: '一月',
        value: Math.round(Math.random() * 1000),
      },
      {
        name: '二月',
        value: Math.round(Math.random() * 1000),
      },
      {
        name: '三月',
        value: Math.round(Math.random() * 1000),
      },
      {
        name: '四月',
        value: Math.round(Math.random() * 1000),
      },
      {
        name: '五月',
        value: Math.round(Math.random() * 1000),
      },
      {
        name: '六月',
        value: Math.round(Math.random() * 100),
      },
    ]}
    name={'本年成绩'}
    style={{
      // background: '#0a264d',
      height: 300,
      width: 800,
    }}
  />
);
```

# 自定义-EChart

DIY-自定义 option

```jsx
import { DiyChart } from 'chaoyang_component';
let data = [
  {
    name: '一月',
    value: Math.round(Math.random() * 100),
  },
  {
    name: '二月',
    value: 70.91,
  },
  {
    name: '三月',
    value: 128.55,
  },
  {
    name: '四月',
    value: 90,
  },
  {
    name: '五月',
    value: 0,
  },
  {
    name: '六月',
    value: 30,
  },
];
let option = {
  backgroundColor: 'transparent',
  grid: {
    left: '10',
    right: 0,
    bottom: '3%',
    top: '10%',
    containLabel: true,
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' },
    valueFormatter: (value) => '$' + value.toFixed(2),
  },
  xAxis: {
    type: 'category',
    data: data?.map((item) => item?.name), //数据
    axisLabel: {
      // color: 'white',
      formatter: (value) => {
        let a = value.slice(0, 2);
        let b = value.slice(2);
        let c = `${a}\n${b}`;
        return c;
      },
      fontSize: 18,
    },
    axisLine: {
      show: true,
    },
    axisTick: false,
  },
  yAxis: {
    type: 'value',
    axisLine: {
      //坐标轴样式
      show: false, //不显示
    },
    axisLabel: {
      // color: 'white',
      fontSize: 18,
    },
    splitLine: {
      //分隔辅助线
      lineStyle: {
        type: 'dashed', //线的类型 虚线0
        opacity: 1, //透明度
      },
    },
  },
  series: [
    {
      type: 'pictorialBar',
      symbol: 'rect',
      symbolSize: [40, 3],
      symbolOffset: [0, 0],
      itemStyle: {
        color: '#00BCFF',
      },
      tooltip: { show: false },
      data: data?.map((item) => item?.value),
    },
    {
      type: 'bar',
      barWidth: 40,
      data: data?.map((item) => item?.value),
      itemStyle: {
        color: (params, api) => {
          if (params?.data < 0) {
            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 1,
                color: '#00BCFF',
              },
              {
                offset: 0,
                color: 'rgba(51, 173, 234, 0)',
              },
            ]);
          } else {
            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#00BCFF',
              },
              {
                offset: 1,
                color: 'rgba(51, 173, 234, 0)',
              },
            ]);
          }
        },
      },
      label: {
        show: true,
        position: 'top', // 位置
        // color: '#fff',
        fontSize: 15,
        distance: 10, // 距离
        // formatter: '{c}%' // 这里是数据展示的时候显示的数据
      },
    },
  ],
};

export default () => (
  <DiyChart
    option={option}
    style={{
      // background: '#0a264d',
      height: 300,
      width: 800,
    }}
  />
);
```
