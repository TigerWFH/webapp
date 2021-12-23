# X6 Dnd

> Dnd 是 Addon 命名空间中的一个插件，提供了基础的拖拽能力

## Dnd 初始化

```js
import { Addon } from '@antv/x6';
const options = {
  target: '', // {Graph}, 目标画布
  scaled: true, //  {Boolean}, 是否根据画布的缩放比例缩放拖拽的节点
  delegateGraphOptions: {}, // {Graph.Options}, 拖拽开始时，创建代理画布的选项
  getDragNode: (sourceNode, options) => {}, // 拖拽开始时，获取代理节点（实际被拖拽的节点），默认克隆传入的节点
  getDropNode: (draggingNode, options) => {}, // 拖拽结束，获取放置到目标画布中的节点，默认克隆代理节点
  validateNode: (droppingNode, options) => {}, // 拖拽结束，验证节点是否可以放置到画布中
  animation: true,
  containerParent: document.body // 拖拽容器挂载在那个父节点下面
};
const dnd = new Addon.Dnd(options);
/*
    通过getDragNode可以自定义拖拽节点的样式，该接口返回拖拽的节点
    通过getDropNode自定义放置到画布上的节点的样式
*/
```

## 基于 Dnd 的 Stencil

> Stencil 是 Addon 命名空间中的一个插件，是在 Dnd 基础上的进一步封装，提供了一个类似侧边栏的 UI 组件，并支持分组、折叠、搜索等能力
