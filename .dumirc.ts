import { defineConfig } from 'dumi';
import { homepage } from './package.json';

const isProd = process.env.NODE_ENV === 'production';
// 不是预览模式 同时是生产环境
// const isProdSite = process.env.PREVIEW !== '1' && isProd;
const isProdSite = false;
const name = 'chaoyang_component';

export default defineConfig({
  themeConfig: {
    name,
    github: homepage,
    footer: false,
    logo: 'https://images.cy-zq.cn/logo/Google/cy11.png',
    lastUpdated: false,
  },
  styles: [`/css/swiper-bundle.min.css`],
  headScripts: [
    {
      src: `/js/echarts.min.js`,
      defer: true,
    },
    {
      src: `/js/swiper-bundle.min.js`,
      defer: true,
    },
    {
      src: `/js/echarts-gl.min.js`,
      defer: true,
    },
    {
      src: `/js/jquery-3.7.1.js`,
      defer: true,
    },
    `if (window.$) {
      console.log('jQuery is already bound to window object.');
    } else {
      // 如果没有绑定，则绑定 jQuery
      window.$ = window.jQuery;
      console.log('jQuery has been bound to window object.');
    }`,

    {
      src: `https://www.googletagmanager.com/gtag/js?id=G-FQJ1Q67QZY`,
      async: true,
    },
    ` window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-FQJ1Q67QZY');`,
  ],
  links: [
    {
      rel: 'icon',
      href: 'https://images.cy-zq.cn/logo/Google/cy11.png',
    },
    {
      rel: 'stylesheet',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css',
    },
    {
      rel: 'stylesheet',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css',
    },
  ],

  base: isProdSite ? `/${name}/` : '/',
  publicPath: isProdSite ? `/${name}/` : '/',
  html2sketch: {},
  mfsu: false,
  outputPath: 'myComponent',
  jsMinifier: 'terser', //支持async异步的build
});
