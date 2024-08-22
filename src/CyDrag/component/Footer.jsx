/*
 * @Description: 描述
 * @Author: cy
 * @Date: 2024/5/15
 */

import { Button, Checkbox, Input } from 'antd';
import { useState } from 'react';

const { TextArea } = Input;

const Footer = (props) => {
  console.log(props, 12);

  const [showEdit, setShowEdit] = useState(false);
  const [value, setValue] = useState('');

  return (
    <div
      style={{
        width: 240,
        color: 'rgb(170,170,170)',
      }}
    >
      {showEdit ? (
        <div>
          <TextArea
            allowClear
            rows={4}
            placeholder="cytest"
            // value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            style={{
              maxHeight: 100,
            }}
          />
          <div>
            <Checkbox checked={true}>任务</Checkbox>
            <div style={{ marginTop: 8 }}>
              <Button
                type={'primary'}
                style={{ marginRight: 8 }}
                size={'small'}
                onClick={() => {
                  console.log(props, value);
                }}
              >
                确认
              </Button>
              <span style={{ fontSize: 14 }} onClick={() => setShowEdit(false)}>
                取消
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div onClick={() => setShowEdit(true)}>
          <span style={{ fontSize: 22, marginRight: 8 }}>+</span>
          <span>添加新任务</span>
        </div>
      )}
    </div>
  );
};

export default Footer;
