/**
 * setState(updater, callback)
 * 1、updater可以是对象，也可以是function(state, props) => state
 * 2、如果updater是null或者返回null，组件不会rerender
 * 3、updater函数中的state是对组件state的引用，props是对组件props的引用，但是返回该引用同样会触发rerender
 *
 * 结论：除非setState设置null，否者只要调用setState一定会引起组件的rerender
 * forceUpdate(callback)
 * forceUpdate会跳过调用组件的shouldComponentUpdate函数，但是子组件会正常调用SCU；
 * 其余生命周期函数都会被调用
 *  */

/**
 * setState是异步的，连续的setState可能造成bug
 * 可以将updater更改为function，规避bug
 *
 * 连续的setState
 * 返回对象，操作会被合并，做batch更新，造成第一次加1和第二次加1合并，只操作了一次加1
 *
 */
import React from 'react';

interface IProps {}
interface IState {
  count: { [key: string]: any };
  total: number;
  total2: number;
  demo1: { [property: string]: any };
}

function Demo(props: any) {
  console.log('Demo-render=====>', props.name);

  return (
    <div>
      {props.children}
      <span>{`demo${props.index}`}</span>
      <span>{props.name}</span>
    </div>
  );
}

export default class SetStateTest extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      demo1: {
        index: 1,
        name: 'demo1',
        demo2: {
          index: 2,
          name: 'demo2',
          demo3: {
            index: 3,
            name: 'demo3',
            demo4: {
              index: 4,
              name: 'demo4'
            }
          }
        }
      },
      count: {
        title: 'monkey',
        page: 0
      },
      total: 1,
      total2: 1
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        total: 3
      });
    }, 3000);
  }
  getSnapshotBeforeUpdate(nextProps: any, nextState: any) {
    console.log('getSnapshot======>', nextState);
    return '123';
  }
  componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
    console.log('didUpdate=====snapshot=======>', snapshot);
  }
  onCount1 = () => {
    console.log('demo1=button====>', this.state.count);
    this.setState(null);
  };
  onCount2 = () => {
    console.log('count2=button====>', this.state.count);
    this.setState((state: IState, props: IProps) => {
      console.log('this.state === state===>', this.state === state);
      console.log('this.props === ptops===>', this.props === props);
      return state;
    });
  };
  onDoubleState = () => {
    this.setState({
      total: this.state.total + 1
    });
    this.setState({
      total: this.state.total + 1
    });
  };

  onDoubleState2 = () => {
    this.setState((state: any, props: any) => {
      return {
        total2: state.total2 + 1
      };
    });
    this.setState((state: any, props: any) => {
      return {
        total2: state.total2 + 1
      };
    });
  };

  onChangeDemo4 = () => {
    const { demo1 } = this.state;
    const { demo2 } = demo1;
    const { demo3 } = demo2;
    const { demo4 } = demo3;
    demo4.name = 'change';
    this.setState({
      demo1
    });
  };

  render() {
    const { demo1 } = this.state;
    const { demo2 } = demo1;
    const { demo3 } = demo2;
    const { demo4 } = demo3;
    return (
      <div>
        <div>
          <button onClick={this.onChangeDemo4}>设置demo4</button>
          <Demo index={demo4.index} name={demo4.name}>
            <Demo index={demo2.index} name={demo2.name}>
              <Demo index={demo3.index} name={demo3.name}>
                <Demo index={demo4.index} name={demo4.name}></Demo>
              </Demo>
            </Demo>
          </Demo>
        </div>
        <div>
          <button onClick={this.onDoubleState}>
            连续setState，打印total=2
          </button>
          <span>{this.state.total}</span>
        </div>
        <div>
          <button onClick={this.onDoubleState2}>
            连续setState，打印total2=3
          </button>
          <span>{this.state.total2}</span>
        </div>
        <div>
          <button onClick={this.onCount1}>Demo1</button>
          <span>setState设置null，不会引起组件的rerender</span>
        </div>
        <div>
          <button onClick={this.onCount2}>Demo2</button>
          <span>
            setState直接返回对组件的state的引用依然会引起组件的rerender
          </span>
        </div>
        <span>{this.state.count.page}</span>
      </div>
    );
  }
}
