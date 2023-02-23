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
import React from 'react';
import List from '../List';

class KeyTest extends React.Component<any, any> {
  target: any = { id: 'mouse3', name: 'mouse' };
  constructor(props: any) {
    super(props);
    this.state = {
      list: [1, 2, 3],
      list2: [
        { id: 'monkey1', name: 'monkey' },
        { id: 'cat2', name: 'cat' }
      ]
    };
  }

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

  render() {
    const { list, list2 } = this.state;
    return (
      <React.Fragment>
        <div>
          <h1>以index索引为key，测试react渲染优化</h1>
          <button onClick={this.onChangeList}>4123</button>
          <button onClick={this.onChangeList2}>1243</button>
          <button onClick={this.onChangeList3}>1234</button>
          {list.map((elem: any, index: number) => {
            return <List key={index} count={elem} />;
          })}
        </div>
        <div>
          <h1>以数据项的id为key，测试react渲染优化</h1>
          <button onClick={this.onChangeZodiac}>mouse,monkey,cat</button>
          <button onClick={this.onChangeZodiac2}>monkey,mouse,cat</button>
          <button onClick={this.onChangeZodiac3}>monkey,cat,mouse</button>
          {list2.map((item: any, index: number) => {
            return <List key={item.id} count={item.name} />;
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default KeyTest;
