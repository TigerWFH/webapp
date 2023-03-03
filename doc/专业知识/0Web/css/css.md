# CSS

> Cascading Style Sheets 级联样式表，用来美化 htnl 标签

- `行内样式表（内联样式）：style属性`
- `内部样式表：style标签`
- `外部样式表（外联样式）：link标签`

## 术语

- `行框：`内联元素的盒子模型排列成一行，包裹单行内所有内联元素盒子的矩形称为行框
- `行内框：`内联元素的盒子模型

## 工具

### stylelint

> vscode 自动校验 css 和 postcss 的插件
> 在 vscode 配置或者提供 stylelint 配置文件

### postcss(something like babel)

> A tool for transforming CSS with JavaScript
>
> - `Use tomorrow's CSS today`: PostCSS Preset Env
> - `CSS modules`
> - `CSS Tips`need stylelint
> - `postcss-loader`：

### less

### scss

## 选择器

- `CSS选择器：`标识 HTML 标签
  - `标签选择器`
  - `类选择器`
  - `id选择器`
  - `通配符选择器`
  - `符合选择器`
  - `后代选择器（空格隔开）`
  - `子选择器（>）`
  - `并集选择器（,）`
- `语句声明：`CSS 样式代码，属性:属性值

## CSS 盒子模型（box）

- `margin：外边距`
- `border：边框`
- `padding：内边距`
- `content：内容`
  > 标准模式下，width 和 height 属性指 content 的尺寸；非标准模式下，width 和 height 是指 content+padding+border 尺寸
- `box-size盒子属性：[content-box, border-box, inherit]`，可以统一起来，解决非标准盒子模型问题
- `box-shadow盒子属性：`

## CSS 定位机制：普通流（static）、浮动（float）、定位

- `默认static`
- `float: [left, right, both, none]：`让多个块级元素同一行展示
- `position: [relative, absolute, fixed, stick]`
- `z-index:`指定定位元素层级

## CSS 中元素类型主要分为两类：块级元素和行内元素

> 块级元素（block-level）能够设定所有的盒子属性；前后有换行；宽度默认 100%；高度内容撑开
>
> 行内元素（inline-level）只能够处理 padding、border 和 margin 的左右属性；其余不能；没有宽高
>
> 行内块元素（inline-block）img、input、td 可以设置宽高等属性，行内块元素既具备行内元素的特性也具备块状元素的特性，具备行内元素前后没有换行符可以在一行内并列显示的特性，具备块状元素可以正确解释盒模型属性的特性

- `display:`规定标签元素生成的框类型，取值[none, inline, block, inline-block, table, flex, ...]

## CSS layout modes<待读>

### css layout modes: CSS2.1 定义了几种 layout modes

> 基于元素的兄弟节点和祖先节点盒子模型计算出该元素的尺寸和位置的的算法，被称为 css layout mdoes

- `Normal flow：`all elements are part of normal flow until you do something to take them out of it
  - `block layout：`designed for laying out boxes such as paragraphs
  - `inline layout：`designed for laying out text
- `Table layout：`designed for laying out 2D data in a tabular format
- `Float layout：` designed to cause an item to position itself left or right with the rest of the content in normal flow wrapping around it.
- `Positioned layout：`designed for very explicit positioning without much regard for other elements in the document
- `Multi-column layout：`designed for laying content out in columns as in a newspaper
- `Flexible box layout：`designed for laying out more complex applications and webpages
  > flex layout 不支持 floats 和 columns
- `Grid layout：`designed for laying out elements relative to a fixed grid

### Formatting Context

### BFC（Block Formatting Context）块级格式化上下文，块级元素渲染规则

> 会生成 BFC 的操作包括：根元素 HTML、浮动元素 float（不包括 none）、fixed 或 absolute 元素、inline-block 元素、table-cell 元素、table-captain 元素、table、table-row 等元素、overflow 等等
>
> 浮动定位和清除浮动时只会应用于同一个 BFC 内的元素。浮动不会影响其它 BFC 中元素的布局，而清除浮动只能清除同一 BFC 中在它前面的元素的浮动。外边距折叠（Margin collapsing）也只会发生在属于同一 BFC 的块级元素之间

### IFC（Inline Formatting Context）行内格式化上下文<https://developer.mozilla.org/zh-CN/docs/web/css/inline_formatting_context>

> 各行内框（inline boxes）一个接一个地排列，其排列顺序根据书写模式（writing-mode）的设置来决定。各个框组成了一行，而该行位于一个称为“行框（line box）”的矩形区域之中。该行框的大小将足以包含该行中所有的行内框（inline boxes）当行内方向上没有剩余空间时，将会创建新行。因此，一个段落实际上是一系列行框的集合，这些行框在块的方向上排列。 一个行内框（inline box）被分割到多行中时， margins, borders, 以及 padding 的设定均不会在断裂处生效。

- `vertical-align：`作用于行内框
- `text-align：`作用
- `float：`会影响行框的计算

[css 样式特效](https://codersblock.com/blog/creating-glow-effects-with-css/)
