import * as React from 'react';
import styles from './index.module.scss';

const LABEL_LIST = [
  {
    label: '大家好,我是MonkeyWong',
    sublabel: '目前居住在中国上海'
  },
  {
    label: '我是一名前端开发工程师',
    sublabel: '目前工作在平安好医生'
  },
  {
    label: '初恋C++，转角遇到Javascript',
    sublabel: '初恋最甜，Javascript也很棒'
  }
];

class Profile extends React.Component<any, never> {
  onToNext = () => {};

  renderInfo = (label: string, sublabel: string, index: number) => {
    return (
      <div key={`${index}-label`} className={styles.container}>
        <div className={styles.label}>{label}</div>
        <div className={styles.sublabel}>{sublabel}</div>
      </div>
    );
  };

  render() {
    return (
      <div className={`flex flex-center flex-column ${styles.profile}`}>
        {LABEL_LIST.map((item, index) => {
          return this.renderInfo(item.label, item.sublabel, index);
        })}
      </div>
    );
  }
}

export default Profile;
