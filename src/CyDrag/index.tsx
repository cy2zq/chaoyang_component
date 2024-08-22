import { type FC } from 'react';
import Board from './component/Board.jsx';
import './index.less';
const Foo: FC<{ text: any; iconClass: any; style: any; color: any }> = (props) => {
  let textStyle = {
    color: props.color || '#1da1f2',
    borderColor: props.color || '#1da1f2',
  };
  return (
    <div
      style={{
        // overFlow: 'scroll',
        width: '100%',
        height: 500,
        background: 'repeating-linear-gradient(45deg, black, transparent 100px)',
      }}
    >
      <Board />
    </div>
  );
};

export default Foo;
