import * as React from 'react';
import { Graph, Addon, Shape, Cell } from '@antv/x6';
import { Toolbar } from '@antv/x6-react-components';
import '@antv/x6-react-shape';
import '@antv/x6-react-components/es/menu/style/index.css';
import '@antv/x6-react-components/es/toolbar/style/index.css';
import { Stencil } from '@antv/x6/lib/addon';
import styles from './index.module.scss';
import Trigger from '../X6ReactTrigger';

const { Rect, Circle } = Shape;
const { Item, Group } = Toolbar;

interface IX6DndGraphProps {
  businessType?: string; // 业务类型，不同业务使用不同的图元集合
}
/*
    source是父节点
    target是子节点
*/

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

export default class X6DndGraph extends React.Component<IX6DndGraphProps, any> {
  container: HTMLDivElement | null = null;
  stencilContainer: HTMLDivElement | null = null;
  graph: Graph | undefined;
  stencil: Stencil | undefined;
  constructor(props: any) {
    super(props);
    this.state = {
      node: null
    };
  }
  getnerateTreeFromEdges = (edges: any[]) => {
    // let root = null;
    edges.forEach((edge) => {
      const parent = {
        id: edge.source,
        prev: null,
        next: null
      };
      const child = {
        id: edge.target,
        prev: parent,
        next: null
      };
      parent.next = child as any;
    });
  };
  componentDidMount() {
    this.graph = new Graph({
      container: this.container as HTMLDivElement,
      grid: true,
      snapline: {
        enabled: true,
        sharp: true
      },
      scroller: {
        enabled: true,
        pageVisible: false,
        pageBreak: false,
        pannable: true
      }
    });
    this.graph.fromJSON(MOCKDATA);

    // this.graph.on("cell:dblclick", (options: any) => {
    //     const { cell, e } = options
    //     cell.addTools({
    //         name: cell.isEdge() ? 'edge-editor' : 'node-editor',
    //         args: {
    //             event: e,
    //         },
    //     })
    // })

    this.stencil = new Addon.Stencil({
      title: '业务组件库',
      target: this.graph,
      search(cell, keyword) {
        return cell.shape.indexOf(keyword) !== -1;
      },
      placeholder: '请输入组件名称',
      notFoundText: '未搜索到指定的组件',
      collapsable: true,
      stencilGraphWidth: 200,
      stencilGraphHeight: 180,
      groups: [
        {
          name: 'trigger',
          title: '触发',
          graphHeight: 100,
          graphOptions: {
            scroller: true
          }
        },
        {
          name: 'flow',
          title: '流程控制',
          collapsed: true
        },
        {
          name: 'strategy',
          title: '策略',
          collapsed: true
        },
        {
          name: 'actions',
          title: '动作',
          collapsed: true
        },
        {
          name: 'productions',
          title: '数据产品',
          collapsed: true
        }
      ],
      getDragNode: (node, options) => {
        console.log('getDragNode====>', node, options);
        return node.clone();
      },
      getDropNode: (node: any, options) => {
        console.log('getDropNode=====>', node, options);
        const ports = [
          {
            id: 'port1',
            attrs: {
              circle: {
                magnet: true
              }
            }
          },
          {
            id: 'port2',
            attrs: {
              circle: {
                magnet: true
              }
            }
          }
        ];

        const newNode = node.clone().size({
          width: 240,
          height: 80
        });
        newNode.addPorts(ports);
        return newNode;
      }
    });

    if (this.stencilContainer) {
      this.stencilContainer.appendChild(this.stencil.container);
    }
    // 业务组件栏的组件实例
    const r = new Rect({
      width: 70,
      height: 40,
      attrs: {
        rect: { fill: '#31D0C6', stroke: '#4B4A67', strokeWidth: 6 },
        text: { text: 'rect', fill: 'white' }
      }
    });

    const c = new Circle({
      width: 60,
      height: 60,
      data: {
        data: 'myData'
      },
      attrs: {
        circle: { fill: '#FE854F', strokeWidth: 6, stroke: '#4B4A67' },
        text: { text: 'ellipse', fill: 'white' }
      }
    });

    const c2 = new Circle({
      width: 60,
      height: 60,
      attrs: {
        circle: { fill: '#4B4A67', 'stroke-width': 6, stroke: '#FE854F' },
        text: { text: 'ellipse', fill: 'white' }
      }
    });

    const r2 = new Rect({
      width: 70,
      height: 40,
      attrs: {
        rect: { fill: '#4B4A67', stroke: '#31D0C6', strokeWidth: 6 },
        text: { text: 'rect', fill: 'white' }
      }
    });

    const r3 = new Rect({
      width: 70,
      height: 40,
      attrs: {
        rect: { fill: '#31D0C6', stroke: '#4B4A67', strokeWidth: 6 },
        text: { text: 'rect', fill: 'white' }
      }
    });

    const c3 = new Circle({
      width: 60,
      height: 60,
      attrs: {
        circle: { fill: '#FE854F', strokeWidth: 6, stroke: '#4B4A67' },
        text: { text: 'ellipse', fill: 'white' }
      },
      ports: [
        {
          id: 'port1',
          attrs: {
            circle: {
              magnet: true
            }
          }
        },
        {
          id: 'port2',
          attrs: {
            circle: {
              magnet: true
            }
          }
        }
      ]
    });

    const customNode = {
      shape: 'react-shape',
      width: 60,
      height: 60,
      component: <Trigger />
    };

    this.stencil.load([r, c, customNode], 'trigger');
    this.stencil.load([c2.clone(), r2, r3, c3], 'flow');
  }

  componentDidUpdate() {
    // const { node } = this.state;
    console.log('didUpdate========>', this.state);
    // if (node !== null) {
    //     this.graph?.addNode(node)
    // }
  }

  refContainer = (container: HTMLDivElement) => {
    this.container = container;
  };

  refStencil = (stencil: HTMLDivElement) => {
    this.stencilContainer = stencil;
  };

  onGetAll = () => {
    if (this.graph) {
      const all = this.graph.getCells();
      console.log('cells======>', all);
    }
  };

  onAutoLayout = () => {
    const step = 200;
    const level = 50;
    const elemWidth = 80;
    const elemHeight = 40;

    if (this.graph) {
      const rootNode = this.graph.getRootNodes();
      if (rootNode.length === 1) {
        const root = rootNode[0];
        /*
            深度depth到元素个数count的映射，用于计算位置
        */
        const depthMap = new Map([]);
        // 获取叶子节点个数
        const leafCount = this.graph.getLeafNodes();
        console.log('leafCount===>', leafCount.length);
        let prevChildren = this.graph?.getNeighbors(root, {
          outgoing: true
        }); // 前置节点的子节点个数
        this.graph.searchCell(
          root,
          (cell: Cell, distance: number) => {
            if (distance === 0) {
              // 根节点，直接设置坐标(0, 0)
              if (cell.isNode()) {
                cell.position(0, 0);
              }
            } else {
              if (cell.isNode()) {
                // 非根节点，根据父节点坐标和兄弟节点个数计算坐标
                // 获取当前节点的父节点
                const offset = ((level + elemHeight) * prevChildren.length) / 2;
                console.log('offset====>', offset);
                const prev = this.graph?.getPredecessors(cell, {
                  breadthFirst: true,
                  distance: 1
                });
                let parent = null;
                let parentPosition: any = {};
                if (Array.isArray(prev)) {
                  parent = prev[prev.length - 1];
                }
                if (parent?.isNode()) {
                  parentPosition = parent.position();
                }
                console.log(
                  'cell====>',
                  cell,
                  parent,
                  prevChildren,
                  parentPosition
                );
                let count: any = depthMap.get(distance);
                if (count === undefined) {
                  count = 1;
                } else {
                  count = count + 1;
                }
                depthMap.set(distance, count);
                const x = parentPosition.x + elemWidth + step;
                const y =
                  parentPosition.y + (elemWidth + level) * (count - 1) - offset;

                cell.position(x, y);
              }
            }
          },
          {
            breadthFirst: true,
            outgoing: true
          }
        );
      }
    }
  };

  render() {
    return (
      <div className={styles.x6dnd}>
        <div className={styles.component}>
          <Trigger />
        </div>
        <div className={styles.wrapper} style={{ width: '100%' }}>
          <div className={styles.stencil} ref={this.refStencil}></div>
          <div className={styles.container}>
            <Toolbar className={styles.toolbar}>
              <Group>
                <Item name="zoomIn" tooltip="缩小" icon="">
                  缩小
                </Item>
                <Item name="zoomOut" tooltip="放大" icon="">
                  放大
                </Item>
                <Item
                  name="auto"
                  tooltip="自动布局"
                  onClick={this.onAutoLayout}
                  icon="">
                  自动布局
                </Item>
              </Group>
              <Group>
                <Item name="all" tooltip="获取节点" onClick={this.onGetAll}>
                  获取节点
                </Item>
              </Group>
            </Toolbar>
            <div className={styles.graph} ref={this.refContainer}></div>
          </div>
        </div>
      </div>
    );
  }
}
