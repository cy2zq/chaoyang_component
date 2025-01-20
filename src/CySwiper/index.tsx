import { type FC } from 'react';
import CarouselList from './CarouselList';
import List from './List';
import './index.less';
const Foo: FC<{ type: any; data: any }> = (props) => {
  return (
    <div style={props.style}>
      {props?.type == 'chart' ? (
        <div
          style={{
            width: '100%',
            height: 600,
            overflow: 'hidden',
            background: '#04102A',
          }}
        >
          <List data={props?.data} />
        </div>
      ) : (
        <div
          style={{
            width: '100%',
            height: 600,
            overflow: 'hidden',
            background: '#04102A',
          }}
        >
          <CarouselList data={props?.data} />
        </div>
      )}
    </div>
  );
};

export default Foo;
