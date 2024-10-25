/* eslint-disable jsx-a11y/alt-text */
import * as React from 'react';
import styles from './index.module.scss';

// const MOCK_DATA = [
//     require("./medicine.png"),
//     require("./medicine.png"),
//     require("./medicine.png"),
//     require("./medicine.png"),
//     require("./medicine.png"),
//     require("./medicine.png"),
//     require("./medicine.png"),
//     require("./medicine.png"),
//     require("./medicine.png"),
//     require("./medicine.png"),
//     require("./medicine.png"),
//     require("./medicine.png"),
//     require("./medicine.png"),
//     require("./medicine.png"),
//     require("./medicine.png")
// ]

// interface IProps {
//     width?: number
//     height?: number
//     quality?: number
//     tfsKey: string
// }
class Lazy extends React.Component<any, any> {
  container: any;
  constructor(props: any) {
    super(props);
    this.container = React.createRef();
  }

  computeLocation() {
    const clientHeight = document.documentElement.clientHeight;

    return clientHeight;
  }

  componentDidMount() {
    if (this.container) {
      const clientHeight = this.computeLocation();
      console.log('clientHeight====>', clientHeight);
      //   const offsetTop = this.container.current.offsetTop;

      console.log('rect=====>', this.container.current.getBoundingClientRect());
    }
  }

  render() {
    return (
      <div ref={this.container} className={styles.lazy}>
        <img src={require('./medicine.png')} />
      </div>
    );
  }
}

export default Lazy;
