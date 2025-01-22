# X6

## X6Canvas 组件

### 导出节点基础类：BaseNode

### 导出边基础类：BaseEdge

### 导出 X6Canvas 组件

> - 提供注册节点的能力
> - 提供注册边的能力

## 图形变化(@antv/x6-plugin-transform)

> 使用 UI 组件来调整节点尺寸和角度是常用需求

## 导出(@antv/x6-plugin-export)

> 我们经常需要将画布内容通过图片的形式导出来，我们提供了一个独立的插件包 @antv/x6-plugin-export 来使用这个功能

## stencil（@antv/x6-plugin-stencil）

> Stencil 是在 Dnd 基础上的进一步封装，提供了一个类似侧边栏的 UI 组件，并支持分组、折叠、搜索等能力

## dnd（@antv/x6-plugin-dnd）

> Dnd 是 Addon 命名空间中的一个插件，提供了基础的拖拽能力

## grid（config）

> 网格渲染/移动节点的最小单位。默认时 10px
>
> - size
> - type
> - getGridSize()

## background（config）

> 背景用于为画布指定背景颜色或背景图片，支持水印背景和自定义背景重复方式。
>
> - color
> - image
> - position
> - size
> - repeat
> - opacity
> - quality
> - angle
> - drawBackground(...)

## snapline（@antv/x6-plugin-snapline）

> 对齐线：移动节点排版的辅助工具
>
> - className: 附加样式，用于定制对齐线的样式，默认值 undefined
> - tolerance: 对齐精度，即移动节点时与目标位置的距离小于 tolerance 时触发显示对齐线。默认为 10
> - sharp: 是否显示截断的对齐线，默认 false
> - resizing: 改变节点打小时是否触发对齐线，默认 false
> - clean: 当对齐线隐藏时，是否自动将其从 DOM 移除。
> - filter: 节点过滤器，被过滤的节点不参与对齐计算
> - isSnaplineEnabled()，还有其他一大堆方法

## scroller（@antv/x6-plugin-scroller）

> 使画布具备滚动、平移、居中、缩放等能力
>
> - className
> - width
> - height
> - pannable
> - modifiers
> - padding
> - minVisibleWidth
> - minVisibleHeight
> - pageVisible
> - pageBreak
> - pageWidth
> - pageHeight
> - autoResize
> - autoResizeOptions
> - scrollToPoint()

## minimap（@antv/x6-plugin-minimap）

> 小地图功能

## history（@antv/x6-plugin-history）

> 撤销重做

## clipboard（@antv/x6-plugin-clipboard）

> 剪切板

## Keyboard（@antv/x6-plugin-keyboard）

> 键盘快捷键

## MouseWheel

> 鼠标滚轮

## Selection（@antv/x6-plugin-selection）

> 点选/框选

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
