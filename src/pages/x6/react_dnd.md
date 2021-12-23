# DAG 有向无环图

## 术语和概念<https://react-dnd.github.io/react-dnd/docs/overview>

> ReactDND 架构类似 Flux 和 Redux，其内部实现使用了 Redux。DnD state via flux
>
> Item objects and types
>
> DnD state via flux
>
> Monitors for observing DnD state
>
> Collector functions for turning monitor output into consumable props
>
> Connectors for attaching the DnD state machine to view nodes
>
> ReactDND 使用 data，而不是 view。当拖拽进行时，ReactDND 认为是指定类型的 Item（Data）的转移，而不是组件（View）的移动

- `drag：`拖拽
- `drop：`放下、落下
- `drag sources：`
- `drop targets：`
- `collecting function：`收集函数。React DnD then takes care of timely calling your collecting function and merging its return value into your components' props.

```js
function collect(monitor) {
  return {
    highlighted: monitor.canDrop(),
    hovered: monitor.isOver()
  };
}
```

- `Item：`纯 JS 对象，用于描述被拖动的对象。Describing the dragged data as a plain object helps you keep the components decoupled and unaware of each other
  - `Type：`Item 标识，String 或 Symbol，在应用中具有唯一性。The types let you specify which drag sources and drop targets are compatible
- `Monitors：`drag 和 drop 操作行为，自身也具有状态。Monitors 会存储操作行为的状态。ReactDND 通过 monitors 将这些状态暴露给你的组件。The monitors let you update the props of your components in response to the drag and drop state changes.

  > drag and drop 是由状态的，拖拽中或者拖拽结束。DnD 内部使用 monitors 接口，将拖拽状态暴露给用户组件使用，包括 type 和 item 数据。monitors 可以用来根据拖拽状态，更新对应组件的 props 属性
  >
  > 对于需要跟踪拖拽状态的组件，可以定义 collect 函数，用于从 monitors 接收拖拽状态，并计算组件新的 props，DnD 系统会将 collect 返回值和组件已有的 class component props 做合并或者 function compomnent 的状态

- `Connectors：`The connectors let you assign one of the predefined roles (a drag source, a drag preview, or a drop target) to the DOM nodes in your renderfunction.

## APIs

### common APIs

- `DndProvider：`The DndProvider component provides React-DnD capabilities to your application
  - `props.backend：`A React DnD backend
  - `props.context：`The backend context used to configure the backend
  - `props.options：`An options object used to configure the backend

```jsx
<DndProvider backend={HTML5Backend}>// your app</DndProvider>
```

- `DragPreviewImage：`A Component to render an HTML Image element as a disconnected drag preview
  - `props.connect：`Required. The drag preview connector function

### a modern hooks-based API

- `useDrag(DragSpec, deps): [CollectedProps, DragSourceRef, DragPreviewRef]`
- `useDrop(DropSpec, deps): [CollectedProps, DropTargetREf]`
- `useDragLayer(collec): object`
- `useDragDropManager`

### the classic Decorators-based API

- `DataSource`
- `DropTarget`
- `DrawLayer`
- `DragSourceConnector`
- `DropTargetConnector`

## Monitoring State

- `DragSourceMonitor：`DragSourceMonitoris an object passed to a collecting function of a hooks-based or decorator-based dragging source. Its methods let you get information about the drag state of a specific drag source
  - `canDrag()`
  - `isDragging()`
  - `getItemType()`
  - `getItem()`
  - `getDropResult()`
  - `didDrop()`
  - `getInitialClientOffset()`
  - `getInitialSourceClientOffset()`
  - `getClientOffset()`
  - `getDifferenceFromInitialOffset()`
  - `getSourceClientOffset()`
- `DropTargetMonitor`
  - `canDrop()`
  - `isOver(options)`
  - `getItemType()`
  - `getItem()`
  - `getDropResult()`
  - `didDrop()`
  - `getInitialClientOffset()`
  - `getInitialSourceClientOffset()`
  - `getClientOffset()`
  - `getDifferenceFromInitialOffset()`
  - `getSourceClientOffset()`
- `DragLayerMonitor`
  - `isDragging()`
  - `getItemType()`
  - `getItem()`
  - `getInitialClientOffset()`
  - `getInitialSourceClientOffset()`
  - `getClientOffset()`
  - `getDifferenceFromInitialOffset()`
  - `getSourceClientOffset()`

## react-beautiful-dnd

## react-smooth-dnd

## react-dnd(Drag and Drop for React)

> Dan Abramov 创造的一组 React 高阶组件，可以在保持组件分离的前提下帮助构建复杂的拖放接口

- `Backends:`

> ReactDnD 使用了 HTML5 的拖拽 API。但是兼容性不好，在触摸屏上无效。所以就以插件形式提供了基于 HTML5 拖拽 API 的实现。在 ReactDND 中，这种实现了拖拽功能的插件就被称为 backends。
>
> react-dnd-html5-backend：默认
>
> react-dnd-touch-backend：用于触摸屏

- `Specification Object`

- `DragSpec：`useDrag 第一个入参规范
  - `type:`
  - `item:`
  - `previewOptions:`
  - `options:`
    - `dropEffect`
  - `end(item, monitor)`: 拖拽结束，调用该函数，通过 monitor 的 didDrop 和 getDropResult 获取 dropResult。触发 actions
  - `canDrag(monitor)`
  - `isDragging(monitor)`
  - `collect(monitor, props):`处理 props，如果是 class compoennt，就以合并到组件的 props；如果是 hook，则是状态
- `DropSpec：`useDrop 第一个入参规范

  - `accept`
  - `options`
  - `hover(item, monitor)`
  - `canDrop(item, monitor)`
  - `drop(item, monitor):` 拖拽结束，触发 actions
  - `collect(monitor, props):`处理 props

- `DragSourceMonitor`

  - `canDrag()`
  - `isDragging()`

  - `getDropResult()`：可以再拖拽容器的 drop()函数中指定该返回结果
  - `didDrop()`

  - `getItemType()`
  - `getItem()`
  - `getInitialClientOffset()`
  - `getInitialSourceClientOffset()`
  - `getClientOffset()`
  - `getDifferenceFromInitialOffset()`
  - `getSourceClientOffset()`

```js
/*
description：将目标组件转换成DnD系统的drag source（拖拽对象）
params:
  spec: Object | Function, 符合DnD规范的对象既Specification Object
    Specification Object:
      type: 唯一识别符号
      item: Object | Funciton，拖拽的数据 或 拖拽开始时触发的函数，drop targets唯一可用的关于drop source的数据
      previewOptions: 描述drag preview的配置项
      options:
        dropEffect: [move, copy]，drop effect类型
      end: (item, monitor) => any，拖拽结束，调用该函数
      canDrag: (monitor) => any
      isDragging: (monitor) => any
      collect: (connector, monitor, props) => any, collection函数，返回注入到，目标组件的数据

  deps: A dependency array used for memoization，类似useMemo
return:
  [0]: collected Props，collect函数返回值，或空对象
  [1]: drag，drag source的connector函数
  [2]: dragPreview，drag preview的connector函数
*/
// 官方
const [collected, drag, dragPreview] = useDrag(() => ({
type: '',
item: '',
end: (item. monitor) => {
  // 拖拽结束执行该函数
},
previewOptions: {},
options: {},
canDrag: (monitor) => {},
idDragging: (monitor) => {},
collect: (monitor, props) => {}
}), [])
// 个人
const [{ opacity }, drag] = useDrag(() => ({
type: '123',
item: { name },
end: (item, monitor) => {
  const dropResult: any = monitor.getDropResult();
  console.log('end-dropResult=======>', dropResult);
  if (item && dropResult) {
    let msg = '';
    const isDropAllowed =
      dropResult.allowedDrop === 'any' ||
      dropResult.allowedDrop === dropResult.dropEffect;
    if (isDropAllowed) {
      const isCopyAction = dropResult.dropEffect === 'copy';
      const actionName = isCopyAction ? 'copied' : 'moved';
      msg = 'XXXXXX';
    } else {
      msg = 'OOOOOO';
    }

    alert(msg);
  }
},
collect: (monitor) => ({
  opacity: monitor.isDragging() ? 0.4 : 1
})
}));
```

- `useDrop`

```js
/*
    description: 将组件转换成DnD系统中的drop target（拖拽容器）
    params: Object | Function, 符合DnD规范的对象既Specification Object
      accept：
      options：
      drop：(item, monitor) => {}, 当获取到拖拽元素时，调用
      hover: (item, monitor) => {}
      canDrop: (item, monitor) => {}
      collect: (monitor, props) => {}
    deps: A dependency array used for memoization，类似useMemo
    return:
      [0]: collectedProps
      [1]: drop
  */
//  官方
const [collectedProps, drop] = useDrop(() => ({
  accept
}));
```

- `useDragLayer`

```js
/**/
const collectedProps = useDragLayer(() => ({
  collect: (monitor) => ({})
}));
```

- `useDragDropManager`

```js
const dragDropManager = useDragDropManager();
```

[ReactDnD 资料](https://www.jianshu.com/p/8a1e16d5519b)

## react-dnd-html5-backend

> React Dnd 官方支持的 HTML5 backend

## @antv/x6

## @antv/x6-react-components

## @antv/x6-react-shape
