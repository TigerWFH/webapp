/*
节点连线钩子触发顺序：
  validateMagnet(args)【新边触发】【source】【触发edge:connect】【不触发edge:added】
    args：
      e:JQuery.Event
      cell:
      magnet:
      view:
  createEdge(args)【新边触发】【新建边实例，替换系统默认边】
    args：
      sourceCell
      sourceMagnet
      source
  validateConnect(args)【新边触发】【移动边触发】【触发edge:
    当鼠标放开的时候，不会连接到当前元素，否则会连接到当前元素；但也不会清除已经生成的边
    args：
      edge
      edgeView
      sourceView
      targetView
      sourcePort
      targetPort
      sourceMagnet
      targetMagnet
      sourceCell（把所有节点都扫描了3遍）
      targetCell（把所有节点都扫描了3遍）
      type：【source、target】
  validateEdge(args)【新边触发】【移动边触发】【节点和边关系已经建立，返回false会触发edge:removed】
    args：
      edge
      type：【source、target】
      previous：指向当前type上一次的位置，可能是Cell也可能是坐标
*/
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

  /*
    magnet
    当magnet属性为true，标识该元素可以被链接，既在连线过程中可以当做连线的起点或终点
  */

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
        // 【生成边触发】【connect交互】点击magnet，生成边
        validateMagnet(args) {
          const { magnet } = args;
          console.log('validateMagnet=====>', args);
          return magnet.getAttribute('port-group') !== 'in';
        },
        // 【生成边触发】【connect交互】连接的过程中创建新的边
        createEdge: (args) => {
          /*
          sourceCell
          sourceMagnet
          source
          */
          console.log('createEdge=====>', args);
          return new Edge({
            tools: [
              {
                name: 'contextmenu'
              }
            ]
          });
        },
        // 【生成边触发】【移动边触发】【connect交互】在移动边的时候判断连接是否有效
        validateConnection(args: any) {
          /*
          args:
            edge
            edgeView
            sourceView
            targetView
            sourcePort
            targetPort
            sourceMagnet
            targetMagnet
            sourceCell
            targetCell
            type
          */
          const { targetCell, targetMagnet, sourceCell, type } = args;
          // const { model } = targetCell;
          // const tmpEdges = model.getOutgoingEdges(targetCell);
          if (type === 'source') {
            console.log('sourceCell======>', sourceCell);
          } else {
            console.log('targetCell======>', targetCell);
          }

          // console.log('validateConnection======>', args, tmpEdges);
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
        // 【生成边触发】【移动边触发】【connect交互】当停止拖动边的时候根据 validateEdge 返回值来判断边是否生效，但是节点与边的关系已经生成
        validateEdge(args: any) {
          /*
          args:
            edge
            type
            previous
          */

          const { edge, type } = args;
          const tmpSource = edge.getTarget();
          const tmpTarget = edge.getSource();

          const source = edge.getSourceNode();
          const target = edge.getTargetNode();
          if (type === 'source') {
            if (!source) {
              return false;
            }
          } else if (type === 'target') {
            if (!target) {
              return false;
            }
          }
          const { model } = target;
          const tmpEdges = model.getIncomingEdges(target);
          console.log(
            'validateEdge====>',
            tmpEdges,
            tmpSource,
            tmpTarget,
            args
          );

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
    // 点选和框选Selection
    // cell:selected（args: cell, options）, node:selected（args: cell, node, options）, edge:selected（args: cell, edge, options）
    this.graph?.on('cell:selected', (args) => {
      console.log('cell:selected====>', args);
    });
    this.graph?.on('node:selected', (args) => {
      console.log('node:selected====>', args);
    });
    this.graph?.on('edge:selected', (args) => {
      console.log('edge:selected====>', args);
    });
    // cell: unselected, node:unselected, edge:unselected
    // 选中节点发生变更增加新选中，删除新选中时触发【删除选中触发一次】【新选中也会触发一次】
    this.graph?.on('selection:changed', (args) => {
      /*
        args:
          removed: 取消选中的节点
          added: 新选中的节点
          seleced: 选中的节点
          options: {}，设置项
      */
      console.log('selection:changed======>', args);
    });

    // 添加边时触发【模板添加新边】【复制添加新边】
    this.graph?.on('edge:added', (args) => {
      console.log('edge:added===>', args);
    });

    // 删除边时触发【所有删除操作】
    this.graph?.on('edge:removed', (args) => {
      console.log('edge:removed=====>', args);
    });

    // 连接边时触发【连接链接桩产生新边】【移动已有的边】触发
    this.graph?.on('edge:connected', (args) => {
      console.log('edge:connected====>', args);
    });

    // 鼠标进入
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

  computer(rootNodes: Node[]) {
    let currentNodes = rootNodes || [];
    const array = [];
    let i = 0;
    let maxDegree = 0;
    while (currentNodes.length >= 1) {
      array[i] = currentNodes.length;
      i++;
      const children = currentNodes.reduce((sum: Node[], curr: Node) => {
        // 合并子节点
        const result =
          this.graph?.getNeighbors(curr as any, {
            outgoing: true
          }) || [];
        // 计算最大度
        maxDegree = maxDegree > result.length ? maxDegree : result.length;
        // 合并
        sum = sum.concat(result as any);

        return sum;
      }, []);

      currentNodes = children;
    }

    return [array, maxDegree];
  }

  onLayout = () => {
    // const allNodes = this.graph?.getNodes();
    const rootNodes: Node[] = this.graph?.getRootNodes() || ([] as any);
    const leafNodes = this.graph?.getLeafNodes() || [];
    let currentNodes = rootNodes;
    const ELEMENT_WIDTH = 110 + 20;
    const ELEMENT_HEIGHT = 44 + 4;

    console.log('leaf========>', leafNodes.length);
    // const [array = [], maxDegree] = this.computer(rootNodes as any);
    // const deep = (array as []).length;
    // console.log('computer=========>', array, maxDegree);
    this.graph?.batchUpdate(() => {
      let level = 0;
      while (currentNodes.length > 0) {
        console.log('6666666======>', currentNodes);
        const result = currentNodes.reduce(
          (sum: Node[], node: any, index: number) => {
            node.position(
              0 + level * ELEMENT_WIDTH,
              0 + index * ELEMENT_HEIGHT
            );
            const result = this.graph?.getNeighbors(node as any, {
              outgoing: true
            });
            sum = sum.concat(result as any);
            return sum;
          },
          []
        );
        level += 1;
        currentNodes = result;
      }
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
          <button onClick={this.onLayout}>自动布局</button>
        </div>
        <div className={styles.graph} ref={this.refContainer} />
        <div className={styles.config}>抽屉</div>
      </div>
    );
  }
}

export default X6Workbench;
