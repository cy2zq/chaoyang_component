# 饼图3d
基于Echart和echart-gl-
```javascript
  headScripts: [
  `https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js`,
  `https://cdn.jsdelivr.net/npm/echarts-gl/dist/echarts-gl.min.js`,
]
```
```jsx
import { CyPie } from 'chaoyang_component';

export default () => <CyPie
  style={{
    background:'#0a264d',
 
  }}
  titleStyle={{
    left: 180,
    top: 220,
    style: {
      text: '传说中的神兽7',
      textAlign: 'center',
      fill: 'white',
      fontSize: 22,
    },
  }}
  optionsData={[
  {
    name: "类型1",
    value: 39.56 * 100,
    itemStyle: {
      color: "#05CFF7",
    },
  },

  {
    name: "类型2",
    value: 1.36 * 100,
    itemStyle: {
      color: "#FFFEBC",
    },
  },
  {
    name: "类型3",
    value: 3.69 * 100,
    itemStyle: {
      color: "#D8F0FF",
    },
  },
  {
    name: "类型4",
    value: 30.96 * 100,
    itemStyle: {
      color: "#36A1FF",
    },
  },
  {
    name: "类型5",
    value: 20.45 * 100,
    itemStyle: {
      color: "#FFCF37",
    },
  },
  {
    name: "我爱0",
    value: 0.01 * 100,
    itemStyle: {
      color: "#A1FDE9",
    },
  },
  {
    name: "类型7",
    value: 3.25 * 100,
    itemStyle: {
      color: "#2293F6",
    },
  },
  {
    name: "类型8",
    value: 0.69 * 100,
    itemStyle: {
      color: "#60B45E",
    },
  },
]}/>
```
# EChart-饼图
基于Echart
```jsx
import { CyPie2d } from 'chaoyang_component';

export default () => <CyPie2d
  style={{
    background:'#0a264d',
    height:500
  }}
  optionsData={[
  {
    name: "类型1",
    value: 96 * 100,
    itemStyle: {
      color: "#05CFF7",
    },
  },

  {
    name: "类型2",
    value: 1.36 * 100,
    itemStyle: {
      color: "#FFFEBC",
    },
  },
  {
    name: "类型3",
    value: 3.69 * 100,
    itemStyle: {
      color: "#D8F0FF",
    },
  },
  {
    name: "类型4",
    value: 30.96 * 100,
    itemStyle: {
      color: "#36A1FF",
    },
  },
  {
    name: "类型5",
    value: 20.45 * 100,
    itemStyle: {
      color: "#FFCF37",
    },
  },
  {
    name: "我爱0",
    value: 0.01 * 100,
    itemStyle: {
      color: "#A1FDE9",
    },
  },
  {
    name: "类型7",
    value: 3.25 * 100,
    itemStyle: {
      color: "#2293F6",
    },
  },
  {
    name: "类型8",
    value: 0.69 * 100,
    itemStyle: {
      color: "#60B45E",
    },
  },
]}/>
```


