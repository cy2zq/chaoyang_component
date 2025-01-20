import * as VTable from '@visactor/vtable';
import { downloadExcel, exportVTableToExcel } from '@visactor/vtable-export';
import { Popover } from 'antd';
import { useEffect, useRef } from 'react';

function Index(props) {
  const { columns, dataSource, options, theme = 'DEFAULT', onMount, ...rest } = props;

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
      columns: columns?.map((item) => {
        if (item?.summaryFun) {
          return {
            ...item,
            aggregation: {
              aggregationType: VTable.TYPES.AggregationType.SUM,
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
  }, [dataSource, columns, options, theme]);
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Popover content={<div>ddd</div>} placement="bottomRight" title={'设置'} trigger="click">
          <span className={'fas fa-cog'} style={{ fontSize: 22, color: 'red' }}></span>
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
