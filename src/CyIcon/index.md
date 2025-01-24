---
title: 图标
group:
  title: 通用
order: 2
---

# 图标
`版本链接：版本号可改6.5.2`https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css

`中文官网：`https://fontawesome.com.cn/v5

`如果其他图标库同理`https://react-icons.github.io/react-icons/

```jsx
import { CyIcon } from 'chaoyang_component';
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
# 图标
放大缩小
```jsx
import { CyIcon } from 'chaoyang_component';

export default () => <CyIcon style={{transform:'scale(0.5)'}} text={'Facebook'}  iconClass={'fab fa-facebook-f'} />
```
# 图标

```jsx
import { CyIcon } from 'chaoyang_component';

export default () => <CyIcon  text={'Facebook'}  iconClass={'fab fa-facebook-f'} />
```
# 图标
```jsx

export default () => <span className={'fab fa-facebook-f'} style={{fontSize:22,color:'red'}}></span>
```


