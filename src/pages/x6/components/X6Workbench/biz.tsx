import React from 'react';
import { Markup } from '@antv/x6';
import { ReactShape } from '@antv/x6-react-shape';
import { WfhRect } from '../WfhRect';
import { WfhTriangle } from '../WfhTriangle';

// 公共的业务接口
interface IGraphOperations {
  getRegisterName(): string;
  removeNode?(args: any): boolean;
  canConnect?(args: string): boolean;
}

export class WfhDD extends ReactShape implements IGraphOperations {
  getRegisterName() {
    return 'wfh-DD';
  }

  removeNode(args: any): boolean {
    return true;
  }

  canConnect(args: string) {
    const NOT_CONNECTTION_TYPE = ['wfh-rect', 'wfh-triangle'];
    if (NOT_CONNECTTION_TYPE.includes(args)) {
      return false;
    }

    return true;
  }
}
WfhDD.config({
  width: 200,
  height: 80,
  component: <div>wfhdd</div>
});

// XXX业务节点
export class WfhDemoNode extends ReactShape implements IGraphOperations {
  mode: string = 'classic';
  setMode(mode: string) {
    this.mode = mode;
  }
  getRegisterName() {
    return 'wfh-demo';
  }

  removeNode(args: any): boolean {
    return true;
  }

  canConnect(args: string) {
    const NOT_CONNECTTION_TYPE = ['wfh-rect', 'wfh-triangle'];
    if (NOT_CONNECTTION_TYPE.includes(args)) {
      return false;
    }

    return true;
  }
}

WfhDemoNode.config({
  width: 200,
  height: 80,
  component: <WfhRect />
});

// 注册rect节点
export class WfhRectNode extends ReactShape implements IGraphOperations {
  getRegisterName() {
    return 'wfh-rect';
  }

  removeNode(args: any): boolean {
    return true;
  }

  canConnect(args: string) {
    const NOT_CONNECTTION_TYPE = ['wfh-rect'];
    if (NOT_CONNECTTION_TYPE.includes(args)) {
      return false;
    }

    return true;
  }
}

WfhRectNode.config({
  width: 160,
  height: 30,
  // component: <WfhRect />,
  portMarkup: [Markup.getForeignObjectMarkup()],
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
// 注册triangle节点
export class WfhTriangleNode extends ReactShape implements IGraphOperations {
  getRegisterName() {
    return 'wfh-triangle';
  }

  removeNode(args: any): boolean {
    return true;
  }

  canConnect(args: string) {
    const NOT_CONNECTTION_TYPE = ['wfh-triangle'];
    if (NOT_CONNECTTION_TYPE.includes(args)) {
      return false;
    }

    return true;
  }
}

WfhTriangleNode.config({
  width: 160,
  height: 30,
  component: <WfhTriangle />,
  portMarkup: [Markup.getForeignObjectMarkup()],
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
      { group: 'out', id: 'out2' }
    ]
  }
});
