import ReactEcharts from 'echarts-for-react';
const BarList = (props: any) => {
  return <ReactEcharts option={props.options} {...props} />;
};

export default BarList;
