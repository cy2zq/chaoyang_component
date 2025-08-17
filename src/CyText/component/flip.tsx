/*
 * 翻牌数字
 * @author： 兔子先生
 * @createDate: 2019-11-24
 */
import React, { useState, forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import './index.less';

// 定义 Props 类型
interface IProps {
  frontText?: string | number;
  backText?: string | number;
  duration?: number;
}

// 定义暴露给父组件的 Ref 类型
export interface FlipperInstance {
  setFront: (text: string | number) => void;
  flipDown: (front: string | number, back: string | number) => void;
  flipUp: (front: string | number, back: string | number) => void;
}

const Flipper = forwardRef<FlipperInstance, IProps>(
  ({ frontText: initialFrontText = 0, backText: initialBackText = 1, duration = 600 }, ref) => {
    const [isFlipping, setIsFlipping] = useState(false);
    const [flipType, setFlipType] = useState('down');
    const [frontText, setFrontText] = useState(initialFrontText);
    const [backText, setBackText] = useState(initialBackText);

    const timer = useRef<NodeJS.Timeout | null>(null);

    // 清理定时器以防组件卸载时内存泄漏
    useEffect(() => {
      return () => {
        if (timer.current) {
          clearTimeout(timer.current);
        }
      };
    }, []);

    const _textClass = (number: string | number) => {
      return 'number' + number;
    };

    const _flip = (type: 'down' | 'up', front: string | number, back: string | number) => {
      if (isFlipping) {
        return;
      }
      setFrontText(front);
      setBackText(back);
      setFlipType(type);
      setIsFlipping(true);

      timer.current = setTimeout(() => {
        setIsFlipping(false);
        setFrontText(back);
      }, duration);
    };

    // 使用 useImperativeHandle 暴露方法给父组件
    useImperativeHandle(ref, () => ({
      setFront: (text: string | number) => {
        setFrontText(text);
      },
      flipDown: (front: string | number, back: string | number) => {
        _flip('down', front, back);
      },
      flipUp: (front: string | number, back: string | number) => {
        _flip('up', front, back);
      },
    }));

    const containerClass = ['M-Flipper', flipType, isFlipping ? 'go' : ''].join(' ');
    const frontClass = `digital front ${_textClass(frontText)}`;
    const backClass = `digital back ${_textClass(backText)}`;

    return (
      <div className={containerClass}>
        <div className={frontClass}></div>
        <div className={backClass}></div>
      </div>
    );
  },
);

Flipper.displayName = 'Flipper';

export default Flipper;
