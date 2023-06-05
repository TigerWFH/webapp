# XFlow

https://www.yuque.com/antv/x6/thk2z7

```js
/*
  视图（React组件）：XFlow、XFlowcanvas
  应用逻辑（Application）：FrontendApplication
  应用配置（Config）：ExtensionRegistry，存储在配置上下文（ReactContext上）

  XFlow是起点，维护状态
    appRef：指向应用实例Application
    appContainerRef：指向HTMLDivElement
      XFlowCanvas：


*/
```

## 画布配置：createGraphConfig<https://xflow.antv.vision/docs/tutorial-core-components/xflow-canvas-component>

> XFlow 和 XFlowCanvas 都支持配置，优先级未定

- `setX6Config`(options: X6Graph.Options) => void,配置 GraphOptions,x6 画布的配置
- `setNodeRender`(renderKey: string, component: NsGraphConfig.INodeRender) => void,设置 renderKey 和对应 React 组件
- `setEdgeRender`(renderKey: string, component: NsGraphConfig.IEdgeRender) => void,设置 renderKey 和对应 React 组件
- `setNodeTypeParser`(parser: (nodeData: NsGraph.INodeConfig) => string) => void,设置解析 node render key 的 parser
- `setEdgeTypeParser`(parser: (edgeData: NsGraph.INodeConfig) => string) => void,设置解析 edge render key 的 parser
- `setEvents`(events: GraphEvent[]) => void,配置 GraphEvents

- `createGraphConfig`配置画布

```js
import { createGraphConfig } from '@antv/xflow';
import Node1 from './react-node/node1';
import Edge1 from './react-edge/edge1';

export const useGraphConfig = createGraphConfig((config) => {
  /** Setting the canvas configuration item will override the XFlow default canvas configuration item */
  config.setX6Config({
    grid: true,
    scaling: { min: 0.2, max: 3 },
    mousewheel: { enabled: true, zoomAtMousePosition: true }
  });

  /** Set the React node that the canvas needs to render, and the React content on the connection */
  config.setNodeRender('NODE1', (props) => <Node1 {...props} />);
  config.setEdgeRender('EDGE1', (props) => <Edge1 {...props} />);
});
```

## XFlow

> XFlow 工作台组件是 XFlow 的核心组件之一, 可以理解为是一个图编辑应用的工作空间, 它包含了画布组件、各种交互组件等。

> XFlow 支持在工作台初始化之前传入 Meta 元信息, 该元信息会被存储在全局的 ModelService 实例中, 在整个 XFlow 工作空间可用。

> `XFlow 内部会自动进行画布内容 Diff, 相同节点、连线不会重新渲染`

> `XFlow提供了执行命令的钩子, 允许用户提前预设好service层的行为, 在触发某个具体命令时, 会自动调用钩子里的service逻辑。`

> `Flow内置了若干全局状态, 比如画布当前选中的节点/连线、 画布的缩放比例等, 这些全局状态可以在画布中使用、在配套的交互组件中使用, 方便实现画布与交互组件的联动效`

### XFlow 的 props 属性

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

### XFlow 的命令钩子：CommandConfig，Hook 之一

- `createCmdConfig`创建执行命令的 hook<https://xflow.antv.vision/zh-CN/api/hooks>

```js
import { XFlow, DisposableCollection, createCmdConfig } from '@antv/xflow';
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

### XFlow 的全局状态钩子：ModelServiceConfig，Hook 之一

- `createModelServiceConfig`配置 model

```js
import type { IModelService } from '@antv/xflow'
import { XFlow, createModelServiceConfig } from '@antv/xflow'

export namespace NS_LOADING_STATE {
  export const id = 'custom-loading'
  export interface IState {
    loading: boolean
  }
  export const getValue = async (contextService: IModelService) => {
    const ctx = await contextService.awaitModel<NS_LOADING_STATE.IState>(NS_LOADING_STATE.id)
    return ctx.getValidValue()
  }
}

export const useModelServiceConfig = createModelServiceConfig(config => {
  config.registerModel(registry => {
    return registry.registerModel({
      id: NS_LOADING_STATE.id,
      getInitialValue: () => {
        loading: true
      },
    })
  })
})
export const Demo = () => {
  const modelServiceConfig = useModelServiceConfig()
  return <XFlow modelServiceConfig={modelServiceConfig}></XFlow>
}
```

### XFlow 的 Hook

- `createHookConfig`配置 GraphOptions 的 hook<https://xflow.antv.vision/zh-CN/api/hooks>

  > createGraphConfig 配置 GraphOptions 值，有点懵逼

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

### XFlow 其它

- `onLoad：`回调函数
- ``

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

> XFlow 组件的配置项中使用：通过函数的参数可以获得 CommandServic

## 源码

```ts
export const initHooks = () => ({
  graphOptions: new HookHub<Graph.Options>(),
  reactNodeRender: new HookHub<Map<string, NsGraph.INodeRender>>(),
  reactEdgeLabelRender: new HookHub<Map<string, NsGraph.IEdgeRender>>(),
  afterGraphInit: new HookHub<IGeneralAppService>(),
  beforeGraphDestroy: new HookHub<IGeneralAppService>(),
  x6Events: new HookHub<IEventCollection, IEventSubscription>()
});
```

## XFlow 扩展

> 对比：x6 vs antd；xflow vs procomponent
>
> x6 提供了图编辑的各种原子能力；xflow 是图编辑场景应用，通过 App 扩展系统、状态管理、命令模式实现对 X6 的原子能力的组合封装
>
> 在 XFlow 中扩展逻辑都是通过 Hook 来完成，XFlow 内部可以注册 Hook 逻辑来完成对 `Graph 配置`和 `Command 的 扩展`
>
> - `createHookConfig`
> - `createCmdConfig`

### XFLow 核心模块

- `Model`createModelServiceConfig，使用全局状态
  > - XFlow 内置了常用的 Model 在事件回调和渲染 UI 组件时使用，
  > - Model 通过监听`画布（X6）的事件`来更新内部的值，
  > - `组件`通过订阅 Model 的变化可以实现组件渲染的更新
- `Command`createCmdConfig，使用 Command 执行 x6 api，改变全局状态
- `Hook`createHookConfig，使用 Hook 扩展 Command
- `X6 Graph module`

```js
/*
  -----------                         ------------------                        -----------------
 |           | ----MouseEvent----->  | CommandService   |   ---CallApi------>  |   X6 Graph      |
 |           |  KeyboardEvent        |   executeCommand |      hook时机？       |                 |
 |    UI     |                       |                  |                      |     X6 GraphApis|
 | Component |                        ------------------                       |.................|
 |           |                                                                 |                 |
 |           |                       -------------------                       |     X6 event    |
 |           |                      |   Model Service   |                      |                 |
 |           |    <----setState---- |    setValue       | <-------bindEvent--- |                 |
 |           |                      |    getValue       |                      |                 |
  -----------                       ---------------------                       -----------------


  在XFLow中，通过Model驱动React UI组件的更新渲染。
    通过监听事件，在事件的回调函数中调用Model的setValue方法更新Model
    在UI组件中，通过Model的watch方法更新组件内部的State，实现组件渲染更新

    获取ModelService：通过useXFlowApp获取CommandService；通过参数获取CommandService
    消费XFlow内置的ModelService：
        import {MODELS} from '@antv/xflow'

        const getModel = async () => {
          // value
          const graphScale = await MODELS.GRAPH_SCALE.useValue(modelService)
          // model
          const graphScaleModel = await MODELS.GRAPH_SCALE.getModel(modelService)
        }
    在XFlow中自定义Model：
*/
```

### 【@antv/xflow-core】

- `依赖注入`

```js
/*
    控制反转思想，是为了程序解耦

    依赖注入是实现 控制反转 的一种设计方法，并不是说依赖注入 等于 控制反转（Inversion of Control， IoC）
    控制反转是思想
    依赖注入是 控制反转思想的 实现方式

    SOLID原则：
    OOP：
    IoC：
  */
```

#### XFlow

> XFlow 引入 `ExtensionRegistryContext` 即 ReactContext，作为 Provider，共享 `ExtensionRegistry` 实例
>
> XFlow 引入 `ExtensionRegistry`和`createExtensionRegistry`，通过`createExtensionRegistry`创建`ExtensionRegistry`
>
> `FrontendApplication`: 重点

#### XFlowAppExtensionModule

> 通过 useExtensionRegistry，获取 ExtensionRegistry 配置实例
>
> 通过 ExtensionRegistry 实例，通过 addExtension 将 config 和 createModule 存储到应用配置实例中

#### XFlowCanvas

> 调用配置中心的 addCoreModule 函数，将扩展组件中的

#### DagGraphExtension【待仔细研究】

> 通过`XFlowAppExtensionModule`将 config 和 createModule 【createDagExtensionModule】注入到配置实例中

#### createDagExtensionModule

>

#### useExtensionRegistry

```ts
import React from 'react';
import { ExtensionRegistry } from './extension-registry';

/** 通过context收集extension的配置 */
export const ExtensionRegistryContext = React.createContext<ExtensionRegistry>(
  {} as ExtensionRegistry
);

export const useExtensionRegistry = () => {
  return React.useContext(ExtensionRegistryContext);
};

export { ExtensionRegistry };
```

#### ManaSyringe【InversifyJS】

> mana-syringe<https://www.npmjs.com/package/mana-syringe>
>
> 提供易于使用的依赖注入容器，参考 TSyringe 项目，参考并基于 inversify

- `标识token：`
  > - `Token<T> = string | symbole | Newable<T> | Abstract<T> | Syringe.DefineToken<T>`
  > - `Syringe.defineToken()`定义标识 token
- `容器Container：`包含标识和注入对象关系描述的上下文。容器会根据注入对象及其标识的关系自动构建所需要的实例
  > - `register<T = any>(options: Syringe.InjectOption<T>): void`
  > - `register<T = any>(token: Syringe.Token<T>, options?: Syring.InjectOption<T>: void)`
- `生命期lifecycle：`容器会根据注入对象的生命期米哦啊叔托管这些对象，决定是否使用缓存等
- `注册类和别名：`
  > - `token：`通过 token 注册，关系是独立的，获取不同的对象
  > - `contrib：`通过 contrib 注册是别名关系，获取到通过一个对象
- `模块：`可以通过用一组注册动作创建一个模块，方便在不同容器上下文间内夹在
- `扩展点Contribution`
  > - `Contribution`
- `装饰器`

  > - `injectable：`通用装饰器，接受所有绑定绑定描述参数
  > - `singleton：`单例装饰器，接受除生命周期外的描述参数
  > - `transient：`多例装饰器，接受除生命周期外的描述参数
  > - `inject：`注入，接受注入标识作为参数，并接受类型描述
  > - `contrib`

- `ManaSyringe.Syringe.defineToken()`
  > - 注入标识 token
  > - 注入对象所使用的标识，可以带类型约束
- `ManaSyringe.Module()`
- `ManaSyringe.injectable`
- `ManaSyringe.inject`

#### type

- `IExtensionModule`
- `IExtensionModule`
- `IArgsBase`
- `IHooks`
- `IModuleConfig`
- `ICommandHandler`
- `ICommandContextProvider`

#### delay

#### DisposableCollection

#### NsGraph

#### XFlowConstants

### @antv/xflow-hook

#### HookHub

### 【@antv/xflow-core/es/model-service/constant】

#### getModelUtil useModelValueUtil

## 【X6】

### Graph Path Registry Shape Node

## 参考资料

[参考资料：依赖倒置](https://www.cnblogs.com/dashnowords/p/14380955.html)
