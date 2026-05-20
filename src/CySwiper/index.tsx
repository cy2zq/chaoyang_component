import React, { type FC, ReactNode, useEffect, useMemo, useRef } from 'react';
import CustomCarousel, { type CustomCarouselEffect, type ImageItem } from './CustomCarousel';
import './index.less';

// 定义数据项和 Props 的类型
interface DataItem {
  // 这里可以根据您的实际数据结构进行更详细的定义
  [key: string]: any;
}

interface IProps {
  /** 轮播切换的回调函数 */
  afterChange?: (current: number) => void;
  /** 是否自动切换 */
  autoplay?: boolean;
  /** 自动切换的时间间隔，单位为毫秒 */
  autoplaySpeed?: number;
  /** 面板指示点位置，可选 'top', 'bottom', 'left', 'right' */
  dotPosition?: 'top' | 'bottom' | 'left' | 'right';
  /** 是否显示面板指示点 */
  dots?: boolean;
  /** 分页器类型，可选 'bullets', 'fraction', 'progressbar', 'custom' */
  paginationType?: 'bullets' | 'fraction' | 'progressbar' | 'custom';
  /**
   * 动效类型
   * - Swiper 内置：'slide' | 'fade' | 'cube' | 'coverflow' | 'flip' | 'creative' | 'cards'
   * - 自定义：'timeSlice' | 'ripple' | 'matrixRain' | 'codeRain'（同 matrixRain）| 'pixelRain' | 'albumScroll' | 'ringGallery'
   */
  effect?:
    | 'slide'
    | 'fade'
    | 'cube'
    | 'coverflow'
    | 'flip'
    | 'creative'
    | 'cards'
    | 'timeSlice'
    | 'ripple'
    | 'matrixRain'
    | 'codeRain'
    | 'pixelRain'
    | 'albumScroll'
    | 'ringGallery';
  /** 轮播方向，可选 'horizontal', 'vertical' */
  direction?: 'horizontal' | 'vertical';
  /** 是否支持鼠标滚轮 */
  mouseWheel?: boolean;
  /** 组件样式 */
  style?: React.CSSProperties;
  /** 组件高度 */
  height?: string | number;
  /** 子元素 */
  children?: ReactNode;
  /**
   * 自定义特效专用：直接传入图片列表。
   * 不传时，会自动从 children 中递归查找每张 slide 的第一个 <img> 标签。
   */
  images?: ImageItem[];
  /** 自定义特效下是否显示左右切换按钮，默认显示 */
  navButtons?: boolean;
}

// 在 React 子节点树中递归查找第一个 <img>，用于自定义特效自动提取图片
const findFirstImage = (node: ReactNode): ImageItem | null => {
  if (!React.isValidElement(node)) return null;
  const element = node as React.ReactElement<any>;
  if (element.type === 'img') {
    const src = element.props?.src;
    if (typeof src === 'string') {
      return { src, alt: element.props?.alt };
    }
    return null;
  }
  const childChildren = element.props?.children;
  if (Array.isArray(childChildren)) {
    for (const c of childChildren) {
      const found = findFirstImage(c);
      if (found) return found;
    }
    return null;
  }
  if (childChildren) return findFirstImage(childChildren);
  return null;
};

const extractImagesFromChildren = (children: ReactNode): ImageItem[] => {
  const result: ImageItem[] = [];
  React.Children.forEach(children, (child) => {
    const found = findFirstImage(child);
    if (found) result.push(found);
  });
  return result;
};

// 动态加载Swiper脚本和样式
const loadSwiperResources = () => {
  return new Promise<void>((resolve) => {
    // 检查是否已经加载
    if (window.Swiper) {
      resolve();
      return;
    }

    // 加载CSS
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = 'https://unpkg.com/swiper@11/swiper-bundle.min.css';
    document.head.appendChild(linkElement);

    // 加载Animate.css
    const animateLink = document.createElement('link');
    animateLink.rel = 'stylesheet';
    animateLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';
    document.head.appendChild(animateLink);

    // 加载JS
    const scriptElement = document.createElement('script');
    scriptElement.src = 'https://unpkg.com/swiper@11/swiper-bundle.min.js';
    scriptElement.onload = () => resolve();
    document.body.appendChild(scriptElement);
  });
};

const CySwiper: FC<IProps> = ({
  afterChange,
  autoplay = true,
  autoplaySpeed = 3000,
  dotPosition = 'right',
  dots = true,
  paginationType = 'bullets',
  effect = 'slide',
  direction = 'horizontal',
  mouseWheel = true,
  style,
  height,
  children,
  images,
  navButtons = true,
}) => {
  const swiperContainerRef = useRef<HTMLDivElement>(null);
  const swiperInstanceRef = useRef<any>(null);

  const CUSTOM_EFFECTS = new Set<string>([
    'timeSlice',
    'ripple',
    'matrixRain',
    'codeRain',
    'pixelRain',
    'albumScroll',
    'ringGallery',
  ]);
  const isCustomEffect = CUSTOM_EFFECTS.has(effect);

  useEffect(() => {
    if (isCustomEffect) return; // 自定义特效不走 Swiper

    // 加载Swiper资源
    loadSwiperResources().then(() => {
      if (!swiperContainerRef.current || !window.Swiper) return;

      // 销毁已存在的实例
      if (swiperInstanceRef.current) {
        swiperInstanceRef.current.destroy();
      }

      // 设置分页器位置和配置
      let paginationConfig: any = {};
      if (dots) {
        // 基础配置
        paginationConfig = {
          el: '.swiper-pagination',
          clickable: true,
          type: paginationType,
        };

        // 根据位置设置额外属性
        switch (dotPosition) {
          case 'top':
            paginationConfig.position = 'top';
            break;
          case 'bottom':
            paginationConfig.position = 'bottom';
            break;
          case 'left':
            paginationConfig.position = 'left';
            break;
          case 'right':
            paginationConfig.position = 'right';
            break;
          default:
            paginationConfig.position = 'right';
        }
      }

      // 创建Swiper实例
      const swiperOptions = {
        direction: direction === 'vertical' ? 'vertical' : 'horizontal',
        loop: true,
        effect,
        autoplay: autoplay
          ? {
              delay: autoplaySpeed,
              disableOnInteraction: false,
            }
          : false,
        mousewheel: mouseWheel,
        speed: 1000,
        slidesPerView: 1,
        spaceBetween: 0,
        pagination: dots ? paginationConfig : false,
        // 特殊效果的额外配置
        ...(effect === 'cube' && {
          cubeEffect: {
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94,
          },
        }),
        ...(effect === 'coverflow' && {
          coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          },
        }),
        ...(effect === 'flip' && {
          flipEffect: {
            slideShadows: true,
          },
        }),
        ...(effect === 'creative' && {
          creativeEffect: {
            prev: {
              shadow: true,
              translate: [0, 0, -400],
            },
            next: {
              translate: ['100%', 0, 0],
            },
          },
        }),
        ...(effect === 'cards' && {
          cardsEffect: {
            slideShadows: true,
          },
        }),
        on: {
          // 鼠标移入事件
          mouseenter: function () {
            if (swiperInstanceRef.current && autoplay) {
              swiperInstanceRef.current.autoplay.stop();
            }
          },
          // 鼠标移出事件
          mouseleave: function () {
            if (swiperInstanceRef.current && autoplay) {
              swiperInstanceRef.current.autoplay.start();
            }
          },
          // 切换后回调
          slideChangeTransitionEnd: function () {
            if (swiperInstanceRef.current) {
              const currentIndex = swiperInstanceRef.current.realIndex;

              // 处理动画元素
              const activeSlide =
                swiperInstanceRef.current.slides[swiperInstanceRef.current.activeIndex];
              if (activeSlide) {
                const elements = activeSlide.querySelectorAll('.animate__animated');
                elements.forEach((el: Element) => {
                  // 重置动画
                  el.classList.forEach((className) => {
                    if (className.startsWith('animate__') && className !== 'animate__animated') {
                      el.classList.remove(className);
                    }
                  });

                  // 根据元素类型添加不同的动画
                  if (el.tagName === 'H2' || el.tagName === 'H3') {
                    el.classList.add('animate__fadeInDown');
                  } else if (el.tagName === 'IMG') {
                    el.classList.add('animate__fadeIn');
                  } else if (el.tagName === 'P') {
                    el.classList.add('animate__fadeInUp');
                  } else {
                    el.classList.add('animate__fadeIn');
                  }
                });
              }

              if (afterChange) {
                afterChange(currentIndex);
              }
            }
          },
        },
      };

      // 初始化Swiper
      swiperInstanceRef.current = new window.Swiper(swiperContainerRef.current, swiperOptions);

      // 初始化后触发第一个幻灯片的动画
      setTimeout(() => {
        const activeSlide = swiperInstanceRef.current.slides[swiperInstanceRef.current.activeIndex];
        if (activeSlide) {
          const elements = activeSlide.querySelectorAll('.animate__animated');
          elements.forEach((el: Element) => {
            // 根据元素类型添加不同的动画
            if (el.tagName === 'H2' || el.tagName === 'H3') {
              el.classList.add('animate__fadeInDown');
            } else if (el.tagName === 'IMG') {
              el.classList.add('animate__fadeIn');
            } else if (el.tagName === 'P') {
              el.classList.add('animate__fadeInUp');
            } else {
              el.classList.add('animate__fadeIn');
            }
          });
        }
      }, 100);
    });

    // 组件卸载时销毁Swiper实例
    return () => {
      if (swiperInstanceRef.current) {
        swiperInstanceRef.current.destroy();
        swiperInstanceRef.current = null;
      }
    };
  }, [
    afterChange,
    autoplay,
    autoplaySpeed,
    direction,
    dotPosition,
    dots,
    effect,
    isCustomEffect,
    mouseWheel,
    paginationType,
  ]);

  const containerStyle = {
    height: height || 400,
    ...style,
  };

  // 自定义特效分支：使用独立的 CustomCarousel 组件
  // 用 useMemo 缓存图片列表，避免每次渲染都产生新数组、导致 CustomCarousel 内部反复重新加载图片
  const finalImages = useMemo<ImageItem[]>(() => {
    if (images && images.length > 0) return images;
    return extractImagesFromChildren(children);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    images,
    // children 是 ReactNode，引用变化即视为变化
    children,
  ]);

  if (isCustomEffect) {
    return (
      <CustomCarousel
        effect={effect as CustomCarouselEffect}
        images={finalImages}
        autoplay={autoplay}
        autoplaySpeed={autoplaySpeed}
        height={height || 400}
        dots={dots}
        navButtons={navButtons}
        afterChange={afterChange}
        style={style}
      />
    );
  }

  return (
    <div className="cy-swiper-container" style={containerStyle}>
      <div className="swiper" ref={swiperContainerRef}>
        <div className="swiper-wrapper">
          {React.Children.map(children, (child, index) => (
            <div className="swiper-slide" key={index}>
              {child}
            </div>
          ))}
        </div>
        {dots && <div className="swiper-pagination"></div>}
      </div>
    </div>
  );
};

export default CySwiper;

// 为了TypeScript支持，声明全局Swiper
declare global {
  interface Window {
    Swiper: any;
  }
}
