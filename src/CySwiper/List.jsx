import { useEffect, useState } from "react";
import ReactEcharts from "echarts-for-react";
const BarList = (props) => {
  const [option, setOption] = useState({});
  let isProfit = props.name === "实现利润总额";
  let isCashRate = props.name === "营业现金比率";
  let isTotal = props.name == "综合得分";
  //按照数值排序
  let result =
    props?.data?.map((item, index) => {
      let showValue = item?.value + "%";
      if (isTotal) {
        showValue = item?.value;
      }
      let value = item.value;
      if (item?.value < 0) {
        showValue = isProfit
          ? Math.abs(item?.value) / 100
          : Math.abs(item?.value);
        value = Math.abs(item?.value);
      }
      //利润总额 负值显示万元
      if (item?.value < 0 && isProfit) {
        showValue = "-" + showValue + "万元";
        value = 0.1;
      }
      // 营业现金比例
      if (item?.value < 0 && isCashRate) {
        showValue = "-" + showValue + "%";
      }
      if (props?.hideNo) {
        showValue = item?.value;
        if (item?.label) {
          showValue = item?.label;
        }
        if (index == 0) {
          showValue = (props?.firstLabel || "") + showValue;
        }
      }
      return {
        ...item,
        showValue,
        value,
      };
    }) || [];
  let max = result?.[0]?.value > 100 ? result?.[0]?.value : 100;
  let typeColor = props.type === "bottom" ? "#E24A3B" : "#11d8ff";
  let typeColorStart = props.type === "bottom" ? "pink" : "skyblue";
  if (props.type == "topscore") {
    typeColor = "white";
  }

  useEffect(() => {
    //右侧文本
    let rightText = {
      color: typeColor,
      fontSize: 20,
      fontWeight: 700,
    };
    let rightValue = (value, index) => {
      return result?.[index]?.showValue;
    };

    //左侧文本
    const optionNew = {
      animation: true,
      animationThreshold: 10000,
      animationEasing: "elasticOut",
      quadraticIn: function (idx) {
        return idx * idx;
      },
      backgroundColor: "transparent",
      tooltip: {
        show: props?.hideNo ? false : true,
        trigger: "item",
        padding: [8, 0],
        backgroundColor: "rgba(23, 51, 67,1)",
        textStyle: {
          color: "rgba(255, 255, 255, 1)",
        },
      },
      legend: {
        show: false,
      },
      grid: {
        left: "10",
        right: "16",
        top: "10",
        bottom: props.bottom || "0",
      },
      xAxis: [
        {
          splitLine: {
            show: false,
          },
          type: "value",
          show: false,
          // 最大值
          max,
        },
      ],
      yAxis: [
        {
          splitLine: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          type: "category",
          axisTick: {
            show: false,
          },
          inverse: true,
          data: result,
          axisLabel: {
            color: "white",
            // color: "red",
            fontSize: 20,
            margin: 10,
          },
        },
        {
          type: "category",
          inverse: true,
          axisTick: "none",
          axisLine: "none",
          show: true,
          axisLabel: {
            verticalAlign: "bottom",
            align: "right",
            margin: 0,
            padding: [0, 0, 15, 0],
            textStyle: rightText,
            formatter: rightValue,
          },
          data: result,
        },
      ],
      series: [
        {
          name: "",
          type: "bar",
          barWidth: 5, // 柱子宽度
          MaxSize: 0,
          showBackground: true,
          barBorderRadius: [30, 0, 0, 30],
          backgroundStyle: {
            color: "rgba(80, 121, 150, 0.6)",
          },
          label: {
            show: true,
            offset: [10, -25],
            //左侧文本颜色

            color: "white",
            fontWeight: 500,
            fontSize: 20,
            position: "left",
            align: "left",
            formatter: function (params) {
              const id = params.data.name?.split("-")[0];
              const name = params.data.name?.split("-")[1];
              if (props?.hideNo) {
                return name;
              }
              return `{icon1|${id}}` + name;
            },
            rich: {
              icon1: {
                width: 75,
                height: 0,
                padding: [5, 0, 2, 0],
                color: typeColor,
                fontSize: 20,
              },
            },
          },
          data: result.map((item, index) => {
            let sColor = item?.startColor;
            let eColor = item?.bgColor;
            if (props.type !== "topscore") {
              sColor = typeColorStart;
              eColor = typeColor;
            }
            return {
              name: item.name,
              value: item.value,
              itemStyle: {
                barBorderRadius: [30, 0, 0, 30],
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: sColor,
                    },
                    {
                      offset: 1,
                      color: eColor,
                    },
                  ],
                },
              },
            };
          }),
        },
        {
          name: "外圆",
          type: "scatter",
          emphasis: {
            scale: false,
          },
          symbol: "circle",
          symbolSize: [10, 10], // 进度条白点
          itemStyle: {
            barBorderRadius: [30, 0, 0, 30],
            color: "white",
            shadowColor: "rgba(255, 255, 255, 0.5)",
            shadowBlur: 5,
            borderWidth: 1,
            opacity: 1,
          },
          z: 2,
          data: result,
          animationDelay: 500,
        },
        // 进度条的小圆圈
        {
          name: "指标",
          type: "scatter",
          emphasis: {
            scale: false,
          },
          symbol:
            "image://data:image/png;base64,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",
          symbolSize: [20, 20],
          itemStyle: {
            color: typeColor,
            shadowColor: "rgba(255, 255, 255, 1)",
            shadowBlur: 5,
            borderWidth: 1,
            opacity: 1,
          },
          z: 2,
          zlevel: 10,
          data: result,
          animationDelay: 500,
        },
        //流光动画
        // {
        //   type: "lines",
        //   coordinateSystem: "cartesian2d",
        //   data: result.map((item, index) => {
        //     return {
        //       coords: [
        //         [0, index],
        //         [item?.value - 4, index],
        //       ],
        //     };
        //   }),
        //   effect: {
        //     show: true,
        //     period: 2.5,
        //     trailLength: 0.5,
        //     symbolSize: 14,
        //     symbol: "pin",
        //     loop: true,
        //     color: typeColor,
        //   },
        //   lineStyle: {
        //     width: 0,
        //     opacity: 0.6,
        //     curveness: 0,
        //   },
        //   z: 99,
        // },
      ],
    };
    setOption(optionNew);
  }, [props.name, props.data]);

  return (
    <ReactEcharts
      option={option}
      theme="Imooc"
      style={{ height: props.height || "250px" }}
    />
  );
};

export default BarList;
