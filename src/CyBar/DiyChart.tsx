import ReactEcharts from 'echarts-for-react';
import { useEffect, useRef } from 'react';

const BarList = (props: any) => {
  const echartRef = useRef(null);

  useEffect(() => {
    // 强制 ECharts 实例在组件挂载或数据更新后重新计算尺寸
    if (echartRef.current) {
      const echartInstance = echartRef.current.getEchartsInstance();
      setTimeout(() => {
        echartInstance.resize();
      }, 100); // 使用一个小的延迟确保容器尺寸已经计算完毕
    }
  }, [props.options]);

  return (
    <ReactEcharts
      ref={echartRef}
      option={props.options}
      notMerge={true}
      lazyUpdate={true}
      style={{ height: '100%', width: '100%' }}
      {...props}
    />
  );
};

export default BarList;
