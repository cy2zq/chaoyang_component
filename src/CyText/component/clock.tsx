/*
 * 翻牌时钟
 * @author： 兔子先生
 * @createDate: 2019-11-24
 */
import { Component } from 'react';
import Flipper from './flip';
import './index.less';

class FlipClock extends Component {
  constructor(props) {
    super(props);
    this.timer = null;
    this.flipObjs = [];
    this.str = [];
  }

  render() {
    return (
      <div className="FlipClock">
        <Flipper ref="flipper1" />
        <Flipper ref="flipperHour1" />
        <Flipper ref="flipperHour2" />
        <em>,</em>
        <Flipper ref="flipperMinute1" />
        <Flipper ref="flipperMinute2" />
        <Flipper ref="flipperSecond1" />
        <Flipper ref="flipperSecond2" />
        {/*<Flipper ref="flippera1" />*/}
        {/*<Flipper ref="flippera2" />*/}
        {/*<Flipper ref="flippera3" />*/}
      </div>
    );
  }

  componentDidMount() {
    this.flipObjs = [
      this.refs.flipper1,
      this.refs.flipperHour1,
      this.refs.flipperHour2,
      this.refs.flipperMinute1,
      this.refs.flipperMinute2,
      this.refs.flipperSecond1,
      this.refs.flipperSecond2,
      // this.refs.flippera1,
      // this.refs.flippera2,
      // this.refs.flippera3,
    ];
    this.init();
    this.run();
  }

  // 初始化数字
  init() {
    let str = this.getData();
    for (let i = 0; i < this.flipObjs.length; i++) {
      this.flipObjs[i].setFront(str[i]);
    }
  }
  getData() {
    let randomNumber = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(7, '0');
    let str = randomNumber.toString()?.split('');
    this.setState({
      str,
    });
    return str;
  }
  // 开始计时
  run() {
    this.timer = setInterval(() => {
      let str = this.getData();
      console.log(str, 76);
      for (let i = 0; i < this.flipObjs.length; i++) {
        if (this.state.str[i] === str[i]) {
          continue;
        }

        this.flipObjs[i].flipDown(this.state.str[i], str[i]);
      }
    }, 3000);
  }
  // 正则格式化日期
  formatDate(date, dateFormat) {
    /* 单独格式化年份，根据y的字符数量输出年份
   * 例如：yyyy => 2019
          yy => 19
          y => 9
   */
    if (/(y+)/.test(dateFormat)) {
      dateFormat = dateFormat.replace(
        RegExp.$1,
        (date.getFullYear() + '').substr(4 - RegExp.$1.length),
      );
    }
    // 格式化月、日、时、分、秒
    let o = {
      'm+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'i+': date.getMinutes(),
      's+': date.getSeconds(),
    };
    for (let k in o) {
      if (new RegExp(`(${k})`).test(dateFormat)) {
        // 取出对应的值
        let str = o[k] + '';
        /* 根据设置的格式，输出对应的字符
         * 例如: 早上8时，hh => 08，h => 8
         * 但是，当数字>=10时，无论格式为一位还是多位，不做截取，这是与年份格式化不一致的地方
         * 例如: 下午15时，hh => 15, h => 15
         */
        dateFormat = dateFormat.replace(
          RegExp.$1,
          RegExp.$1.length === 1 ? str : this.padLeftZero(str),
        );
      }
    }
    return dateFormat;
  }
  // 日期时间补零
  padLeftZero(str) {
    return ('00' + str).substr(str.length);
  }
}
export default FlipClock;
