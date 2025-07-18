---
title: 图标
description: 语义化的矢量图形。
group:
  title: 通用
order: 2
---

## 分类

### fontawesome

- <a href="https://fontawesome.com.cn/v5" target="_blank" rel="noopener noreferrer">中文官网-针对 v5</a>
- <a href="https://fontawesome.com/icons" target="_blank" rel="noopener noreferrer">英文官网-针对 v6，请使用英文官网</a>
- <a href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" target="_blank" rel="noopener noreferrer">版本链接：版本号可改 6.5.2</a>
  只需要引入该 css 文件即可

#### 纯图标

```jsx
import { CyIcon } from 'chaoyang_component';
import { Row, Col } from 'antd';
let list = [
  {
    text: 'Twitter',
    iconClass: 'fab fa-twitter',
    color: '#e1306c',
  },
  {
    text: 'Instagram',
    iconClass: 'fab fa-instagram',
    color: '#ff0000',
  },
  {
    text: 'Linkedin',
    iconClass: 'fab fa-linkedin-in',
    color: '#ffba37',
  },
  {
    text: 'YouTube',
    iconClass: 'fab fa-youtube',
    color: '#1da1f2',
  },
  {
    text: 'GitHub',
    iconClass: 'fa-brands fa-github fab',
    color: '#820014',
  },
  {
    text: 'QQ',
    iconClass: 'fa-brands fa-qq fab',
    color: '#7cb305',
  },
  {
    text: 'wechat',
    iconClass: 'fa-brands fa-weixin fab',
    color: '#873800',
  },
  {
    text: 'envelope',
    iconClass: 'fa-sharp fa-solid fa-envelope cyIcon',
    color: '#610b00',
  },
];

export default () => (
  <Row gutter={[24, 48]}>
    {list?.map((item) => (
      <Col span={4}>
        <i
          class={item?.iconClass}
          style={{
            color: item?.color,
            fontSize: 27,
          }}
        />
      </Col>
    ))}
  </Row>
);
```

#### 封装后

# 图标

```jsx
import { CyIcon } from 'chaoyang_component';
export default () => <CyIcon text={'Facebook'} iconClass={'fab fa-facebook-f'} />;
```

```jsx
import { CyIcon } from 'chaoyang_component';
import { Row, Col } from 'antd';
let list = [
  {
    text: 'Twitter',
    iconClass: 'fab fa-twitter',
    color: '#e1306c',
  },
  {
    text: 'Instagram',
    iconClass: 'fab fa-instagram',
    color: '#ff0000',
  },
  {
    text: 'Linkedin',
    iconClass: 'fab fa-linkedin-in',
    color: '#ffba37',
  },
  {
    text: 'YouTube',
    iconClass: 'fab fa-youtube',
    color: '#1da1f2',
  },
  {
    text: 'GitHub',
    iconClass: 'fa-brands fa-github fab',
    color: '#820014',
  },
  {
    text: 'QQ',
    iconClass: 'fa-brands fa-qq fab',
    color: '#7cb305',
  },
  {
    text: 'wechat',
    iconClass: 'fa-brands fa-weixin fab',
    color: '#873800',
  },
  {
    text: 'envelope',
    iconClass: 'fa-sharp fa-solid fa-envelope cyIcon',
    color: '#610b00',
  },
];

export default () => (
  <Row gutter={[24, 48]}>
    {list?.map((item) => (
      <Col span={4}>
        <CyIcon {...item} />
      </Col>
    ))}
  </Row>
);
```

#### 放大缩小

```jsx
import { CyIcon } from 'chaoyang_component';

export default () => (
  <CyIcon style={{ transform: 'scale(0.5)' }} text={'Facebook'} iconClass={'fab fa-facebook-f'} />
);
```

### react-icons

- <a href="https://react-icons.github.io/react-icons/" target="_blank" rel="noopener noreferrer">react-icons</a>

### 阿里字体图标库

- <a href="https://www.iconfont.cn/" target="_blank" rel="noopener noreferrer">iconfont</a>

Lottie 动画
