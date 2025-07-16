---
title: 表格
group:
  title: 数据展示
order: 8
---

## 何时使用

- 当有大量结构化的数据需要展现时；
- 当需要对数据进行排序、搜索、分页、自定义操作等复杂行为时。

## antd 表格

```jsx
import React from 'react';
import { Space, Table, Tag } from 'antd';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
const App = () => <Table columns={columns} dataSource={data} />;
export default App;
```

## vtable 表格

```tsx
/**
 * title: 基本表
 * description: 我是简介，我可以用 `Markdown` 来编写
 */
import { CyTable } from 'chaoyang_component';
import { usePrefersColor } from 'dumi';
import { useRef } from 'react';

var Mock = require('mockjs');
export default () => {
  const [color] = usePrefersColor();
  let ref = useRef(null);
  var dataSource = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|30-100': [
      {
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1,
        name: '@cname',
        'sex|1': ['男', '女'],
        'age|1-100': 100,
        address: '@county(true)',
        date: '@date',
        'status|1': ['启用', '禁用'],
        remark: '@cparagraph(1, 3)',
        img: '@image(200x100, @color)',
        score: '@integer(0, 100)',
      },
    ],
  });

  let columns = [
    {
      field: 'name',
      title: '姓名',
      width: 'auto',
      sort: true, // 使用内置默认排序逻辑
    },
    {
      field: 'sex',
      title: '性别',
      width: 'auto',
      sort: true, // 使用内置默认排序逻辑
    },
    {
      field: 'age',
      title: '年龄',
      width: 'auto',
      sort: true, // 使用内置默认排序逻辑
      summaryFun: (value) => {
        return '平均年龄：' + Math.round(value) + '（岁）';
      }, // 使用内置默认合计逻辑
      summaryFunType: 'AVG',
    },
    {
      field: 'address',
      title: '地址',
      width: 'auto',
      sort: true, // 使用内置默认排序逻辑
    },
    {
      field: 'date',
      title: '生日',
      width: 'auto',
      sort: true, // 使用内置默认排序逻辑
    },
    {
      field: 'status',
      title: '状态',
      width: 'auto',
      sort: true, // 使用内置默认排序逻辑
    },
    {
      field: 'remark',
      title: '备注',
      width: 'auto',
      sort: true, // 使用内置默认排序逻辑
    },
    {
      field: 'score',
      title: '评分',
      width: 'auto',
      sort: true, // 使用内置默认排序逻辑
      summaryFun: (value) => {
        return Math.round(value) + '（分）';
      }, // 使用内置默认合计逻辑
      summaryFunType: 'SUM',
    },
  ];

  // return <div>222</div>;

  return (
    <div>
      <CyTable
        style={{
          width: 'calc(100% - 50px)',
          height: '400px',
        }}
        title={'测试'}
        dataSource={dataSource?.list}
        columns={columns}
        theme={color == 'light' ? 'BRIGHT' : 'DARK'}
        options={{
          frozenColCount: 3,
          bottomFrozenRowCount: 1,
        }}
        onMount={(tableInstance, downloadExcel) => {
          ref.current = {
            tableInstance,
            downloadExcel,
          };
        }}
      />
    </div>
  );
};
```

### 表格头合并

- 列合并
  ` {
  title: '其它信息',
   columns: []
}`
- 行合并 `{
  field: "省份",
  title: "省份",
  width: 120,
  mergeCell: true, // 配置单元格合并
}`

```jsx
import { CyTable } from 'chaoyang_component';
import { usePrefersColor } from 'dumi';
import { useRef } from 'react';

var Mock = require('mockjs');
export default () => {
  const [color] = usePrefersColor();
  let ref = useRef(null);
  var dataSource = [
    {
      省份: '安徽',
      城市: '淮北',
      人口分类: '本地',
      经济指标: 20,
      评分: 8,
    },
    {
      省份: '安徽',
      城市: '淮南',
      人口分类: '本地',
      经济指标: 20,
      评分: 7,
    },
    {
      省份: '安徽',
      城市: '淮南',
      人口分类: '外来',
      经济指标: 20,
      评分: 7,
    },
  ];

  let columns = [
    {
      field: '省份',
      title: '省份',
      width: '100',
      mergeCell: true,
    },
    {
      field: '城市',
      title: '城市',
      width: '200',
      mergeCell: true,
    },
    {
      field: '人口分类',
      title: '人口分类',
      width: '150',
      sort: true, // 使用内置默认排序逻辑
    },
    {
      title: '其它信息',
      columns: [
        {
          field: '经济指标',
          title: '经济指标',
          width: '200',
          sort: true, // 使用内置默认排序逻辑
        },
        {
          field: '评分',
          title: '评分',
          width: '200',
          sort: true, // 使用内置默认排序逻辑
          summaryFun: (value) => {
            return Math.round(value) + '（分）';
          }, // 使用内置默认合计逻辑
          summaryFunType: 'SUM',
        },
      ],
    },
  ];

  return (
    <div>
      <CyTable
        style={{
          width: 'calc(100% - 50px)',
          height: '400px',
        }}
        hideRowSeriesNumber
        title={'测试'}
        dataSource={dataSource}
        columns={columns}
        theme={color == 'light' ? 'BRIGHT' : 'DARK'}
        options={{
          frozenColCount: 3,
          bottomFrozenRowCount: 1,
        }}
        onMount={(tableInstance, downloadExcel) => {
          ref.current = {
            tableInstance,
            downloadExcel,
          };
        }}
      />
    </div>
  );
};
```

### 透视表

```jsx
/**
 * title: 简单透视表
 * description: 我是简介，我可以用 `Markdown` 来编写,
 * 注意，透视表一条记录，只能确认一个单元格，这个和普通的表不同，
 */
import { useRef } from 'react';
import { CyPivotTable } from 'chaoyang_component';
import { Row, Col, Button } from 'antd';
import { usePrefersColor } from 'dumi';

var Mock = require('mockjs');
export default () => {
  const [color] = usePrefersColor();
  let ref = useRef(null);
  var dataSource = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|30-100': [
      {
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1,
        'Category|1': ['经济指标‌', '创新能力指标', '基础设施指标', '社会指标', '环境指标'],
        // '城市': '@city',
        省份: '@province',
        '年份|1': ['2023', '2024', '2025'],
        '季度|1': ['一季度', '二季度', '三季度', '四季度'],
        人均GDP: '@integer(0, 100)',
        就业率‌: '@integer(0, 100)',
        产业结构: '@integer(0, 100)',
        人才引进: '@integer(0, 100)',
        科技创新: '@integer(0, 100)',
        高新技术产业: '@integer(0, 100)',
        交通网络: '@integer(0, 100)',
        供水供电: '@integer(0, 100)',
        公共设施: '@integer(0, 100)',
        通信网络: '@integer(0, 100)',
        医疗水平: '@integer(0, 100)',
        社会福利: '@integer(0, 100)',
        治安指数: '@integer(0, 100)',

        空气质量: '@integer(0, 100)',
        水质指数: '@integer(0, 100)',
        噪音污染: '@integer(0, 100)',
        '‌交通拥堵指数': '@integer(0, 100)',
        '‌生态保护‌': '@integer(0, 100)',
      },
    ],
  });

  return (
    <div>
      <CyPivotTable
        style={{
          width: 'calc(100% - 50px)',
          height: '400px',
        }}
        title={'测试'}
        dataSource={dataSource?.list}
        theme={color == 'light' ? 'DEFAULT' : 'DARK'}
        options={{
          rows: [
            {
              dimensionKey: '省份',
              title: '省份',
              headerStyle: {
                textStick: true,
              },
              width: 'auto',
            },
            // {
            //   dimensionKey: '城市',
            //   title: '城市',
            //   headerStyle: {
            //     textStick: true,
            //   },
            //   width: 'auto',
            // },
            {
              dimensionKey: '年份',
              title: '年份',
              headerStyle: {
                textStick: true,
              },
              width: 'auto',
            },
            {
              dimensionKey: '季度',
              title: '季度',
              headerStyle: {
                textStick: true,
              },
              width: 'auto',
            },
          ],
          columns: [
            {
              dimensionKey: 'Category',
              title: '分类',
              headerStyle: {
                textStick: true,
              },
              width: 'auto',
            },
          ],
          columnTree: [
            {
              dimensionKey: 'Category',
              value: '经济指标‌',
              children: [
                {
                  indicatorKey: '人均GDP',
                },
                {
                  indicatorKey: '就业率‌',
                },
                {
                  indicatorKey: '产业结构',
                },
              ],
            },
            {
              dimensionKey: 'Category',
              value: '创新能力指标',
              children: [
                {
                  indicatorKey: '科技创新',
                },
                {
                  indicatorKey: '人才引进',
                },
                {
                  indicatorKey: '高新技术产业',
                },
              ],
            },
            {
              dimensionKey: 'Category',
              value: '基础设施指标',
              children: [
                {
                  indicatorKey: '交通网络',
                },
                {
                  indicatorKey: '供水供电',
                },
                {
                  indicatorKey: '公共设施',
                },
                {
                  indicatorKey: '通信网络',
                },
              ],
            },

            {
              dimensionKey: 'Category',
              value: '社会指标',
              children: [
                {
                  indicatorKey: '文化教育',
                },
                {
                  indicatorKey: '医疗水平',
                },
                {
                  indicatorKey: '社会福利',
                },
                {
                  indicatorKey: '治安指数',
                },
              ],
            },
            {
              dimensionKey: 'Category',
              value: '环境指标',
              children: [
                {
                  indicatorKey: '空气质量',
                },
                {
                  indicatorKey: '水质指数',
                },
                {
                  indicatorKey: '噪音污染',
                },
                {
                  indicatorKey: '‌交通拥堵指数',
                },
                {
                  indicatorKey: '‌生态保护‌',
                },
              ],
            },
          ],
        }}
      />
    </div>
  );
};
```

### API Table

| 参数       | 说明             | 类型                                        | 默认值    |
| ---------- | ---------------- | ------------------------------------------- | --------- |
| dataSource | 数据源           | `object[]`                                  | `-`       |
| columns    | 表格列           | `object[]`                                  | `-`       |
| theme      | 主题             | `DARK`,`DEFAULT`,`ARCO`,`BRIGHT`,`SIMPLIFY` | `DEFAULT` |
| options    | 其它配置项       | `object` 具体参考 options                   | `-`       |
| onMount    | 函数获取表格实例 | `function(tableInstance, exportExcel)`      | `-`       |

### API options

| 参数                 | 说明         | 类型     | 默认值 |
| -------------------- | ------------ | -------- | ------ |
| frozenColCount       | 冻结列数     | `number` | `-`    |
| bottomFrozenRowCount | 底部冻结行数 | `number` | `-`    |
| rightFrozenColCount  | 右侧冻结列数 | `number` |

### 事件

| 参数              | 说明               | 类型                | 默认值 |
| ----------------- | ------------------ | ------------------- | ------ |
| `click_cell`      | 单元格点击事件     | `function(...args)` | `-`    |
| `dblclick_cell`   | 单元格双击事件     | `function(...args)` | `-`    |
| `mouseenter_cell` | 鼠标进入单元格事件 | `function(...args)` |
| `mouseleave_cell` | 鼠标离开单元格事件 | `function(...args)` |

:::info
VTable
:::
