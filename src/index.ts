import { EasyAntdModalProvider, useEasyAntdModal } from './context';
import DragModal from './drag-modal';
import Drawer from './drawer';
import Modal from './modal';
export { default as CyBar } from './CyBar';
export { default as DiyChart } from './CyBar/DiyChart';
export { default as CyBtn } from './CyBtn';
export { default as CyTag } from './CyBtn/Btn';
export { default as CyWoodBtn } from './CyBtn/WoodBtn';
export { default as CyIcon } from './CyIcon';
export { default as CyPie } from './CyPie';
export { default as CyPie2d } from './CyPie/CyPie2d';
export { default as CyPieRotate } from './CyPie/CyPieRotate';
export { default as CyPieSvg } from './CyPie/CyPieSvg';
export { default as CySwiper } from './CySwiper';
export { default as CyText } from './CyText';
export { default as CyText1 } from './CyText/CyText1';
export { default as CyFlip } from './CyText/component/clock';
export { default as TypewriterCY } from './TypewriterCY';
export { default as ModalBg } from './drag-modal/ModalBg';

//表格-基于@visactor/vtable

export { default as CyTable } from './CyTable';

export * from './hooks';
export * from './types';
export * from './util';

export * from './drag-modal';
export * from './drawer';
export * from './modal';

export {
  DragModal,
  Drawer,
  EasyAntdModalProvider,
  Modal,
  // ====== Hooks ======
  useEasyAntdModal,
};

export default Modal;

// export * as AntdMobile from './mobile';
export const Antd = {
  Modal,
  Drawer,
};
