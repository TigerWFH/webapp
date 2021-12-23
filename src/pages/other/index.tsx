import * as React from 'react';
// import { connect } from 'react-redux'
import styles from './index.module.scss';
export class Monkey extends React.Component {
  componentWillReceiveProps(nextProps: any) {
    console.log('props===>', this.props);
    console.log('nextProps===>', nextProps);
  }
  render() {
    return <div>123</div>;
  }
}
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
    const target = window.open('http://localhost:3000/#/demos', '_blank');
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
        <button className={styles.button} onClick={this.onToEchat}>
          echat
        </button>
        <button className={styles.button} onClick={this.onToHooks}>
          hooks
        </button>
        <button className={styles.button} onClick={this.onToMiddle}>
          middle
        </button>
        <button className={styles.button} onClick={this.onToSignature}>
          signture
        </button>
        <button className={styles.button} onClick={this.onToStartApp}>
          startapp
        </button>
        <button className={styles.button} onClick={this.onToState}>
          state
        </button>
        <button className={styles.button} onClick={this.onToVideo}>
          video
        </button>
      </div>
    );
  }
}

export default Other;
