import styels from './index.module.less';

function Index(props: any) {
  let type = props.type || 'parentBtn1';
  let style = props.color
    ? {
        filter: `drop-shadow(0px 0px ${props.color.parentColor})`,
        backgroundColor: props.color.btnColor,
      }
    : {};
  return (
    <div>
      <div className={styels[type]}>
        <div style={style} className={styels.btn}>
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default Index;
