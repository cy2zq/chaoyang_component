# 表格

## API Table

| 参数         | 说明       | 类型                                          | 默认值       |
|------------|----------|---------------------------------------------|-----------|
| dataSource | 数据源      | `object[]`                                  | `-`       |
| columns    | 表格列      | `object[]`                                  | `-`       |
| theme      | 主题       | `DARK`,`DEFAULT`,`ARCO`,`BRIGHT`,`SIMPLIFY` | `DEFAULT` |
| options    | 其它配置项    | `object` 具体参考options                        | `-`       |
| onMount    | 函数获取表格实例 | `function(tableInstance, exportExcel)`                            | `-`       |

## options

| 参数                   | 说明       | 类型                      | 默认值 |
|----------------------|----------|-------------------------|-----|
| frozenColCount       | 冻结列数     | `number`    | `-` |  `-`       |
| bottomFrozenRowCount | 底部冻结行数   | `number`| `-` |
| rightFrozenColCount  | 右侧冻结列数   | `number` | `-` |

## 事件

| 参数                | 说明          | 类型                        | 默认值 |
|-------------------|-------------|---------------------------|-----|
| `click_cell`      | 单元格点击事件     | `function(...args)` | `-` |  `-`       |
| `dblclick_cell`   | 单元格双击事件     | `function(...args)`       | `-` |
| `mouseenter_cell` | 鼠标进入单元格事件   | `function(...args)`       | `-` |
| `mouseleave_cell` | 鼠标离开单元格事件   | `function(...args)`       | `-` |
示例:tableInstance.on("mouseenter_cell", (...args) => console.log(args));

## 导出Excel
`exportExcel('晁阳测试')`

## 基本表格


```jsx
import {useRef} from 'react'
import { CyTable} from 'chaoyang_component';
import {Row,Col,Button} from 'antd'
var Mock = require('mockjs')
export default ()=>{
  let ref=useRef(null);
  var dataSource = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|300-11800': [{
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      'id|+1': 1,
      'name': '@cname',
      "sex|1": ["男","女"],
      "age|1-100": 100,
      "address": "@county(true)",
      "date": "@date",
      "status|1": ["启用","禁用"],
      "remark": "@cparagraph(1, 3)",
      "img": "@image(200x100, @color)",
      "score": "@integer(0, 100)"
    }]
  })

  let columns = [
    {
    field: "name",
    title: "姓名",
    width: "auto",
    sort: true, // 使用内置默认排序逻辑
  },{
    field: "sex",
    title: "性别",
    width: "auto",
    sort: true, // 使用内置默认排序逻辑
  },{
      field: "age",
      title: "年龄",
      width: "auto",
      sort: true, // 使用内置默认排序逻辑
      
    },{
      field: "address",
      title: "地址",
      width: "auto",
      sort: true, // 使用内置默认排序逻辑
    },{
      field: "date",
      title: "生日",
      width: "auto",
      sort: true, // 使用内置默认排序逻辑
    },{
      field: "status",
      title: "状态",
      width: "auto",
      sort: true, // 使用内置默认排序逻辑
    },{
      field: "remark",
      title: "备注",
      width: "auto",
      sort: true, // 使用内置默认排序逻辑
    },{
      field: "score",
      title: "评分",
      width: "auto",
      sort: true, // 使用内置默认排序逻辑
      summaryFun: (value)=>{
        return Math.round(value) + "（分）";
      }, // 使用内置默认合计逻辑
      
    }
  
  ];

  console.log(ref,58)

  return <div>
            <Button 
              onClick={()=>{
                ref.current.exportExcel('晁阳测试')
              }}>导出</Button>
            <CyTable
              style={{
                width: '100%',
                height: '400px',
              }}
              dataSource={dataSource?.list}
              columns={columns}
              theme={'DARK'}
              options={{
                frozenColCount:3,
                bottomFrozenRowCount:1
              }}
              onMount={(tableInstance,exportExcel)=>{
                console.log(tableInstance)
                ref.current={
                  tableInstance,
                  exportExcel
                }
              }}
            />
  </div>  
}

```
