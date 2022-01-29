import { Graph } from '@antv/x6';
import { ContextMenuTool } from './Tools';

import { WfhDemoNode, WfhRectNode, WfhTriangleNode } from './biz';

// 注册业务节点
Graph.registerNode('wfh-demo', WfhDemoNode, true);
Graph.registerNode('wfh-rect', WfhRectNode, true);
Graph.registerNode('wfh-triangle', WfhTriangleNode, true);

// 注册tools
// 注册到系统中
Graph.registerEdgeTool('contextmenu', ContextMenuTool, true);
Graph.registerNodeTool('contextmenu', ContextMenuTool, true);
