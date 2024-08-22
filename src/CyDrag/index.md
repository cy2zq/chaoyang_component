# 拖拽
学习记录，仅供自己参考。`react-beautiful-dnd`
`draggableId`是字符串
`index`连续数字（如果是接口形式，可以用数组索引，然后查找更新）


```jsx
import { CyDrag } from 'cy_component';
import {Row,Col} from 'antd';
let list=[
  {
    name: "上月",
    id: "lastMonth",
    progress: 80,
    list: [
      {
        id: "1",
        title: "任务名称",
        status: "processing",
        startDate: "5月28",
        endDate: "5月31",
        tag: 1, //标签 P0 P1 P2
        priority: 1, //优先级 1,2,3,4,5
        desc: "ddd", //描述
        author: {
          //用户信息
          avatarUrl: "https://avatars.githubusercontent.com/u/40606690?v=4",
          name: "mylove",
          colors: {
            soft: "blue",
            hard: "yellow",
          },
        },
      },
    ],
  },
  {
    name: "本月",
    id: "month",
    progress: 80,
    list: [
      {
        id: "2",
        title: "a",
        date: "2020",
        content: "ddd",
        author: {
          name: "晁阳",
          avatarUrl: "https://avatars.githubusercontent.com/u/40606690?v=4",
          colors: {
            soft: "blue",
            hard: "yellow",
          },
        },
      },
    ],
  },
  {
    name: "下个月",
    id: "nextMonth",
    progress: 80,

    list: [
      {
        id: "3",
        title: "任务名称",
        date: "2020",
        author: {
          name: "晁阳",
          avatarUrl: "https://avatars.githubusercontent.com/u/40606690?v=4",
          colors: {
            soft: "blue",
            hard: "yellow",
          },
        },
      },
      {
        id: "4",
        title: "任务名称",
        date: "2020",
        author: {
          name: "晁阳",
          avatarUrl: "https://avatars.githubusercontent.com/u/40606690?v=4",
          colors: {
            soft: "blue",
            hard: "yellow",
          },
        },
      },
      {
        id: "5",
        title: "任务名称",
        date: "2020",
        author: {
          name: "晁阳",
          avatarUrl: "https://avatars.githubusercontent.com/u/40606690?v=4",
          colors: {
            soft: "blue",
            hard: "yellow",
          },
        },
      },
      {
        id: "6",
        title: "任务名称",
        date: "2020",
        author: {
          name: "晁阳",
          avatarUrl: "https://avatars.githubusercontent.com/u/40606690?v=4",
          colors: {
            soft: "blue",
            hard: "yellow",
          },
        },
      },
      {
        id: "7",
        title: "任务名称",
        date: "2020",
        author: {
          name: "晁阳",
          avatarUrl: "https://avatars.githubusercontent.com/u/40606690?v=4",
          colors: {
            soft: "blue",
            hard: "yellow",
          },
        },
      },
    ],
  },
]
export default () => <CyDrag  list={list}/>
```



