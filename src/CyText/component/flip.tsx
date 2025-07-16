/*
 * 翻牌数字
 * @author： 兔子先生
 * @createDate: 2019-11-24
 */
import { Component } from 'react';

import './index.less';

class Flipper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlipping: false,
      flipType: 'down',
      frontTextFromData: 0,
      backTextFromData: 1,
      // frontTextFromData: props?.frontTextFromData || 0,
      // backTextFromData: props?.backTextFromData || 1,
      // duration: 600,
    };
  }

  render() {
    const { isFlipping, flipType, frontTextFromData, backTextFromData } = this.state;
    return (
      <div className={['M-Flipper', flipType, isFlipping ? 'go' : null].join(' ')}>
        <div className={'digital front ' + this._textClass(frontTextFromData)}></div>
        <div className={'digital back ' + this._textClass(backTextFromData)}></div>
      </div>
    );
  }
  // componentDidMount() {
  //   this.props.onRef(this);
  // }
  // componentDidMount() {
  //   this.flipDown(this.state?.frontTextFromData, this.state?.backTextFromData);
  // }
  test() {
    console.log('test');
  }
  _textClass(number) {
    return 'number' + number;
  }
  _flip(type, front, back) {
    // 如果处于翻转中，则不执行
    if (this.isFlipping) {
      return false;
    }
    this.setState({
      frontTextFromData: front,
      backTextFromData: back,
      // 根据传递过来的type设置翻转方向
      flipType: type,
      // 设置翻转状态为true
      isFlipping: true,
    });
    setTimeout(() => {
      this.setState({
        frontTextFromData: back,
        isFlipping: false,
      });
    }, this.props.duration);
  }
  // 下翻牌
  flipDown(front, back) {
    this._flip('down', front, back);
  }
  // 上翻牌
  flipUp(front, back) {
    this._flip('up', front, back);
  }
  // 设置前牌文字
  setFront(text) {
    this.setState({
      frontTextFromData: text,
    });
  }
  // 设置后牌文字
  setBack(text) {
    this.setState({
      backTextFromData: text,
    });
  }
}

// props默认值
Flipper.defaultProps = {
  // front paper text
  // 前牌文字
  frontText: 0,
  // back paper text
  // 后牌文字
  backText: 1,
  // flipping duration, please be consistent with the CSS animation-duration value.
  // 翻牌动画时间，与CSS中设置的animation-duration保持一致
  duration: 600,
};

export default Flipper;
