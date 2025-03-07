import * as VTable from '@visactor/vtable';
import { downloadExcel, exportVTableToExcel } from '@visactor/vtable-export';
import { Checkbox, Popover } from 'antd';

import { useEffect, useRef, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

function Index(props) {
  const { columns, dataSource, options, theme = 'DEFAULT', onMount, ...rest } = props;

  const [items, setItems] = useState(
    columns?.map((item) => {
      return {
        ...item,
        checked: true,
      };
    }),
  );
  const reorder = (list, startIndex, endIndex) => {
    const result = list;
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    // 在这里处理拖放后的逻辑

    // 实际应用中，你需要更新状态来反映新排列的items
    console.log(57, result);

    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const _items = reorder(items, source.index, destination.index);
    const newState = [..._items];
    setItems(newState);
  };

  const ref = useRef(null);
  let tableInstance = null;
  const exportExcel = async (
    title,
    excelOption = {
      excelJSWorksheetCallback: (worksheet) => {
        // worksheet.insertRow(1, ["2024年12月——2024年12月项目经营月报"]);
        //
        // worksheet.getCell("A1").font = {
        //   name: "Comic Sans MS",
        //   // family: 4,
        //   size: 26,
        //   bold: true,
        // };

        worksheet.views = [
          {
            state: 'frozen',
            xSplit: 3,
            ySplit: 2,
          },
        ];
        worksheet.name = 'cy';
        // worksheet.mergeCells("A1:K1");
      },
      ignoreIcon: true,
    },
  ) => {
    if (tableInstance) {
      downloadExcel(await exportVTableToExcel(tableInstance, excelOption), title);
    }
  };

  //不知道为何这里不能用async
  // Transforming async generator functions to the configured target environment ("chrome80", "es2015") is not supported yet

  useEffect(() => {
    const option = {
      records: dataSource || [
        { Category: '数量', 城市: '淮北', 项目数: 100, 季度: 1, 年份: 2023 },
        { Category: '数量', 城市: '淮北', 项目数: 101, 季度: 2 },
        { Category: '数量', 城市: '淮北', 项目数: 101, 季度: 3 },
        { Category: '数量', 城市: '淮北', 项目数: 101, 季度: 4 },

        { Category: '数量', 城市: '徐州', 项目数: 100, 季度: 1 },
        { Category: '数量', 城市: '徐州', 项目数: 101, 季度: 2 },
        { Category: '数量', 城市: '徐州', 项目数: 101, 季度: 3 },
        { Category: '数量', 城市: '徐州', 项目数: 101, 季度: 4 },
      ],

      indicators: [
        {
          indicatorKey: '科技创新',
          title: '科技创新',
          width: 'auto',
        },
        {
          indicatorKey: '人才引进',
          title: '人才引进',
          width: 'auto',
        },
        {
          indicatorKey: '高新技术产业',
          title: '高新技术产业',
          width: 'auto',
        },
        {
          indicatorKey: '交通网络',
          title: '交通网络',
          width: 'auto',
        },
        {
          indicatorKey: '供水供电',
          title: '供水供电',
          width: 'auto',
        },
        {
          indicatorKey: '公共设施',
          title: '公共设施',
          width: 'auto',
        },
        {
          indicatorKey: '通信网络',
          title: '通信网络',
          width: 'auto',
        },
        {
          indicatorKey: '人均GDP',
          title: '人均GDP',
          width: 'auto',
        },
        {
          indicatorKey: '就业率‌',
          title: '就业率‌',
          width: 'auto',
        },

        {
          indicatorKey: '产业结构',
          title: '产业结构',
          width: 'auto',
        },

        {
          indicatorKey: '文化教育',
          title: '文化教育',
          width: 'auto',
        },
        {
          indicatorKey: '医疗水平',
          title: '医疗水平',
          width: 'auto',
        },
        {
          indicatorKey: '社会福利',
          title: '社会福利',
          width: 'auto',
        },
        {
          indicatorKey: '治安指数',
          title: '治安指数',
          width: 'auto',
        },

        {
          indicatorKey: '空气质量',
          title: '空气质量',
          width: 'auto',
        },

        {
          indicatorKey: '水质指数',
          title: '水质指数',
          width: 'auto',
        },
        {
          indicatorKey: '噪音污染',
          title: '噪音污染',
          width: 'auto',
        },
        {
          indicatorKey: '‌交通拥堵指数',
          title: '‌交通拥堵指数',
          width: 'auto',
        },

        {
          indicatorKey: '‌生态保护‌',
          title: '‌生态保护‌',
          width: 'auto',
        },
      ],
      corner: {
        titleOnDimension: 'row',
        headerStyle: {
          textStick: true,
        },
      },

      overscrollBehavior: 'none',
      widthMode: 'standard',

      keyboardOptions: {
        moveEditCellOnArrowKeys: true,
        copySelected: true,
        pasteValueToCell: true,
      },
      editor: '', // 配置一个空的编辑器，以遍能粘贴到单元格中
      transpose: false, //是否转置
      dragHeaderMode: 'all',
      select: {
        highlightMode: 'cross', // 可以配置为'cross' 或者 'row' 或者 'column'
      },

      tooltip: {
        isShowOverflowTextTooltip: true, //溢出文本提示
      },
      theme: VTable.themes[theme],
      ...options,
    };
    tableInstance = new VTable.PivotTable(ref.current, option);

    // const { CLICK_CELL } = VTable.ListTable.EVENT_TYPE;
    // tableInstance.on(CLICK_CELL, (...args) => console.log(CLICK_CELL, args));
    // tableInstance.on("mouseenter_cell", (...args) => console.log(args));

    if (onMount) {
      onMount(tableInstance, exportExcel);
    }
  }, [dataSource, items, options, theme]);
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px 0' }}>
        <Popover content={<div>导出excel</div>} placement="bottomRight" title={'导出'}>
          <span
            className={'fas fa-file-archive'}
            onClick={() => exportExcel('cy_test')}
            style={{ fontSize: 22 }}
          ></span>
        </Popover>
        <Popover
          content={
            <Checkbox.Group
              value={items?.filter((e) => e?.checked).map((item) => item.field)}
              onChange={(checkedValues) => {
                console.log(checkedValues);
                setItems(
                  items?.map((item) => {
                    return {
                      ...item,
                      checked: checkedValues.includes(item.field),
                    };
                  }),
                );
              }}
            >
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="example-list">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {items.map((item, index) => (
                        <Draggable key={item.field} draggableId={item.field} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div
                                style={{
                                  fontSize: 18,
                                }}
                              >
                                <i className="fas fa-list" style={{ marginRight: 10 }} />
                                <Checkbox value={item.field}>{item.title}</Checkbox>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </Checkbox.Group>
          }
          placement="bottomRight"
          title={'列设置'}
          trigger="click"
        >
          <span className={'fas fa-cog'} style={{ fontSize: 22, marginLeft: 10 }}></span>
        </Popover>
      </div>
      <div
        ref={ref}
        style={{
          width: '100%',
          height: '300px',
        }}
        {...rest}
      />
    </div>
  );
}

export default Index;
