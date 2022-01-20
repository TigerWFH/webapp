import React, { Component } from 'react';
import { ReactShape } from '@antv/x6-react-shape';
import styles from './index.module.scss';

/*
  X6部分操作会引起画布的重绘；使用的React组件也会被重绘，可以通过SCU优化
  React在画布重绘的过程中，可以保持自己的状态；
  React可以通过节点的data提升状态，相当于传递props.node.data；也可以维护自己的state
  X6的setData会做数据比较，没有变更不重绘
*/

interface ICustomProps {
  node?: ReactShape;
}
export class WfhRect extends Component<ICustomProps, any> {
  count: number;
  static componentType: string; // 组件类型
  static title: string;
  constructor(props: any) {
    super(props);
    console.log('constructor');
    this.state = {
      name: 'default'
    };
    this.count = 0;
  }
  shouldComponentUpdate(nextProps: any, nextState: any) {
    const prevNode = this.props.node;
    const { node } = this.props;
    console.log('SCU=====>', prevNode === node);
    if (node?.hasChanged('data')) {
      return true;
    } else {
      console.log('data didnot change');
    }

    return false;
  }

  componentDidMount() {
    const { node } = this.props;
    const pl = JSON.parse(JSON.stringify(node));
    const begin = Date.now();
    // console.log('didMount', JSON.stringify(this.props.node));
    const duration = Date.now() - begin;
    console.log('begin===>', begin, duration);
  }

  compoenntDidUpdate() {
    console.log('didUpdate', this.props);
  }

  onChangeData = () => {
    const { node } = this.props;
    console.log('node=======>', node);
    // graph会做数据比较，没有更新数据，就不会重绘
    node?.setData({ name: `changeData-${this.count++}` });
  };

  onChangeName = () => {
    this.setState({
      name: 666
    });
  };

  render() {
    return (
      <div className={styles.root}>
        <div onClick={this.onChangeData}>change data</div>
        <div onClick={this.onChangeName}>change name</div>
        {`MyShape-${this.state.name}-${this.props.node?.data?.name}`}
        {`MyShape-`}
      </div>
    );
  }
}

WfhRect.componentType = 'wfh-rect';
WfhRect.title = 'rect';
