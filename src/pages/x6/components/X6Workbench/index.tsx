import * as React from 'react';
import ReactDOM from 'react-dom';
import { Graph, Edge } from '@antv/x6';
import { Tooltip } from 'antd';
import Immutable from 'immutable';
import * as t from '../types';
import styles from './index.module.scss';
import '@antv/x6-react-shape';
import { WfhRect } from '../WfhRect';
import { WfhDD, WfhDemoNode } from './biz';
import './register';
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
      source: {
        cell: 'node1',
        port: 'right'
      },
      target: {
        cell: 'node10',
        port: 'top'
      }
    },
    {
      source: {
        cell: 'node1',
        port: 'right'
      },
      target: {
        cell: 'node8',
        port: 'top'
      }
    },
    {
      source: {
        cell: 'node1',
        port: 'right'
      },
      target: {
        cell: 'node3',
        port: 'top'
      }
    },
    {
      source: {
        cell: 'node1',
        port: 'right'
      },
      target: {
        cell: 'node9',
        port: 'top'
      }
    },
    {
      source: {
        cell: 'node1',
        port: 'right'
      },
      target: {
        cell: 'node2',
        port: 'top'
      }
    },
    {
      source: {
        cell: 'node2',
        port: 'right'
      },
      target: {
        cell: 'node4',
        port: 'top'
      }
    },
    {
      source: {
        cell: 'node2',
        port: 'right'
      },
      target: {
        cell: 'node5',
        port: 'top'
      }
    },
    {
      source: {
        cell: 'node2',
        port: 'right'
      },
      target: {
        cell: 'node6',
        port: 'top'
      }
    },
    {
      source: {
        cell: 'node2',
        port: 'right'
      },
      target: {
        cell: 'node7',
        port: 'top'
      }
    },
    {
      source: {
        cell: 'node9',
        port: 'right'
      },
      target: {
        cell: 'node11',
        port: 'top'
      }
    },
    {
      source: {
        cell: 'node9',
        port: 'right'
      },
      target: {
        cell: 'node12',
        port: 'top'
      }
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
    const magnetAvailabilityHighlighter = {
      name: 'stroke',
      args: {
        padding: 3,
        attrs: {
          strokeWidth: 3,
          stroke: '#52c41a'
        }
      }
    };
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
      highlighting: {
        // 设置高亮配置
        magnetAvailable: magnetAvailabilityHighlighter
      },
      connecting: {
        // 边的连接设定
        snap: true,
        allowBlank: true,
        // allowMulti: true,
        allowLoop: false,
        allowNode: true,
        // allowEdge: false,
        // allowPort: true,
        highlight: true,
        // 【生成边触发】点击magnet，生成边
        validateMagnet({ magnet }) {
          console.log('validateMagnet');
          return magnet.getAttribute('port-group') !== 'in';
        },
        // 【生成边触发】连接的过程中创建新的边
        createEdge: () => {
          console.log('createEdge');
          return new Edge({
            tools: [
              {
                name: 'contextmenu'
              }
            ]
          });
        },
        // 【生成边触发】【移动边触发】在移动边的时候判断连接是否有效
        validateConnection(args: any) {
          console.log('validateConnection');
          return true;
          // const { sourceCell, targetCell, edge } = args;
          // console.log('validateConnection=========>', edge);
          // if (targetCell && sourceCell) {
          //   //  cell.shape可以代替getRegisterName
          //   if (sourceCell.canConnect(targetCell.getRegisterName())) {
          //     return true;
          //   }
          // }

          // return false;
        },
        // 【生成边触发】【移动边触发】当停止拖动边的时候根据 validateEdge 返回值来判断边是否生效
        validateEdge(args: any) {
          console.log('validateEdge====>', args);

          return true;
        }
      },
      interacting: {},
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

    this.graph?.on('node:mouseenter', ({ cell }) => {
      cell.addTools([
        {
          name: 'contextmenu'
        }
      ]);
    });

    this.graph?.on('node:mouseleave', ({ cell }) => {
      cell.removeTools();
    });

    this.graph?.on('edge:mouseenter', ({ cell }) => {
      cell.addTools([
        {
          name: 'source-arrowhead'
        },
        {
          name: 'target-arrowhead',
          args: {
            attrs: {
              fill: 'red'
            }
          }
        },
        {
          name: 'contextmenu'
        }
      ]);
    });

    this.graph?.on('edge:mouseleave', ({ cell }) => {
      cell.removeTools();
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
      ];

      const nodes = MOCKDATA.nodes.map((node) => ({
        ...node,
        // tools,
        ports
      }));
      const edges = MOCKDATA.edges.map((edge) => ({
        ...edge,
        shape: 'edge'
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
        const { id, componentType, title } = tmp;
        const node = {
          id,
          label: title,
          x: 20,
          y: 80,
          // width: 80, // 节点有默认的大小，此处可以不设置
          // height: 40,
          shape: componentType,
          component: <WfhRect />
        };
        this.graph?.addNode(node);
        this.graph?.addEdge({
          target: { x: 10, y: 50 },
          source: { x: 70, y: 50 }
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
              label: componentType
            };
          }

          return {
            ...elem,
            shape: 'wfh-demo'
          };
        });

        this.graph?.fromJSON({
          nodes: targetList,
          edges: edgeList?.toJS()
        });
        /*
          继承Cell节点，不注册可以直接实例化使用
          注册的作用就是：依赖注入
        */
        this.graph?.addNode(new WfhDD());
        this.graph?.addNode(new WfhDemoNode());
      }
    }
  }

  onGetAllData = () => {
    const allData = this.graph?.toJSON();
    const model = this.graph?.model;
    const view = this.graph?.view;
    console.log('allData====>', allData, model, view);
  };

  onSwitchMode = () => {
    const allNodes = this.graph?.getNodes();
    allNodes?.forEach((node) => {
      node.setData({
        type: 'simplified'
      });
    });
  };

  render() {
    console.log('x6------render====>', this.props);
    return (
      <div className={styles.container}>
        <div className={styles.toolbar}>
          <button onClick={this.onChange}>dispatch</button>
          <button onClick={this.onGetAllData}>获取数据</button>
          <button onClick={this.onSwitchMode}>改变模式</button>
        </div>
        <div className={styles.graph} ref={this.refContainer} />
        <div className={styles.config}>抽屉</div>
      </div>
    );
  }
}

export default X6Workbench;
