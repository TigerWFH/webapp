# XFlow

https://www.yuque.com/antv/x6/thk2z7

## Hook

> 分为两类

- `GraphHook:`配置 Graph 相关的配置项
  - `graphOptions`x6 graph 配置项
  - `x6Events`绑定 X6 的事件
  - `reactNodeRender`自定义节点 React 组件
  - `reactEdgeLabelRender`自定义连线 label 的 React 组件
  - `afterGraphInit`在 Graph 实例化后执行的逻辑
  - `beforeGraphDestroy`在 Graph 销毁前执行的逻辑

```js
export const useGraphHookConfig = createHookConfig((config) => {
  config.setRegisterHook((hooks) => {
    const disposableList = [
      // 注册修改graphOptions配置的钩子
      hooks.graphOptions.registerHook({
        name: 'custom-x6-options',
        handler: async (options) => {
          options.grid = false;
          options.keyboard = {
            enabled: true
          };
        }
      })
    ];
    const toDispose = new DisposableCollection();
    toDispose.pushAll(disposableList);
    return toDispose;
  });
});
```

- `CommandHook:`配置可以修改 Command 参数的逻辑
  > INodeHooks & IEdgeHooks & IGroupHooks & IGraphHooks & IModelHooks

```js
export const useCmdConfig = createCmdConfig((config) => {
  /** 设置hook */
  config.setRegisterHookFn((hooks) => {
    const list = [
      hooks.addNode.registerHook({
        name: 'addNodeHook',
        handler: async (args) => {
          args.createNodeService = MockApi.addNode;
        }
      }),
      hooks.addEdge.registerHook({
        name: 'addEdgeHook',
        handler: async (args) => {
          args.createEdgeService = MockApi.addEdge;
        }
      })
    ];
    const toDispose = new DisposableCollection();
    toDispose.pushAll(list);
    return toDispose;
  });
});
```

## XFlow

> XFlow 工作台组件是 XFlow 的核心组件之一, 可以理解为是一个图编辑应用的工作空间, 它包含了画布组件、各种交互组件等。

> XFlow 支持在工作台初始化之前传入 Meta 元信息, 该元信息会被存储在全局的 ModelService 实例中, 在整个 XFlow 工作空间可用。

> `XFlow 内部会自动进行画布内容 Diff, 相同节点、连线不会重新渲染`

> `XFlow提供了执行命令的钩子, 允许用户提前预设好service层的行为, 在触发某个具体命令时, 会自动调用钩子里的service逻辑。`

> `Flow内置了若干全局状态, 比如画布当前选中的节点/连线、 画布的缩放比例等, 这些全局状态可以在画布中使用、在配套的交互组件中使用, 方便实现画布与交互组件的联动效`

### props 属性

- `meta:`工作台组件元信息, 会储存在全局 Model 中并在调用 Service 时作为额外的参数传入
  - `flowId`
- `graphConfig:`画布的配置，用于配置 X6 的 Graph.Options 和绑定 Graph 的事件
- `graphData:`画布数据
- `graphLayout: `布局配置项
- `onLoad:`可选项，app 初始化成功的回调
- `isAutoCenter:`画布居中配置
- `hookConfig:`核心模块钩子函数，可以配置额外的业务逻辑包括以下 4 个 hook。
  - graphOptions: 在实例化 X6 之前执行
  - afterGraphInit: 在实例化 X6 后执行
  - x6Events: 在实例化 X6 后绑定事件
  - beforeGraphDestroy: 在 X6 实例销毁前执行
- `modelServiceConfig:`可以在这里扩展工作台全局状态
- `commandConfig:`在这里配置命令的 hook
- `onAppDestroy:`xflow app 销毁前的回调
- `onAppConfigReady:`xflow app 初始化后的回调
- `style:`app container style
- `className:`app container classname
- `xflowPrefixCls:`xflow less 文件中的 prefix 变量

### 实例属性

- `createGraphConfig`画布配置
- `createCmdConfig`
- `XFLow App`
  - `getGraphInstance:`异步？
  - `getGraphConfig:`异步？
  - `executeCommand`

## XFlowCanvas

> XFlowCanvas 是 XFlow 最核心的画布组件, 它封装了 X6 提供的画布, 提供默认画布配置项、透传 X6 支持的所有事件并提供类型推导, 同时也允许用户自定义需要渲染的 React 节点和连线上需要渲染的 React 内容。

> GraphConfig 是 XFlowCanvas 画布组件的配置类, 已经默认生成实例并设置了初始值。如果想自定义 GrpahConfig, 可以通过 createGraphConfig 方法覆写

### props 属性

- `config:`
- `style:`
- `className:`
- `isXFlowCanvas:`
- `position:`

## Model

> createModelServiceConfig:全局状态

## Command

> createCmdConfig: 使用 Command 执行 X6 api 改变全局状态

> CommandService.excuteCommand 执行

> React 组件内部使用： 通过 useXFlowApp 来获取 CommandService

> XFlow 组件的配置项中使用：通过函数的参数可以获得 CommandService

## Hook

> createHookConfig: 使用 Hook 扩展 Command 逻辑
