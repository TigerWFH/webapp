import * as React from 'react';
import styles from './index.module.scss';
interface IProps {
  history: any;
}
interface IState {
  info: any;
  name: string;
}
class Other extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    window.addEventListener('message', (e) => {
      console.log('监听数据===>');
      console.log('message66666666666====>', e);
    });
  }
  onToAnimation = () => {
    if (this.props.history) {
      this.props.history.push('/animation');
    }
  };
  onToAntd = () => {
    if (this.props.history) {
      this.props.history.push('/antd');
    }
  };
  onToBones = () => {
    if (this.props.history) {
      this.props.history.push('/bones');
    }
  };
  onToChild = () => {
    if (this.props.history) {
      this.props.history.push('/child');
    }
  };
  onToContext = () => {
    if (this.props.history) {
      this.props.history.push('/context');
    }
  };
  onToDetail = () => {
    if (this.props.history) {
      this.props.history.push('/detail/prev');
    }
  };
  onToEchat = () => {
    if (this.props.history) {
      this.props.history.push('/echat');
    }
  };
  onToHooks = () => {
    if (this.props.history) {
      this.props.history.push('/hooks');
    }
  };
  onToMiddle = () => {
    if (this.props.history) {
      this.props.history.push('/middle');
    }
  };
  onToSignature = () => {
    if (this.props.history) {
      this.props.history.push('/signature');
    }
  };
  onToStartApp = () => {
    if (this.props.history) {
      this.props.history.push('/startapp');
    }
  };
  onToState = () => {
    if (this.props.history) {
      this.props.history.push('/state');
    }
  };
  onToVideo = () => {
    if (this.props.history) {
      this.props.history.push('/video');
    }
  };
  onNewTable = () => {
    // const target = window.open('http://localhost:3000/#/demos', '_blank');
  };
  /**
   * about：个人简介
   * home：主页
   * blog：博客
   * demos：实践
   * other：其他
   */

  render() {
    return (
      <div>
        <div onClick={function () {}}>
          <span onClick={function () {}}>qqweqe</span>
        </div>
        <button className={styles.button} onClick={this.onNewTable}>
          跳转页面
        </button>
        <button className={styles.button} onClick={this.onToAnimation}>
          animation（动画）
        </button>
        <button className={styles.button} onClick={this.onToAntd}>
          antd
        </button>
        <button className={styles.button} onClick={this.onToBones}>
          bones（骨架图）
        </button>
        <button className={styles.button} onClick={this.onToChild}>
          child
        </button>
        <button className={styles.button} onClick={this.onToContext}>
          context
        </button>
        <button className={styles.button} onClick={this.onToDetail}>
          detail
        </button>
      </div>
    );
  }
}

export default Other;
