import React from 'react';
import { Graph, Markup } from '@antv/x6';
import { WfhShape } from './MyNodes';
import { ContextMenuTool } from './Tools';

// 注册自定义节点
Graph.registerNode('wfh-shape', {
  inherit: 'react-shape',
  x: 200,
  y: 150,
  width: 160,
  height: 30,
  component: <WfhShape />,
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

// 注册tools
// 注册到系统中
Graph.registerEdgeTool('contextmenu', ContextMenuTool, true);
Graph.registerNodeTool('contextmenu', ContextMenuTool, true);
