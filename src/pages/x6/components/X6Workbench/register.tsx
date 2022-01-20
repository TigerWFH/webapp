import React from 'react';
import { Graph, Markup } from '@antv/x6';
import { ReactShape } from '@antv/x6-react-shape';
import { WfhRect } from '../WfhRect';
import { WfhTriangle } from '../WfhTriangle';
import { ContextMenuTool } from './Tools';

interface IGraphOperations {
  removeNode(args: any): boolean;
}

class WfhDemo extends ReactShape implements IGraphOperations {
  removeNode(args: any): boolean {
    return true;
  }
}

WfhDemo.config({
  width: 200,
  height: 80,
  component: <WfhRect />
});

Graph.registerNode('wfh-demo', WfhDemo);

// 注册rect节点
Graph.registerNode('wfh-rect', {
  inherit: 'react-shape',
  width: 160,
  height: 30,
  component: <WfhRect />,
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
Graph.registerNode('wfh-triangle', {
  inherit: 'react-shape',
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

// 注册tools
// 注册到系统中
Graph.registerEdgeTool('contextmenu', ContextMenuTool, true);
Graph.registerNodeTool('contextmenu', ContextMenuTool, true);
