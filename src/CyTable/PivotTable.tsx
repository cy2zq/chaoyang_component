import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd';
import * as VTable from '@visactor/vtable';
import { downloadExcel, exportVTableToExcel } from '@visactor/vtable-export';
import { Checkbox, Popover } from 'antd';
import { FC, useCallback, useEffect, useRef, useState } from 'react';

// 定义列和数据项的基本类型
interface Column {
  field: string;
  title: string;
  [key: string]: any;
}

interface ColumnItem extends Column {
  checked: boolean;
}

interface IProps<T> {
  columns: Column[];
  dataSource: T[];
  options?: Partial<VTable.PivotTableConstructorOptions>;
  theme?: keyof typeof VTable.themes;
  onMount?: (
    tableInstance: VTable.PivotTable,
    exportExcel: (title: string, excelOption?: any) => void,
  ) => void;
  [key: string]: any; // 允许其他任意 props
}

const Index: FC<IProps<any>> = (props) => {
  const { columns, dataSource, options, theme = 'DEFAULT', onMount, ...rest } = props;

  console.log(dataSource, 111);

  const [items, setItems] = useState<ColumnItem[]>(
    () =>
      columns?.map((item) => ({
        ...item,
        checked: true,
      })) || [],
  );

  const tableInstanceRef = useRef<VTable.PivotTable | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination } = result;
      if (!destination) {
        return;
      }
      const reorder = (list: ColumnItem[], startIndex: number, endIndex: number) => {
        const resultList = Array.from(list);
        const [removed] = resultList.splice(startIndex, 1);
        resultList.splice(endIndex, 0, removed);
        return resultList;
      };
      const newItems = reorder(items, source.index, destination.index);
      setItems(newItems);
    },
    [items],
  );

  const exportExcel = useCallback(
    async (
      title: string,
      excelOption: any = {
        excelJSWorksheetCallback: (worksheet: any) => {
          worksheet.views = [{ state: 'frozen', xSplit: 3, ySplit: 2 }];
          worksheet.name = 'cy';
        },
        ignoreIcon: true,
      },
    ) => {
      if (tableInstanceRef.current) {
        const excelData = await exportVTableToExcel(tableInstanceRef.current, excelOption);
        downloadExcel(excelData, title);
      }
    },
    [],
  );

  useEffect(() => {
    if (!ref.current) return;

    const option: VTable.PivotTableConstructorOptions = {
      records: dataSource,
      indicators: items?.filter((e) => e.checked) as any[],
      container: ref.current,
      corner: {
        titleOnDimension: 'row',
        headerStyle: {},
      },
      overscrollBehavior: 'none',
      widthMode: 'standard',
      keyboardOptions: {
        moveEditCellOnArrowKeys: true,
        copySelected: true,
        pasteValueToCell: true,
      },
      editor: '',
      dragHeaderMode: 'all',
      select: {
        highlightMode: 'cross',
      },
      tooltip: {
        isShowOverflowTextTooltip: true,
      },
      theme: (VTable.themes as any)[theme],
      ...options,
    };

    const tableInstance = new VTable.PivotTable(option);
    tableInstanceRef.current = tableInstance;

    if (onMount) {
      onMount(tableInstance, exportExcel);
    }

    return () => {
      tableInstance.release();
      tableInstanceRef.current = null;
    };
  }, [dataSource, items, options, theme, onMount, exportExcel]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-start', padding: '10px 0' }}>
        <Popover content={<div>导出excel</div>} placement="bottomRight" title={'导出'}>
          <span
            className={'fas fa-file-archive'}
            onClick={() => exportExcel('cy_test')}
            style={{ fontSize: 22, cursor: 'pointer' }}
          ></span>
        </Popover>
        <Popover
          content={
            <Checkbox.Group
              value={items?.filter((e) => e.checked).map((item) => item.field)}
              onChange={(checkedValues) => {
                setItems(
                  items.map((item) => ({
                    ...item,
                    checked: checkedValues.includes(item.field),
                  })),
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
                              <div style={{ fontSize: 18, userSelect: 'none' }}>
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
          <span
            className={'fas fa-cog'}
            style={{ fontSize: 22, marginLeft: 10, cursor: 'pointer' }}
          ></span>
        </Popover>
      </div>
      <div ref={ref} {...rest} />
    </div>
  );
};

export default Index;
