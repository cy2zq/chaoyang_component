import { ConfigProvider, Modal } from 'antd';
import { useState } from 'react';

import { withSize } from 'react-scale-view';
import styles from './index.module.less';

function Index(props) {
  let width = props.width || 800;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div {...props}>
      <div onClick={() => setIsModalOpen(true)}>{props.children}</div>
      <ConfigProvider
        theme={{
          components: {
            Modal: {
              headerBg: 'transparent',
              contentBg: 'transparent',
            },
          },
        }}
      >
        <Modal
          className={styles.modal}
          title={
            <div className={styles.title}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={require('./left_title.png')} />
                {props.title}
              </div>
              <div></div>
            </div>
          }
          closeIcon={
            <span
              style={{
                fontSize: 32,
                color: '#6DBAFF',
                paddingRight: 12,
                paddingTop: 12,
              }}
            >
              x
            </span>
          }
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          transitionName={''}
          width={width}
        >
          {props.content}
        </Modal>
      </ConfigProvider>
    </div>
  );
}

export default withSize(Index);
