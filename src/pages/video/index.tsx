import * as React from 'react';
// import Child from './components/Child';
// import Demo from './components/Form';

const res = require('./flower.mp4');

interface IProps {
  source: string;
}
interface IState {
  child: string;
}
export default class Video extends React.Component<IProps, IState> {
  validateFn: any = [];
  static getDerivedStateFromProps(props: any, state: any) {
    console.log('video===>', props);
    return {
      monkey: {
        info: {
          name: 'cat'
        }
      },
      cat: {
        name: 'cat'
      }
    };
  }
  constructor(props: IProps) {
    super(props);
    this.state = {
      child: 'initial video child'
    };
    this.dynamicLoadScript();
  }
  dynamicLoadScript() {
    console.log('dynamic load script');
    const script = document.createElement('script');
    script.src = '../../libs/lib.js';
    // script.src = "http://libs.baidu.com/jquery/2.0.0/jquery.min.js";
    // IE
    script.onload = function (arg) {
      console.log('onload===>', arg);
    };
    script.onerror = function (arg) {
      console.log('onerror script load error====>', arg);
    };
    document.head.appendChild(script);
  }
  onChangeParentChild = () => {
    this.setState((state, props) => {
      return {
        child: 'video change child'
      };
    });
  };
  onSave = (fn: any, fn2: any) => {
    this.validateFn.push(fn);
    this.validateFn.push(fn2);
  };
  onSubmit = () => {
    (this.validateFn || []).forEach((fn: any) => {
      if (typeof fn === 'function') {
        fn((errors: any, values: any) => {
          console.log('e==>', errors, values);
        });
      }
    });
  };
  onClick = () => {
    alert(1);
  };
  render() {
    return (
      <div>
        <button onClick={this.onChangeParentChild}>change parent child</button>
        {/* <Child child={this.state.child} /> */}
        <video width="200px" onClick={this.onClick}>
          <source src={res} type="video/mp4" />
        </video>
        <video width="200px" controls>
          <source src={res} type="video/mp4" />
        </video>
        <div>
          <button onClick={this.onSubmit}>submit</button>
          {/* <Demo onSubmit={this.onSave} /> */}
        </div>
      </div>
    );
  }
}
