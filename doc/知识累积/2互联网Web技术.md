# Web，根据 MDN 整理

## 1990 年，TimBL 创建并运行了第一个版本的 Web 所需应用 HTTP 和 HTML，WorldWideWeb 浏览器、HTTP 服务器和一些简单的网页

## 1994 年，TIMBL 建立了万维网（World Wide Web Consortium，W3C），该组织汇集了不同公司的代表，共同制定 Web 技术标准。Web 标准用来建立 Web 网站的技术，旨在指导工程师实现这些技术

- `W3C组织, Web标准组织`
- `WHATWG组织, 负责HTML语言的现代化`
- `ECMA组织, 发布ECMAScript标准`
- `Khronos组织, 发布3D图形技术标准`

## Web 开发技术<https://developer.mozilla.org/zh-CN/docs/Web>

### 术语<https://stackoverflow.com/questions/6599815/what-is-the-difference-between-a-shim-and-a-polyfill>

- `shim: A shim is any piece of code that performs interception of an API call and provides a layer of abstraction. It isn't necessarily restricted to a web application or HTML5/CSS3`
- `polyfill: A polyfill is a type of shim that retrofits legacy browsers with modern HTML5/CSS3 features usually using Javascript or Flash.`

> shim，所有拦截并提供抽象层的库都可以成为 shim，不局限 web 技术。可以拦截现有的实现，也可以拦截没有的实现，并自行实现，例如 polyfill。

> polyfill 是一种特殊的 shim，拦截提供宿主环境不存在的 api，弥补手段。

### Web APIs

#### Web APIs 大致分类

- `DOM，对象文档模型: 操作文档的Node和Element`
- `设备API`
  - `环境光感应器API`
  - `电池状态API`
  - `地址位置API`
  - `指针锁定API`
  - `距离感应器API`
  - `设备定向API`
  - `屏幕定向API`
  - `震动API`
- `通信API`
  - `网络信息API`
  - `Web通知API`
  - `简单推送API`
- `数据管理API`
  - `文件处理API`
  - `IndexedDB`
- `特权API`
  - `TCP Socket API`
  - `联系人API`
  - `设备存储API`
  - `浏览器API`
  - `相机API`
- `已认证应用程序的私有API: 直接与操作系统打交道，执行核心操作的底层应用程序`
  - `蓝牙API`
  - `手机连接API`
  - `网络状态API`
  - `通话API`
  - `短信彩信API`
  - `Wifi信息API`
  - `电源管理API`
  - `设置API`
  - `空闲状态API`
  - `权限API`
  - `时间/时钟API`

#### Web APIs 细节

- `WindowOrWorkerGlobalScope`
  - `fetch`
  - `setTimeout, clearTimeout`
  - `setInterval, clearInterval`
  - `queueMicrotask`
  - `createImageBitmap`
  - `atob, btoa：base64编解码，非DATA URL`
- `Web APIs`
  - `FileRead、Blob、File`
  - `Message Channel`
  - `Intersection Observer`
  - `PerformanceObserver`
  - `ResizeObserver`
  - `MutationObserver：术语DOM3 Events规范，提供了见识对DOM树所做更改的能力`

### Javascript，操作 web

#### npm 包规范

[npm 包规范](../npm/npm.md)

#### JavaScript 的模块化

- `UMD(Universal Module Definition， 通用模块定义规范)：会兼容现存的模块规范`

```js
/*
 */
```

- `ES Module:`

```js
/*
import
as语法
import()动态导入
export
export default
 */
```

- `CommonJS:`被渐渐废弃，采用 ES Module，2017.9.12 的Nodejs@8.5.0开始支持 es6Module

```js
/*
  同步加载
  每一个文件就是一个模块
  所有代码运行下模块作用域内
  模块可以加载多次，但只运行一次，结果会被缓存
  模块按照出现的顺序加载
关键字（保留字）：
  module, 有一个保留属性module.exports
  exports
  require()
 */
```

- `AMD(Asynchronous Module Definition):`require.js

```js
/*
  支持异步加载
关键字（保留字）：
  define(id?, dependencies?, fn)
  require()
 */
```

- `CMD(Common Module Definition):`sea.js

```js
/*
关键字（保留字）：
  define(fn(require, exports, module){})
 */
```

#### JavaScript 的 Runtime、EventLoop、Execute Context、并发模型、异步 JavaScript

- `并发模型与事件循环`<https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop>

> 基于消息和任务队列的并发模型、基于多进程的并发模型、基于多线程的并发模型

- `Runtime：宿主环境提供了 RunTime，且宿主环境可以是多进程、多线程的，但是 JavaScript 是单线程`

  - `Runtime的组成`
    - `执行上下文的集合`
    - `执行上下文栈`
    - `主线程`
    - `执行worker的额外线程集合`
    - `堆：存放JS引用对象`
    - `任务队列：存放JS任务`
    - `微任务队列：存放JS微任务`
  - `Runtime之间通信方式：postMessage`
  - `web worker、跨域iframe都有自己的runtime，既拥有独立的栈、堆和任务队列`

- `深入：微任务与Javascript运行时环境`<https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_DOM_API/Microtask_guide/In_depth>
  - `执行环境（执行上下文）：规定了变量和函数能够访问的数据，以及各自的行为`
    - `全局执行环境：`
    - `局部执行环境（函数执行环境）：`
    - `eval执行环境：`
- `Event Loops：`每个 Runtime 都是事件循环驱动，事件循环负责收集事件、对任务进行调度、渲染 UI
  等。网页（app）的代码和浏览器本身的用户界面程序运行在相同的线程中，共享事件循环，该线程就是主线程。主线程进行循环，调度渲染、JS 等线程（个人理解）。事件类型：
  - `window event loop：所有同源资源`
  - `worker event loop`
  - `worklet event loop`
- `Tasks vs microtasks`

  - `任务：`A task is any JavaScript scheduled to be run by the standard mechanisms such as initially starting to execute a program, an event triggering a callback, and so forth. Other than by using events, you can enqueue a task by using setTimeout() or setInterval().
  - `微任务：`
  - `When executing tasks from the task queue, the runtime executes each task that is in the queue at the moment a new iteration of the event loop begins. Tasks added to the queue after the iteration begins will not run until the next iteration`
  - `Each time a task exits, and the execution context stack is empty, each microtask in the microtask queue is executed, one after another. The difference is that execution of microtasks continues until the queue is empty—even if new ones are scheduled in the interim. In other words, microtasks can enqueue new microtasks and those new microtasks will execute before the next task begins to run, and before the end of the current event loop iteration.`

  - `产生task的API: script、addeventlistener、settimeout、setinterval、requestanimationframe、宿主环境触发消息产生task，例如动画操作产生的task`
  - `产生microtask的API: promise.then, enqueueMicrotask, Object.observe, MutationObserver, process.nextTick`

#### JavaScript APIs

- `值属性`
  - `Infinity`
  - `NaN`
  - `undefined`
  - `globalThis`
- `函数属性`
  - `eval()`
  - `uneval()`
  - `isFinite()`
  - `isNaN()`
  - `parseFloat()`
  - `parseInt()`
  - `decodeURI()`
  - `encodeURI()`
  - `decodeURIComponent()`
  - `encodeURIComponent()`
  - `escape()`
  - `unescape()`
- `基本对象`
  - `Object`
  - `Function`
  - `Boolean`
  - `Symbol`
- `错误对象`
  - `Error`
  - `AggregateError`
  - `InternalError`
  - `RangeError`
  - `ReferenceError`
  - `SyntaxError`
  - `TypeError`
  - `URIError`
- `数字和日期对象`
  - `Number`
  - `BigInt`
  - `Math`
  - `Date`
- `字符串对象`
  - `String`
  - `RegExp`
- `可索引的集合对象`
  - `Array`
  - `Int8Array`
  - `Uint8Array`
  - `Uint8ClampedArray`
  - `Int16Array`
  - `Int32Array`
  - `Uint32Array`
  - `Float32Array`
  - `Float64Array`
  - `BigInt64Array`
  - `BigUint64Array`
- `可使用键的集合对象`
  - `Map`
  - `Set`
  - `WeakMap`
  - `WeakSet`
- `结构化数据`
  - `ArrayBuffer`
  - `SharedArrayBuffer`
  - `Atomics`
  - `DataView`
  - `JSON`
- `控制抽象对象`
  - `Promise`
  - `Generator`
  - `GeneratorFunction`
  - `AsyncFunction`
- `反射`
  - `Reflect`
  - `Proxy`
- `国际化`
  - `Intl`
- `WebAssembly`
  - `WebAssembly`
- `其它`
  - `arguments`

#### 异步 JavaScript<https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Asynchronous>

```js
/*
  常规模式，程序都是按照顺序执行，同一时刻只会发生一件事情。同步执行，容易产生阻塞，这样很浪费计算机资源，体验也不友好。

  线程：基本的处理过程，程序用它来完成任务。每个线程一次只能执行一个任务。

  Javascript是单线程的。但允许有一些worker，既额外的线程。

  JS的异步编程是基于消息驱动机制
    方案1：回调函数书写方案
    方案2：Promise书写方案
    方案3：Generator生成器书写方案
    方案4：async和await书写方案
 */
```

- `设置异步任务的web apis`
  - `setTimeout()`
  - `setInterval()`
  - `requestAnimationFrame()`
  - `setImmediate()，非标准的???`
  - `requestIdleCallback()???`
- `Promise`
- `async await`

### HTTP，HypertextTransferProtocol，超文本传输协议，用于 Web 浏览器和 Web 服务器进行通信

### HTML，Hypertext Market Language，超文本标记语言，构建 web

### CSS，Cascading Style Sheets，描述 web

### ASP.NET, Python, Java, PHP, NodeJS

### SVG

### MathML

### Web App Manifest

### Web Component

### Web Driver

### XML

### Web 安全
