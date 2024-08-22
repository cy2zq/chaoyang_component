import { Button } from 'antd';
import { Drawer } from '../../../src';

export default () => (
  <Drawer trigger={<Button type="primary">Open Drawer</Button>}>
    <h1>I ❤️ antd</h1>
  </Drawer>
);
