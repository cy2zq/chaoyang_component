import TreeBtn from 'chaoyang_component/CyBtn/TreeBtn';
import './wood.less';

function Index(props: any) {
  let cy01 = (
    <div className="toggles-container">
      <div className="toggle-container a">
        <input className="toggle-input" type="checkbox" />
        <div className="toggle-handle"></div>
        <svg className="toggle-icon" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.7072 5.70718L7.00008 11.4143L3.29297 7.70718L4.70718 6.29297L7.00008 8.58586L11.293 4.29297L12.7072 5.70718Z"></path>
        </svg>
        <svg className="toggle-icon" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.58594 8.00015L4.29297 5.70718L5.70718 4.29297L8.00015 6.58594L10.2931 4.29297L11.7073 5.70718L9.41436 8.00015L11.7072 10.293L10.293 11.7072L8.00015 9.41436L5.70733 11.7072L4.29312 10.293L6.58594 8.00015Z"></path>
        </svg>
      </div>
    </div>
  );
  let cy02 = (
    <div className="toggle-container b">
      <input className="toggle-input" type="checkbox" />
      <div className="toggle-handle">
        <div className="toggle-handle-dot"></div>
        <div className="toggle-handle-dot"></div>
        <div className="toggle-handle-dot"></div>
        <div className="toggle-handle-dot"></div>
        <div className="toggle-handle-dot"></div>
        <div className="toggle-handle-dot"></div>
      </div>
      <p className="toggle-text off" aria-hidden="true">
        OFF
      </p>
      <p className="toggle-text on" aria-hidden="true">
        ON
      </p>
    </div>
  );

  let cy03 = (
    <div className="toggle-container c">
      <input className="toggle-input" type="checkbox" />
      <p className="toggle-text" aria-hidden="true">
        OFF
      </p>
      <div className="toggle-track-wrapper-wrapper">
        <div className="toggle-handle"></div>
        <div className="toggle-track-wrapper">
          <div className="toggle-track"></div>
        </div>
      </div>
      <p className="toggle-text" aria-hidden="true">
        ON
      </p>
    </div>
  );
  let cy04 = (
    <div className="toggle-container d">
      <input className="toggle-input" type="checkbox" />
      <div className="toggle-handle">
        <p className="toggle-text off">OFF</p>
        <p className="toggle-text on">ON</p>
      </div>
    </div>
  );
  let cy05 = (
    <button>
      <span className="text">{props.text}</span>
      <span className="shimmer"></span>
    </button>
  );

  let btnList = {
    cy01,
    cy02,
    cy03,
    cy04,
    cy05,
  };
  let type = props.type || 'cy01';
  if (type == 'cy06') {
    return <TreeBtn {...props} />;
  }
  return (
    <div className={'cy01 cy02'}>
      <div className="toggles-grid">
        <div className="toggles-container">{btnList[type]}</div>
      </div>
    </div>
  );
}

export default Index;
