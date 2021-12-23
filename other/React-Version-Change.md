# React的diff算法和更新渲染机制
> React就是reconciler，ReactDOM就是renderer
> React15,React16,React16.3和React17
## 什么是卡顿？掉帧就是俗称的卡顿
## js执行时间过长，造成浏览器无法在16.7ms内（根据硬件设备参数决定）产生下一帧数据（这个数据会交给硬件，由硬件去渲染），就会丢帧，即出现卡顿现象
## React16以前，React的stack reconciler算法基于递归栈（不可打断），在diff+patch或者Mount超大组件时，计算量过大超出16.7ms，就会产生卡顿现象
## React16以后，React的fiber reconciler算法基于链表结构，使用for循环（可打断任务）和requestIdleCallback，避免了js大量计算阻塞主线程渲染下一帧数据，从而避免了卡顿现象
## window.requestIdleCallback(cb[, options])
* `cb(idleDeadline)：`
```js
    /*
        IdleDeadline：
            didTimeout：Boolean，true说明正在执行cb且上一次由于剩余时间不足没有执行
            timeRemaining()：返回一个DOMHighRestTimeStamp，表示当前显示周期的预估剩余毫秒数
    */ 
```
* `options.timeout：`
## 浏览器在一帧时间内可能执行下列任务，而且顺序基本是相对固定
* `处理用户交互事件`
* `Javscript执行`
* `requestAnimation调用`
* `布局layout`
* `绘制Paint`
* `requestIdleCallback：还有时间才会调用该函数。为了避免饿死，可以通过设置第二个参数options.timeout，强制执行，可能会掉帧即卡顿`

> 由于requestIdleCallback支持程度问题，React使用MessageChannel模拟了将回调延迟到挥之操作之后执行

> react16.13弃用了requestAnimationFrame

> Use postMessage loop with short intervals instead of attempting to align to frame boundaries with requestAnimationFrame
## Channel Messaging API：允许创建一个新的消息通道，并通过他的两个MessagePort属性进行通信
> 跨文档通信：window.postMessage()和messages事件配合使用，在iframe之间通信

> 通道通信：ChannelMessage，可以在worker之间通信，也可以在iframe之间通信
* `MessageChannel：`
* `MessagePort：`
* `otherWindow.postMessage(message, targetOrigin, [transfer])`
```js
    /*
        otherWindow：窗口引用。可以直接在parent和child窗口直接传递信息
        MessagePort实例方法
            postMessage(message, targetOrigin, [trasfer])，从端口发送一条消息
                message：传递的消息
                targetOrigin：指定能够接受消息的目标窗口，可以是*或者URI。协议、主机、端口完全一致，才能接收到该消息
                transfer：可选参数，Transferable对象，这些对象的所有权将被转移给消息的接受者方，发送方将不再保有所有权。例如MesaageChannel中的MessagePort实例的转移
            start()，开始发送该端口的消息队列
            close()，断开端口连接
        MessagePort实例回调
            onmessage
            onmessageerror
    */ 
```
* `MutationObserver`
## 在浏览器环境中，macro task有setTimeout，MessageChannel，postMessage，setImmediate
## 在浏览器环境中，micro task有MutationObserver和Promise.then

# React主要特性变更与版本对应关系(https://github.com/facebook/react/blob/master/CHANGELOG.md)
## React17
```js
    /*
    React
        add react/jsx-runtime和react/jsx-dev-runtime
    ReactDOM
    */ 
```
## React16.14
```js
    /*
        add support new JSX transform
    */ 
```
## React16.13
```js
    /*
    React
        废弃React.createFactory
    ReactDOM
        为ReactDOM增加version属性
    React Reconciler
        Use postMessage loop with short intervals instead of attempting to align to frame boundaries with requestAnimationFrame
    */ 
```
## React16.12
```js
    /*
        暂无
    */ 
```
## React16.11
```js
    /*
        暂无
    */ 
```
## React16.10
```js
    /*
        暂无
    */ 
```
## React16.9
```js
    /*
    React
        Add <React.Profiler> API
        remove unstable_ConcurrentMode
    ReactDOM
        废弃UNSAFE_*声明周期函数
        废弃javascript:
    */ 
```
## React16.8
```js
    /*
    React
        Add Hooks
    ReactDOM
    */ 
```
## React16.7
```js
    /*
        暂无
    */ 
```
## React16.6
```js
    /*
    React
        React.memo
        React.lazy
    ReactDOM
        contextType
        getDerivedStateFromError
        <Context>代替<Context.Consumer>
    */ 
```
## React16.5
```js
    /*
        无
    */ 
```
## React16.4
```js
    /*
        无
    */ 
```
## React16.3
```js
    /*
    React
        context API
        React.createRef
        React.forwardRef
    ReactDOM
        getDerivedStateFromProps
        getSnapshotBeforeUpdate
        React.StrictMode

    */ 
```
## React16.2
```js
    /*
    React
        add React.Fragment
    ReactDOM
        

    */ 
```
## React16.1
```js
    /*
    React 
    ReactDOM
        允许为AMP自定义属性
    */ 
```
## React16
```js
    /*
        React就是Reconciler，React自身控制
        ReactDOM就是Renderer，允许社区控制和贡献
        问题：
            每次有state变化，React重新计算。如果计算量过大（超过16.7ms），浏览器主线程来不及做其他的事情，比如renderer或者layout，paint等，就会出现卡顿现象（浏览器没有把变化在16.7ms内渲染出来？？？？？似乎Fiber也会出现该问题？待进一步理解）
        -------------------------------------------
        ReactFiber：
            ReactFiber基于链表结构，使用循环，使得大量的计算可以被拆解，异步化。浏览器主线程得以释放，保证了渲染的帧率，从而提高响应。
            React将更新分为两个时期
        -------------------------------------------
        架构：
            1、Scheduler（调度器）：调度任务优先级，使优先级高的任务进入Reconciler
            2、Reconciler（协调器）：负责找出变化的组件。通过diff算法计算出变化的组件并交给Renderer
            3、Renderer（渲染器）：负责将变化的组件进行渲染
        更新机制：
            首先，Scheduler调度任务，将优先级高的任务加入到Reconciler中
            其次，Reconciler通过diff算法计算出需要更新的组件，并标记更新状态，整个组件更新完成后，再通过Renderer去执行更新并渲染组件。Reconciler的过程是可以被打断（原来的递归diff编程循环diff，循环可以被打断），并且是等整个组件协调完成之后再通过Renderer渲染更新
        -------------------------------------------
        依赖了Map和Set集合类型以及requestAnimationFrame接口
        组件render函数可以返回数组和字符串
    React
        add createClass
    ReactDOM
        createPortal
        允许传递非标准属性
        render返回null
    ReactDOMServer
        renderToNodeStream
        renderToStaticNodeStream
    */ 
```
## React15
```js
    /*
        架构：
            1、Reconciler（协调器）：通过diff算法找出变化的组件交给Renderer渲染器
            2、Renderer（渲染器）：将变化的组件重新渲染。支持多平台。
                浏览器使用react-dom库做组件的渲染
                React-Native框架使用XXX渲染
        更新机制：
            Reconciler通过diff算法计算出需要更新的组件，交给Renderer去执行更新并渲染组件。
            该过程持续进行，且是同步的。Reconciler和Renderer交替进行，这是基于递归栈的实现，不可打断
        问题（有待商榷）：
            VDOM是一个树，通过 深度优先遍历，层层递归向下执行，遍历过程不可中断。在diff+patch或者Mount一个巨大的节点时（root下面有10000个节点），会造成巨大的卡顿，如果在16.7ms内没有diff完（正常要在16.7ms内diff+patch+render完成），会卡顿。
    */ 
```
# React版本迭代
current-2020-1-3
React-v16.12.0

React-v16.9.0
1、React.Profiler

React-v16.8.0
1、Hooks：不用写class就可以使用state以及其它react特性

React-v16.6.0
1、React.memo
2、React.lazy
3、unstable_ConcurrentMode代替unstable_AsyncMode
4、Suspense代替unstable_Placeholder，delayMs to maxDuration
5、contextType
6、getDerivedStateFromError（为服务端异步捕捉错误做准备）

React-v16.4.0
1、React.unstable_Profiler

React-v16.3.0
1、React.createRef、React.forwardRef
2、React.unstable_AsyncMode
3、static getDerivedStateFromProps
4、React.StrictMode
5、link标签增加onLoad和onError事件
6、script增加noModule布尔属性
7、增加新的context官方api

React-v16.2.0
1、增加Fragment

React-v16.0.0
1、依赖Map、Set、requestAnimationFrame
2、render可以返回数组和字符层
3、ErrorBoundary
4、支持ReactDOM.createPortal
5、支持ReactDOMServer.renderToNodeStream、ReactDOMServer.renderToStaticNodeStream
6、React Dom可以传递非标准属性
7、ReactDOM.render和ReactDOM.unstable_renderIntoContainer会返回null，对比ReactDOM.createPortal
8、setState(null)不会触发render
9、