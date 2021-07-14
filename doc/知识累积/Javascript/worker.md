# 关于 js 的 worker 文件内容（https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Functions_and_classes_available_to_workers）

```
    Web Worker接口：
    1、AbstractWorker：抽象属性和方法，所有worker共享
    2、Worker：正在运行的worker
    3、SharedWorker：表示一种可以同时被多个浏览器环境访问的特殊类型的worker。这些浏览器环境可以是多个window, iframes 或者甚至是多个worker
    4、WorkerGlobalScope：表示任意worker的通用作用域（对于正常的网页类容来说与Window 有相同的作用）。不同类型的worker都有从接口继承作用于对象，并且可以添加更多特定功能
    5、DedicatedWorkerGlobalScope：表示一个专用worker的作用域， 继承自WorkerGlobalScope，且可添加一些特有的功能
    6、SharedWorkerGlobalScope：表示一个共享worker的作用域， 继承自WorkerGlobalScope：且可添加一些特有的功能
    7、WorkerNavigator：表示用户代理（客户端）的身份和状态
    DedicatedWorkerGlobalScope、SharedWorkerGlobalScope

    worker有自己的global即DedicatedWorkerGlobalScope，可以通过self关键字来访问，且该接口继承自WorkerGlobalScope。
    一、继承来的属性
    1、self：指向自身的指针
    2、console：和worker相关的console
    3、location：浏览器window作用域下location的子集
    4、navigator：浏览器window作用下navigator的子集
    5、performance：浏览器作用域下performance的子集
    二、继承来的事件处理程序
    6、onmessage
    三、自由方法
    7、postMessage：发送消息给父文档
    四、继承来的方法
    8、close：抛弃所有正在该WorkerGlobalScope的 event loop中排队的任务，有效地关闭该特定作用域
    9、importScripts：导入一条或者以上脚本到当前worker的作用域里。你可以根据你的需求指定要导入的脚本，通过逗号分割。比如:importScripts('foo.js', 'bar.js')
    10、atob：
    11、btoa：
    12、clearInterval：
    13、clearTimeout：
    14、setInterval：
    15、setTimeout：
    16、fetch：

    <!-- 其它 -->
    1、name：worker的名字
    2、onmessage：接收主线程发来的消息
    3、onmessageerror：发送的数据无法序列化成字符串时，会触发这个事件
    4、close：关闭Worker线程
    5、postMessage：向主线程发送消息
    6、importScripts：加载js脚本
```
