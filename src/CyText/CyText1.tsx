import styles from './index.module.less';

function CyText1(props) {
  const { title } = props;
  return (
    <h1 contentEditable="true" className={styles.cy_text1}>
      {title}
    </h1>
  );
}

export default CyText1;
