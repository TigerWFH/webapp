# XFlow

https://www.yuque.com/antv/x6/thk2z7

## XFlow

> XFlow 工作台组件是 XFlow 的核心组件之一, 可以理解为是一个图编辑应用的工作空间, 它包含了画布组件、各种交互组件等。

> XFlow 支持在工作台初始化之前传入 Meta 元信息, 该元信息会被存储在全局的 ModelService 实例中, 在整个 XFlow 工作空间可用。

> `XFlow 内部会自动进行画布内容 Diff, 相同节点、连线不会重新渲染`

> `XFlow提供了执行命令的钩子, 允许用户提前预设好service层的行为, 在触发某个具体命令时, 会自动调用钩子里的service逻辑。`

> `Flow内置了若干全局状态, 比如画布当前选中的节点/连线、 画布的缩放比例等, 这些全局状态可以在画布中使用、在配套的交互组件中使用, 方便实现画布与交互组件的联动效`

- `graphData:`画布数据
- `graphLayout: `布局算法 Layout，支持@antv/layout

- `createGraphConfig`画布配置
- `createCmdConfig`
- `onLoad`XFlow 初始化完成后的回掉，会灌入 XFlow 实例 app，app 提供的 api 都是异步的？？？待确定
- `XFLow App`
  - `getGraphInstance:`异步？
  - `getGraphConfig:`异步？
  - `executeCommand`

## XFlowCanvas

> XFlowCanvas 是 XFlow 最核心的画布组件, 它封装了 X6 提供的画布, 提供默认画布配置项、透传 X6 支持的所有事件并提供类型推导, 同时也允许用户自定义需要渲染的 React 节点和连线上需要渲染的 React 内容。

> GraphConfig 是 XFlowCanvas 画布组件的配置类, 已经默认生成实例并设置了初始值。如果想自定义 GrpahConfig, 可以通过 createGraphConfig 方法覆写

> - `setX6Config`
> - `setNodeRender`
> - `setEdgeRender`
> - `setNodeTypeParser`
> - `setEdgeTypeParser`
> - `setEvents`

## Model

> createModelServiceConfig:全局状态

## Command

> createCmdConfig: 使用 Command 执行 X6 api 改变全局状态

> CommandService.excuteCommand 执行

> React 组件内部使用： 通过 useXFlowApp 来获取 CommandService

> XFlow 组件的配置项中使用：通过函数的参数可以获得 CommandService

## Hook

> createHookConfig: 使用 Hook 扩展 Command 逻辑
