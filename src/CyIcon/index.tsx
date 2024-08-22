import { type FC } from 'react';
import './index.less';
const Foo: FC<{ text: any; iconClass: any; style: any; color: any }> = (props) => {
  let textStyle = {
    color: props.color || '#1da1f2',
    borderColor: props.color || '#1da1f2',
  };
  return (
    <div className={'icons'} style={props.style}>
      <a href="#">
        <div className="layer" style={textStyle}>
          <span style={textStyle}></span>
          <span style={textStyle}></span>
          <span style={textStyle}></span>
          <span style={textStyle}></span>
          <span className={props.iconClass} style={textStyle}></span>
        </div>
        <div className="text" style={textStyle}>
          {props.text}
        </div>
      </a>
    </div>
  );
};

export default Foo;
