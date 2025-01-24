import * as React from 'react';
import { Graph, Shape, Cell } from '@antv/x6';
import { Toolbar } from '@antv/x6-react-components';
import { Snapline } from '@antv/x6-plugin-snapline';
import { Scroller } from '@antv/x6-plugin-scroller';
import { Stencil } from '@antv/x6-plugin-stencil';
// Stencil依赖@antv/x6-plugin-dnd
import '@antv/x6-react-shape';
import '@antv/x6-react-components/es/menu/style/index.css';
import '@antv/x6-react-components/es/toolbar/style/index.css';
import styles from './index.module.scss';
import Trigger from './X6ReactTrigger';
import { registerNode, registerEdge, registerReactNode } from './register';
export { BaseNode, BaseEdge } from './register';

const { Rect, Circle } = Shape;
const { Item, Group } = Toolbar;

interface IX6DndGraphProps {
  businessType?: string; // 业务类型，不同业务使用不同的图元集合
  customEdge?: any;
  customNode?: any;
  customReactNode?: any;
  data?: any;
}

export default class X6Canvas extends React.Component<IX6DndGraphProps, any> {
  container: HTMLDivElement | null = null;
  stencilContainer: HTMLDivElement | null = null;
  private graph: Graph | undefined;
  stencil: Stencil | undefined;
  constructor(props: IX6DndGraphProps) {
    super(props);
    const { customEdge = {}, customNode, customReactNode } = this.props;
    // 注册自定义变
    if (customEdge) {
      registerEdge(customEdge);
    }
    // 注册自定义X6节点【扩展节点操作】
    if (customNode) {
      registerNode(customNode);
    }
    // 注册基于React的X6节点【使用react ui】
    if (customReactNode) {
      registerReactNode(customReactNode);
    }
    this.state = {
      node: null
    };
  }
  componentDidMount() {
    this.graph = new Graph({
      container: this.container as HTMLDivElement,
      grid: true
    });
    // 使用插件形式的snapline【对齐线】
    this.graph.use(
      new Snapline({
        enabled: true,
        sharp: true
      })
    );
    this.graph.use(
      new Scroller({
        graph: this.graph,
        enabled: true,
        pageVisible: true,
        pageBreak: true,
        pannable: true
      })
    );
    this.graph.fromJSON(this.props.data);

    this.stencil = new Stencil({
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
          graphOptions: {}
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
      getDragNode: (node: any, options: any) => {
        return node.clone();
      },
      getDropNode: (node: any, options: any) => {
        // const ports = [
        //   {
        //     id: 'port1',
        //     attrs: {
        //       circle: {
        //         magnet: true
        //       }
        //     }
        //   },
        //   {
        //     id: 'port2',
        //     attrs: {
        //       circle: {
        //         magnet: true
        //       }
        //     }
        //   }
        // ];

        const newNode = node.clone();
        // newNode.addPorts(ports);
        return newNode;
      }
    });

    if (this.stencilContainer) {
      this.stencilContainer.appendChild(this.stencil.container);
    }

    const basenode = this.graph.createNode({
      shape: 'base-node'
    });
    const condition = this.graph.createNode({
      shape: 'react-condition'
    });
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

    console.log('wfh-----base', basenode);
    this.stencil.load([basenode, condition], 'trigger');
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
