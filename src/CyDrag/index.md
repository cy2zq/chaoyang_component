---
title: 拖拽
group:
  title: 其他
order: 8
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
    'list|3': [
      {
        id: '@id',
        boardName: '@ctitle',
        boardId: '@id',
        boardProgress: function () {
          return Math.floor(Math.random() * 91) + 20; // 10到100之间的随机数
        },
        taskGroupTitle: '@cword(2,15)',
        'list|3-10': [
          {
            'id|+1': '@id',
            taskTitle: '@cword(2,15)',
            taskBeginDate: `${Mock.Random.integer(1, 12)}月${Mock.Random.integer(1, 30)}日`,
            taskEndDate: `${Mock.Random.integer(1, 12)}月${Mock.Random.integer(1, 30)}日`,
            taskStatus: '4',
            taskDesc: '<p>测试</p>',
            taskAbstract: '@cword(10,35)',
            taskProgress: function () {
              return Math.floor(Math.random() * 91) + 10; // 10到100之间的随机数
            },
            taskPriority: function () {
              const priorities = ['P0', 'P1', 'P2', 'P3'];
              return priorities[Math.floor(Math.random() * priorities.length)];
            },
            dutyPersonName: '@cname',
          },
        ],
      },
    ],
  });

  return <CyDrag data={dataSource?.list} />;
};
```
