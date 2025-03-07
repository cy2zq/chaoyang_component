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
            ySplit: 1,
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
      records: dataSource || [{ id: 'cytest' }],
      rows: [],
      columns: items
        ?.filter((e) => e?.checked)
        ?.map((item) => {
          if (item?.summaryFun) {
            let type = item?.summaryFunType || 'SUM';
            return {
              ...item,
              aggregation: {
                aggregationType: VTable.TYPES.AggregationType[type],
                formatFun: item?.summaryFun,
              },
            };
          }
          return {
            ...item,
          };
        }),
      overscrollBehavior: 'none',
      widthMode: 'standard',
      // pagination: {
      //   perPageCount: 100,
      //   currentPage: 1,
      // },
      aggregation(args) {
        if (args.col === 0) {
          return [
            {
              aggregationType: VTable.TYPES.AggregationType.NONE,
              showOnTop: false,
              formatFun(value) {
                return '汇总';
              },
            },
          ];
        }
        return null;
      },
      // theme: VTable.themes.DEFAULT.extends({
      //   bottomFrozenStyle: {
      //     // bgColor: "#ECF1F5",
      //     borderLineWidth: [1, 1, 1, 1],
      //     // borderColor: ["gray"],
      //   },
      // }),
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

      rowSeriesNumber: {
        title: '序号',
        dragOrder: true,
        width: 'auto',
        // headerStyle: {
        //   color: 'black',
        // },
        // style: {
        //   color: 'black',
        // },
      },

      tooltip: {
        isShowOverflowTextTooltip: true, //溢出文本提示
      },
      theme: VTable.themes[theme],
      ...options,
    };
    tableInstance = new VTable.ListTable(ref.current, option);

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
