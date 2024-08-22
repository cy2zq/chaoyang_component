import { type FC } from 'react';
import CarouselList from './CarouselList';
import './index.less';
const Foo: FC<{ type: any }> = (props) => {
  return (
    <div style={props.style}>
      {props?.type ? (
        <div
          style={{
            width: 477,
            height: 600,
            overflow: 'hidden',
            background: '#04102A',
          }}
        >
          ddd
          {/*<List />*/}
        </div>
      ) : (
        <div
          style={{
            width: 477,
            height: 600,
            overflow: 'hidden',
            background: '#04102A',
          }}
        >
          <CarouselList />
        </div>
      )}
    </div>
  );
};

export default Foo;
