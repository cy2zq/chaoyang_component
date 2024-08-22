# cy_component

<!-- SHIELD GROUP -->

[![NPM version][npm-image]][npm-url] [![NPM downloads][download-image]][download-url] [![install size][npm-size]][npm-size-url]

[![Test CI status][test-ci]][test-ci-url] [![Deploy CI][release-ci]][release-ci-url] [![Coverage][coverage]][codecov-url]

[![contributors][contributors-shield]][contributors-url] [![forks][forks-shield]][forks-url] [![stargazers][stargazers-shield]][stargazers-url] [![issues][issues-shield]][issues-url]

[![docs by dumi][dumi-url]](https://d.umijs.org/) [![Build With father][father-url]](https://github.com/umijs/father/)

<!-- umi url -->

[dumi-url]: https://img.shields.io/badge/docs%20by-dumi-blue
[father-url]: https://img.shields.io/badge/build%20with-father-028fe4.svg

<!-- npm url -->

[npm-image]: http://img.shields.io/npm/v/cy_component.svg?style=flat-square&color=deepgreen&label=latest
[npm-url]: http://npmjs.org/package/cy_component
[npm-size]: https://img.shields.io/bundlephobia/minzip/cy_component?color=deepgreen&label=gizpped%20size&style=flat-square
[npm-size-url]: https://packagephobia.com/result?p=cy_component

<!-- coverage -->

[coverage]: https://codecov.io/gh/cy2zq/cy_component/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/cy2zq/cy_component/branch/master

<!-- Github CI -->

[test-ci]: https://github.com/cy2zq/cy_component/workflows/Test%20CI/badge.svg
[release-ci]: https://github.com/cy2zq/cy_component/workflows/Release%20CI/badge.svg
[test-ci-url]: https://github.com/cy2zq/cy_component/actions?query=workflow%3ATest%20CI
[release-ci-url]: https://github.com/cy2zq/cy_component/actions?query=workflow%3ARelease%20CI
[download-image]: https://img.shields.io/npm/dm/cy_component.svg?style=flat-square
[download-url]: https://npmjs.org/package/cy_component

## 简介

个人使用
![demo](https://github.com/cy2zq/cy_common_component/blob/main/images/033.png?raw=true)


## 快速上手eg

### 安装

推荐使用 `pnpm` 安装

```bash
pnpm i cy_component -S
```

### 使用

```tsx | pure
import { Button } from 'antd';
import Modal from 'cy_component';

export default () => (
  <Modal title="cy_component" trigger={<Button type="primary">Click Me</Button>}>
    I ❤️ antd
  </Modal>
);
```

echart使用-3d饼图
![demo](https://github.com/cy2zq/cy_common_component/blob/main/shot/img.png?raw=true)

```javascript
import { CyPie } from 'cy_component';

export default () => <CyPie
  style={{
    background:'#0a264d',
 
  }}
  titleStyle={{
    left: 180,
    top: 220,
    style: {
      text: '传说中的神兽7',
      textAlign: 'center',
      fill: 'white',
      fontSize: 22,
    },
  }}
  optionsData={[
  {
    name: "类型1",
    value: 39.56 * 100,
    itemStyle: {
      color: "#05CFF7",
    },
  },

  {
    name: "类型2",
    value: 1.36 * 100,
    itemStyle: {
      color: "#FFFEBC",
    },
  },
  {
    name: "类型3",
    value: 3.69 * 100,
    itemStyle: {
      color: "#D8F0FF",
    },
  },
  {
    name: "类型4",
    value: 30.96 * 100,
    itemStyle: {
      color: "#36A1FF",
    },
  },
  {
    name: "类型5",
    value: 20.45 * 100,
    itemStyle: {
      color: "#FFCF37",
    },
  },
  {
    name: "我爱0",
    value: 0.01 * 100,
    itemStyle: {
      color: "#A1FDE9",
    },
  },
  {
    name: "类型7",
    value: 3.25 * 100,
    itemStyle: {
      color: "#2293F6",
    },
  },
  {
    name: "类型8",
    value: 0.69 * 100,
    itemStyle: {
      color: "#60B45E",
    },
  },
]}/>
```

echart使用-2d饼图
![demo](https://github.com/cy2zq/cy_common_component/blob/main/shot/img_1.png?raw=true)

```javascript
import { CyPie } from 'cy_component';

export default () => <CyPie
  style={{
    background:'#0a264d',
 
  }}
  titleStyle={{
    left: 180,
    top: 220,
    style: {
      text: '传说中的神兽7',
      textAlign: 'center',
      fill: 'white',
      fontSize: 22,
    },
  }}
  optionsData={[
  {
    name: "类型1",
    value: 39.56 * 100,
    itemStyle: {
      color: "#05CFF7",
    },
  },

  {
    name: "类型2",
    value: 1.36 * 100,
    itemStyle: {
      color: "#FFFEBC",
    },
  },
  {
    name: "类型3",
    value: 3.69 * 100,
    itemStyle: {
      color: "#D8F0FF",
    },
  },
  {
    name: "类型4",
    value: 30.96 * 100,
    itemStyle: {
      color: "#36A1FF",
    },
  },
  {
    name: "类型5",
    value: 20.45 * 100,
    itemStyle: {
      color: "#FFCF37",
    },
  },
  {
    name: "我爱0",
    value: 0.01 * 100,
    itemStyle: {
      color: "#A1FDE9",
    },
  },
  {
    name: "类型7",
    value: 3.25 * 100,
    itemStyle: {
      color: "#2293F6",
    },
  },
  {
    name: "类型8",
    value: 0.69 * 100,
    itemStyle: {
      color: "#60B45E",
    },
  },
]}/>
```

按钮
![demo](https://github.com/cy2zq/cy_common_component/blob/main/shot/img_2.png?raw=true)

```javascript
import { CyWoodBtn } from 'cy_component';
import {Row,Col} from 'antd'

export default () => <div style={{
  // background:'white',
}}
>
  <CyWoodBtn
    type={`cy05`}
    // text={<div style={{width:60,textAlign:'center'}}>测试</div>}
    text={`心有猛虎，细嗅蔷薇`}
  />
</div>
```

按钮
![demo](https://github.com/cy2zq/cy_common_component/blob/main/shot/img_3.png?raw=true)

```javascript
import { CyWoodBtn } from 'cy_component';
import {Row,Col} from 'antd'

export default () => <div style={{
  // background:'white',
}}
>
  <CyWoodBtn
    type={`cy06`}
    text={`心有猛虎，细嗅蔷薇`}
    desc={`7521`}
  />
</div>
```

按钮
![demo](https://github.com/cy2zq/cy_common_component/blob/main/shot/img_4.png?raw=true)

```javascript
import { CyWoodBtn } from 'cy_component';
import {Row,Col} from 'antd'

export default () => <div style={{
  // padding:24,
  // background:'white',
}}
>
  <Row gutter={[48,24]}>
    {

      new Array(4)?.fill('cy')?.map((item,index)=> <Col span={6} key={index}>
        <CyWoodBtn
          type={`cy0${index+1}`}
          text={`cy0${index+1}`}
        />
      </Col>)
    }
  </Row>
</div>
```
按钮
![demo](https://github.com/cy2zq/cy_common_component/blob/main/shot/img_5.png?raw=true)

```javascript
import { CyTag } from 'cy_component';
import {Row,Col} from 'antd'

export default () => <div style={{
  padding:24,
  background:'url(./girl.png)',
  // background:'radial-gradient(circle at 50% 0%,rgb(67, 54, 74) 16.4%,rgb(47, 48, 67) 68.2%,rgb(27, 23, 36) 99.1%)'
}}>
  <Row gutter={[48,24]}>
    {

      new Array(45)?.fill('cy')?.map((item,index)=> <Col span={6} key={index}>
        <CyTag
          type={`cy0${index+1}`}
          text={`cy0${index+1}`}
        />
      </Col>)
    }
  </Row>
</div>
```

按钮
![demo](https://github.com/cy2zq/cy_common_component/blob/main/shot/img_6.png?raw=true)

```javascript
import { CyBtn } from 'cy_component';
import {Row,Col} from 'antd'

export default () => <div style={{display:'flex'}}>
  <Row>
    <Col span={8}>
      <CyBtn
        color={{
          parentColor:'#e0a72a',
          btnColor:'#f0e32d'
        }}
        type={'parentBtn1'}
      >

        <p style={{fontSize:30,fontWeight:700}}>传说中的神兽</p>
      </CyBtn>
    </Col>
    <Col span={8}>
      <CyBtn
        color={{
          parentColor:'#e0a72a',
          btnColor:'#f0e32d'
        }}
        type={'parentBtn2'}
      >
        <p style={{fontSize:30,fontWeight:700}}>传说中的神兽</p>
      </CyBtn>
    </Col>
    <Col span={8}>
      <CyBtn
        type={'parentBtn2'}
      >
        <p style={{fontSize:30,fontWeight:700}}>传说中的神兽</p>
      </CyBtn>
    </Col>
    <Col span={8}>
      <CyBtn
        type={'parentBtn3'}
      >
        <p style={{fontSize:30,fontWeight:700}}>传说中的神兽</p>
      </CyBtn>
    </Col>
    <Col span={8}>
      <CyBtn
        type={'parentBtn4'}
      >
        <p style={{fontSize:30,fontWeight:700}}>传说中的神兽</p>
      </CyBtn>
    </Col>
    <Col span={8}>
      <CyBtn
        type={'parentBtn5'}
      >
        <p style={{fontSize:30,fontWeight:700}}>传说中的神兽</p>
      </CyBtn>
    </Col>
    <Col span={8}>
      <CyBtn
        type={'parentBtn6'}
      >
        <p style={{fontSize:30,fontWeight:700}}>传说中的神兽</p>
      </CyBtn>
    </Col>
    <Col span={8}>
      <CyBtn
        type={'parentBtn7'}
      >
        <p style={{fontSize:30,fontWeight:700}}>传说中的神兽</p>
      </CyBtn>
    </Col>
    <Col span={8}>
      <CyBtn
        type={'parentBtn8'}
      >
        <p style={{fontSize:30,fontWeight:700}}>传说中的神兽</p>
      </CyBtn>
    </Col>
  </Row>
</div>
```

电报
![demo](https://github.com/cy2zq/cy_common_component/blob/main/shot/img_7.png?raw=true)

```javascript
import { TypewriterCY } from 'cy_component';

export default () => <TypewriterCY isRepeat={false} content={<> <p>那一天 我闭目在经殿香雾中 蓦然听见你颂经中的真言</p>
  <p>那一月 我摇动所有的转经筒 不为超度 只为触摸你的指尖 那一年</p>
  <p>
    我磕长头匍匐在山路 不为觐见 只为贴着你的温暖 那一世 我转山转水转佛塔
  </p>
  <p>不为修来生 只为途中与你相见 那一夜 我听了一宿梵唱 不为参悟</p>
  <p>只为寻你的一丝气息 那一月 我转过所有经筒 不为超度 只为触摸你的指纹</p>
  <p>那一年 我磕长头拥抱尘埃 不为朝佛 只为贴着你的温暖 那一世 我翻遍十万大山</p>
  <p>不为修来世 只为路中能与你相遇 那一瞬 我飞升成仙 不为长生</p>
  <p>只为佑你喜乐平安</p>
</>} />
```

图标
![demo](https://github.com/cy2zq/cy_common_component/blob/main/shot/img_8.png?raw=true)

```javascript
import { CyIcon } from 'cy_component';
import {Row,Col} from 'antd';
let list=[
  {
    text:'Twitter',
    iconClass:'fab fa-twitter',
    color:'#e1306c'
  },
  {
    text:'Instagram',
    iconClass:'fab fa-instagram',  color:'#ff0000'

  },
  {
    text:'Linkedin',
    iconClass:'fab fa-linkedin-in',  color:'#ffba37'
  },
  {
    text:'YouTube',
    iconClass:'fab fa-youtube',  color:'#1da1f2'
  },
  {
    text:'GitHub',
    iconClass:'fa-brands fa-github fab',  color:'#820014'
  },
  {
    text:'QQ',
    iconClass:'fa-brands fa-qq fab',  color:'#7cb305'
  },
  {
    text:'wechat',
    iconClass:'fa-brands fa-weixin fab',  color:'#873800'
  },
  {
    text:'envelope',
    iconClass:'fa-sharp fa-solid fa-envelope cyIcon',  color:'#610b00'
  },
]

export default () => <Row gutter={[24,48]}>
  {
    list?.map(item=><Col span={4}>
      <CyIcon {...item} />
    </Col>)
  }

</Row>
```


## 迭代记录

详情：[CHANGELOG](CHANGELOG.md)

## License

Copyright © 2024 - present [chaoyang][profile-url]. <br />

<!-- LINK GROUP -->

[profile-url]: https://cy2zq.github.io/cyProfile/

<!-- contributors -->

[contributors-shield]: https://img.shields.io/github/contributors/cy2zq/cy_component.svg?style=flat
[contributors-url]: https://github.com/cy2zq/cy_component/graphs/contributors

<!-- forks -->

[forks-shield]: https://img.shields.io/github/forks/cy2zq/cy_component.svg?style=flat
[forks-url]: https://github.com/cy2zq/cy_component/network/members

<!-- stargazers -->

[stargazers-shield]: https://img.shields.io/github/stars/cy2zq/cy_component.svg?style=flat
[stargazers-url]: https://github.com/cy2zq/cy_component/stargazers

<!-- issues -->

[issues-shield]: https://img.shields.io/github/issues/cy2zq/cy_component.svg?style=flat
[issues-url]: https://github.com/cy2zq/cy_component/issues/new/choose
