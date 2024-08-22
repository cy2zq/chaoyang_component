import { AntdMobile } from '../../src';

import { Dialog, Mask, Modal, Popup } from '../../src/mobile';

describe('antd Mobile', () => {
  it('导出正常', () => {
    expect(AntdMobile).toBeDefined();
    ['Dialog', 'Mask', 'Modal', 'Popup'].forEach((key) => {
      expect(AntdMobile[key as keyof typeof AntdMobile]).toBeDefined();
    });
  });

  it('./mobile 导出正常', () => {
    expect(Dialog).toBeDefined();
    expect(Mask).toBeDefined();
    expect(Modal).toBeDefined();
    expect(Popup).toBeDefined();
  });
});
