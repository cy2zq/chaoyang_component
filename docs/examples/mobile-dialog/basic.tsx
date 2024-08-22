import { Button } from 'antd-mobile';
import { Dialog } from '../../../src/mobile';

export default () => (
  <Dialog closeOnMaskClick trigger={<Button color="warning">Open Dialog</Button>}>
    I ❤️ Ant Design Mobile
  </Dialog>
);
