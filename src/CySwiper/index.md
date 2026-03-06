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

CySwiper 支持多种切换效果，包括 `slide`（默认）、`fade`、`cube`、`coverflow`、`flip`、`creative`、`cards`。

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

| 参数           | 说明                                                                       | 类型              | 默认值       |
| -------------- | -------------------------------------------------------------------------- | ----------------- | ------------ |
| afterChange    | 切换面板的回调                                                             | function(current) | -            |
| autoplay       | 是否自动切换                                                               | boolean           | true         |
| autoplaySpeed  | 自动切换的时间间隔，单位毫秒                                               | number            | 3000         |
| dotPosition    | 面板指示点位置，可选 `top` `bottom` `left` `right`                         | string            | `right`      |
| dots           | 是否显示面板指示点                                                         | boolean           | true         |
| paginationType | 分页器类型，可选 `bullets` `fraction` `progressbar` `custom`               | string            | `bullets`    |
| effect         | 动画效果，可选 `slide` `fade` `cube` `coverflow` `flip` `creative` `cards` | string            | `slide`      |
| direction      | 轮播方向，可选 `horizontal` `vertical`                                     | string            | `horizontal` |
| mouseWheel     | 是否支持鼠标滚轮                                                           | boolean           | true         |
| style          | 容器样式                                                                   | CSSProperties     | -            |
| height         | 容器高度                                                                   | string \| number  | 400          |
