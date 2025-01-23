// 用于支持自定义节点
import { Node, Edge, Cell, Shape, Dom } from '@antv/x6';
import { ReactShape, register } from '@antv/x6-react-shape';

export interface IResult {
  success: boolean;
  msg?: string; // 提示信息
  name?: string; // 节点名称
  edges?: Edge[]; // 没有配置的边节点
}

// 链接桩节点DOM结构
const PORT_MARKUP_CONFIG = {
  tagName: 'foreignObject',
  selector: 'fo',
  attrs: {
    width: 6,
    height: 6,
    x: -3,
    y: -3,
    zIndex: 10,
    // magnet决定是否可交互
    magnet: 'true'
  },
  children: [
    {
      ns: Dom.ns.xhtml,
      tagName: 'body',
      selector: 'foBody',
      attrs: {
        xmlns: Dom.ns.xhtml
      },
      style: {
        width: '100%',
        height: '100%'
      },
      children: [
        {
          tagName: 'span',
          selector: 'content',
          style: {
            width: '100%',
            height: '100%'
          }
        }
      ]
    }
  ]
};
// 链接桩群组定义
export const PORTS_CONFIG = {
  groups: {
    in: {
      position: { name: 'left' },
      zIndex: 2,
      markup: PORT_MARKUP_CONFIG
    },
    out: {
      position: { name: 'right' },
      zIndex: 2,
      markup: PORT_MARKUP_CONFIG
    },
    top: {
      position: { name: 'top' },
      markup: PORT_MARKUP_CONFIG
    },
    bottom: {
      position: { name: 'bottom' },
      markup: PORT_MARKUP_CONFIG
    }
  }
};

// 抽象节点的业务操作
export class BaseNode extends ReactShape {
  // eslint-disable-next-line class-methods-use-this
  isGroup() {
    return false;
  }

  remove(args: any): any {
    return super.remove(args);
  }

  //   判断节点是否有配置
  validateNodeConfig(): IResult {
    return {
      success: true
    };
  }
  //   判断节点outing边是否有配置
  validateOutgoingEdgeConfig(): IResult {
    return {
      success: true
    };
  }
  // 判断节点出边个数是否符合业务要求（默认至少1条出边）
  validatedNumberOfOutgoingEdges(): IResult {
    const { model, shape } = this;
    const { name } = this.getData() || {};
    if (shape !== 'end') {
      const outgoingEdges = model?.getOutgoingEdges(this) || [];

      if (outgoingEdges.length <= 0) {
        return {
          success: false,
          name
        };
      }
    }

    return {
      success: true
    };
  }

  // 判断节点入边个数是否符合业务要求（默认至少1条入边）开始节点和触发对象都没有入边
  validatedNumberOfIncomingEdges(): IResult {
    const { model, shape } = this;
    const { nodeGroupType } = this.getData() || {};
    if (shape !== 'start' && nodeGroupType !== 'TRIGGER_OBJ') {
      const incomingEdges = model?.getIncomingEdges(this) || [];
      const { name } = this.getData() || {};
      if (incomingEdges.length <= 0) {
        return {
          success: false,
          name
        };
      }
    }

    return {
      success: true
    };
  }

  // 获取出边
  countOutgoingEdges(): Edge[] {
    const { model } = this;
    const outgoingEdges = model?.getOutgoingEdges(this) || [];

    return outgoingEdges;
  }

  // 能否添加新出边
  canAddOutgoingEdge(
    edge?: Edge,
    sourceCell?: Cell,
    targetCell?: Cell
  ): IResult {
    const outgoingEdges = this.countOutgoingEdges();
    if (outgoingEdges.length > 0) {
      return {
        success: false,
        msg: '该节点不支持多条出边'
      };
    }

    return {
      success: true
    };
  }

  // source是否是事件网关
  beginWithEventNode(edge: Edge): boolean {
    const sourceNode = edge?.getSourceNode();
    // 事件网关后面只能跟中间事件和等待事件
    if (sourceNode && sourceNode.shape === 'event') {
      return true;
    }

    return false;
  }

  // 获取入边
  countIncomingEdges(): Edge[] {
    const { model } = this;
    const incomingEdges = model?.getIncomingEdges(this) || [];

    return incomingEdges;
  }

  // 能否添加新入边【在validateConnection钩子中校验】
  canAddIncomingEdge(
    edge: Edge,
    sourceCell?: Cell,
    targetCell?: Cell
  ): IResult {
    const beginWithEvent = this.beginWithEventNode(edge);
    if (beginWithEvent) {
      return {
        success: false,
        msg: '事件网关后面仅限等待事件和中间事件'
      };
    }

    const incomingEdges = this.countIncomingEdges();
    // 大于0就不能接入新边
    if (incomingEdges.length > 0) {
      return {
        success: false,
        msg: '该节点不支持多条入边'
      };
    }

    return {
      success: true
    };
  }
}
Node.registry.register('base-node', BaseNode, true);

// 抽闲边操作
export class BaseEdge extends Shape.Edge {
  isGroupEdge(): boolean {
    return false;
  }

  withoutTagetOrSourceNode(): boolean {
    const source = this.getSourceNode();
    const target = this.getTargetNode();

    return !source || !target;
  }
}

Edge.registry.register('base-edge', BaseEdge, true);

// 向X6系统注册自定义节点
export function registerNode(keyToNode: any) {
  Object.keys(keyToNode).forEach((key) =>
    Node.registry.register(key, keyToNode[key], true)
  );
}

// 向X6系统注册自定义边
export function registerEdge(keyToEdge: any) {
  Object.keys(keyToEdge).forEach((key) => {
    Edge.registry.register(key, keyToEdge[key], true);
  });
}

export function registerReactNode(keyToReactNode: any[]) {
  keyToReactNode.forEach((item) => {
    register({
      inherit: 'base-node',
      ...item
    });
  });
}
