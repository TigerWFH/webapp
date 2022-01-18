import * as React from 'react';
import ReactDOM from 'react-dom';
import { Graph, Shape, Cell } from '@antv/x6';
import { Tooltip } from 'antd';
import Immutable from 'immutable';
import './Tools'; // 载入工具
import './MyNodes';
import styles from './index.module.scss';
import * as t from '../types';
interface IX6Workbench extends t.IWorkbench {}

const MOCKDATA = {
  nodes: [
    {
      id: 'node1',
      x: 40,
      y: 40,
      width: 80,
      height: 40,
      label: 'node1'
    },
    {
      id: 'node2',
      x: 160,
      y: 180,
      width: 80,
      height: 40,
      label: 'node2'
    },
    {
      id: 'node3',
      x: 160,
      y: 180,
      width: 80,
      height: 40,
      label: 'node3'
    },
    {
      id: 'node4',
      x: 160,
      y: 180,
      width: 80,
      height: 40,
      label: 'node4'
    },
    {
      id: 'node5',
      x: 40,
      y: 40,
      width: 80,
      height: 40,
      label: 'node5'
    },
    {
      id: 'node6',
      x: 160,
      y: 180,
      width: 80,
      height: 40,
      label: 'node6'
    },
    {
      id: 'node7',
      x: 160,
      y: 180,
      width: 80,
      height: 40,
      label: 'node7'
    },
    {
      id: 'node8',
      x: 160,
      y: 180,
      width: 80,
      height: 40,
      label: 'node8'
    },
    {
      id: 'node8',
      x: 160,
      y: 180,
      width: 80,
      height: 40,
      label: 'node8'
    },
    {
      id: 'node9',
      x: 160,
      y: 180,
      width: 80,
      height: 40,
      label: 'node9'
    },
    {
      id: 'node10',
      x: 160,
      y: 180,
      width: 80,
      height: 40,
      label: 'node10'
    },
    {
      id: 'node11',
      x: 160,
      y: 180,
      width: 80,
      height: 40,
      label: 'node11'
    },
    {
      id: 'node12',
      x: 160,
      y: 180,
      width: 80,
      height: 40,
      label: 'node12'
    }
  ],
  edges: [
    {
      source: 'node1',
      target: 'node10'
    },
    {
      source: 'node1',
      target: 'node8'
    },
    {
      source: 'node1',
      target: 'node3'
    },
    {
      source: 'node1',
      target: 'node9'
    },
    {
      source: 'node1',
      target: 'node2'
    },
    {
      source: 'node2',
      target: 'node4'
    },
    {
      source: 'node2',
      target: 'node5'
    },
    {
      source: 'node2',
      target: 'node6'
    },
    {
      source: 'node2',
      target: 'node7'
    },
    {
      source: 'node9',
      target: 'node11'
    },
    {
      source: 'node9',
      target: 'node12'
    }
  ]
};

class X6Workbench extends React.PureComponent<IX6Workbench, any> {
  container: HTMLDivElement | null = null;
  graph: Graph | undefined;

  refContainer = (container: HTMLDivElement) => {
    this.container = container;
  };

  // 测试Demo
  onChange = () => {
    const { setCurrent } = this.props;
    console.log('setCurrent');

    setCurrent({ name: '' } as any);
  };

  componentDidMount() {
    // 屏蔽浏览器右键菜单，有兼容性问题《https://segmentfault.com/q/1010000004934881》
    // document.oncontext = function () {
    //   return false;
    // };
    // 此处请求需要回填的数据
    this.graph = new Graph({
      container: this.container as HTMLDivElement,
      grid: true,
      panning: {
        enabled: true,
        modifiers: ['alt']
      },
      clipboard: {
        enabled: true
      },
      selecting: {
        enabled: true,
        // className: styles.ss, // 需要改写css类，实现样式覆盖
        rubberband: true, // 启用框选（橡皮筋）
        strict: true,
        movable: true,
        showNodeSelectionBox: true,
        showEdgeSelectionBox: true
      },
      snapline: {
        enabled: true,
        sharp: true
      },
      scroller: {
        enabled: true,
        pageVisible: false,
        pageBreak: false
        // pannable: true, // 类似panning
        // modifiers: ['alt'], // 此处两项配置等同于外部的panning配置
      },
      connecting: {
        // 边的连接设定
        snap: true,
        allowBlank: true,
        allowMulti: true,
        allowLoop: true,
        allowNode: true,
        allowEdge: true,
        allowPort: true,
        highlight: true
      },
      // interacting: {
      //   // 边和节点的交互
      //   nodeMovable: true,
      //   edgeMovable: true,
      //   arrowheadMovable: true
      // },
      onPortRendered(args) {
        const selectors = args.contentSelectors;
        const container = selectors && selectors.foContent;
        if (container) {
          ReactDOM.render(
            (
              <Tooltip title="port">
                <div className={styles.myport} />
              </Tooltip>
            ) as any,
            container as any
          );
        }
      }
    });
    // this.graph?.on('cell:selected', (args: any) => {
    //   console.log('cell selected===>', args);
    // });
    // this.graph?.on('edge:selected', (args: any) => {
    //   console.log('edge selected');
    // });
    // this.graph?.on('node:selected', (args: any) => {
    //   console.log('node selected');
    // });
    // this.graph?.on('node:context', (args: any) => {
    //   console.log('node context====》', args);
    // });
    // this.graph?.on('edge:context', (args: any) => {
    //   console.log('edge context======>', args);
    // });
    // this.graph?.on('blank:context', (args: any) => {
    //   console.log('blank context======>', args);
    // });
    // 动态添加/删除链接桩
    // this.graph?.on('node:mouseenter', ({ cell }) => {
    //   if (cell.isNode()) {
    //     cell.addPorts([
    //       {
    //         id: 'top',
    //         args: {
    //           position: 'top'
    //         },
    //         attrs: {
    //           circle: {
    //             r: 6,
    //             magnet: true,
    //             stroke: '#31d0c6',
    //             strokeWidth: 2,
    //             fill: '#fff'
    //           }
    //         }
    //       },
    //       {
    //         id: 'bottom',
    //         // args: {
    //         //   position: 'bottom'
    //         // },
    //         attrs: {
    //           circle: {
    //             r: 6,
    //             magnet: true,
    //             stroke: '#31d0c6',
    //             strokeWidth: 2,
    //             fill: '#fff'
    //           }
    //         }
    //       }
    //     ]);
    //   }
    // });
    // this.graph?.on('node:mouseleave', ({ cell }) => {
    //   if (cell.isNode()) {
    //     cell.removePorts();
    //   }
    // });
    const { init } = this.props;
    setTimeout(() => {
      // 小工具
      const tools = [
        {
          name: 'contextmenu',
          args: {
            graph: this.graph
          }
        }
      ];
      /*
      链接桩(Ports)
        markup，链接桩节点，可以定义在单个链接桩、链接桩群组和portMarkup三个位置
        // DOM结构
        markup = {
          tagName: 'circle',
          selector: 'circle',
          attrs: {
            r: 10,
            fill: '#fff',
            stroke: '#000'
          }
        }
        // 使用
        ports = [
          {
            id: '',
            attrs: {
              circle: {
                r: 6,
                fille: '',
                stroke: '',
                strokeWidth: '',
              }
            }
          }
        ]
        // 链接桩位置
      */
      const ports = [
        {
          id: 'top',
          attrs: {
            circle: {
              r: 6,
              magnet: true,
              stroke: '#31d0c6',
              strokeWidth: 2,
              fill: '#fff'
            }
          }
        },
        {
          id: 'right',
          attrs: {
            circle: {
              r: 6,
              magnet: true,
              stroke: '#31d0c6',
              strokeWidth: 2,
              fill: '#fff'
            }
          }
        }
        // {
        //   id: 'bottom',
        //   position: 'bottom'
        // },
        // {
        //   id: 'left',
        //   position: 'left'
        // }
      ];

      const nodes = MOCKDATA.nodes.map((node) => ({
        ...node,
        tools,
        ports
      }));
      const edges = MOCKDATA.edges.map((edge) => ({
        ...edge,
        tools
      }));

      init({
        dataList: nodes,
        edgeList: edges,
        current: {},
        configs: {}
      });
    }, 1000);
  }

  componentWillUpdate() {
    console.log('will-update');
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    const { dataList, edgeList, dataSource, current } = this.props;
    const prevDataList = prevProps.dataList;
    const prevEdgeList = prevProps.edgeList;
    if (
      !Immutable.is(dataList, prevDataList) ||
      !Immutable.is(edgeList, prevEdgeList)
    ) {
      console.log('didUpdate');
      const elemList = dataList.toJS();
      if (dataSource === 'DRAG_NODE_DATA') {
        console.log('拖拽产生的数据=====>', current);
        const tmp = current?.toJS();
        const { id, componentType } = tmp;
        const node = {
          id,
          label: componentType,
          x: 20,
          y: 80,
          // width: 80,
          // height: 40,
          shape: 'my-shape'
        };
        this.graph?.addNode(node);
        this.graph?.addEdge({
          target: { x: 10, y: 50 },
          source: { x: 70, y: 50 },
          tools: [
            {
              name: 'contextmenu',
              args: {
                graph: this.graph
              }
            }
          ]
        });
      } else if (dataSource === 'COPY_EDGE_DATA') {
        console.log('边拷贝数据');
      } else {
        const targetList = elemList.map((elem: any) => {
          const { componentType } = elem;
          if (componentType) {
            return {
              id: elem.id,
              height: 40,
              width: 80,
              x: 80,
              y: 80,
              shape: 'rect',
              label: componentType
            };
          }

          return elem;
        });

        this.graph?.fromJSON({
          nodes: targetList,
          edges: edgeList?.toJS()
        });
      }
    }
  }

  onGetAllData = () => {
    const allData = this.graph?.toJSON();
    const model = this.graph?.model;
    const view = this.graph?.view;
    console.log('allData====>', allData, model, view);
  };

  render() {
    console.log('x6------render====>', this.props);
    return (
      <div className={styles.container}>
        <div className={styles.toolbar}>
          <button onClick={this.onChange}>dispatch</button>
          <button onClick={this.onGetAllData}>获取数据</button>
        </div>
        <div className={styles.graph} ref={this.refContainer} />
        <div className={styles.config}>抽屉</div>
      </div>
    );
  }
}

export default X6Workbench;
