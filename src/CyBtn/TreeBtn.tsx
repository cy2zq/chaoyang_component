import './wood.less';

function Index(props: any) {
  return (
    <div className={'cy01 cy02 cy03'}>
      <a className="button" href="#">
        <div className="reflection"></div>
        <div className="snow">
          <div className="snow__inner"></div>
          <div className="snow__inner"></div>
          <div className="snow__inner"></div>
          <div className="snow__inner"></div>
          <div className="snow__inner"></div>
          <div className="snow__inner"></div>
          <div className="snow__inner"></div>
          <div className="snow__inner"></div>
          <div className="snow__inner"></div>
          <div className="snow__inner"></div>
          <div className="snow__inner"></div>
          <div className="snow__inner"></div>
          <div className="snow__inner"></div>
          <div className="snow__inner"></div>
          <div className="snow__inner"></div>
          <div className="snow__inner"></div>
        </div>
        <div className="tree tree--A tree--1">
          <div className="illumination"></div>
          <div className="illumination"></div>
          <div className="illumination"></div>
        </div>
        <div className="tree tree--A tree--2">
          <div className="illumination"></div>
          <div className="illumination"></div>
          <div className="illumination"></div>
        </div>
        <div className="tree tree--B tree--3">
          <div className="illumination"></div>
          <div className="illumination"></div>
          <div className="illumination"></div>
        </div>
        <div className="tree tree--B tree--4">
          <div className="illumination"></div>
          <div className="illumination"></div>
          <div className="illumination"></div>
        </div>
        <div className="tree tree--A tree--5">
          <div className="illumination"></div>
          <div className="illumination"></div>
          <div className="illumination"></div>
        </div>
        <div className="tree tree--A tree--6">
          <div className="illumination"></div>
          <div className="illumination"></div>
          <div className="illumination"></div>
        </div>
        <div className="xmasTree">
          <div className="treeStar"></div>
          <div className="xtLight xtLight--red"></div>
          <div className="xtLight xtLight--green"></div>
          <div className="xtLight xtLight--blue"></div>
        </div>
        <div className="material material--1">
          <div className="xtLight xtLight--red"></div>
          <div className="xtLight xtLight--green"></div>
          <div className="xtLight xtLight--blue"></div>
        </div>
        <div className="material material--2">
          <div className="xtLight xtLight--red"></div>
          <div className="xtLight xtLight--green"></div>
          <div className="xtLight xtLight--blue"></div>
        </div>
        <div className="ground ground--back"></div>
        <span className="text">
          <div className="text__inner--S">{props.text}</div>
          <div className="text__inner--L" style={{ textAlign: 'center' }}>
            {props.desc}
          </div>
        </span>
        <div className="house--TypeC">
          <div className="chimney">
            <div className="smoke"></div>
            <div className="smoke"></div>
            <div className="smoke"></div>
          </div>
          <div className="house__roof">
            <div className="topWindow"></div>
          </div>
          <div className="house__main">
            <div className="door">
              <div className="lease"></div>
            </div>
            <div className="window"></div>
            <div className="window"></div>
            <div className="block block--1"></div>
            <div className="block block--2"></div>
          </div>
          <div className="fence fence--1"></div>
          <div className="fence fence--2"></div>
        </div>
        <div className="ground ground--front"></div>
      </a>
    </div>
  );
}

export default Index;
