---
title: CySwiper 轮播
group:
  title: 其他
order: 90
---

# CySwiper 轮播组件

一个基于 Swiper.js 的轮播组件，支持自动轮播、鼠标滚轮控制、多种分页器位置和样式等功能。

## 特点

- 按需加载 Swiper 资源，无需额外安装 Swiper 依赖
- 支持自定义轮播内容
- 提供丰富的配置选项
- 支持水平和垂直方向轮播
- 支持多种分页器位置和样式
- 支持多种切换效果
- 内置 Animate.css 动画效果

## 基础用法

```jsx
import { CySwiper } from 'chaoyang_component';

const contentStyle = {};

export default () => (
  <CySwiper height={500}>
    <div>
      <h3 style={contentStyle}>
        <img
          src="https://images.cy-zq.cn/images/1.jpg"
          style={{
            width: '100%',
          }}
        />
      </h3>
    </div>
    <div>
      <h3 style={contentStyle}>
        <img
          src="https://images.cy-zq.cn/images/2.jpg"
          style={{
            width: '100%',
          }}
        />
      </h3>
    </div>
    <div>
      <h3 style={contentStyle}>
        <img
          src="https://images.cy-zq.cn/images/3.jpg"
          style={{
            width: '100%',
          }}
        />
      </h3>
    </div>
  </CySwiper>
);
```

## 垂直轮播

```jsx
import { CySwiper } from 'chaoyang_component';

const contentStyle = {};

export default () => (
  <CySwiper direction="vertical" height={400}>
    <div>
      <h3 style={contentStyle}>
        <img
          src="https://images.cy-zq.cn/images/1.jpg"
          style={{
            width: '100%',
          }}
        />
      </h3>
    </div>
    <div>
      <h3 style={contentStyle}>
        <img
          src="https://images.cy-zq.cn/images/2.jpg"
          style={{
            width: '100%',
          }}
        />
      </h3>
    </div>
    <div>
      <h3 style={contentStyle}>
        <img
          src="https://images.cy-zq.cn/images/3.jpg"
          style={{
            width: '100%',
          }}
        />
      </h3>
    </div>
  </CySwiper>
);
```

## 自定义分页器位置

```jsx
import { CySwiper } from 'chaoyang_component';
import { Radio } from 'antd';
import React, { useState } from 'react';

const contentStyle = {};

export default () => {
  const [dotPosition, setDotPosition] = useState('right');

  const handlePositionChange = ({ target: { value } }) => {
    setDotPosition(value);
  };

  return (
    <>
      <Radio.Group onChange={handlePositionChange} value={dotPosition} style={{ marginBottom: 8 }}>
        <Radio.Button value="top">Top</Radio.Button>
        <Radio.Button value="bottom">Bottom</Radio.Button>
        <Radio.Button value="left">Left</Radio.Button>
        <Radio.Button value="right">Right</Radio.Button>
      </Radio.Group>
      <CySwiper dotPosition={dotPosition} height={500}>
        <div>
          <h3 style={contentStyle}>
            <img
              src="https://images.cy-zq.cn/images/1.jpg"
              style={{
                width: '100%',
              }}
            />
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <img
              src="https://images.cy-zq.cn/images/2.jpg"
              style={{
                width: '100%',
              }}
            />
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <img
              src="https://images.cy-zq.cn/images/3.jpg"
              style={{
                width: '100%',
              }}
            />
          </h3>
        </div>
      </CySwiper>
    </>
  );
};
```

## 分页器类型

```jsx
import { CySwiper } from 'chaoyang_component';
import { Radio } from 'antd';
import React, { useState } from 'react';

const contentStyle = {};

export default () => {
  const [paginationType, setPaginationType] = useState('bullets');

  const handleTypeChange = ({ target: { value } }) => {
    setPaginationType(value);
  };

  return (
    <>
      <Radio.Group onChange={handleTypeChange} value={paginationType} style={{ marginBottom: 8 }}>
        <Radio.Button value="bullets">Bullets</Radio.Button>
        <Radio.Button value="fraction">Fraction</Radio.Button>
        <Radio.Button value="progressbar">Progressbar</Radio.Button>
      </Radio.Group>
      <CySwiper paginationType={paginationType} height={500}>
        <div>
          <h3 style={contentStyle}>
            <img
              src="https://images.cy-zq.cn/images/1.jpg"
              style={{
                width: '100%',
              }}
            />
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <img
              src="https://images.cy-zq.cn/images/2.jpg"
              style={{
                width: '100%',
              }}
            />
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <img
              src="https://images.cy-zq.cn/images/3.jpg"
              style={{
                width: '100%',
              }}
            />
          </h3>
        </div>
      </CySwiper>
    </>
  );
};
```

## 切换效果

CySwiper 支持多种切换效果：

- Swiper 内置：`slide`（默认）、`fade`、`cube`、`coverflow`、`flip`、`creative`、`cards`
- 自定义高级特效：`timeSlice`（时间切片）、`ripple`（波纹涟漪）、`matrixRain` / `codeRain`（矩阵代码雨）、`pixelRain`（像素雨）、`albumScroll`（专辑列滚动）、`ringGallery`（环轨画廊）

> 提示：使用以上自定义特效时，组件会自动从每个 slide 的子节点中递归查找第一个 `<img>` 作为轮播图片；也可以通过 `images` 属性直接传入图片列表。

### TimeSlice 时间切片效果

切换时，当前图片会被分割为多条水平切片，伴随扫描线「拆解飞散」，新图片从底层显现。

```jsx
import { CySwiper } from 'chaoyang_component';

export default () => (
  <CySwiper effect="timeSlice" height={420}>
    <div>
      <img src="https://images.cy-zq.cn/images/1.jpg" style={{ width: '100%' }} />
    </div>
    <div>
      <img src="https://images.cy-zq.cn/images/2.jpg" style={{ width: '100%' }} />
    </div>
    <div>
      <img src="https://images.cy-zq.cn/images/3.jpg" style={{ width: '100%' }} />
    </div>
  </CySwiper>
);
```

### Ripple 波纹涟漪效果

切换时基于 Canvas 的水波纹式像素位移过渡（与参考 HTML 一致），支持优先像素算法与软边备用过渡。

```jsx
import { CySwiper } from 'chaoyang_component';

export default () => (
  <CySwiper effect="ripple" height={420}>
    <div>
      <img src="https://images.cy-zq.cn/images/1.jpg" style={{ width: '100%' }} />
    </div>
    <div>
      <img src="https://images.cy-zq.cn/images/2.jpg" style={{ width: '100%' }} />
    </div>
    <div>
      <img src="https://images.cy-zq.cn/images/3.jpg" style={{ width: '100%' }} />
    </div>
  </CySwiper>
);
```

### MatrixRain / CodeRain 矩阵代码雨

竖直「代码雨」扫过画面，尾迹揭示下一张图；`codeRain` 与 `matrixRain` 为同一效果。

```jsx
import { CySwiper } from 'chaoyang_component';

export default () => (
  <CySwiper effect="matrixRain" height={420} autoplaySpeed={5000}>
    <div><img src="https://images.cy-zq.cn/images/1.jpg" style={{ width: '100%' }} /></div>
    <div><img src="https://images.cy-zq.cn/images/2.jpg" style={{ width: '100%' }} /></div>
    <div><img src="https://images.cy-zq.cn/images/3.jpg" style={{ width: '100%' }} /></div>
  </CySwiper>
);
```

### PixelRain 像素雨

旧图以列波形依次溶解，像素块下落，新图在下方渐显。

```jsx
import { CySwiper } from 'chaoyang_component';

export default () => (
  <CySwiper effect="pixelRain" height={420}>
    <div><img src="https://images.cy-zq.cn/images/1.jpg" style={{ width: '100%' }} /></div>
    <div><img src="https://images.cy-zq.cn/images/2.jpg" style={{ width: '100%' }} /></div>
    <div><img src="https://images.cy-zq.cn/images/3.jpg" style={{ width: '100%' }} /></div>
  </CySwiper>
);
```

### AlbumScroll 专辑列滚动

五列 3D 倾斜构图，列内图片上下无限滚动（悬停可暂停）；翻页与指示器会轮换各列使用的图片组合。

```jsx
import { CySwiper } from 'chaoyang_component';

export default () => (
  <CySwiper effect="albumScroll" height={460} autoplaySpeed={6000}>
    <div><img src="https://images.cy-zq.cn/images/1.jpg" style={{ width: '100%' }} /></div>
    <div><img src="https://images.cy-zq.cn/images/2.jpg" style={{ width: '100%' }} /></div>
    <div><img src="https://images.cy-zq.cn/images/3.jpg" style={{ width: '100%' }} /></div>
  </CySwiper>
);
```

### RingGallery 环轨画廊

3D 环形展台，多张卡片围成一圈，左右切换平滑旋转；不足 6 张时自动补全，始终保持多卡可见。

```jsx
import { CySwiper } from 'chaoyang_component';

export default () => (
  <CySwiper effect="ringGallery" height={480} autoplaySpeed={3500}>
    <div><img src="https://images.cy-zq.cn/images/1.jpg" style={{ width: '100%' }} /></div>
    <div><img src="https://images.cy-zq.cn/images/2.jpg" style={{ width: '100%' }} /></div>
    <div><img src="https://images.cy-zq.cn/images/3.jpg" style={{ width: '100%' }} /></div>
    <div><img src="https://images.cy-zq.cn/images/1.jpg" style={{ width: '100%' }} /></div>
    <div><img src="https://images.cy-zq.cn/images/2.jpg" style={{ width: '100%' }} /></div>
    <div><img src="https://images.cy-zq.cn/images/3.jpg" style={{ width: '100%' }} /></div>
  </CySwiper>
);
```

### 通过 images 属性传入

```jsx
import { CySwiper } from 'chaoyang_component';

export default () => (
  <CySwiper
    effect="timeSlice"
    height={420}
    images={[
      { src: 'https://images.cy-zq.cn/images/1.jpg', alt: '图片1' },
      { src: 'https://images.cy-zq.cn/images/2.jpg', alt: '图片2' },
      { src: 'https://images.cy-zq.cn/images/3.jpg', alt: '图片3' },
    ]}
  />
);
```

### Flip 效果

```jsx
import { CySwiper } from 'chaoyang_component';

const contentStyle = {};

export default () => (
  <CySwiper effect="flip" height={400}>
    <div>
      <h3 style={contentStyle}>
        <img
          src="https://images.cy-zq.cn/images/1.jpg"
          style={{
            width: '100%',
          }}
        />
      </h3>
    </div>
    <div>
      <h3 style={contentStyle}>
        <img
          src="https://images.cy-zq.cn/images/2.jpg"
          style={{
            width: '100%',
          }}
        />
      </h3>
    </div>
    <div>
      <h3 style={contentStyle}>
        <img
          src="https://images.cy-zq.cn/images/3.jpg"
          style={{
            width: '100%',
          }}
        />
      </h3>
    </div>
  </CySwiper>
);
```

### Fade 效果

```jsx
import { CySwiper } from 'chaoyang_component';

const contentStyle = {};

export default () => (
  <CySwiper effect="fade" height={400}>
    <div>
      <h3 style={contentStyle}>
        <img
          src="https://images.cy-zq.cn/images/1.jpg"
          style={{
            width: '100%',
          }}
        />
      </h3>
    </div>
    <div>
      <h3 style={contentStyle}>
        <img
          src="https://images.cy-zq.cn/images/2.jpg"
          style={{
            width: '100%',
          }}
        />
      </h3>
    </div>
    <div>
      <h3 style={contentStyle}>
        <img
          src="https://images.cy-zq.cn/images/3.jpg"
          style={{
            width: '100%',
          }}
        />
      </h3>
    </div>
  </CySwiper>
);
```

## 结合 Animate.css 使用

CySwiper 已经内置了 Animate.css，可以直接为轮播内容添加动画效果。

1. **添加基础动画类**

   为需要添加动画的元素添加 `animate__animated` 基础类，以及具体的动画效果类：

```jsx
import { CySwiper } from 'chaoyang_component';
import React from 'react';

export default () => (
  <CySwiper autoplaySpeed={2000} height={500}>
    <div>
      <h1 className="animate__animated animate__bounce">弹跳效果标题</h1>

      <p className="animate__animated animate__fadeInUp">这是一段带有向上淡入效果的文字</p>
    </div>
    <div>
      <h1 className="animate__animated animate__fadeInDown">向下淡入效果标题</h1>
      <img
        src="https://images.cy-zq.cn/images/2.jpg"
        className="animate__animated animate__fadeIn"
        style={{ width: '100%' }}
      />
    </div>
    <div>
      <h1 className="animate__animated animate__zoomIn">缩放效果标题</h1>
      <img
        src="https://images.cy-zq.cn/images/3.jpg"
        className="animate__animated animate__fadeIn"
        style={{ width: '100%' }}
      />
    </div>
  </CySwiper>
);
```

## 延迟动画示例

```jsx
import { CySwiper } from 'chaoyang_component';

export default () => (
  <CySwiper height={400}>
    <div>
      <h1 className="animate__animated animate__bounce animate__delay-1s">延迟1秒的弹跳效果</h1>
      <img src="https://images.cy-zq.cn/images/1.jpg" style={{ width: '100%' }} />
    </div>
    <div>
      <h1 className="animate__animated animate__fadeIn animate__delay-2s">延迟2秒的淡入效果</h1>
      <img src="https://images.cy-zq.cn/images/2.jpg" style={{ width: '100%' }} />
    </div>
    <div>
      <h1 className="animate__animated animate__zoomIn animate__delay-1s animate__slow">
        缓慢的缩放效果
      </h1>
      <img src="https://images.cy-zq.cn/images/3.jpg" style={{ width: '100%' }} />
    </div>
  </CySwiper>
);
```

## 自动播放设置

```jsx
import { CySwiper } from 'chaoyang_component';
import { Switch } from 'antd';
import React, { useState } from 'react';

const contentStyle = {};

export default () => {
  const [autoplay, setAutoplay] = useState(true);

  return (
    <>
      <Switch
        checked={autoplay}
        onChange={setAutoplay}
        style={{ marginBottom: 16 }}
        checkedChildren="自动播放开"
        unCheckedChildren="自动播放关"
      />
      <CySwiper autoplay={autoplay} autoplaySpeed={2000}>
        <div>
          <h3 style={contentStyle}>
            <img
              src="https://images.cy-zq.cn/images/1.jpg"
              style={{
                width: '100%',
              }}
            />
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <img
              src="https://images.cy-zq.cn/images/2.jpg"
              style={{
                width: '100%',
              }}
            />
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <img
              src="https://images.cy-zq.cn/images/3.jpg"
              style={{
                width: '100%',
              }}
            />
          </h3>
        </div>
      </CySwiper>
    </>
  );
};
```

## API

| 参数           | 说明                                                                                                  | 类型                          | 默认值       |
| -------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------- | ------------ |
| afterChange    | 切换面板的回调                                                                                        | function(current)             | -            |
| autoplay       | 是否自动切换                                                                                          | boolean                       | true         |
| autoplaySpeed  | 自动切换的时间间隔，单位毫秒                                                                          | number                        | 3000         |
| dotPosition    | 面板指示点位置，可选 `top` `bottom` `left` `right`（仅 Swiper 内置效果生效）                          | string                        | `right`      |
| dots           | 是否显示面板指示点                                                                                    | boolean                       | true         |
| paginationType | 分页器类型，可选 `bullets` `fraction` `progressbar` `custom`                                          | string                        | `bullets`    |
| effect         | 动画效果：Swiper 内置 `slide` `fade` `cube` `coverflow` `flip` `creative` `cards`；自定义 `timeSlice` `ripple` `matrixRain` `codeRain` `pixelRain` `albumScroll` `ringGallery` | string                        | `slide`      |
| direction      | 轮播方向，可选 `horizontal` `vertical`                                                                | string                        | `horizontal` |
| mouseWheel     | 是否支持鼠标滚轮                                                                                      | boolean                       | true         |
| style          | 容器样式                                                                                              | CSSProperties                 | -            |
| height         | 容器高度                                                                                              | string \| number              | 400          |
| images         | 自定义特效专用图片列表，不传时会从 children 中自动提取每张 slide 的第一个 img                         | `{ src: string; alt?: string }[]` | -            |
| navButtons     | 自定义特效下是否显示左右切换按钮                                                                      | boolean                       | true         |
