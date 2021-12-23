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
 * 测试key的作用
 * 1、数据[1,2,3] 以index为key，        渲染出列表：新建Li1,新建Li2,新建Li3
 * 1-1、修改数据为[4,1,2,3]以index为key，渲染出列表：更新Li1为Li4，更新Li2为Li1，更新Li3为Li2，新建Li3
 * 1-2、修改数据为[1,2,4,3]以index为key，渲染出列表：不变Li1，不变Li2，更新Li3为Li4，新建Li3
 * 1-3、修改数据为[1,2,3,4]以index为key, 渲染处列表：不变Li1，不变Li2，不变Li3，新建Li4
 *
 * 2、数据[{id: 'monkey1',name:'monkey'},{id: 'cat2',name:'cat'}]，以id为key									渲染：新建monkey，新建cat
 * 2-1、修改数据[{id: 'mouse3',name:'mouse'},{id: 'monkey1',name:'monkey'},{id: 'cat2',name:'cat'}]	渲染：新建mouse, 不变monkey，不变cat
 * 2-2、修改数据[{id: 'monkey1',name:'monkey'},{id: 'mouse3',name:'mouse3'},{id: 'cat2',name:'cat'}]	渲染：不变monkey，新建mouse, 不变cat
 * 2-3、修改数据[{id: 'monkey1',name:'monkey'},{id: 'cat2',name:'cat'},{id: 'mouse3',name:'mouse'}]	渲染：不变monkey，不变cat，新建mouse
 */
/**
 * setState是异步的，连续的setState可能造成bug
 * 可以将updater更改为function，规避bug
 *
 * 连续的setState
 * 返回对象，操作会被合并，做batch更新，造成第一次加1和第二次加1合并，只操作了一次加1
 *
 */
import * as React from 'react';
import List from './components/List';
import { MyFn, MyName } from './components/MyFn';
interface IProps {}
interface IState {
  count: { [key: string]: any };
  list: any[];
  list2: any[];
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

class State extends React.Component<IProps, IState> {
  target: any = { id: 'mouse3', name: 'mouse' };
  fnRef: any = null;
  nameRef: any = null;
  constructor(props: IProps, context: any) {
    super(props);
    this.fnRef = React.createRef();
    this.nameRef = React.createRef();
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
      list: [1, 2, 3],
      list2: [
        { id: 'monkey1', name: 'monkey' },
        { id: 'cat2', name: 'cat' }
      ],
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
  onChangeList = () => {
    const { list } = this.state;
    list.splice(0, 0, 4);
    this.setState({
      list
    });
  };
  onChangeList2 = () => {
    const { list } = this.state;
    list.splice(2, 0, 4);
    this.setState({
      list
    });
  };
  onChangeList3 = () => {
    const { list } = this.state;
    list.splice(3, 0, 4);
    this.setState({
      list
    });
  };

  onChangeZodiac = () => {
    const { list2 } = this.state;
    list2.splice(0, 0, this.target);
    this.setState({
      list2
    });
  };
  onChangeZodiac2 = () => {
    const { list2 } = this.state;
    list2.splice(1, 0, this.target);
    this.setState({
      list2
    });
  };
  onChangeZodiac3 = () => {
    const { list2 } = this.state;
    list2.splice(2, 0, this.target);
    this.setState({
      list2
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
    this.setState((state, props) => {
      return {
        total2: state.total2 + 1
      };
    });
    this.setState((state, props) => {
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

  onFn = () => {
    if (this.fnRef && this.fnRef.current) {
      console.log('fnRef======>', this.fnRef.current.name);
      this.fnRef.current.focus();
    }
    if (this.nameRef && this.nameRef.current) {
      // 可以不用提供数据接口，直接把state都能给拿到
      console.log('nameRef======>', this.nameRef.current.getData());
      console.log('nameRef======>', this.nameRef.current.state);
    }
  };

  render() {
    console.log('states-render=====>', this.state);
    const { demo1 } = this.state;
    const { demo2 } = demo1;
    const { demo3 } = demo2;
    const { demo4 } = demo3;

    return (
      <div>
        <div>
          <button onClick={this.onFn}>获取数据</button>
          <MyFn ref={this.fnRef} />
          <MyName ref={this.nameRef} />
        </div>
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
        <div>
          <h1>以index索引为key，测试react渲染优化</h1>
          <button onClick={this.onChangeList}>4123</button>
          <button onClick={this.onChangeList2}>1243</button>
          <button onClick={this.onChangeList3}>1234</button>
          {this.state.list.map((elem, index) => {
            return <List key={index} count={elem} />;
          })}
        </div>
        <div>
          <h1>以数据项的id为key，测试react渲染优化</h1>
          <button onClick={this.onChangeZodiac}>mouse,monkey,cat</button>
          <button onClick={this.onChangeZodiac2}>monkey,mouse,cat</button>
          <button onClick={this.onChangeZodiac3}>monkey,cat,mouse</button>
          {this.state.list2.map((item: any, index: number) => {
            return <List key={item.id} count={item.name} />;
          })}
        </div>
      </div>
    );
  }
}
export default State;
