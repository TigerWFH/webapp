# 图形化工具

## x6

```shell
    npm install @antv/x6
```

```js
import { Graph } from "antv/x6";
/**********************************************************/
//    画布Graph，图的载体，包含了图上所有的元素，挂载图的相关操作（交互、监听、元素操作、渲染）
/**********************************************************/
// 创建画布实例
const graph = new Graph({
  container: "",
  width: 100, // 画布宽度
  height: 100, // 画布高度
  background: {}, // 画布背景
  grid: {}, // 网格背景
  clipboard: {}, // 剪切板
  history: {}, // 历史记录
  selecting: {}. // 点选框选
  snapline: {}, // 对齐线
  scroller: {}, // 滚动画布
  minimap: {}, // 小地图
  keyboard: {}, // 键盘快捷键
  mousewheel: {}, // 滚轮滑动
  resizing: {}, // 调整节点大小
  panning: {
    enabled: true,
    modifiers: "",
    eventTypes: [],
  }, // 是否支持拖拽平移
});
// 渲染画布
graph.fromJSON({});
// 画布操作
graph.zoom(); // 缩放
graph.translate(); // 平移
graph.centerContent(); // 内容居中
graph.toSVG(options); //导出SVG数据
graph.PNG(options);
graph.dispose(); // 销毁画布，回收资源
// 节点操作
graph.addNode(nodeOptions); // 创建节点并添加到画布
graph.addEdge(edgeOptions); // 创建边并添加到画布
// 网格操作
graph.drawGrid(options); // 绘制网格
graph.getGridSize(); // 获取网格大小
graph.setGridSize(num); //设置网格大小
graph.showGrid(); // 展示网格
graph.hideGrid(); // 隐藏网格
graph.clearGrid(); // 隐藏并销毁网格
// 背景操作
graph.drawBackground(options);
graph.clearBackground();
graph.updateBackground();
// 剪切板操作
graph.copy(cells, options);
graph.cut(cells, options);
graph.past(options, targetGraph);
graph.getCellsInClipboard();
graph.cleanClipboard();
graph.isClipboardEmpty();
graph.isClipboardEnabled();
graph.enableClipboard();
graph.disableClipboard();
graph.toggleClipboard();
// 序列化和反序列化
graph.toJSON()
graph.fromJSON()
// 事件系统
graph.on(event, callback)
// ref属性，默认锚点是Node，可以指定节点
graph.addNode({
    shape: "custom-rect",
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    markup: [
        {
            tagName: "ellipse",
            selector: "e"
        },
        {
            tagName: "rect",
            selector: "r"
        }
    ],
    attrs: {
        e: {

        },
        r: {
            refX: 0,// 相对shape-rect的位置
            refY: 0,
            refWidth: "50%", // 相对custom-rect的宽度100
            refHeight: "50%"
        }
    }
})
/**********************************************************/
//    节点Node和边Edge
/**********************************************************/
```

### Graph

> 网格 Grid

- `类型type：[dot, fixedDot, mesh, doubleMesh]`

> 背景 Background 背景层在 DOM 层级上位于画布的最底层

- `color：背景颜色`
- `image：背景图片`
- `position：背景图片位置，支持所有CSSbackground-position属性取值`
- `size：背景图片大小，支持所有CSS background-size属性取值`
- `repeat：背景图片重复模式，支持所有CSS属性取值，且支持[watermark, flip-x, flip-y, flip-xy]`
- `opacity：背景透明度`
- `quality：背景图片质量`
- `angle：水印旋转角度`

> 剪切板 Clipboard

- `enabled`
- `useLocalStorage`

> 撤销重做 History

### Model(Cell, Node, Edge, Group)

> Cell

- `id：唯一标识`
- `markup：渲染使用的HTML或SVG标签`
  - `tagName：HTML或SVG标签名`
  - `ns：标签对应命名空间`
  - `selector：SVG或HTML标签的唯一标识`
  - `groupSelector：群组选择器，为群组内的多个元素应用指定样式`
  - `attrs：键值对，属性key，值是属性value`
  - `style：SVG或HTML的行内样式`
  - `className：SVG或HTML的CSS样式名`
  - `textContent：SVG或HTML元素的文本内容`
- `attrs：同markup中的attrs，键是selctor，值是对应属性（key-value）`
- `shape：节点或边的图形`

  - `rect：Shape.Rect`
  - `circle：Shape.Circle`
  - `ellipse：Shape.Ellipse`
  - `polygon：Shape.Polygon`
  - `polyline：Shape.Polyline`
  - `path：Shape.Path`
  - `image：Shape.Image`
  - `html：Shape.HTML，HTML节点，使用foreignObject渲染`
  - `text-block：Shape.TextBlock`
  - `image-bordered：Shape.bordered`
  - `image-embedded：Shape.EmbeddedImage`
  - `image-inscribed：Shape.InscribedImage`
  - `cylinder：Shape.Cylinder`

  - `edge：Shape.Edge`
  - `double-edge：Shape.DoubleEdge`
  - `shadow-edge：Shape.ShadowEdge`

- `view：指定渲染节点或边使用的视图`
- `zIndex：层级`
- `visible：是否可见`
- `parent：父节点`
- `children：子节点或边`
- `data：附加数据`

> Node：1、使用构造函数 new Shape.Rect(options)构造；2、graph.addNode(options)构造

- `x：x坐标`
- `y：y坐标`
- `width：节点宽度`
- `height：节点高度`
- `angle：节点旋转角度`

> Edge：1、使用构造函数 new Shape.Edge(options)构造；2、graph.addEdge(options)构造

- `spurce：起始节点`
- `target：结束节点`
- `vertices：路径点，连线上的锚点`
- `router：路由，对vertices进一步处理，并添加额外节点。特殊的vertices。都是通过注册方式注册到X6，只需要name和args参数既可以使用。也可以自定义路由`
  - `name: 路由名称，例如orth正交路由。可选值[normal, orth, oneSide, manhattan, metro, er]`
  - `args：对应路由参数`
- `connector：链接器，将路由返回的点加工成渲染需要的pathData`
- `labels：标签`
- `defaultLabel：默认标签`

> 群组 Group：节点 node.addChild(child)

> 链接桩 Port：const node = new Node({ports: {}})

> 自定义节点

- `1、class继承：可以扩展方法和属性`

```js
    import { Node } from "@antv/x6";
    // 继承
    class CustomRect extends Node {
        // 自定义一些方法和属性
    }
    // 配置,支持所有节点选项
    CustomRect.config({
        width: "",
        height: "",
        markup: [],
        attrs: {},
        propHooks(metadata) {
        }
        attrHooks(metadata) {
        }
    })
    //  注册节点,(name, cls, overite),name是注册的节点名既shape；cls节点类；重名覆盖选项
    Graph.registerNode("custom-rect", CustomRect)
```

- `2、静态方法define，快捷方法，不扩展方法和属性`

```js
Rect.define({
  shape: "red-rect",
});
Graph.registerNode();
```

- `3、Graph.registerNode(name, options, overwrite)`

> 自定义边

- `1、继承`

```js
import { Edge as BaseEdge } from "@antv/x6";
class CustomEdge extends BaseEdge {}
CustomEdge.config({
  markup: [],
  attrs: {},
});
Graph.registerEdge("custom-edge", CustomEdge, false);
```

- `2、静态方法define和注册`
- `3、注册：Graph.registerEdge(name, options, overwrite)`

### View(View, CellView, NodeView, EdgeView)

### Registry

### 拖拽 Dnd：import { Addon } from "@antv/x6

### UI Components

```shell
    npm install @antv/x6-react-components
```

## svg

> SVG 文档由<svg>根元素和基本的形状元素构成。另外还有一个 g 元素，它用来把若干个基本形状编成一个组。

### SVG 嵌入到 html 方式

- `直接嵌入html中，content-type：application/xhtml+xml`
- `object标签：<object data="image.svg" type="image/svg+xml />"`
- `iframe标签：<iframe src="image.svg"></iframe>`
- `imge标签：`

### SVG 基本标签

- `rect`
- `circle`
- `ellipse`
- `line`
- `polyline`
- `polygon`
- `path`

### 填充

> 着色方案：使用对象属性，使用内联 CSS 样式，内嵌 CSS 样式，使用外部 CSS 样式

- `fill:`
- `stroke`

### React 组件

> 在 SVG 中有一个特殊的元素 foreignObject，该元素可以内嵌任何 XHTML 元素，所以可以借助该元素渲染 HTML 元素和 React 组件到需要位置

```svg
<svg xmlns="http://www.w3.org/2000/svg">
  <foreignObject width="120" height="50">
    <body xmlns="http://www.w3.org/1999/xhtml">
      <p>Hello World</p>
    </body>
  </foreignObject>
</svg>
```

- `渲染HTML节点：将节点的shape属性指定为html，就可以通过html属性指定需要渲染的HTML元素`

```js
const source = graph.addNode({
  x: 40,
  y: 40,
  width: 100,
  height: 40,
  shape: "html",
  html() {
    const wrap = document.createElement("div");
    wrap.style.width = "100%";

    return wrap;
  },
});
```

- `渲染React节点：需要依赖独立的包@antv/x6-react-shape`

```js
/*
  系统渲染当前节点时，会自动为React组件注入一个node属性，指向当前节点的实例。
  节点每次渲染，都将触发React组件重新渲染，可以通过node属性和shouldComponentUpdate方法来决定是否重新渲染React组件
*/
import "@antv/x6-react-shape";
import { ReactShape } from "@antv/x6-react-shape";

export class Demo extends React.Component<{ node?: ReactShape, text: string }> {
  shouldComponentUpdate() {
    const { node } = this.props.node;
    if (node) {
      // 仅当节点的 data 发生变化时才触发 MyComponent 组件重新渲染
      if (node.hasChanged("data")) {
        return true;
      }
    }

    return false;
  }

  render() {
    return <div>{this.props.text}</div>;
  }
}

graph.addNode({
  x: 40,
  y: 40,
  width: 100,
  height: 40,
  shape: "react-shape",
  component: <Demo text="hello" />,
});
```
