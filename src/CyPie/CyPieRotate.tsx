import { Progress } from 'antd';
import styles from './index.module.less';
function CyPieRotate(props: any) {
  const { data, title } = props;

  return (
    <div className={styles.content1}>
      <div className={styles.count1}></div>
      <span className={styles.count2}></span>
      <div className={styles.count3}>
        <Progress
          trailColor={'transparent'}
          type="dashboard"
          steps={8}
          showInfo={false}
          percent={data}
          strokeColor={'#5FE9EF'}
          className={styles.progress}
          style={{
            width: '261px',
            height: '261px',
          }}
          strokeWidth={5}
          size={261}
        />
      </div>
      <div className={styles.count4}>
        <div>{data}%</div>
        <div
          style={{
            fontSize: 24,
          }}
        >
          {title}
        </div>
      </div>
    </div>
  );
}

export default CyPieRotate;
