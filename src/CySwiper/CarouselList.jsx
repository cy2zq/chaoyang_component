/*
 * @Description: 描述
 * @Author: cy
 * @Date: 2024/6/5
 */
import { Progress } from 'antd';
import { useEffect } from 'react';
import styles from './index.module.less';

const CarouselList = (props) => {
  const { data } = props;
  const twoColors = {
    '0%': 'skyblue',
    // "100%": "#00D5FF",
    '100%': '#11d8ff',
  };
  useEffect(() => {
    if (Swiper) {
      var mySwiper = new Swiper('.swiper1', {
        mousewheel: true,
        direction: 'vertical', // 垂直切换选项
        loop: true, // 循环模式选项
        loopPreventsSlide: true, //当swiper 正在过渡时，阻止slide 前进后退的切换操作
        observer: true,
        observeParents: true,
        slidesPerView: 10, //swiper容器同时展示的元素数量
        spaceBetween: 10, //元素之间间隔距离
        speed: 1000, //slider自动滑动开始到结束的时间
        // autoplay: false,
        autoplay: {
          //开启自动切换
          delay: 10, //自动切换的时间间隔
          stopOnLastSlide: false, //当切换到最后一个slide时停止自动切换
          disableOnInteraction: false, //用户操作swiper之后，是否停止自动切换效果
        },
      });
      // 监听鼠标移入事件
      document.querySelector('.swiper1').addEventListener('mouseenter', function () {
        // 改变Swiper的速度为500ms
        mySwiper.params.speed = 20; // 更新Swiper的speed参数
        mySwiper.autoplay.stop();
      });

      // 监听鼠标移出事件
      document.querySelector('.swiper1').addEventListener('mouseleave', function () {
        // 恢复Swiper的速度为400ms
        mySwiper.params.speed = 1000; // 更新Swiper的speed参数
        mySwiper.autoplay.start();
      });
    }
  }, []);
  return (
    <div>
      <div
        className="swiper1"
        style={{
          height: 600,
          overflow: 'hidden',
        }}
      >
        <div className={styles.swiperWrapper + ' ' + 'swiper-wrapper'}>
          {data?.map((item) => {
            var randomInt = Math.floor(Math.random() * 101);

            let left = (randomInt * 48) / 5 + 21;
            return (
              <div
                className="swiper-slide"
                style={{
                  padding: '16px 0 16px 24px',
                }}
              >
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 12,
                    background: 'white',
                    left: left + 'px',
                    position: 'absolute',
                    top: 53,
                    zIndex: 999999,
                    boxShadow: '0px 0px 12px  #CCEAFF',
                  }}
                />
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingRight: 46,
                    fontSize: 20,
                    color: 'white',
                  }}
                >
                  <span>{item}</span>
                  <span style={{ color: '#11d8ff' }}>{randomInt}%</span>
                </div>
                <Progress
                  style={{ width: '100%' }}
                  strokeColor={twoColors}
                  percent={randomInt}
                  format={() => null}
                  // status="active"
                  trailColor={'rgba(80, 121, 150, 0.6)'}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CarouselList;
