---
title: 安装
group:
  title: 快速上手
order: 2
---

## 介绍

`chaoyang_component` 是一个基于 antd 和 react 的 UI 组件库；

## 安装

```bash
npm install chaoyang_component --save
```

## 使用

```tsx | pure
import { Button } from 'antd';
import Modal from 'chaoyang_component';

export default () => (
  <Modal title="chaoyang_component" trigger={<Button type="primary">Click Me</Button>}>
    I ❤️ antd
  </Modal>
);
```
