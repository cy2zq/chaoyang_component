import React, { useEffect, useRef, type FC } from 'react';
import './index.less';

// 为 window 对象扩展 jQuery 类型
declare global {
  interface Window {
    $: any;
  }
}

// 定义 props 类型
interface IProps {
  title: React.ReactNode;
  type: 'bubbles' | 'hearts' | 'lines' | 'confetti' | 'fire';
  style?: React.CSSProperties;
  className?: string;
}

const TestCY: FC<IProps> = ({ title, type, ...rest }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const $ = window.$;
    if (!$) {
      console.error('jQuery not found. Please ensure it is loaded globally.');
      return;
    }

    // 扩展 jQuery 的随机数方法
    $.rnd = function (m: number, n: number): number {
      m = parseInt(m.toString(), 10);
      n = parseInt(n.toString(), 10);
      return Math.floor(Math.random() * (n - m + 1)) + m;
    };

    const particleFunctions = {
      bubbles: function (el: JQuery<HTMLElement>) {
        const bubbleCount = (el.width()! / 50) * 10;
        for (let i = 0; i <= bubbleCount; i++) {
          const size = $.rnd(40, 80) / 10;
          el.append(
            `<span class="particle" style="top:${$.rnd(20, 80)}%; left:${$.rnd(
              0,
              95,
            )}%;width:${size}px; height:${size}px;animation-delay: ${$.rnd(0, 30) / 10}s;"></span>`,
          );
        }
      },
      hearts: function (el: JQuery<HTMLElement>) {
        const heartCount = (el.width()! / 50) * 5;
        for (let i = 0; i <= heartCount; i++) {
          const size = $.rnd(60, 120) / 10;
          el.append(
            `<span class="particle" style="top:${$.rnd(20, 80)}%; left:${$.rnd(
              0,
              95,
            )}%;width:${size}px; height:${size}px;animation-delay: ${$.rnd(0, 30) / 10}s;"></span>`,
          );
        }
      },
      lines: function (el: JQuery<HTMLElement>) {
        const lineCount = (el.width()! / 50) * 10;
        for (let i = 0; i <= lineCount; i++) {
          el.append(
            `<span class="particle" style="top:${$.rnd(-30, 30)}%; left:${$.rnd(
              -10,
              110,
            )}%;width:${$.rnd(1, 3)}px; height:${$.rnd(20, 80)}%;animation-delay: -${
              $.rnd(0, 30) / 10
            }s;"></span>`,
          );
        }
      },
      confetti: function (el: JQuery<HTMLElement>) {
        const confettiCount = (el.width()! / 50) * 10;
        for (let i = 0; i <= confettiCount; i++) {
          el.append(
            `<span class="particle c${$.rnd(1, 2)}" style="top:${$.rnd(10, 50)}%; left:${$.rnd(
              0,
              100,
            )}%;width:${$.rnd(6, 8)}px; height:${$.rnd(3, 4)}px;animation-delay: ${
              $.rnd(0, 30) / 10
            }s;"></span>`,
          );
        }
      },
      fire: function (el: JQuery<HTMLElement>) {
        const fireCount = (el.width()! / 50) * 20;
        for (let i = 0; i <= fireCount; i++) {
          const size = $.rnd(8, 12);
          el.append(
            `<span class="particle" style="top:${$.rnd(40, 70)}%; left:${$.rnd(
              -10,
              100,
            )}%;width:${size}px; height:${size}px;animation-delay: ${$.rnd(0, 20) / 10}s;"></span>`,
          );
        }
      },
    };

    const initParticles = () => {
      if (ref.current) {
        const el = $(ref.current);
        // 清理旧的粒子
        el.find('.particle').remove();
        // 根据类型创建新的粒子
        if (particleFunctions[type]) {
          particleFunctions[type](el);
        }
      }
    };

    initParticles();
  }, [type]); // 依赖项为 type，当 type 改变时重新生成粒子

  return (
    <div ref={ref} className={`particletext ${type || 'lines'}`} {...rest}>
      {title}
    </div>
  );
};

export default TestCY;
