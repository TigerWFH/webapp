# web APIs

## 用户与指针设备（如鼠标）

### 事件&事件处理程序

- `click`：click 事件在按下并释放鼠标按钮后并且指针仍在同一元素内时触发。click 事件会在 mousedown 和 mouseup 事件依次触发后触发
- `dbclick`：在单个元素上单击两次鼠标的指针设备按钮 (通常是小鼠的主按钮) 时，将触发 dblclick 事件
- `mouseup`：事件在定点设备（如鼠标或触摸板）按钮在元素内释放时，在该元素上触发
- `mousedown`：定点设备（鼠标或触摸板）按钮在元素内按下时，会在该元素上触发（mousedown 事件在按下鼠标按钮的那一刻触发）
- `mouseover`：当一个定点设备（通常指鼠标）在一个元素本身或者其子元素上移动时，mouseover 事件在该元素上触发
- `mousemove`：事件在定点设备（通常指鼠标）的光标在元素内移动时，会在该元素上触发
- `mouseenter`：事件在定点设备（通常指鼠标）`首次`移动到元素的激活区域内时，在该元素上触发
- `mouseleave`：事件在定点设备（通常是鼠标）的指针`移出`某个元素时被触发
- `mouseout`：mouseout 事件在定点设备（通常是鼠标）移动至元素或其子元素之外时，会在该元素上触发
  > - 两者的不同在于 mouseleave 不会冒泡而 mouseout 会冒泡。这意味着当指针离开元素及其所有后代时，会触发 mouseleave，而当指针离开元素或离开元素的后代（即使指针仍在元素内）时，会触发 mouseout。

### 接口

- `MouseEvent`

## HTML Drag and Drop API

### 事件&事件处理程序

- `dragstart & onsragstart`：开始拖拽元素时触发
- `drag & ondrag`：拖拽元素时触发
- `dragend & ondragend`：拖拽操作结束时触发

- `dragenter & ondragenter`：拖拽元素遇到`可释放目标`时触发
- `dragover & ondragover`：拖拽元素在可释放目标上时，持续触发，每 100ms 触发一次
- `dragleave & ondragleave`：拖拽元素离开可释放目标时触发
- `drop & ondrop`：可拖拽元素在可释放目标上释放时触发

### 接口

- `DragEvent`
- `DataTransfer`
  > - dropEffect：控制在拖放操作中给用户的反馈（通常是视觉上的），会影响拖拽过程中光标的手势
- `DataTransferItem`
- `DataTransferItemList`

## IntersectionObserver API

> 该接口提供了一种异步观察目标元素与其祖先元素或顶级文档视口（viewport）交叉状态的方法。其祖先元素或视口被称为根 root
>
> 当一个 IntersectionObserver 对象被创建，其被配置为监听根中一段给定比例的可视区域。

### 构造函数

- `IntersectionObserver(callback[,options])`
  - `callback(entries, observer)`
  - `options={}`
    - `root`
    - `rootMargin`
    - `threshhold`

### 实例属性

- `root`
- `rootMargin`
- `threshholds`

### 实例方法

- `disconnect()`
- `observe()`
- `takeRecords()`
- `unobserve()`

## XMLHttpRequest

### `构造函数`

> - `XMLHttpRequest()`，返回一个 XMLHttpRequest 实例

### `实例属性`

> - `readyState：`只读，当前请求（request）的状态；【0：UNSENT；1：OPENED；2：HEADERS_RECEIVED；3：LOADING；4：DONE】
> - `responseType：`表明 response 数据的类型；【"":"text"; "arraybuffer": "ArrayBuffer"; "blob": "Blob"; "document": "HTML or XML document"; "json": "JSON"; "text": "string"】
> - `response：`原始响应数据；【string, ArrayBuffer, Blob, HTML, XML, JSON, null 】
> - `responseText：`字符串形式的结果或 null
> - `responseURL：`URL 形式的结果或 null
> - `responseXML：`XML 形式的结果或 null，即 HTML 或 XML
> - `status：`HTTP 协议状态码，默认 0，成功为 200-300
> - `statusText：`HTTP 协议状态描述
> - `timeout：` 超时时间，单位 ms；默认 0，标识不设置超时。设置了超时，超时后会触发 timeout 事件
> - `upload：`一个 XMLHttpRequestUpload 对象，用于监听上传进度。支持事件【loadstart,progress,abort,error,load,timeout,loadend】
> - `withCrdentials：`默认值为 false；标识跨域请求时是否带上凭证（cookie、Authoization Headers 或者 TLS 客户端证书）

```js
/*
    cookie格式：
        name=value：cookie名称和值
        expires=Date：cookie有效期
        domain=xxx：cookie可以被哪些域读取
        path=/：cookie可以被哪些路径下的页面读取
        secure：安全标记，表示cookie只能通过https传送
        httpOnly：安全标记，标识cookie不能被document.cookie访问，仅用于服务器。意味着客户端无法访问

    重要理解：
        1、同一域，前端JS通过document.cookie只能在同一域名或子域名写cookie，不能写入其它域名，即a.com写cookie中domain不能是b.com，例外：如果第三方不指定domain，默认取当前文档的domain写入
        2、第三方cookie，是第三方资源写入的
        3、当前文档引入了第三方的资源，就可以看到第三方的cookie。第三方的资源请求需要带上第三方的cookie，从这个角度上是讲的通的

    第一方cookie：由访问的站点a.com创建
    第三方cookie：由访问的站点a.com中应用的第三方b.com的资源创建的
    HTTP RESPONSE中的Set-Cookie，服务端告诉客户端种植cookie

    Domain和Path属性，定义了cookie的作用域，即允许 Cookie 应该发送给哪些 URL
    Domain: 指定了哪些主机可以接受 Cookie。默认是同一host；如果指定，一般包含子域名；不能指定无关域名
    Path: 指定能携带该cookie的具体url。 "/" 是目录分隔符，会匹配子目录

    Cookie的时效性：一般情况下浏览器关闭，cookie失效；可通过设置特定的Expires或者Max-Age为cookie设置相对较长的有效时间

    Sec-Fetch-Site	描述
    cross-site	请求的发起源与资源源完全不相同
    same-origin	请求的发起源与资源源完全相同
    same-site	请求的发起源与资源源部分相同：同一顶级域名下的二级域名
    none	    无限制

    最新IEEF cookie SameSite策略：
        1、督促浏览器版本迁移，使cookie的SameSite默认是Lax（没有设置浏览器的SameSite属性，默认就是Lax）
        2、如果需要跨域发送cookie，请使用None，无SameSite限制；需要搭配Secure指令使用（SameSite=None，但是不带secure，那么cookie将会被丢弃）
    Lax：对同源、顶级域的请求才可以携带cookie，等价于same-site
    Strict：对同源请求才可以携带cookie，等价于same-origin
    None：对于cookie的使用无限制
*/
```

### `实例方法`

> - `abort()：`中断已经 send 的请求，同时设置 readyState 为 0；status 为 0；触发 abort 事件
> - `getAllResponseHeaders()`
> - `getResponseHeader()`
> - `open()`
> - `overrideMimeType()`
> - `send()`
> - `setRequestHeader()`

### `事件`

> - `abort`
> - `error`
> - `load`
> - `loadend`
> - `loadstart`
> - `progress`
> - `readystatechange`
> - `timeout`

## Request

### `构造函数`

> - `Request()`
> - `input：`USVString URL 或 Request 对象
> - `init：`可选参数

```js
const init = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  },
  body: 'Blob, BufferSource, FormData, URLSearchParams, USVString, ReadableStream等等；GET和HEAD没有body',
  mode: 'cors | no-cors | same-origin | navigate',
  credentials: 'omit | same-origin | include',
  cache: '',
  redirect: 'follow | error | manual',
  referrer: '',
  integrity: ''
};
```

## Response

## Headers

## URL

> The URL interface is used to parse, construct, normalize, and encode URLs

## fetch

> - 使用到了最新的 web apis：Response、Request、Headers 等
> - fetch 是一个全局的 function

### fetch(resource[, options])

> stringifier: An object's stringifier is any attribute or method that is defined to provide a textual representation of the object for use in situations where a string is expected.
>
> - resource: string, 或具有 stringifier 工具 的对象，例如 URL。或者 Request 对象
> - options

```js
const options = {
  method: '',
  headers: '',
  body: '', // [Blob, ArrayBuffer, TypedArray, DataView, FormData, URLSearchParams, string object, literal, ReadableStream]
  mode: '', // [cors, no-cors, same-origin]
  credentials: '', // [omit, same-origin, include]
  cache: '', // HTTP cache
  redirect: '', // [follow, error, manual]
  referrer: '', // ['', 'about:client']
  referrerPolicy: '' // [no-referrer, no-ferrer-when-downgrade, same-origin, origin, strict-origin, origin-when-cross-origin, strict-origin-when-cross-origin, unsafe-url]
  keepalive: '', //
  signal: '', //
};
/*
    body数据以及对应的content-type：
    FormData：content-type: multipart/form-data;boundary=----WebKitFormBoundaryOErPZP11lGE5iLqT
    URLSearchParams: content-type: application/x-www-form-urlencoded;charset=UTF-8


    常见的content-type：
        application/json：JSON数据格式
        application/js：JS文件
        application/xml：XML数据格式
        application/x-www-form-urlencoded：post请求默认的数据格式，URLSearchParams
            用等号连接参数名和参数值，并使用urlencode编码：title=test&sub%5B%5D=1&sub%5B%5D=2&sub%5B%5D=3
        multipart/form-data：表单数据格式，支持上传文件
            这个格式会在多个参数之前插入一段分隔符
        application/octet-stream：暂时理解为二进制文件，就是字节流
        text/html： HTML数据格式
        text/css： css文件
        text/plain：纯文本字符串
        image/png：图片格式

    Content-Type: 指定数据格式
    Content-Disposition: 指定如何处理数据[inline, attachment]
        inline：直接在页面展示
        attachment：以附件形式下载

    Server端实现文件下载：
        Content-Type: application/octet-stream
        Content-Disposition: attachment;filename=xxxx.xlsx
*/
```

> 返回一个 Promise<Response>对象

## websockets

## Beacon APIs

> Beacon 接口用于将异步和非阻塞请求发送到服务器。
>
> 信标（Beacon）请求使用 HTTP 协议中的 POST 方法，请求通常不需要响应。
>
> 这个请求被保证在，页面的 unload 状态从发起到完成之前，被发送

- `问题`用户代理通常会忽略卸载文档处理程序中的异步 XMLHttpRequests 请求
- `传统方案：`通常会在 unload 事件或 beforeunload 事件中创建同步 XMLHttpRequest 请求以提交数据。同步 XMLHttpRequest 请求强制浏览器延迟卸载文档，并使下一个页面跳转看起来较慢
- `img方案：`创建 Image 元素并在卸载文档处理程序中设置其 src 属性来延迟卸载以提交数据。由于大多数用户代理会延迟文档卸载，以完成挂起的图片加载，因此可以在卸载过程中提交数据
- `Beacon方案：`用于在全局浏览上下文中向服务器发送数据信标
  > - `Navigator.sendBeacon(url[,data])`
  >   用户代理常常忽略 unload 和 beforeunload 中的异步 ajax 请求，导致数据丢失
  > - `WorkerNavigator.sendBeacon(url[,data])`
- `会话结束时发送统计数据的可靠方案`
  > visibilitychange 事件发生时，发送数据,document.visibilityState === 'hidden'
  >
  > pagehide 可以作为 visibilitychange 的降级方案，避免使用 beforeunload、unload

## Selection

- `Selection：`表示用户选择的文本范围或插入符号的当前位置，代表页面中的文本选取，可能横跨多个元素

  > - anchorNode：选取起点所在节点
  > - anchorOffset：选取起点在 anchorNode 中的位置偏移量
  > - focusNode：
  > - focusOffset：
  > - isCollapsed：表示选区被压缩至一点，即光标位置
  > - rangeCount：返回选区所包含的连续范围的数量
  > - 方法：
  > - getRangeAt()
  > - collapse()
  > - extend()
  > - modify()
  > - toString()
  > - [更多资料](https://developer.mozilla.org/zh-CN/docs/Web/API/Selection)

- `window.getSelection()返回Selection实例`

## Event

> - 事件(event)、事件处理器、事件处理器 event 参数接口

### 事件处理器 event 参数接口

> 表示 DOM 中出现的事件处理器的 event 参数类型，所有的事件接口名称都以 event 结尾<https://developer.mozilla.org/zh-CN/docs/Web/API/Event>

- `添加事件处理程序的方法有三种`
  > - `HTML事件处理程序` onclick="alert(123)"，直接写 JS
  > - `DOM0级事件处理程序` 添加：dom.onclick = function() {}; 删除：dom.onclick = null
  > - `DOM2级事件处理程序`addEventlistener 和 removeEventListener

```plantuml
@startuml Event
    interface Event {
        boolean bubbles;
        boolean cancelable;
        <s>boolean cancelBubble</s>;
        boolean composed;
        HTMLElement currentTarget;
        boolean defaultPrevented;
        string eventPhase;
        <u>HTMLElement originalTarget</u>
        <u>HTMLElement explicitOriginalTarget</u>
        <u>HTMLElement srcElement</u>
        any returnValue;
        HTMLElement target;
        long timestamp;
        string type;
        -- 方法 --
        any createEvent();
        any composedPath();
        <s>any initEvent()</s>
        any preventDefault();
        any stopPropagation();
        any stopImmediatePropagation();
    }
    interface UIEvent {}

    Event <|-- AnimationEvent
    Event <|-- BeforeUnloadEvent
    Event <|-- CustomEvent
    Event <|-- FetchEvent
    Event <|-- FocusEvent
    Event <|-- HashChangeEvent
    Event <|-- InputEvent
    Event <|-- StorageEvent
    Event <|-- UIEvent
    Event <|-- MessageEvent

    UIEvent <|-- MouseEvent
    UIEvent <|-- TouchEvent
    UIEvent <|-- KeyboardEvent
    UIEvent <|-- CompositionEventEvent

    MouseEvent <|-- WheelEvent
    MouseEvent <|-- DragEvent
@enduml
```

### 事件

| 事件                   | 参数接口            | 触发对象        | 触发                         | 备注       |
| :--------------------- | :------------------ | :-------------- | :--------------------------- | :--------- |
| beforeunload           | BeforeUnloadEvent   | window          |                              | 似乎未触发 |
| pagehide               | PageTransitionEvent | window          |                              |            |
| visibilitychange       | Event               | window,document | 浏览器标签页可视或隐藏时触发 |            |
| webkitvisibilitychange | Event               | window,document | 浏览器标签页可视或隐藏时触发 |            |
| unload                 | Event               | window          |                              |            |
| readystatechange       | Event               | document        |                              | 多次触发   |
| DOMContentLoaded       | Event               | window,document |                              |            |
| load                   | Event               | window          |                              |            |
| pageshow               | BeforeUnloadEvent   | window          |                              |            |
| toggle                 | Event               | details 元素    |                              |            |

### FocusEvent

> 提供了 focus, blur, focusin, focusout 等事件
>
> `Document.activeElement`的值随浏览器不同而不同（BUG）

- `触发对象：`Window(MDN 没有，W3C 规范上有，实测 chrome、safari 支持),Element

### ClipboardEvent

> 提供了 cut, copy, paste 事件
>
> `HTMLElement.contentEditable：` 该属性用于表明元素是否是可编辑
>
> [Clipboard 规范](https://www.w3.org/TR/clipboard-apis/#the-copy-action)

- `触发对象：`Window(实测 chrome、safari 支持), Element(获得焦点的元素)或者 body

### BeforeUnloadEvent

> - 提供了 beforeunload 事件
> - `触发对象：`window、document
> - 窗口关闭或文档资源卸载前触发
> - 默认操作是关闭窗口或文档，如果调用 event.preventDefault()，阻止关闭；或 event.returnValue=xxx，则会出现关闭弹框

### 文档事件（Document）

- `pagehide`
  > - `触发对象`
- `unload`
  > - `触发对象`window,body,frameset
  > - 窗口关闭或文档资源卸载前触发
  > - 页面没有被缓存的场景下才会触发（bfcache 场景就不会触发）
  > - unload 事件触发，文档资源存在，但是视觉已经不可见
- `DOMContentLoaded`
  > - `触发对象`document、XMLHttpRequest
  > - HTML 文档下载并解析完成会触发该事件
- `load`
  > - `触发对象`document、img、script、video、audio、link、XMLHttpRequest 等等
  > - 文档加载成功时，触发，bfcache 不是触发
- `pageshow`
  > - `触发对象`

## DOM

> - `textContent`可以获取 script、style 标签组成元素的内容；`innerText`只能获取渲染的文本内容
> - `textContent`返回节点中的每一个元素；`innerText`受 CSS 样式影响，不会返回隐藏元素的文本
> - `innerText`会触发回流计算

```plantuml
@startuml DOM类图
interface EventTarget {}
interface Node {
    ' 表示一个节点及其后代的文本内容
    string textContent
}
interface Document {}
interface Element {
    ' 设置或获取HTML语法表示的元素后代
    string innerHTML
    ' 设置或获取描述元素（包括后代）的序列化HTML片段
    string outerHTML
}
interface HTMLDocument {}
interface HTMLElement {
    ' 获取节点及其后代的渲染文本内容
    string innerText
}

interface HTMLHtmlElement {}
interface HTMLDivElement {}

EventTarget <|-- Node

Node <|-- Document
Node <|-- Element

Document <|-- HTMLDocument

Element <|-- HTMLElement

HTMLElement <|-- HTMLHtmlElement
HTMLElement <|-- HTMLDivElement

@enduml

```

### EventTarget 是一个 DOM 接口，可以接收事件、创建侦听器

- `EventTarget.addEventListener()：在EventTarget上注册特定事件类型的事件处理程序`
- `EventTarget.removeEventListener()：EventTarget中删除事件侦听器`
- `EventTarget.dispatchEvent()：将事件分派到此EventTarget`

### Node

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

### Document 接口：网页内容的入口，也是 DOM 树

### Element

```js
/*
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
 */
```

### HTMLElement

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
 *      HTMLElement.offsetParent：返回指向最近的（包含层级上的最近）包含当前元素的定位元素或者最近的table、td、th、body，当元素的display为none或fixed时，返回null。offsetTop和offsetLeft都是相对于offsetParent内边距边界
 *      HTMLElement.offsetTop：距离定位父级元素上边边界的距离
 *      HTMLElement.offsetLeft：距离定位父级元素左边边界的距离
 *      HTMLElement.offsetWidth：元素的布局宽度，包括滚动条(scrollbar)、边框(border)、水平内边距(padding)、CSS宽度，包括滚动内容
 *      HTMLElement.offsetHeight：元素的布局高度，包括滚动条(scrollbar)、边框(border)、水平内边距(padding)、CSS高度，包括滚动内容(定位元素，即position非static的父元素)
 */
```

## 文件操作相关接口

### 文本文件和二进制文件<https://www.zhihu.com/question/19971994>

```js
/*
文件包含两部分数据：
    控制信息数据和内容信息数据。
    纯文本文件则没有控制信息数据部分，是因为文本文件的解释格式已经确定了，是通用的，按照unicode或者ASCII编码。
计算机从磁盘读取文件时，读的都是二进制数据
程序解释二进制数据时，才区分文本文件和二进制文件。
二进制文件除了公共开源的格式，个人和机构是可以私有格式

BOM
文件头标志是指存储在文件起始部分的一系列特定字节，用于标识文件的类型或格式。不同类型的文件会有不同的文件头，通过识别这些标志，程序可以快速确定文件的类型
*/
```

### Blob、File and Streams API

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

### URL<https://www.zhihu.com/question/19557151>，以下是 URL 和 URI 的构成组件

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

### FileReader 接口：允许 Web 应用异步读取存储在用户计算机上的文件（或原始数据缓冲区）内容，使用 Blob 或 File 对象指定要读取的内容。不能用于从文件系统中按路径名简单的读取文件

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

### Canvas Image Audio ImageData

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

## js 操作 DOM 性能问题资料

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
