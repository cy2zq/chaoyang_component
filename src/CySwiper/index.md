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
import { CySwiper } from 'chaoyang_component';

export default () => <CySwiper />
```

# 轮播学习2

```jsx
import { CySwiper } from 'chaoyang_component';

export default () => <CySwiper type={'chart'}/>
```
