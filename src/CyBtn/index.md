---
title: 按钮
nav: 组件
group:
  title: 通用

order: 1
---

## 木制按钮

```jsx
import { CyWoodBtn } from 'chaoyang_component';
import { Row, Col } from 'antd';

export default () => (
  <div>
    <Row gutter={[48, 24]}>
      {new Array(4)?.fill('cy')?.map((item, index) => (
        <Col span={6} key={index}>
          <CyWoodBtn type={`cy0${index + 1}`} text={`cy0${index + 1}`} />
        </Col>
      ))}
    </Row>
  </div>
);
```

## 圣诞-纯 css

```jsx
import { CyWoodBtn } from 'chaoyang_component';
import { Row, Col } from 'antd';

export default () => (
  <div
    style={
      {
        // background:'white',
      }
    }
  >
    <CyWoodBtn type={`cy06`} text={`心有猛虎，细嗅蔷薇`} desc={`7521`} />
  </div>
);
```

## 纯 css 按钮

```jsx
import { CyBtn } from 'chaoyang_component';
import { Row, Col } from 'antd';

export default () => (
  <div style={{ display: 'flex' }}>
    <Row>
      <Col span={8}>
        <CyBtn
          color={{
            parentColor: '#e0a72a',
            btnColor: '#f0e32d',
          }}
          type={'parentBtn1'}
        >
          <p style={{ fontSize: 30, fontWeight: 700 }}>传说中的神兽</p>
        </CyBtn>
      </Col>
      <Col span={8}>
        <CyBtn
          color={{
            parentColor: '#e0a72a',
            btnColor: '#f0e32d',
          }}
          type={'parentBtn2'}
        >
          <p style={{ fontSize: 30, fontWeight: 700 }}>传说中的神兽</p>
        </CyBtn>
      </Col>
      <Col span={8}>
        <CyBtn type={'parentBtn2'}>
          <p style={{ fontSize: 30, fontWeight: 700 }}>传说中的神兽</p>
        </CyBtn>
      </Col>
      <Col span={8}>
        <CyBtn type={'parentBtn3'}>
          <p style={{ fontSize: 30, fontWeight: 700 }}>传说中的神兽</p>
        </CyBtn>
      </Col>
      <Col span={8}>
        <CyBtn type={'parentBtn4'}>
          <p style={{ fontSize: 30, fontWeight: 700 }}>传说中的神兽</p>
        </CyBtn>
      </Col>
      <Col span={8}>
        <CyBtn type={'parentBtn5'}>
          <p style={{ fontSize: 30, fontWeight: 700 }}>传说中的神兽</p>
        </CyBtn>
      </Col>
      <Col span={8}>
        <CyBtn type={'parentBtn6'}>
          <p style={{ fontSize: 30, fontWeight: 700 }}>传说中的神兽</p>
        </CyBtn>
      </Col>
      <Col span={8}>
        <CyBtn type={'parentBtn7'}>
          <p style={{ fontSize: 30, fontWeight: 700 }}>传说中的神兽</p>
        </CyBtn>
      </Col>
      <Col span={8}>
        <CyBtn type={'parentBtn8'}>
          <p style={{ fontSize: 30, fontWeight: 700 }}>传说中的神兽</p>
        </CyBtn>
      </Col>
    </Row>
  </div>
);
```
