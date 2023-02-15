# web 技术

## 术语

- `shadow host：`一个常规 DOM 节点，ShadowDOM 节点会附加到这个节点上
- `shadow tree：`shadow dom 内部的 DOM 树
- `shadow boundary：`shadow dom 结束的地方，常规 dom 开始的地方
- `shadow root：`shadow tree 的根节点

## web components

> 自定义标签：允许您创建可重用的定制元素（它们的功能封装在您的代码之外）并且在您的 web 应用中使用它们。WebComponents 有三项主要技术组成 Custom elements、ShadowDOM、HTMLTemplates
>
> 创建一个类或函数来指定 web 组件的功能
> 使用 CustomElementRegistry.define() 方法注册您的新自定义元素 ，并向其传递要定义的元素名称、指定元素功能的类、以及可选的其所继承自的元素
>
> 如果需要的话，使用 Element.attachShadow() 方法将一个 shadow DOM 附加到自定义元素上。使用通常的 DOM 方法向 shadow DOM 中添加子元素、事件监听器等等
>
> 如果需要的话，使用 <template> 和<slot> 定义一个 HTML 模板。再次使用常规 DOM 方法克隆模板并将其附加到您的 shadow DOM 中

### 自定义元素（Custom elements）

> 一组 JavaScript API，允许您定义 custom elements 及其行为

### 影子 DOM（ShadowDOM）

> 一组 JavaScript API，用于将封装的“影子”DOM 树附加到元素（与主文档 DOM 分开呈现）并控制其关联的功能。通过这种方式，您可以保持元素的功能私有，这样它们就可以被脚本化和样式化，而不用担心与文档的其他部分发生冲突
>
> Shadow DOM 允许将隐藏的 DOM 树附加到常规的 DOM 树中——它以 shadow root 节点为起始根节点，在这个根节点的下方，可以是任意元素，和普通的 DOM 元素一样

### HTML 模板树（HTML Templates）

> <template> 和 <slot> 元素使您可以编写不在呈现页面中显示的标记模板。然后它们可以作为自定义元素结构的基础被多次重用

### web components web apis

- `CustomElementRegistry`
