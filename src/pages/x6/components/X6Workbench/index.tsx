import * as React from 'react';
import { Graph, Shape, Cell } from '@antv/x6';
import Immutable from 'immutable';
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
    window.oncontextmenu = function () {
      return false;
    };
    console.log('css====>', styles.ss);
    // 此处请求需要回填的数据
    this.graph = new Graph({
      container: this.container as HTMLDivElement,
      grid: true,
      panning: {
        enabled: true,
        modifiers: ['alt']
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
      }
    });
    this.graph?.on('cell:selected', (args: any) => {
      console.log('cell selected===>', args);
    });
    this.graph?.on('edge:selected', (args: any) => {
      console.log('edge selected');
    });
    this.graph?.on('node:selected', (args: any) => {
      console.log('node selected');
    });
    const { init } = this.props;
    setTimeout(() => {
      console.log('init==========>');
      init({
        dataList: MOCKDATA.nodes,
        edgeList: MOCKDATA.edges,
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
          width: 80,
          height: 40,
          shape: 'rect'
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

  render() {
    console.log('x6------render====>', this.props);
    return (
      <div className={styles.container}>
        <div className={styles.toolbar}>
          <button onClick={this.onChange}>dispatch</button>
        </div>
        <div className={styles.graph} ref={this.refContainer} />
        <div className={styles.config}>抽屉</div>
      </div>
    );
  }
}

export default X6Workbench;
