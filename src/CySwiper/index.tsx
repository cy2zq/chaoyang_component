import { type FC } from 'react';
import CarouselList from './CarouselList';
import List from './List';
import './index.less';
const Foo: FC<{ type: any; data: any }> = (props) => {
  const { height } = props;
  return (
    <div style={props.style}>
      {props?.type == 'chart' ? (
        <div
          style={{
            width: '100%',
            height,
            overflow: 'hidden',
          }}
        >
          <List data={props?.data} style={props.style} />
        </div>
      ) : (
        <div
          style={{
            width: '100%',
            height,
            overflow: 'hidden',
          }}
        >
          <CarouselList data={props?.data} />
        </div>
      )}
    </div>
  );
};

export default Foo;
