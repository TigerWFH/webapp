// import React, { useState, useRef, useEffect } from 'react';
// import { AlgoNode } from './xflow/react-node/algo-node';
// import { GroupNode } from './xflow/react-node/group';
// import { DND_RENDER_ID, GROUP_NODE_RENDER_ID } from './xflow/constant';
// import {
//   XFlow,
//   XFlowCanvas,
//   // CanvasSnapline,
//   // CanvasNodePortTooltip,
//   // NodeCollapsePanel,
//   // CanvasScaleToolbar,
//   // CanvasContextMenu,
//   DagGraphExtension,
//   // createCmdConfig,
//   // createHookConfig,
//   // DisposableCollection,
//   createGraphConfig
// } from '@antv/xflow';

// const nodes = [
//   {
//     id: 'root1',
//     width: 150,
//     height: 40,
//     renderKey: DND_RENDER_ID,
//     text: '节点1'
//   },
//   {
//     id: 'down1',
//     width: 150,
//     height: 40,
//     renderKey: DND_RENDER_ID,
//     text: '节点2'
//   },
//   {
//     id: 'down2',
//     width: 150,
//     height: 40,
//     renderKey: DND_RENDER_ID,
//     text: '节点3'
//   },
//   {
//     id: 'down3',
//     width: 150,
//     height: 40,
//     renderKey: DND_RENDER_ID,
//     text: '节点4'
//   }
// ];
// const edges = [
//   { id: 'root1-down1', source: 'root1', target: 'down1', label: '1:1' },
//   { id: 'root1-down2', source: 'root1', target: 'down2', label: '1:N' },
//   { id: 'root1-down3', source: 'root1', target: 'down3', label: 'N:N' }
// ];

// const mockGraphData: any = {
//   edges,
//   nodes
// };

// // 画布配置
// const useGraphConfig = createGraphConfig((config) => {
//   /** 设置XFlow画布配置项 */
//   config.setX6Config({
//     /** 画布网格 */
//     grid: true,
//     /** 画布缩放等级 */
//     scaling: {
//       min: 0.2,
//       max: 1
//     }
//   });

//   /** 设置XFlow画布需要渲染的React节点/边 */
//   config.setNodeRender(DND_RENDER_ID, (props) => <AlgoNode {...props} />);
//   config.setNodeRender(GROUP_NODE_RENDER_ID, GroupNode);
//   // config.setEdgeRender('EDGE1', (props) => <Edge1 {...props} />);
//   // config.setEdgeRender('EDGE2', (props) => <Edge2 {...props} />);
//   // config.setNodeTypeParser((node) => node?.renderKey as string);
// });

// // 画布hook
// // const useGraphHookConfig = createHookConfig((config, proxy) => {
// //   const props = proxy.getValue();
// //   console.log('graphHookConfig', props);
// //   config.setRegisterHook((hooks) => {
// //     const disposableList = [
// //       // 注册修改graphOptions配置的钩子
// //       hooks.graphOptions.registerHook({
// //         name: 'custom-x6-options',
// //         after: 'dag-extension-x6-options',
// //         handler: async (options) => {
// //           console.log('graphOptions---hook');
// //           // 画布配置调整
// //           options.grid = false;
// //           options.keyboard = {
// //             enabled: true
// //           };
// //         }
// //       }),
// //       // 注册增加 graph event
// //       hooks.x6Events.registerHook({
// //         name: 'add',
// //         handler: async (events) => {
// //           console.log('x6Events---hook');
// //           // events.push({
// //           //   eventName: 'node:moved',
// //           //   callback: (e, cmds) => {
// //           //     const { node } = e;
// //           //     cmds.executeCommand<NsNodeCmd.MoveNode.IArgs>(
// //           //       XFlowNodeCommands.MOVE_NODE.id,
// //           //       {
// //           //         id: node.id,
// //           //         position: node.getPosition()
// //           //       }
// //           //     );
// //           //   }
// //           // });
// //         }
// //       })
// //       // 注册增加 react Node Render
// //       // hooks.reactNodeRender.registerHook({
// //       //   name: 'add react node',
// //       //   handler: async (renderMap) => {
// //       //     console.log('reactNodeRender---hook');
// //       //     renderMap.set(DND_RENDER_ID, AlgoNode);
// //       //     renderMap.set(GROUP_NODE_RENDER_ID, GroupNode);
// //       //     console.log('reactNodeRender---hook-end');
// //       //   }
// //       // })
// //     ];
// //     const toDispose = new DisposableCollection();
// //     toDispose.pushAll(disposableList);
// //     return toDispose;
// //   });
// // });

// // 命令hook
// // const useCmdConfig = createCmdConfig((config) => {
// //   config.setRegisterHookFn((hooks) => {
// //     return hooks.addNode.registerHook({
// //       name: 'get node config data from backend api',
// //       handler: async (args: any) => {
// //         debugger;
// //         console.log('addNode-hook===>', args);
// //       }
// //     });
// //   });
// // });

// interface IXflowDemo {
//   graphData: any;
// }
// function XflowDemo(props: IXflowDemo) {
//   const appRef = useRef(null);
//   const graphConfig = useGraphConfig(props);
//   const { graphData } = props;
//   const [renderGraphData, setRenderGraphData] = useState(graphData);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setRenderGraphData(mockGraphData);
//       console.log('renderGRaph====>', mockGraphData);
//     }, 1000);

//     console.log('useEffect6666666');

//     return () => {
//       clearTimeout(timer);
//     };
//   }, []);

//   const onLoad = async (app: any) => {
//     appRef.current = app;
//     console.log('onLoad===>', app);
//   };
//   return (
//     <div>
//       <XFlow
//         className="dag-user-custom-clz"
//         graphData={renderGraphData}
//         graphLayout={{
//           layoutType: 'dagre',
//           layoutOptions: {
//             type: 'dagre',
//             rankdir: 'TB',
//             nodesep: 60,
//             ranksep: 40
//           }
//         }}
//         isAutoCenter={true}
//         onLoad={onLoad}>
//         <DagGraphExtension />
//         <XFlowCanvas
//           position={{ top: 40, left: 230, right: 290, bottom: 0 }}
//           config={graphConfig as any}>
//           {/* <CanvasScaleToolbar position={{ top: 12, right: 12 }} /> */}
//           {/* <CanvasContextMenu config={menuConfig} /> */}
//           {/* <CanvasSnapline color="#faad14" /> */}
//           {/* <CanvasNodePortTooltip /> */}
//         </XFlowCanvas>
//       </XFlow>
//     </div>
//   );
// }

// export default XflowDemo;
