---
title: 拖拽
group:
  title: 其他
order: 7
---

```jsx
/**
 * title: 拖拽
 * description: 基于 react-beautiful-dnd
 * compact: true
 */

import { CyDrag } from 'chaoyang_component';
var Mock = require('mockjs');

export default () => {
  
  let dataSource = Mock.mock({
    "list|3":[
      {
        name:'@ctitle',
        id:'@id',
        'list|3-10':[
          {
            'id|+1':1,
            title:'@cname',
            date:'@date',
            author:{
              avatarUrl:'https://avatars.githubusercontent.com/u/40606690?v=4',
              name:'@cword(2,5)',
              colors: {
                soft: 'blue',
                hard: 'yellow',
              }
            }
          }
        ]
      }
    ]
  })

  console.log(dataSource,44)
  let res = [
    {
      name: '上月',
      id: 'lastMonth',
      list: [
        {
          id: '1',
          title: '11切切',
          date: '2021',
          author: {
            avatarUrl: 'https://avatars.githubusercontent.com/u/40606690?v=4',
            name: 'mylove',
            colors: {
              soft: 'blue',
              hard: 'yellow',
            },
          },
        },
      ],
    },
    {
      name: '本月',
      id: 'month',

      list: [
        {
          id: '2',
          title: 'a',
          date: '2020',
          content: 'ddd',
          author: {
            name: '晁阳',
            avatarUrl: 'https://avatars.githubusercontent.com/u/40606690?v=4',
            colors: {
              soft: 'blue',
              hard: 'yellow',
            },
          },
        },
      ],
    },
    {
      name: '下个月',
      id: 'nextMonth',

      list: [
        {
          id: '3',
          title: '任务名称',
          date: '2020',
          author: {
            name: '晁阳',
            avatarUrl: 'https://avatars.githubusercontent.com/u/40606690?v=4',
            colors: {
              soft: 'blue',
              hard: 'yellow',
            },
          },
        },
        {
          id: '4',
          title: '任务名称',
          date: '2020',
          author: {
            name: '晁阳',
            avatarUrl: 'https://avatars.githubusercontent.com/u/40606690?v=4',
            colors: {
              soft: 'blue',
              hard: 'yellow',
            },
          },
        },
        {
          id: '5',
          title: '任务名称',
          date: '2020',
          author: {
            name: '晁阳',
            avatarUrl: 'https://avatars.githubusercontent.com/u/40606690?v=4',
            colors: {
              soft: 'blue',
              hard: 'yellow',
            },
          },
        },
        {
          id: '6',
          title: '任务名称',
          date: '2020',
          author: {
            name: '晁阳',
            avatarUrl: 'https://avatars.githubusercontent.com/u/40606690?v=4',
            colors: {
              soft: 'blue',
              hard: 'yellow',
            },
          },
        },
        {
          id: '7',
          title: '任务名称',
          date: '2020',
          author: {
            name: '晁阳',
            avatarUrl: 'https://avatars.githubusercontent.com/u/40606690?v=4',
            colors: {
              soft: 'blue',
              hard: 'yellow',
            },
          },
        },
      ],
    },
  ];
  return <CyDrag data={res}/>
}
```
