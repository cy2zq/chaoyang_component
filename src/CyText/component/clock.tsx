/*
 * 翻牌时钟
 * @author： 兔子先生
 * @createDate: 2019-11-24
 */
import React, { FC, useEffect, useRef } from 'react';
import Flipper from './flip';
import './index.less';

// 为 Flipper 组件实例定义一个类型接口
interface FlipperInstance {
  setFront: (char: string) => void;
  flipDown: (from: string, to: string) => void;
}

// 日期时间补零
const padLeftZero = (str: string): string => {
  return ('00' + str).substr(str.length);
};

// 正则格式化日期
const formatDate = (date: Date, dateFormat: string): string => {
  let newDateFormat = dateFormat;
  /* 单独格式化年份，根据y的字符数量输出年份
   * 例如：yyyy => 2019
          yy => 19
          y => 9
   */
  if (/(y+)/.test(newDateFormat)) {
    newDateFormat = newDateFormat.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length),
    );
  }
  // 格式化月、日、时、分、秒
  let o: { [key: string]: number } = {
    'm+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'i+': date.getMinutes(),
    's+': date.getSeconds(),
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(newDateFormat)) {
      // 取出对应的值
      let str = o[k] + '';
      newDateFormat = newDateFormat.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str),
      );
    }
  }
  return newDateFormat;
};

const FlipClock: FC = () => {
  const flipperRefs = useRef<(FlipperInstance | null)[]>([]);
  const previousStrRef = useRef<string[]>([]);

  // 获取随机数字字符串
  const getData = (): string[] => {
    const randomNumber = Math.floor(Math.random() * 1000000) // 修正为6位数
      .toString()
      .padStart(6, '0'); // 修正为6位
    return randomNumber.split('');
  };

  useEffect(() => {
    const flipObjs = flipperRefs.current;

    // 初始化数字
    const init = () => {
      const str = getData();
      previousStrRef.current = str;
      for (let i = 0; i < flipObjs.length; i++) {
        flipObjs[i]?.setFront(str[i]);
      }
    };

    // 开始计时
    const run = () => {
      const timer = setInterval(() => {
        const newStr = getData();
        for (let i = 0; i < flipObjs.length; i++) {
          if (previousStrRef.current[i] === newStr[i]) {
            continue;
          }
          flipObjs[i]?.flipDown(previousStrRef.current[i], newStr[i]);
        }
        previousStrRef.current = newStr;
      }, 3000);
      return timer;
    };

    init();
    const timerId = run();

    // 组件卸载时清除定时器
    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <div className="FlipClock">
      <Flipper ref={(el) => (flipperRefs.current[0] = el)} />
      <Flipper ref={(el) => (flipperRefs.current[1] = el)} />
      <Flipper ref={(el) => (flipperRefs.current[2] = el)} />
      <em>,</em>
      <Flipper ref={(el) => (flipperRefs.current[3] = el)} />
      <Flipper ref={(el) => (flipperRefs.current[4] = el)} />
      <Flipper ref={(el) => (flipperRefs.current[5] = el)} />
    </div>
  );
};

export default FlipClock;
