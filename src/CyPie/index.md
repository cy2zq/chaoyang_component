---
title: 饼图
group:
  title: 数据展示
order: 5
---


```jsx
/**
 * background: '#0a264d'
 */
import { CyPieRotate } from 'chaoyang_component';
import {Row,Col} from 'antd'

export default ()=>{

  return <CyPieRotate data={27} title={'男生占比'}/>
}

```

# 饼图3d
基于Echart和echart-gl-
```javascript
  headScripts: [
  `https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js`,
  `https://cdn.jsdelivr.net/npm/echarts-gl/dist/echarts-gl.min.js`,
]
```
```jsx
/**
 * background: '#0a264d'
 */
import { CyPie } from 'chaoyang_component';

export default () => <CyPie

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

# 自定义环形图
基于svg
```jsx
/**
 * background: '#03071F'
 */
import { CyPieSvg } from 'chaoyang_component';
import {Row,Col} from 'antd'

export default ()=>{
  let arr=[
    {
      name:"类型1",
      value:20,
      color:'#13BCFF'
    },
    {
      name:"类型2",
      value:46,
      color:'#00F9FF'
    },
    {
      name:"类型3",
      value:36,
      color:'#ffba37'
    },
    {
      name:"类型4",
      value:76,
      color:'red'
    },
  ]
  return <Row gutter={[24,24]}>
    {
      arr.map((item,index)=>{
        return <Col span={6}>
                  <CyPieSvg
                    title={
                      <span  
                        style={{
                          fontSize: 28,
                          fontWeight: 700,
                          color: "#D8F7FF",
                          textShadow: `0px 4px 8px ${item?.color}`,  
                        }}>
                        {item?.value}
                      </span>
                    }
                    name={<span
                            style={{
                              fontSize: 18,
                              fontWeight: 500,
                              color: "#D8F7FF",
                            }}>
                        {item?.name}
                      </span>}
                    mainColor_cy={ item?.color}
                    percent={item?.value}
                    scale={"1.2"}
                    width={247}
                    height={118}
                  />
               </Col>
      })
    }
  </Row>
}

```










# EChart-饼图
基于Echart
```jsx
/**
 * background: '#03071F'
 */
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




