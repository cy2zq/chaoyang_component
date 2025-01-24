/*
 * @Description: 描述
 * @Author: cy
 * @Date: 2024/5/14
 */

import styled from '@emotion/styled';
import { Input } from 'antd';
import { useState } from 'react';
import ReactDnd from './component/container';

const Container = styled.div`
  width: 100%;
  //height: ${(props) => props?.height}px;
  overflow-y: hidden;
  overflow-x: scroll;
  //&::-webkit-scrollbar {
  //  width: 10px;
  //  height: 10px;
  //}
  //&::-webkit-scrollbar-thumb {
  //  background-color: #1890ff;
  //  background-image: -webkit-linear-gradient(
  //    45deg,
  //    hsla(0, 0%, 100%, 0.4) 25%,
  //    transparent 0,
  //    transparent 50%,
  //    hsla(0, 0%, 100%, 0.4) 0,
  //    hsla(0, 0%, 100%, 0.4) 75%,
  //    transparent 0,
  //    transparent
  //  );
  //  border-radius: 5px;
  //}
  //&::-webkit-scrollbar-track {
  //  background-color: transparent;
  //  border: 1px solid transparent;
  //}
  //
  //&::-webkit-scrollbar-button {
  //  background-color: #4d7fff;
  //  border-radius: 5px;
  //}
  //
  //&::-webkit-scrollbar-button:hover {
  //  background-color: rebeccapurple;
  //}
`;
const Board = (props) => {
  const { data: res } = props;

  const [data, setData] = useState(res);
  const [showEdit, setShowEdit] = useState(false);
  const addGroup = () => {
    return showEdit ? (
      <Input
        placeholder="按enter保存"
        onPressEnter={(e) => {
          let name = e?.target?.value;
          setData([
            ...data,
            {
              name,
              id: new Date().valueOf(),
              list: [],
            },
          ]);
          setShowEdit(false);
          console.log(e, 145);
        }}
      />
    ) : (
      <div onClick={() => setShowEdit(true)}>
        <span>+</span>
        新建分组
      </div>
    );
  };

  return (
    <div
    // style={{
    //   background: `url(${publicPath})`,
    // }}
    >
      <Container>
        <ReactDnd
          withScrollableColumns
          initial={data}
          setData={setData}
          columnKey={'name'}
          addGroup={addGroup}
        />
      </Container>
    </div>
  );
};

export default Board;
