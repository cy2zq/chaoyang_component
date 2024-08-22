---
title: 拖拽 Modal
group:
  title: 快速上手
  order: 0
order: 4
---

## 推荐示例
dddd

<code src="../examples/drag-modal/basic.tsx"></code>

## 背景图
![girl.png](./girl.png)

```jsx
import {ModalBg} from 'chaoyang_component';
import {CyWoodBtn} from 'chaoyang_component'
let width=700;

export default () =>
  <ModalBg
    title={"测试"}
    width={width}
    content={<div style={{ width: width - 100, height: 300, background: 'yellow' }}>
      <img src="./girl.png" alt=""/>
    </div>}
  >
    <CyWoodBtn
      type={`cy05`}
      text={`心有猛虎，细嗅蔷薇-点我`}
    />
  </ModalBg>
```
