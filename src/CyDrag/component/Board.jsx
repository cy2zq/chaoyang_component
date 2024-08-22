/*
 * @Description: 描述
 * @Author: cy
 * @Date: 2024/5/14
 */

import styled from '@emotion/styled';
import { Input } from 'antd';
import { useState } from 'react';
import ReactDnd from './work';

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #1890ff;
    background-image: -webkit-linear-gradient(
      45deg,
      hsla(0, 0%, 100%, 0.4) 25%,
      transparent 0,
      transparent 50%,
      hsla(0, 0%, 100%, 0.4) 0,
      hsla(0, 0%, 100%, 0.4) 75%,
      transparent 0,
      transparent
    );
    border-radius: 5px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
    border: 1px solid transparent;
  }

  &::-webkit-scrollbar-button {
    background-color: #4d7fff;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-button:hover {
    background-color: rebeccapurple;
  }
`;
const Board = () => {
  let res = [
    {
      name: '上月',
      id: 'lastMonth',
      list: [
        {
          id: '1',
          title: '11切切',
          date: '2021',
          author: {
            avatarUrl: 'https://avatars.githubusercontent.com/u/40606690?v=4',
            name: 'mylove',
            colors: {
              soft: 'blue',
              hard: 'yellow',
            },
          },
        },
      ],
    },
    {
      name: '本月',
      id: 'month',

      list: [
        {
          id: '2',
          title: 'a',
          date: '2020',
          content: 'ddd',
          author: {
            name: '晁阳',
            avatarUrl: 'https://avatars.githubusercontent.com/u/40606690?v=4',
            colors: {
              soft: 'blue',
              hard: 'yellow',
            },
          },
        },
      ],
    },
    {
      name: '下个月',
      id: 'nextMonth',

      list: [
        {
          id: '3',
          title: '任务名称',
          date: '2020',
          author: {
            name: '晁阳',
            avatarUrl: 'https://avatars.githubusercontent.com/u/40606690?v=4',
            colors: {
              soft: 'blue',
              hard: 'yellow',
            },
          },
        },
        {
          id: '4',
          title: '任务名称',
          date: '2020',
          author: {
            name: '晁阳',
            avatarUrl: 'https://avatars.githubusercontent.com/u/40606690?v=4',
            colors: {
              soft: 'blue',
              hard: 'yellow',
            },
          },
        },
        {
          id: '5',
          title: '任务名称',
          date: '2020',
          author: {
            name: '晁阳',
            avatarUrl: 'https://avatars.githubusercontent.com/u/40606690?v=4',
            colors: {
              soft: 'blue',
              hard: 'yellow',
            },
          },
        },
        {
          id: '6',
          title: '任务名称',
          date: '2020',
          author: {
            name: '晁阳',
            avatarUrl: 'https://avatars.githubusercontent.com/u/40606690?v=4',
            colors: {
              soft: 'blue',
              hard: 'yellow',
            },
          },
        },
        {
          id: '7',
          title: '任务名称',
          date: '2020',
          author: {
            name: '晁阳',
            avatarUrl: 'https://avatars.githubusercontent.com/u/40606690?v=4',
            colors: {
              soft: 'blue',
              hard: 'yellow',
            },
          },
        },
      ],
    },
  ];
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
    <Container>
      <ReactDnd
        withScrollableColumns
        initial={data}
        setData={setData}
        columnKey={'name'}
        addGroup={addGroup}
      />
    </Container>
  );
};

export default Board;
