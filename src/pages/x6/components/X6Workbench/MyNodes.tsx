import React, { Component } from 'react';
import { Graph, Markup } from '@antv/x6';
import '@antv/x6-react-shape';

/*
  X6部分操作会引起画布的重绘；使用的React组件也会被重绘，可以通过SCU优化
  React在画布重绘的过程中，可以保持自己的状态；
  React可以通过节点的data提升状态，相当于传递props.node.data；也可以维护自己的state
  X6的setData会做数据比较，没有变更不重绘
*/
class MyShape extends Component<any, any> {
  count: number;
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
    console.log('didMount', this.props);
  }

  compoenntDidUpdate() {
    console.log('didUpdate', this.props);
  }

  onChangeData = () => {
    const { node } = this.props;
    console.log('node=======>', node);
    // graph会做数据比较，没有更新数据，就不会重绘
    node.setData({ name: `changeData-${this.count++}` });
  };

  onChangeName = () => {
    this.setState({
      name: 666
    });
  };

  render() {
    return (
      <div style={{ border: '1px solid red' }}>
        <div onClick={this.onChangeData}>change data</div>
        <div onClick={this.onChangeName}>change name</div>
        {`MyShape-${this.state.name}-${this.props.node?.data?.name}`}
      </div>
    );
  }
}

Graph.registerNode('my-shape', {
  inherit: 'react-shape',
  x: 200,
  y: 150,
  width: 160,
  height: 30,
  component: <MyShape />,
  portMarkup: [Markup.getForeignObjectMarkup()],
  tools: [
    {
      name: 'contextmenu',
      args: {}
    }
  ],
  ports: {
    groups: {
      in: {
        position: { name: 'top' },
        attrs: {
          fo: {
            width: 10,
            height: 10,
            x: -5,
            y: -5,
            magnet: 'true'
          }
        },
        zIndex: 1
      },
      out: {
        position: { name: 'bottom' },
        attrs: {
          fo: {
            width: 10,
            height: 10,
            x: -5,
            y: -5,
            magnet: 'true'
          }
        },
        zIndex: 1
      }
    },
    items: [
      { group: 'in', id: 'in1' },
      { group: 'in', id: 'in2' },
      { group: 'out', id: 'out1' },
      { group: 'out', id: 'out2' }
    ]
  }
});
