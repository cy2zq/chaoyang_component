---
title: 走马灯
group:
  title: 其他
order: 1
---

# 轮播学习

`版本链接：版本号可改`https://unpkg.com/swiper@11/swiper-bundle.min.js
styles: [`https://unpkg.com/swiper@11.1.1/swiper-bundle.min.css`],
支持鼠标滚动，手机，电视滑动
`中文官网：`https://www.swiper.com.cn/usage/

```javascript
var mySwiper = new Swiper('.swiper1', {
  mousewheel: true,
  direction: 'vertical', // 垂直切换选项
  loop: true, // 循环模式选项
  loopPreventsSlide: true, //当swiper 正在过渡时，阻止slide 前进后退的切换操作
  observer: true,
  observeParents: true,
  slidesPerView: 10, //swiper容器同时展示的元素数量
  spaceBetween: 10, //元素之间间隔距离
  speed: 1000, //slider自动滑动开始到结束的时间
  // autoplay: false,
  autoplay: {
    //开启自动切换
    delay: 10, //自动切换的时间间隔
    stopOnLastSlide: false, //当切换到最后一个slide时停止自动切换
    disableOnInteraction: false, //用户操作swiper之后，是否停止自动切换效果
  },
});
// 监听鼠标移入事件
document.querySelector('.swiper1').addEventListener('mouseenter', function () {
  // 改变Swiper的速度为500ms
  mySwiper.params.speed = 20; // 更新Swiper的speed参数
  mySwiper.autoplay.stop();
});

// 监听鼠标移出事件
document.querySelector('.swiper1').addEventListener('mouseleave', function () {
  // 恢复Swiper的速度为400ms
  mySwiper.params.speed = 1000; // 更新Swiper的speed参数
  mySwiper.autoplay.start();
});
```

```jsx
/**
 * title: demo swiper
 * background: '#04102A'
 *
 */

import { CySwiper } from 'chaoyang_component';
let data = [
  '人生若只如初见',
  '何事西风悲画扇',
  '等闲变却故人心',
  '却道故人心易变',
  '骊山语罢清宵半',
  '泪雨霖铃终不怨',
  '何如薄幸锦衣郎',
  '比翼连枝当日愿',
  '你见，或者不见我',
  '我就在那里，不悲不喜。',
  '你念，或者不念我',
  '情就在那里，不来不去',
  '你爱或者不爱我，爱就在那里',
  '不增不减',
  '你跟，或者不跟我',
  '我的手就在你的手里',
  '不舍不弃',
  '来我怀里',
  '或者',
  '让我住进你的心里',
  '默然相爱，寂静喜欢',
];

export default () => <CySwiper data={data} height={600} />;
```

# 轮播学习-EChart

```jsx
import { CySwiper } from 'chaoyang_component';
let data = [
  {
    name: '示例1',
    lineValue: 10,
    barValue: 20,
  },
  {
    name: '示例2',
    lineValue: 20,
    barValue: 30,
  },
  {
    name: '示例3',
    lineValue: 22,
    barValue: 34,
  },
  {
    name: '示例4',
    lineValue: 11,
    barValue: 2432,
  },
  {
    name: '示例5',
    lineValue: 10,
    barValue: 20,
  },
  {
    name: '示例6',
    lineValue: 20,
    barValue: 30,
  },
  {
    name: '示例7',
    lineValue: 22,
    barValue: 34,
  },
  {
    name: '示例8',
    lineValue: 11,
    barValue: 2432,
  },
  {
    name: '示例9',
    lineValue: 22,
    barValue: 34,
  },
  {
    name: '示例10',
    lineValue: 11,
    barValue: 2432,
  },
];

export default () => (
  <CySwiper
    type={'chart'}
    data={data}
    style={{
      width: 850,
      height: 500,
    }}
  />
);
```
