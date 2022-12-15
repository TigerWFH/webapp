# HTML（HyperText Markup Language）

> 是一种用来告知浏览器如何组织页面的标记语言

## 术语（Definition）

- `标记markup：`

- `属性attribute：`
- `标签tag：`HTML 标签不区分大小写
- `开始标签opening tag：`\<tagName>
- `结束标签closing tag：`\</tagName>
- `内容content：`开始标签和结束标签之间包括的就是内容
- `元素Element：`\<tagName>content\</tagName>开始标签、结束标签与内容相结合在一起，便是一个完整的元素
  > - `元素可以嵌套`
- `块级元素Block：`块级元素通常用于展示页面上结构化的内容，例如段落、列表、导航菜单、页脚等等
  > - `块级元素独占一行`
  > - `块级元素可以嵌套在块级元素内`
  > - `块级元素不可以嵌套在内联元素内`
- `内联元素inline：`
  > - `内联元素通常出现在块级元素中并环绕文档内容的一小部分`
  > - `内联元素不会导致文本换行`
  > - `在这篇文章中提到的“块”和“内联”，不应该与 CSS 盒子的类型中的同名术语相混淆。尽管它们默认是相关的，但改变 CSS 显示类型并不会改变元素的分类，也不会影响它可以包含和被包含于哪些元素。防止这种混淆也是 HTML5 摒弃这些术语的原因之一`
- `空元素Empty/Void：`不是所有元素都拥有开始标签，内容，结束标签。一些元素只有一个标签，通常用来在此元素所在位置插入/嵌入一些东西
  > - `area`
  > - `base`
  > - `br`
  > - `col`
  > - `embed`
  > - `hr`
  > - `img`
  > - `input`
  > - `link`
  > - `meta`
  > - `param`
  > - `source`
  > - `track`
  > - `wbr`
- `实体Entity：`
  > `转义语法：&xxxx;`
  >
  > - `< &lt;`
  > - `> &gt;`
- `元数据Metadata：`描述数据的数据
  > - `base标签：`元数据标签
  > - `link标签：`元数据标签
  > - `script标签：`元数据标签
  > - `style标签：`元数据标签
  > - `title标签：`元数据标签
  > - `meta标签：`元数据标签,name、http-equiv、charset、itemprop

## 如何理解 DOM 属性和 HTML 属性

> DOM 元素是经浏览器解析后的 HTML 元素
> DOM 属性储存对应的 HTML 属性值，才可以通过 JS 修改

## 全局属性

> 全局属性是所有 HTML 元素共有的属性; 它们可以用于所有元素，即使属性可能对某些元素不起作用

```js
/*
标准的全局属性：
  accessKey：生成快捷键的提示
  autocapitalize：控制输入文本是否、如何转换大小写
  class：空格分割的类名列表
  contenteditable：
  contextmenu：
  data-*：自定义属性，通过JS获取：HTMLElement.dataset
  dir：元素中文本方向的枚举属性
  draggable：枚举属性，拖拽接口
  hidden：布尔
  id：定义唯一标识
  inputmode：
  is：
  itemid：项的唯一全局标识
  itemgroup：
  itemref：
  itemscope：
  itemtype：
  lang：定义元素的语言
  part：
  slot：shadow DOM
  spellcheck：拼写检查
  style：样式
  tabindex：指定元素是否可以聚焦
  title：包含与元素相关的信息文本
  translate：

额外的全局属性
  xml:lang，为了兼容性保留
  xml:base，为了兼容性保留
  aria-*属性，用于改善无障碍
  事件处理程序：
    onabort, onautocomplete, onautocompleteerror, 
    onblur, onfocus, oninput, oninvalid, onkeydown, onkeyup, onkeypress,
    onchange, onload, onloadeddata, onloadedmetadata, onloadstart,
    onmousedown,, onmouseenter, onmouseleave, onmousemove, onmouseout, onmouseover,onmouseup,onmousewheel, 
    onpause, onplay, onplaying, onprogress, onratechange, onreset, onresize, onscroll,
    onseeked, onseeking, onselect, onshow, onsort, onstalled, onsubmit, onsuspend, ontimeupdate, ontoggle, onvolumechange, onwaiting
    onclick, onclose, ondbclick, 
    ondrag, ondragend, ondragenter, ondragexit, ondragleave, ondragover, ondragstart, ondrop, ondurationchange, onemptied, onended, onerror, oncontextmenu, oncuechange, oncancel, oncanplay, oncanplaythrough, 
*/
```

## HTML 标签

```js
/*
主根元素：表示一个html文档的根，根元素
  html
文档元数据：含有页面的相关信息，包括样式、脚本及数据
  head
  base
  link
  meta
  style
  title
分区根元素：表示文档的内容
  body：表示文档的内容，document.body
内容分区：将文档内容从逻辑上进行组织划分。包括页眉（header）、页脚（footer）、导航（nav）、标题（h1-h6）
  address：某个人或某个组织的联系信息
  article：表示文档、页面、应用或网站中的独立结构，例如论坛帖子、评论
  aside：表示一个和其余页面内容几乎无关的部分，例如：侧边栏、标注框
  header：展示介绍性内容，例如logo、标题、搜索框、作者名称等等
  h1-h6：标题
  main：呈现了文档的body或应用的主题部分
  nav：当前文档或其他文档导航链接。例如：菜单、目录、索引等等
  section：文档中通用独立章节，可以包含一个标题
文本内容：对于无障碍和搜索引擎很重要
  blockquote：表示引用内容
  div：通用型的流内容容器
  p：段落
  menu：用户可执行或激活的命令，包括菜单和按钮
  pre：预定义格式文本，在该元素中的文本通常按照原文件中的编排，以等宽字体的形式展现出来，文本中的空白符（比如空格和换行符）都会显示出来。(紧跟在 <pre> 开始标签后的换行符也会被省略)
  hr：表示段落级元素之间的主题转换（例如，一个故事中的场景的改变，或一个章节的主题的改变）

  dl：描述列表
  dd：描述列表（dl）元素中一个术语的描述，作为dt的子元素出现，并且必须跟着一个dt元素
  dt：仅能作为dl的子元素

  ul：无序列表
  ol：有序列表
  li：有无序列表子项

  figure：代表独立内容，可包含figcaption
  figcaption：与其关联的图片的说明或标题
内敛文本语义：
  a：
  abbr：
  b：
  bdi：
  bdo：
  br：
  cite：
  code：
  data：
  dfn：
  em：
  i：
  kbd：
  mark：
  q：
  rp：
  rt：
  ruby：
  s：
  samp：
  span：
  strong：
  sub：
  sup：
  time：
  u：
  var：
  wbr：
图片和多媒体：
  area、audio、img、map、track、video
内嵌内容：
  embed
  iframe
  object
  picture
  portal
  source
SVG 和 MathML
  svg
  math
脚本：
  canvas
  noscript
  script
编辑标识：
  del
  ins
表格：
  caption、col、colgroup、table、tbody、td、thead、tfoot、th、tr
表单：
  button：可点击的按钮
  datalist：包含了一组option，表示表单的可选值
  fieldset：表单元素分组
  legend：嵌入到fieldset使用，表示fieldset的标题
  form：
  input：输入框、日期、单选、复选等等
  label：某个元素的说明
  meter：标量值或分数值
  option：定义datalist、select、optgroup中的选项
  output：计算或用户操作的结果
  progress：任务进度
  select：提供选项菜单的控件
  optgroup：为select的选项创建分组
  textarea：多行纯文本编辑控件
交互元素：
  details：
  dialog：
  summary：
Web组件：
  slot：WebComponents技术的一部分，WebComponents的占位符
  template：内容模板，一种用于保存客户端内容机制，加载页面不呈现，但是运行时可以通过JS实例化
过时和弃用：
*/
```
