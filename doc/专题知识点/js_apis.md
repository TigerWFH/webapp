# js Apis

## web apis

### 事件系统相关接口

#### EventTarget 是一个 DOM 接口，可以接收事件、创建侦听器

- `EventTarget.addEventListener()：在EventTarget上注册特定事件类型的事件处理程序`
- `EventTarget.removeEventListener()：EventTarget中删除事件侦听器`
- `EventTarget.dispatchEvent()：将事件分派到此EventTarget`

```js
// 模拟实现EventTarget，就是一个简单的订阅-发布者模式
```

#### Event 表示 DOM 中出现的事件的类型，所有的事件接口名称都以 event 结尾<https://developer.mozilla.org/zh-CN/docs/Web/API/Event>

> 用户触发的事件；API 触发的事件

```js
/**
 *  1：Event：表示DOM中出现的事件，包括用户触发的click，或者runtime触发的动画事件，自定义事件
 *      1-1：Event.bubbles，表示事件是否会在DOM中冒泡
 *      1-2：Event.cancelBubble，在事件回调返回之前，设置该值为true，可以阻止冒泡，Event.stopPropagation()的别名
 *      1-3：Event.cancelable，表示事件是否可以取消
 *      1-4：Event.currentTarget，对事件当前注册的目标的引用
 *      1-5：Event.target，对产生事件的目标的引用
 *      1-6：Event.defaultPrevented，表示event.preventDefault()方法是否取消了事件的默认行为
 *      1-7：Event.eventPhase，表示事件流到了哪个阶段(捕获、冒泡)
 *      1-8：Event.timestamp，时间戳
 *      1-9：Event.type，事件类型
 *      1-10：Event.isTrusted，事件是由浏览器发起的还是脚本发起的，Event.initEvent
 *              event.preventDefault()：如果事件可取消，用来取消事件
 *              event.stopPropagation()：停止冒泡
 *              event.stopImmediatePropagation()：阻止监听同一事件的其他事件监听器被调用
 *  2：UIEvent：继承了Event，表示简单的用户界面事件
 *      2-1：UIEvent.detail，
 *      2-1：UIEvent.layerX和UIEvent.layerY，事件相对于当前层的坐标
 *      2-1：UIEvent.pageX和UIEvent.pageY，事件相对于整个文档的坐标
 *  3：MouseEvent：指用户与指针设备（如鼠标）交互时发生的事件。
 *          例如click,dbclick,mouseup,mousedown,mousemove
 *      3-1：MouseEvent.altKey，鼠标事件中，标识alt键是否被按下
 *      3-2：MouseEvent.ctrlKey，
 *      3-3：MouseEvent.metaKey，
 *      3-4：MouseEvent.shiftKey，
 * 
 *      3-5：MouseEvent.button，鼠标按钮值
 *      3-6：MouseEvent.buttons，多个鼠标按钮
 *      3-7：MouseEvent.which，
 * 
 *      3-8：MouseEvent.clientX和MouseEvent.clientY，相对于可视区域
 *      3-9：MouseEvent.movementX和MouseEvent.movementY，
 *      3-10：MouseEvent.offsetX和MouseEvent.offsetY，
 *      3-11：MouseEvent.pageX和MouseEvent.pageY，相对于文档
 *      3-12：MouseEvent.screenX和MouseEvent.screenY，相对于屏幕的鼠标坐标
 * 
 *      3-13：MouseEvent.region
 *      3-14：MouseEvent.relatedTarget
 * 
 *  4：WheelEvent：MouseEvent的派生类，用户滚动鼠标滚轮或类似输入设备时触发的事件
 *      1：WheelEvent.deltaX、WheelEvent.deltaY、WheelEvent.deltaZ，滚动量
 *      2：WheelEvent.deltaMode，单位
 * 
 *  5：DragEvent：MouseEvent的派生类，
 *          事件drag、dragend、dragEnter、dragexit、dragleave、dragover、dragstart、drop
 *      5-1：dataTransfer，在拖放交互期间传输的数据
 
 *  6：TouchEvent：是一类描述手指在触摸平面的状态变化的事件。这类事件用于描述一个或多个触点的信息
 *          TouchEvent继承了UIEvent和Event属性，UIEvent
 *      2-1：TouchEvent.altKey，
 *      2-1：TouchEvent.ctrlKey，
 *      2-1：TouchEvent.metaKey，
 *      2-1：TouchEvent.shiftKey，
 *      
 *      2-4：TouchEvent.touches，TouchList对象，包含了所有当前接触触摸平面的触点的 Touch 对象
 *      2-3：TouchEvent.targetTouches，返回TouchList对象，起始触点并且仍然没有离开的Touch对象
 *      2-2：TouchEvent.changedTouches，返回TouchList对象，状态发生变化的触点的Touch对象
 *      关于touch对象：
 *          Touch.identifier：touch对象的标识
 *          Touch.target：触摸点最初的接触元素引用
 * 
 *          Touch.screenX：相对于屏幕的坐标
 *          Touch.screenY：
 *          Touch.clientX：相对于可视区域的坐标
 *          Touch.clientY：
 *          Touch.pageX：相对于文档的坐标
 *          Touch.pageY：
 *          Touch.radiusX：包围接触点最小椭圆的水平轴半径
 *          Touch.radiusY：包围接触点最小椭圆的垂直轴半径
 *          Touch.rotationAngle：椭圆顺时针旋转角度
 *          Touch.force：压力大小
 *          
 *  7：FocusEvent：
 *  8：KeyboardEvent：
 *  9：InputEvent：
 *  10：FocusEvent：
 *  11：CompositionEventEvent：
 *  12: MessageEvent
 *  13: CustomEvent
 *  14: DragEvent
 *  15: FetchEvent
 *  16: StorageEvent
 *  17: TimeEvent
*/
```

### DOM 元素接口

#### Node

> EventTarget <-- Node

```js
/*
    ---属性--------
    1、nodeName: DOMString，
    2、nodeType: Enum，（1，2，3，...，12）
    3、nodeValue: 当前节点的值

    4、childNodes: NodeList，包含当前节点的所有子节点
    5、firstChild: Node，
    6、lastChild: Node，
    7、nextSibling: Node，
    8、previousSibling: 
    9、parentNode: Node | null
    10、textContent: 该节点下所有子节点及其后代的文本内容

    11、ownerDocument: 返回拥有该元素的document或bull
    12、isConnected: boolean
    13、baseURI: DOMString，不同语言业务含义不同。在html中，返回的是协议+域名+路径
    14、baseURIObject:
    ---方法------------
    1、appendChild(child)
    2、insertBefore()
    3、removeChild()
    4、replaceChild(new, old): old
    5、cloneNode()
    6、compareDocumentPosition()
    7、contains(): boolean
    8、hasChildNodes(): boolean
    9、getRootNode()
    10、isDefaultNamespace(): boolean
    11、isEqualNode(): boolean
    12、lookupPrefix()
    13、lookupNamespaceURI()
    14、normalize()
*/
```

#### Document 接口：网页内容的入口，也是 DOM 树

> EventTarget <-- Node <-- Document

#### Element

> EventTarget <-- Node <-- Element

```js
/*
attributes
classList
className
clientHeight
clientLeft
clientTop
clientWidth
computedName
computedRol
id
innerHTML
outerHTML
localName
namespaceURI
prefix
scrollHeight
*/
```

#### HTMLElement

```js
/**
 *
 * 1、获取屏幕宽高（screen）：
 *      window.screen.width：屏幕宽度
 *      window.screen.height：屏幕高度
 * 2、获取可视区域宽高（client*）
 *      window.innerWidth
 *      window.innerHeight
 *
 * 3、文档对象：documentElement返回文档对象的根元素的只读属性，对于任何非空HTML文档，总是会返回一个 <html> 元素
 *  特例：css的width和height样式作用于html元素，有视觉效果，但是client不受影响，且overflow属性无效（部分css属性作用在html无效），比较特殊
 *       常规样式设定：html,body {XXXXXX}，规避掉html，直接操作body
 *  3-1：documentElement.clientWidth === window.innerWidth, documentElement.clientHeight === window.innnerHeight，不受CSS样式影响
 *  3-2：默认左边框和顶边框为1，即documentElement.clientLeft = documentElement.clientTop = 1，可能可视区域有一个宽度为1的边框
 *
 *
 *      Element.clientLeft：滚动条宽度和左边框（border）宽度，验证（MAC chrome和safari）
 *      Element.clientTop：滚动条宽度和顶边框（border）宽度，验证（MAC chrome和safari）
 *      Element.clientWidth：元素内部的高度，包括内容和内边距，验证（MAC chrome和safari），包括滚动内容
 *      Element.clientHeight：元素内部的宽度，包括内容和内边距，验证（MAC chrome和safari），包括滚动内容
 *
 *      Element.scrollLeft：水平滚动距离，未滚动为0
 *      Element.scrollLeftMax：水平可滚动最大距离，目前非标准规范
 *      Element.scrollTop：垂直滚动距离，未滚动为0
 *      Element.scrollTopMax：垂直可滚动最大距离，目前非标准规范
 *      Element.scrollWidth：内容宽度，包括溢出的不在视图中的内容(即滚动内容高度，也可能设定不可滚动)，不受overflow影响
 *      Element.scrollHeight：内容高度，包括溢出的不在视图中的内容(即滚动内容高度，也可能设定不可滚动)，不受overflow影响
 *
 *      Element.getClientRects()返回值：相对于屏幕的位置
 *
 *      Element.getBoundingClientRect()返回值：返回相对于视口的位置（数值相对于视口左上角计算）
 *          left：元素左边框距离视口左边的距离
 *          right：元素右边框距离视口左边的距离
 *          top：元素上边框距离视口上边的距离
 *          bottom：元素下边框距离元素上边的距离
 *
 *          width：元素的宽度
 *          height：元素的高度
 *
 *
 *      HTMLElement.offsetParent：返回指向最近的（包含层级上的最近）包含当前元素的定位元素或者最近的table、td、th、body，当元素的display为none或fixed时，返回null。offsetTop和offsetLeft都是相对于offsetParent内边距边界
 *      HTMLElement.offsetTop：距离定位父级元素上边边界的距离
 *      HTMLElement.offsetLeft：距离定位父级元素左边边界的距离
 *      HTMLElement.offsetWidth：元素的布局宽度，包括滚动条(scrollbar)、边框(border)、水平内边距(padding)、CSS宽度，包括滚动内容
 *      HTMLElement.offsetHeight：元素的布局高度，包括滚动条(scrollbar)、边框(border)、水平内边距(padding)、CSS高度，包括滚动内容(定位元素，即position非static的父元素)
 */
```

### 文件操作相关接口

#### 文本文件和二进制文件<https://www.zhihu.com/question/19971994>

```js
/*
文件包含两部分数据：
    控制信息数据和内容信息数据。
    纯文本文件则没有控制信息数据部分，是因为文本文件的解释格式已经确定了，是通用的，按照unicode或者ASCII编码。
计算机从磁盘读取文件时，读的都是二进制数据
程序解释二进制数据时，才区分文本文件和二进制文件。
二进制文件除了公共开源的格式，个人和机构是可以私有格式
*/
```

#### Blob File and Streams API

```js
/*

    使用场景：可以把任何数据存储成二进制，然后读取并解释

    Blob：表示一个不可变、原始数据的类文件对象。它的数据可以按 文本 或 二进制的格式进行读取，也可以转成ReadableStream
        Blob表示的不一定是Javascript原生格式的数据？？？？？？
        Blob(blobParts[, options])
        -----------------------------
        Blob.size: 数据大小（字节）
        Blob.type: 数据的MIME类型
        Blob.slice([start[, end[, contentType]]])，start字节的起始位置
        Blob.stream()返回一个ReadableStream
        Blob.text()返回一个promise，包裹内容是UTF-8格式的USVString
        Blob.arrayBuffer()返回一个promise，包括二进制格式的ArrayBuffer
        demo：
            var debug = {"hello": "world"}
            var blob = new Blob([JSON.stringify(debug, bull, 2)], {type: "application/json"})

    File：特殊的Blob对象，被扩展成支持用户系统上的文件
        1、input上传文件后的FileList对象
        2、拖放操作生成的DataTransfer对象
        3、HTMLCanvasElement上的mozGetAsFile()API
    File(bits, name[, options])
        bits：ArrayBuffer、ArrayBufferView、Blob、[DOMString]
        name：文件名称或路径
        options：
            type：文件mime类型
            lastModified：数值，文件最后的Unix时间戳，毫秒。默认Date.now()
        -----------------------------
        File.name：文件名字
        File.size：文件大小（字节）
        File.type：文件的mime类型
        File.lastModified：毫秒数

    Streams Api: 流将你希望通过网络接收的资源拆分成小块，然后按位处理它。可以部分处理数据而不必等待整个文件下载出来
    ReadableStream：流操作，呈现了一个可读取的二进制流操作<https://streams.spec.whatwg.org/#locked-to-a-reader>
        .loced：确定当前可读流是否被锁定
        .cancel()
        .getReader()
        .pipeThrough()
        .pipeTo()
        .tee()
        .getIterator()
        [@@asyncIterator()]
    ReadableStreamDefaultReader
    ReadableStreamDefaultController
    WritableStream：写入流
    WritableStreamDefaultWriter
    WritableStreamDefaultController
    ByteLengthQueuingStrategy
    CountQueuingStrategy
    Request
    Body
 */
```

#### URL<https://www.zhihu.com/question/19557151>，以下是 URL 和 URI 的构成组件

- `schema:`协议，分隔符是冒号:
- `user:`用户名，冒号:
- `password:`用户名密码，@
- `host:`主机:
- `port:`端口/
- `path:`路径
- `params:`键值对，分号;
- `query:`键值对，?和&
- `flag:`哈希值，#
- `web URL接口：用于解析、构造、规范化和编码URLs`
- `URL或URI语法标准或保留字符`
- `编码原因：传输和安全问题`

```js
/*
RFC3986规定，URL（URI）中只允许包含英文字母(52)、数字(10)、4个特殊字符（-_.~）以及所有保留字符16个）。URL只允许使用可打印字符
URL组件分隔符(6个)：
    : 分隔协议和主机
    / 分隔主机和路径
    ? 分隔路径和查询参数
    # 分隔查询参数和片段
    []
    @
URL组件内部分隔符(10)：! & $ ' () * + = ; ,

URL安全字符：
URL非安全字符：有一些字符，当他们直接放在Url中的时候，可能会引起解析程序的歧义。这些字符被视为不安全字符
URL编码(百分号编码)：使用安全字符（没有特殊用途或者特殊意义的可打印字符）去表示哪些不安全的字符
五种类型：
    1、保留字符：; / ? : @ & = + $ , 共计10个
    2、非转义字符：
        大小写字母52个，十进制数字10个，标记符号8个：- _ . ! ~ * ' ()
    3、#
    4、其它字符
    5、被转义字符(url escaped)，%后跟两个16进制数0，1，2，3，4，5，6，7，8，9，A，B，C，D，E，F
        %HexDigit HexDigit
    
    encodeURI非编码字符包括：52个字母，10个十进制数字，保留字符和~ ! * () ' #
    encodeURIComponent非编码字符包括：52个字母，10个十进制数字和~ ! * () '
    base64使用的字符包括：52个字母、10个十进制数字和 + /
    data URLs中允许/的存在

    # %23
    / %2F
    ? %3F
*/
```

```js
/*
    构造函数URL或者window.URL
    URL(url[, base])
        url： DOMString，表示绝对或相对URL的DOMString
        base：表示基准url的DOMString，默认是""
        返回一个URL对象
    属性：
        protocol：协议
        hostname：域名
        port：端口
        pathname：路径
        search：查询参数
        searchParams：URLSearchParams，查询参数对象
        username：用户名
        password：密码
        hash：hash片段
        href：完整URL
        origin：protocol+hostname+port
        host：hostname+port
    方法：
        toString()，返回一个USVString，与URL.href同义
        toJSON()
    静态方法：
        URL.createObjectURL(object: File | Blob | MediaSource)，返回一个对象URL，该URL指定对象的内容
        URL.revokeObjectURL()，释放createObjectURL创建的对象
    ------------------------------------------------------------------------------------------
    URL 有安全字符集的概念：所以产生了encodeURIComponent和codeURI
    encodeURIComponent：
    encodeURI：
*/
```

- `Data URLs：既前缀是Data:协议的URL，是一种特殊的URL，允许内容创建者向文档嵌入小文件`
  > 一种外部资源引用方式

```js
/*
        Data URLs语法：
            data:[<mediatype>][;base64],<data>
            前缀(data:)、指示数据类型的MIME类型、base64标记、数据本身
        <mediaType>是MIME类型的字符串：默认为text/plain;charset=US-ASCII
        对于文本数据，可以直接嵌入数据，使用合适的实体字符或转义字符，纯文本要进行转义编码encodeURIComponent或encodeURI
        对于二进制数据，使用base64进行编码
        例如：
            data:,Hello%2C%20World!
            data:text/plain;base64,SGVsbG8sIFdvcmxkIQ%3D%3D
            data:text/html,%3Ch1%3EHello%2C%20World!%3C%2Fh1%3E
            data:text/html,<script>alert('hi');</script>
    */
```

- `对象URLs：URL.createObjectURL(param: Blob | File)返回的字符串，获取的是当前文档的内存URL`
  > 指向 Blob 或 File 内容的 URL
  > 对象 URLs 是一个字符创，格式是: "blob:当前链接/data"没搞明白？？？？？？

#### FileReader 接口：允许 Web 应用异步读取存储在用户计算机上的文件（或原始数据缓冲区）内容，使用 Blob 或 File 对象指定要读取的内容。不能用于从文件系统中按路径名简单的读取文件

```js
/*
    FileReader
        -----属性
        .error
        .readyState
        .result
        -----事件
        .onabort
        .onerror
        .onload
        .onloadstart
        .onprogress
        .onloadend
        -----方法
        .abort()
        .readAsArrayBuffer()
        .readAsBinaryString()
        .readAsDataURL()
        .readAsText()

 */
```

#### Canvas Image Audio ImageData

```js
/*
HTMLCanvasElement API：
    getContext()
    toBlob(callback, mimeType, qualityArgument)：创建一个包含在canvas中的图片数据的blob对象，无返回值，blob对象通过callback返回
    toDataURL()
    captureStream()
CanvasRenderingContext2D API
    drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    image：绘制元素的上下文。允许任何的canvas图像源CanvasImageSource，例如CSSImageValue、HTMLImageElement、SVGImageElement，HTMLVideoElement，HTMLCanvasElement，ImageBimap
Image：创建图片，支持的mime类型：image/apng,avif,git,jpeg,png,svg,webp
    crossorigin: anonymous | use-credentials
    decoding: sync | async | auto
    sizes:
    src:
    srcset: 指定图片资源来源
*/
```

## JIT：Just-in-time 编译器综合了解释器和编译器的优点混合而成。即 JS 解释器引入了编译器

- Java、C++等是`编译型语言`，执行过程是先编译，再执行：`词法分析->语法分析->语义检查->代码优化和字节码生成->执行`
- Javascript 是`解释型语言`，执行过程是：`词法分析->语法分析->语法树->执行`

```js
/*
        1、词法分析：将字符流(character stream)转换为记号流(token stream)
        2、语法分析：生成AST（Abstract Syntax Tree）
        3、预编译：当Javascript引擎解析脚本时，它会在预编译时期对所有声明的变量和函数进行处理，并且先预声明变量、再预定义函数
        4、解释执行：引擎严格按照作用域scope机制执行，并且Javascript的变量和函数作用域是在定义时决定，而非执行时决定的。
    */
```

- `引擎`

```js
/*
        V8 Google C++
        SpiderMonkey Mozilla C
        Rhino Mozilla Java
    */
```

- `JIT原理`
  [资料](https://segmentfault.com/a/1190000008632441)
  [资料 2](https://segmentfault.com/a/1190000011858383)

```js
/*
        传统的JS引擎，生成AST之后，就开始一边解释一边执行，但有弊端，当某段代码重复执行，就有了优化的空间，而不是重复之前的解释执行。于是就有了JIT（Just-In-Time），是解释器和编译器的混合

        原理：
        分析器：在JS引擎中引入了分析器，用于监控代码的运行情况，记录代码运行次数、如何运行等等信息。会标记代码为warm、hot等
        基线编译器：如果一段代码标记为warm，那么JIT就把它送到极限编译器去编译，并且把编译结果存储起来，之后把编译后的版本替换成对应重复执行的代码执行
        优化编译器：如果一段代码标记为hot，JIT就把它发送到优化编译器，生成一个更快速和高效代码做替换
        去优化：JS是弱类型，如果JIT认为做了一个错误的假设，并且把优化代码丢掉，执行过程将会回到解释器或者基线编译器，这一过程叫做去优化
    */
```

## GC

## js 性能问题资料

[JS 性能阅读资料](https://www.cnblogs.com/hyddd/archive/2013/02/07/2908960.html)

```js
    /*
        DOM 核心问题：DOM修改导致的页面reflow（排版）、repaint（重绘），一般浏览器中repaint要比reflow速度快，所以避免reflow更重要
        系统为了确保执行结果的准确性，所有的DOM修改操作都是同步执行的。
        大部分浏览器都不会在Javascript执行的过程中更新DOM，而是将对DOM的操作放进一个队列，并在JavaScript脚本执行完毕后按顺序一次性执行队列中的DOM修改操作。这也就意味着，用户交互会被一直阻塞，直到reflow（非repaint）完成。



        针对DOM问题，Nicholas在《Speed up your Javascript，Part4》中做了详细介绍
    */
    // 1、在DOM外执行尽量多的变更操作
    // 不好的做法
    for (var i = 0; i < items.length; i++) {
        var item = document.createElement('div')
        item.appendChild(document.createTextNode("Option" + i)) // 非DOM操作，item还未插入实际生成的DOM中
        list.appendChild(item) // DOM操作
    }
    // 好的做法：使用容器Fragment存放临时变更，最后一次性更新DOM
    var fragment = document.createDocumentFragment()
    for (var i = 0; i < items.length; i++) {
        var item = document.createElement('div')
        item.appendChild(document.createTextNode('Options', i))
        fragment.appendChild(item)
    }
    // 实际的DOM操作迁出了JavaScript
    list.appendChild(fragment)
    /*************************************************************************************************************************************/
    // 2、操作DOM前，先把DOM节点隐藏，因为隐藏的节点不会触发重排
    list.style.display = 'none'
    for (var i=0; i < items.length; i++){
        var item = document.createElement("li");
        item.appendChild(document.createTextNode("Option " + i);
        list.appendChild(item);
    }
    list.style.display = "";
    /*************************************************************************************************************************************/
    // 3、一次性修改样式
    // 不好的做法
    // 这种做法会触发多次重排
    element.style.backgroundColor = "blue";
    element.style.color = "red";
    element.style.fontSize = "12em";
    // 更好的做法是，把样式都放在一个class下
    .newStyle {
        background-color: blue;
        color: red;
        font-size: 12em;
    }
    element.className = "newStyle";
    /*************************************************************************************************************************************/
    // 4、使用缓存，缓存临时节点
    // 不好的做法
    document.getElementById("myDiv").style.left = document.getElementById("myDiv").offsetLeft +
    document.getElementById("myDiv").offsetWidth + "px";
    // 更好的做法
    var myDiv = document.getElementById("myDiv");
    myDiv.style.left = myDiv.offsetLeft + myDiv.offsetWidth + "px";
```

## 枚举

Object 指接收 string 和 Symbol 做 key；其它数据类型会被隐式转化成 string
Map 可以接受任何类型做 key
WeakMap 只接受 object 做 key
一般 JS 中的 Object 是可以扩展的（增加属性）

### Object.getOwnPropertyNames(obj): string[]

```
    查找指定对象obj 自身 所有属性，包括可枚举和不可枚举的属性，
    不包括原型链上，
    不包括Symbol，
    返回string[]
```

### Object.getOwnPropertySymbols(obj): Symbol[]

```
    返回给定对象 自身 的所有Symbol属性
```

### Object.getOwnPropertyDescriptor(obj, propertyName): object={configurable, enumerable, writable, value, set, get}

```
    返回对应对象 自身 属性描述符
```

### Object.getOwnPropertyDescriptor(obj): object

```
    返回对象所有 自身 对象属性的描述符
```

### Object.getPrototypeOf(object): object | null

```
    返回指定对象的原型（内部[[Prototype]]）
```

### Object.entries(obj): [[key: string, value: any]]

```
    返回指定对象obj 可枚举 属性的键值对的数组
    顺序和for in保持一致
```

### Object.keys(obj):string[] 不走原型链

```
    查找指定对象 自身 可枚举属性，且顺序与手动遍历对象属性时保持一致
    不包括不可枚举属性，
    不包括原型链上属性，
    不包括Symbol

    模拟实现方案：
        1、Object.prototype.hasOwnProperty(propertyName)
        2、Object.propertyIsEnumerable(propertyName)
```

### Object.values(obj): any[] 不走原型链

```
    返回指定对象obj 可枚举 属性对应的值数组
    顺序和for in保持一致
```

### for in 走原型链

```
    以任意顺序遍历对象的非Symbol、可枚举属性，
    包括原型链上的属性
    不包括Symbol属性
    不包括不可枚举属性
    不应该用于数组，不保证顺序，一般使用foreach或者for of

    是为了遍历对象属性而构建的，不建议与数组一起使用。最常用于调试，更方便的检查对象属性，输出到控制台
```

### for of es6 增加，可以遍历所有可迭代对象[Symbol.iterator]

```
    支持遍历数组、类对象（DOM NodeList对象）、字符串、Map对象、Set对象
    输出内容时数组元素的值
    不支持遍历普通对象，可结合Object.keys使用
    可以搭配Object.entries()使用，输出内容和所以
```

### Object.prototype.propertyIsEnumerable(propertyName): boolean

```
    判断当前对象的某个属性是否可枚举，返回bool值
```

### Object.is

### Object.preventExtensions(obj): obj

```
    将obj变成不可扩展的对象,
    但是configurable=false的属性仍然可以被删除
    原型仍然可以添加属性
    一旦将对象变为不可扩展的对象，就再也不能使其可扩展
    1、不能增加属性
```

### Object.isExtensible(obj): boolean

```
    判断一个对象是否可扩展（增加新属性）
    默认对象是可扩展的，即增加新属性，甚至修改__proto__属性
    Object.preventExtensions,Object.seal,Object.freeze都可以标记一个对象为不可扩展(non-extensible)
```

### Object.isSealed()

### Object.seal(obj): obj+

```
    方法封闭一个对象，阻止添加新属性并将所有现有属性标记为不可配置(不可delete)
    返回被密封的对象(就是原对象)
    1、不能增加属性
    2、已有属性的configurable属性设置为false，已有属性变得不可配置，即不能delete
    3、数据属性不能被重新定义成访问器属性（访问器属性不能定义成数据属性）
    4、__proto__不可修改，单原型链上的属性不受影响
```

### Object.isFrozen()

### Object.freeze(obj)

```
    冻结一个对象，一个被冻结的对象再也不能被修改；
    1、不能增加属性
    2、不能删除已有属性
    3、不能修改已有属性的描述符
    4、不能修改访问器属性
    5、不能修改对象的原型
    如果属性值是对象，则这个对象中的属性是可以修改的，除非它自身也是冻结的。
    也就是说，冻结性不传递
    数组作为一种对象，冻结的效果是元素不能被修改，不可以增加删除元素
    深冻结
```

### SVG:可缩放矢量图形，是 W3C XML 的分支语言，用来标记可缩放矢量图形

> html（Hyper Text Markup Language）是超文本标记语言。如何表现信息
> xhtml（Extensible Hyper Text Markup Language）升级版的 html，也是过渡语言，html 向 xml 过渡的语言
> xml(Extensible Markup Language)扩展标记语言。如何结构化描述信息
> SVG 文件和包含 SVG 标签的简单文本文件
> gzip 可以压缩 svg 文件，后缀.svgz
> 普通 SVG：Content-Type: image/svg+xml;Vary: Accept-Encoding
> gzip 压缩：Content-Type: image/svg+xml;Content-Encoding: gzip;Vary: Accept-Encoding

```js
/*
svg是svg文件的跟标签。SVG Tiny和SVG Basic
svg标签：
    svg
    line
        x1,y1起点坐标；x2，y2终点坐标；
    polyline（折线）
        points坐标字符串
    rect
        x，y坐标；width，height宽高；rx，ry圆角半径；
    circle
        r半径；cx，cy圆心坐标
    ellipse
        rx，ry椭圆半径；cx，cy椭圆中心；
    polygon（多边形）
        points坐标字符串
    path
        d点集数列
        移动命令m/M x y
        画线命令l/L x y
        水平线命令h/H x
        垂直线明林v/V y
        闭合命令z/Z
        二次贝塞尔曲线命令q/Q x1 y1, x y    T命令
        三次贝塞尔曲线命令c/C x1 y1, x2 y2, x y  S命令
        弧线命令a/A
    text
    defs：定义不在SVG图像中出现的元素，例如style元素，linearGradient，radialGradient，patterns，filter
*/
```
