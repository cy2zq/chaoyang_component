import React, { type FC } from 'react';
import CarouselList from './CarouselList';
import List from './List';
import './index.less';

// 定义数据项和 Props 的类型
interface DataItem {
  // 这里可以根据您的实际数据结构进行更详细的定义
  [key: string]: any;
}

interface IProps {
  type: 'chart' | 'carousel';
  data: DataItem[];
  style?: React.CSSProperties;
  height?: string | number;
}

const Foo: FC<IProps> = ({ type, data, style, height }) => {
  return (
    <div style={style}>
      {type === 'chart' ? (
        <div
          style={{
            width: '100%',
            height,
            overflow: 'hidden',
          }}
        >
          <List data={data} style={style} />
        </div>
      ) : (
        <div
          style={{
            width: '100%',
            height,
            overflow: 'hidden',
          }}
        >
          <CarouselList data={data} />
        </div>
      )}
    </div>
  );
};

export default Foo;
