---
title: 时间线
group:
  title: 其他
order: 11
---

```jsx
import { Timeline, CyIcon } from 'chaoyang_component';
import styles from './index.module.less';

export default () => {
  let data = {
    timelineProps: {
      lineColor: '#ffba37',
    },
    timeList: [
      {
        date: '2024 - present',
        dateClassName: styles.date,
        iconStyle: {
          background: 'rgb(33, 150, 243)',
          color: '#fff',

          fontSize: 40,
          textAlign: 'center',
        },
        content: (
          <div>
            <h3 className="vertical-timeline-element-title">中金电信</h3>
            <h4 className="vertical-timeline-element-subtitle">大屏</h4>
            <p>数智浙建</p>
          </div>
        ),
        contentArrowStyle: { borderRight: '7px solid  rgb(33, 150, 243)' },
        className: 'vertical-timeline-element--work',
        contentStyle: { background: 'rgb(33, 150, 243)', color: '#fff' },
        icon: <i class="fab fa-instagram"></i>,
      },
      {
        date: '2020 - 2024',
        dateClassName: styles.date,

        iconStyle: {
          background: 'rgb(33, 150, 243)',
          color: '#fff',

          fontSize: 40,
          textAlign: 'center',
        },
        content: (
          <div>
            <h3 className="vertical-timeline-element-title">武汉佰钧成</h3>
            <h4 className="vertical-timeline-element-subtitle">杭州</h4>
            <p>压测平台，监控平台，蓝军，元数据，iSee，容量管家，性能容量平台，ob官网等</p>
          </div>
        ),
        contentArrowStyle: { borderRight: '7px solid  rgb(33, 150, 243)' },
        className: 'vertical-timeline-element--work',
        contentStyle: { background: '#ffba37', color: '#fff' },
        icon: <i class="fab fa-linkedin-in"></i>,
      },
      {
        date: '2019 - 2020',
        dateClassName: styles.date,

        iconStyle: {
          background: 'rgb(33, 150, 243)',
          color: '#fff',

          fontSize: 40,
          textAlign: 'center',
        },
        content: (
          <div>
            <h3 className="vertical-timeline-element-title">浪潮</h3>
            <h4 className="vertical-timeline-element-subtitle">军工，特种事业部一处</h4>
            <p>xx陆军通信网络综合管理系统</p>
          </div>
        ),
        contentArrowStyle: { borderRight: '7px solid  rgb(33, 150, 243)' },
        className: 'vertical-timeline-element--work',
        contentStyle: { background: '#cf1322', color: '#fff' },
        icon: <i class="fa-brands fa-github fab"></i>,
      },
      {
        date: '2018 - 2019',
        dateClassName: styles.date,
        iconStyle: {
          background: 'rgb(33, 150, 243)',
          color: '#fff',

          fontSize: 40,
          textAlign: 'center',
        },
        content: (
          <div>
            <h3 className="vertical-timeline-element-title">联想智慧医疗</h3>
            <h4 className="vertical-timeline-element-subtitle">温州,实习</h4>
            <p>his系统</p>
          </div>
        ),
        contentArrowStyle: { borderRight: '7px solid  rgb(33, 150, 243)' },
        className: 'vertical-timeline-element--work',
        contentStyle: { background: 'rgb(33, 150, 243)', color: '#fff' },
        icon: <i class="fa-brands fa-weixin fab"></i>,
      },
      {
        date: '2014.06 - 2018',
        dateClassName: styles.date,

        iconStyle: {
          background: 'rgb(33, 150, 243)',
          color: '#fff',
          fontSize: '40px',
          textAlign: 'center',
        },
        content: (
          <div>
            <h3 className="vertical-timeline-element-title">皖南医学院</h3>
            <h4 className="vertical-timeline-element-subtitle">信息系统与信息管理专业</h4>
            <p>
              数据结构,网页设计与制作，数据挖掘，面向对象程序设计，Java，c++,软件工程，计算机网络
            </p>
          </div>
        ),
        contentArrowStyle: { borderRight: '7px solid  rgb(33, 150, 243)' },
        className: 'vertical-timeline-element--education',
        contentStyle: { background: 'rgb(233, 30, 99)', color: '#fff' },
        icon: <i class="fa-solid fa-user-graduate"></i>,
      },
      {
        date: '不将就',
        dateClassName: styles.date,
        iconStyle: {
          background: 'rgb(16, 204, 82)',
          color: '#fff',
          fontSize: '40px',
          textAlign: 'center',
        },
        content: (
          <div>
            <h3 className="vertical-timeline-element-title">晁阳</h3>
            <h4 className="vertical-timeline-element-subtitle">男</h4>
            <p>心有猛虎，细嗅蔷薇</p>
          </div>
        ),
        contentArrowStyle: { borderRight: '7px solid  rgb(33, 150, 243)' },
        className: 'vertical-timeline-element--work',
        contentStyle: { background: '#7cb305', color: '#fff' },
        icon: <i class="fa-solid fa-house"></i>,
      },
      {
        iconStyle: {
          background: 'rgb(16, 204, 82)',
          color: '#fff',
          fontSize: '40px',
          textAlign: 'center',
        },
        icon: <i class={'fab fa-twitter'} />,
      },
    ],
  };
  return (
    <div>
      <Timeline data={data} />
    </div>
  );
};
```

### API timelineProps（VerticalTimeline 属性） 时间轴属性

| 参数      | 说明         | 类型                                                   | 默认值      |
| --------- | ------------ | ------------------------------------------------------ | ----------- |
| lineColor | 时间线的颜色 | `Boolean`                                              | `white`     |
| animate   | 是否开启动画 | `Boolean`                                              | `true`      |
| className | 根元素类名   | `String`,                                              | `-`         |
| layout    | 其它配置项   | `String`, `1-column-left`,`1-column-right`,`2-columns` | `2-columns` |

### API VerticalTimelineElement 属性（timeList 每项）

| 参数              | 说明                   | 类型      | 备注/示例                                |
| ----------------- | ---------------------- | --------- | ---------------------------------------- |
| date              | 时间                   | string    | '2024 - present'                         |
| dateClassName     | 时间文本自定义类名     | string    | styles.date                              |
| iconStyle         | 图标样式               | object    | { background: '#2196f3', color: '#fff' } |
| content           | 节点内容（支持 JSX）   | ReactNode | <div>...</div>                           |
| contentArrowStyle | 内容箭头样式           | object    | { borderRight: '7px solid #2196f3' }     |
| className         | 节点自定义类名         | string    | 'vertical-timeline-element--work'        |
| contentStyle      | 内容区样式             | object    | { background: '#2196f3', color: '#fff' } |
| icon              | 图标（支持 ReactNode） | ReactNode | <i className="fab fa-instagram"></i>     |

#### timeList 示例

```js
const data = {
  timelineProps: {
    lineColor: '#ffba37',
  },
  timeList: [
    {
      date: '2024 - present',
      dateClassName: styles.date,
      iconStyle: {
        background: 'rgb(33, 150, 243)',
        color: '#fff',
        fontSize: 40,
        textAlign: 'center',
      },
      content: (
        <div>
          <h3 className="vertical-timeline-element-title">中金电信</h3>
          <h4 className="vertical-timeline-element-subtitle">大屏</h4>
          <p>数智浙建</p>
        </div>
      ),
      contentArrowStyle: { borderRight: '7px solid  rgb(33, 150, 243)' },
      className: 'vertical-timeline-element--work',
      contentStyle: { background: 'rgb(33, 150, 243)', color: '#fff' },
      icon: <i className="fab fa-instagram"></i>,
    },
    // ... 其它节点
  ],
};
```

> **注意：** icon 推荐用 className 写法，并确保已在项目入口引入对应 icon 字体库（如 FontAwesome）。

---
