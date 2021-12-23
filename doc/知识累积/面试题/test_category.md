# 一些面试题目

## 网络协议

### http 和 https

- `http超文本传输协议：用于web浏览器和网站服务器之间传递信息。`HTTP 以明文方式发送内容
- `https安全套接字层(传输层安全)超文本传输协议：`在 http 的基础上加入 SSL/TLS（SecureSocketsLayer）协议，SSL 依靠证书验证服务器的身份，并为浏览器和网站服务器之间的通信提供加密。在传输层和应用层之间对网络进行加密。

```js
/*
        客户端与网站服务端使用https通信流程：
            1、客户端使用https访问Web服务器，请求建立SSL链接
            2、Web服务器收到客户端请求后，会将网站的证书信息（包含公钥，CA签发机构，有效期等等）发送给客户端
            3、客户端校验证书通过，与web服务器协商建立SSL链接
            4、客户端根据相关会话信息生成会话秘钥，并使用网站公钥对会话秘钥加密，发送给web服务端
            5、web服务端使用私钥解密获取客户端生成的会话秘钥，用于https通信
            6、客户端和web服务端使用会话秘钥进行通信
        HTTPs的缺点：
            握手阶段耗时，耗电
            SSL证书需要额外开销
    */
```

- `缓存header：pragma和expires，cache-control`
- `新鲜度校验header：If_Modified_Since 和Last_Modified, IF_None_Match和ETag`

### websocket：HTTP 通信只能又客户端发起，所以 websocket 诞生了

#### 客户端

- `构造函数：WebSocket：`webSocket = new WebSocket(schema)
- `状态webSocket.readyState：`返回实例对象的状态

```js
/*
        CONNECTION: 值为0，表示正在连接
        OPEN：值为1，表示连接成功，可以通信
        CLOSING：值为2，表示连接正在关闭
        CLOSE：值为3，表示连接已经关闭或者打开连接失败
    */
```

- `webSocket.onopen：`连接成功后的回调函数。可以通过 addEventListener 添加多个回调函数

```js
ws.addEventListener('open', (evt) => {});
```

- `webSocket.onclose：`指定连接失败后的回调函数
- `websocket.onmessage：`指定接收到服务器数据后的回调函数
- `webSocket.onerror：`指定出错后的回调函数
- `webSocket.send：`向服务器发送数据
- `webSocket.bufferedAmount：`表示未发送数据大小

```js
/*
        2008年，websocket诞生，2011年成为国际标准
        优点：
            双工通信
            数据格式小，性能开销小，通信高效
            可以发送文本和二进制数据
            没有同源限制
            协议标识符：ws和wss
    */
//    Demos：
var ws = new Websocket('wss://www.xxx.com:80');
ws.onopen = (evt) => {
  ws.swnd('');
};
ws.onmessage = (evt) => {
  console.log('evt===>', evt.data);
  ws.close();
};
ws.onclose = (evt) => {
  console.log('Connection closed');
};
```

#### 服务端 websocket

- `WebSockets(Node版)：`
- `Socket.IO(Node版)：`
- `WebSocket-Node：`

### http2

## Browser 加载 Url 过程

```js
/*
        1、beforeunload事件：window、document以及资源卸载时触发
        2、pagehide事件：window，当浏览器在显示与会话历史记录不同的页面的过程中隐藏当前页面时, pagehide(页面隐藏)事件会被发送到一个Window
        3、visibilitychange事件：document，document.visibilityState(visibility,hidden,prerender)
        4、webkitvisibilitychange事件：
        5、unload事件：当文档或一个子资源正在被卸载时, 触发 unload事件
        绿线：Frame Started Loading
        Request Resource
            Request
            Receive
            Finish
        Parse Html
            parse
            request resource
            parse
            request resource
            ...
        6、readystatechange事件：document，document.readyState（
        loading：文档加载中
        interactive：文档已经加载，仍在解析中
        complete：文档加载完成，且子资源加载页也结束
        ），描述文档的加载解析状态
        7、DOMContentLoaded事件：document，页面DOM加载并解析完成就触发，无需等待依赖资源的加载
        蓝线：DOMContentLoaded Event
        8、readystatechange事件：document，document.readyState（loading、interactive，complete）
        9、load事件：整个页面和依赖资源完成加载时，将触发load事件
        红线：load事件
        10、pageshow事件：当一条会话历史记录被执行的时候将会触发页面显示(pageshow)事件，这包括了后退/前进按钮操作，同时也会在onload 事件触发后初始化页面时触发
    */
```

## Javascript

### ES 新特性

- `ES6新特性（2015）`

```js
/*
    1、类: class、extends、super、constructor
    2、模块: export、import
    3、箭头函数
    4、默认参数
    5、模板字符串: ``
    6、解构赋值（对象或数据）: {} 或[]
    7、延展操作符: ...
    8、对象属性简写
    9、let、const
    10、for of
    11、生成器

    js apis：
        Promise
        Proxy
        Reflect
        Symbol
        Map
        WeakMap
        Set
        WeakSet
        TypedArray
        String.prototype.includes
*/
```

- `ES2016`

```js
/*
    1、指数操作符: **
    js apis：
        Array.prototype.includes
 */
```

- `ES2017`

```js
/*
    1、Async and Await
    2、函数参数列表结尾允许逗号
    js apis:
        Object.entries()
        Object.values()
        Object.getOwnPropertyDescriptors()
        String.prototype.padStart()
        String.prototype.padEnd()
        SharedArrayBuffer
        Atomics

 */
```

- `ES2018`

```js
/*
    1、异步迭代（异步迭代器）
    2、Rest/Spread属性
    3、正则表达式命名捕获组
    4、正则表达式反向断言
    5、正则表达式dotAll模式
    // 6、正则表达式Unicode转义
    // 7、非转义序列的模板字符串
    js apis
        Promise.finally()
 */
```

- `ES2019`

```js
/*
    1、可选catch
    js apis
        Array.prototype.flat()（归纳reduce和合并concat）
        Array.prototype.flatMap()
        String.prototype.trimStart()
        String.prototype.trimEnd()
        String.prototype.matchAll()
        Object.fromEntries()
        Symbol.prototype.description
        Function.prototype.toString()
 */
```

- `ES2020`

```js
/*
    1、空值处理（Nullish coalesscing Operator）：表达式??的左侧，运算符求值为undefined或null，返回其右侧值
    2、可选链（Optional chaining）：?
        let user = {}
        let u1 = user.children.name // TypeError
        let u2 = user.children?.name // undefined
    3、import()：按需导入
    4、BigInt
    5、globalThis：
        浏览器---widow
        worker---self
        node----global
    js apis
    3、Promise.allSelected
 */
```

- `ES2021`

```js
/*
    1、WeakRefs
    2、逻辑运算符和赋值表达式结合
    3、数字分隔符：cosnt money = 1_000_000_000
    js apis
        String.prototype.replaceAll
        Promise.any
 */
```

### JS 数据类型：Null、Undefined、Boolean、String、Number、Symbol、BigInt、Object

> JS 中所有对象默认继承 Object 原型。但是 Object.create()可以改变继承的原型。

> 归根结底：JS 中所有函数默认原型是 Object 的实例，该实例拥有 Object 原型的功能和属性

- `typeof`
- `instanceof：`判断左操作数上的原型链中，是否包含右操作数的原型

```js
function myInstanceOf(o, t) {
  const ori = o.__proto__;
  while (1) {
    if (ori === null) {
      return false;
    } else if (ori === t.prototype) {
      return true;
    } else {
      ori = ori.__proto__;
    }
  }
}
```

- `Objecy.prototype.toString.call()`

### JS 对象和继承

```js
/*
        JS对象：对象是无序属性的集合，属性可以是基础类型、对象或函数
        属性分为：
            数据属性，拥有[[Configurable]]、[[Enumerable]]、[[Writable]]、[[Value]]特性
            访问器属性，拥有[[Configurable]]、[[Enumerable]]、[[Get]]、[[Set]]特性

            ES5提供了
                Object.defineProperty(target:Object, property: string, descriptor = {configurable, enumerable, writable || set, value || get,})
                Object.defineProperties(target: Object, descriptor = {property: {}})
                Object.getOwnPropertyDescriptor(target: Object, property: string)
                Object.getOwnPropertyDescriptors(target: Object)
                Object.getOwnPropertyNames(target)
                Object.getOwnPropertySymbols(obj)

        // 创建对象的方案
        1、字面量创建对象：没有自定义类型（默认是Object）；代码重复；，所有属性和方法都私有
            let obj = {
                name: "monkey",
                age: 12,
                getName: () => this.name,
                getAge: () => this.age
            }
        2、工厂函数：没有自定义类型，代码不重复，所有属性和方法都私有
            function createFactory(name, age, ...rest) {
                const obj = {
                    name,
                    age,
                    getName: () => this.name,
                    getAge: () => this.age
                    ...rest
                }

                return obj
            }
            let obj = createFactory("monkey", 12)
        3、构造函数：有类型，代码不重复，所有属性和方法都私有
            function People(name, age) {
                this.name = name
                this.age = age
                this.getName = () => this.name,
                this.age = () => this.age
            }
            let obj = new People("monkey", 12)
        4、修改原型构造对象：有类型，代码不重复，所有属性和方法都共享，无法传参数
            function People() {}
            People.prototype.name = "monkey"
            People.prototype.age = 12
            People.prototype.getName = () => this.name
            People.prototype.getAge = () => this.age
        5、组合创建对象（构造函数+原型，广泛使用），数据属性可以私有，方法可以共享
            function People(name, age) {
                this.name = name
                this.age = age
            }
            People.prototype.getName = () => this.name
            People.prototype.getAge = () => this.age
        6、动态原型模式创建对象（完美的组合构建对象方式）
            function People(name, age) {
                this.name = name
                this.age = age
                if (!People.prototype.getName) {
                    People.prototype.getName = () => this.name
                }
                if (!People.prototype.getAge) {
                    People.prototype.getAge = () => this.age
                }
            }
        7、寄生构造函数模式创建对象（类似HoC，返回对象与构造函数无关，知识封装部分逻辑）
            function SpecialArray() {
                var values = new Array()
                values.push.apply(values, arguments)
                values.sayHello = () => console.log("hello")

                return values
            }
            主要用于增强类型功能，例如增强内建类型功能而又不影响内建类型
        8、稳妥构造函数模式创建对象：不需要使用this和new，比较安全
            function People(name, age) {
                let o = new Object()
                o.getName = () => name
                o.age = () => age

                return o
            }

        // 是想对象继承的方案
        1、纯原型链方案（修改原型对象实现继承）：所有基类属性都存在原型链上，是共享的
            注意：原型链上的基础类型值是共享的
            正常情况，实例是不可以修改原型的（实际可以通过instance.__proto__.XXX修改，instance.XXX相当于给instance新增了属性，instance.__proto__.XXX和instance.XXX肯定不一样），但是实例可以访问到原型上的属性也是通过内部属性__proto__
            function SuperType(type) {
                this.type = type
            }
            Super.prototype.getSuperType = () => this.type
            function SubType(subType) {
                this.subType = subType
            }
            SubType.prototype = new SuperType("base")
            SubType.prototype.constructor = SubType // 修正构造函数指向
            SubType.prototype.getSubType = () => this.subType
        2、借用构造函数方式（所有属性都是私有的）
            function SuperType(type) {
                this.colos = [1,2,3]
                this.type = type
                this.getColors = function() {
                    return this.colors
                }
            }
            function Sub(type, subtype) {
                SuperType.call(this, type)
                this.subtype = subtype
                this.getSubtype = function() {
                    return this.subtype
                }
            }
        3、组合继承（原型链+借用构造函数）：
    */
```

### 执行环境（环境）与作用域

- `执行环境（ExecutionContext）`：定义了变量或函数有权访问的其他数据，决定了他们各自的行为。每个执行环境都有一个与之关联的变量对象(variable object，VO)，执行环境中定义的所有变量和函数都保存在这个对象中
- `全局执行环境（）：`是最外围的一个执行环境，包含所有全局的变量和函数，因宿主实现不同而不同。全局执行环境直到应用退出才会被销毁。
- `函数执行环境：`每一个函数都有自己的执行环境。当执行流进入一个函数时，函数的环境就会被推进一个环境栈中 ，执行结束，推出。
- `作用域链：`作用域链的用途是保证对执行环境有权访问的所有变量和函数的 有序访问 。
- `原型链：`用于继承属性和方法

```js
/*
        执行过程：
            当代码在一个环境中执行时，会创建变量对象（VO）的一个作用域链(scope chain)。作用域链的前端，始终都是指向当前执行代码所在环境的变量对象（VO）。如果这个环境是函数，则将其活动对象（Activation Object，AO）作为变量对象（VO）。活动对象最初只包含了一个变量arguments。作用域链的下一个VO来自于包含环境，依次类推，一直延续到全局执行环境。
        标识符就是沿着作用域链一级一级往上查找，知道全局作用域。
                    global VO
                fna-VO          fnb-VO
                fna1-VO      fnb1-VO fnb2-VO
                fna2-VO                 fnb3-VO
        作用域链：
            gVO-fna-fna1-fna2
            gVO-fnb-fnb1
            gVO-fnb-fnb2-fnb3
    */
```

- `作用域链延长`

```js
/*
    try-catch语句中的catch语句，可以访问
    with语句，
*/
```

- `eval()执行环境：`

### JS 中的异步接口有哪些

- `setTimeout, clearTimeout`
- `setInterval, clearInterval`
- `setImmediate`
- `requestAnimationFrame`
- `requestIdleCallback`

- `Promise.then和Promise.catch`
- `async 和 await`
- `MutationObserver`
- `MessageChannel`
- `Object.Observe`

- `httpxmlrequest`
- `fetch`

### Promise

[参考资料 1](https://juejin.cn/post/6844903715342647310#heading-8)
[参考资料 2](https://segmentfault.com/a/1190000017224799)
[参考资料 3](https://juejin.cn/post/6844903759957458952?utm_source=gold_browser_extension)
[参考资料 4 起源](https://juejin.cn/post/6844903762478235656)
[参考资料 5](https://github.com/yaofly2012/note/issues/112)
[PromiseA+](https://promisesaplus.com/#the-promise-resolution-procedure)
[TC39Async/Await](https://tc39.es/ecma262/#sec-async-from-sync-iterator-objects)
[deferred 对象](https://api.jquery.com/category/deferred-object/)

```js
/*
        Promise:
            关键术语：
                thenable对象
                promise对象
            注意：
                Promise代表异步操作的结果
                Promise状态是pending时，then（catch）只是注册了回调。状态变更后，才会把回调放入到微队列
                Promise是thenable对象，但thenable对象不一定是Promise
                thenable对象兼容了非标准的Promise规范实现

                async/await激进优化点是指：await v在语义上等价于Promise.resolve()，不再等价于new Promise(resolve => resolve())

                Promise.resolve和Promise(resolve => resolve())的区别：
                    处理promise对象p时，Promise.resolve返回的就是p
                    Promise(resolve => resolve())则需要走promise resolution procedure
                    处理非promise对象时，都走promise resolution procedure

                在chrome71（旧版async/await规范中）
                    await XXX等价Promise(resolve => resolve())
                在chrome73（新版async/await规范中）
                    await XXX:等价于Promise.resolve()

        ------------------------------------------------------------------------
            Promise A+规范只定义了then方法；ES2015则实现了更多有用的方法，都是基于then的扩展
                Promise的回调是基于micro-task实现的
                标准的不足：
                    没有abort（terminal、cancel）
                    没有onTimeout
                    没有Deferred
            Promise A+：定义了thenable对象，即定义了then方法的对象
            ES2015 Promise：
                ES2015 Promise是对Promise A+规范的实现，且严格遵守该规范。
                Promise.resolve(value)：返回一个fulfilled的Promise
                    
                    如果value是个thenable对象但非Promise对象，Promise.resolve(value) 等价 new Promise((resolve) => resolve(value))（规范），都会进行promise resolution procedure（创建PromiseResolveThenableJob）

                    如果value是Promise对象，Promise.resolve 会直接返回value 但new Promise(resolve => resolve(value))依然会进行promise resolution procedure（创建PromiseResolveThenableJob），两者是不等价的

                    注意：Promise.resolve本事Promise(resolve => resolve())的语法糖，但在解析promise对象时，还有差异，导致一些异步结果不一致

                Promise.reject(value)和new Promise((undefined, reject) => reject(value))恒等价
            
        ---------------------------------------------------------------------------------------------
        ---------------------------重点关注ES2015实现差异----------------------------------------------
        ---------------------------------------------------------------------------------------------
            关于ES2015实现的Promise Resolution Procedure过程完全符合Promise A+规范，且增加了额外的逻辑
                [[resolve]](promise, x)
                1、如果x是thenable对象或者promise对象，会增加一个转换实参为promise的过程（即使实参本身就是一个promise），并且这个转换过程是异步的，相当于后面的then方法回调延迟了一个时序，这个转换过程被称为PromiseResolveThenableJob，获取Promise对象状态需要通过then回调，又延迟了一个时序。
                如果是Thenable对象或Promise对象，立即创建一个PromiseResolveThenableJob放入到微队列

                对于Thenable对象，PromiseResolveThenableJob创建一个Promise对象，并立即执行then方法，在后面确定新建Promise对象状态，Thenable对象只在PromiseResolveThenableJob这一个微任务中创建Promise对象并确定了对象，延迟了一个微任务

                对于Promise对象，PromiseResolveThenableJob创建一个Promise对象，然后获取Promise对象的then（catch）获取参数Promise的状态，并在后续确定新Promise的状态。Promise对象则在PromiseResolveThenableJob微任务创建了新Promise对象，在下一个微任务（既参数promise对象的then或catch）中获取状态，并确定新Promise对象的状态，延迟了两个微任务

                如果在 Promise 中 resolve 一个 Promise 实例呢？

                2、Promise.prototype.then方法的onFulfilled或者onRejected中返回Promise对象，存在同样的问题
        -----------------------------------------------------------------------------------------------
            Promise.allSettled(iterable):Promise,所有有结果才返回，无论resolve还是reject
            Promise.race(iterable):Promise，总是返回第一个结果值（resolved/reject）(任意一个有结果就返回，无论resolve还是reject)

            Promise.any(iterable):Promise，返回第一个成功的 promise;如果可迭代对象中没有一个 promise 成功（即所有的 promises 都失败/拒绝），就返回一个失败的 promise 
            Promise.all(iterable):Promise，任意一个reject，就返回reject结果；否者返回所有resolve结果
            
            Promise.reject(reason):Promise
            Promise.resolve(value):Promise

            Promise.prototype.then(onFulfilled?, onRejected?):Promise
            Promise.prototype.catch()，行为和Promise.prototype.then(undefined, onRejected)一样，其内部就是调用该函数
            Promise.prototype.finally():Promise，finally方法遵循的原则就是透传上一个Promise对象的结果，但是如果发生错误，则告诉后面的then链最新的错误
            在finally回调中 throw（或返回被拒绝的promise）将以 throw() 指定的原因拒绝新的promise
            Promise.prototype.finally()尽量不影响原来的then链，除非onFinally调用发生了异常；
            其他情况（即使返回值是个Promise）,也会透传上一个Promise的状态
            
            使用.then(onFianlly, onFinally)模拟finally()，两者是有区别的
                1、finally回调无参数
                2、最终的Promise对象值不一样
                    const result = Promise.resolve(2).then(() => {}, () => {}),result的值是undefined
                    const result = Promise.reject(2).then(() => {}, () => {}),result的值是undefined
                    cosnt result = Promise.reject(2).finally(()=>{}),result的值是2
            -----------------------------------------------------------------------------------------------
            1、注意Promise的链式调用和多次调用then方法的区别
            2、处于then链中Promise对象的状态和上一个Promise对象的状态没有直接关系
                let p = Promise.reject(0)
                let p2 = p.then(undefined, (reason) => {
                    return 123
                })
                p2的状态是由[[resolve]](p, 123)(PromiseResolutionProcedure即Promise对象生成过程)的解析过程决定的，和p的状态无关
                p的状态只是决定调用onFulfilled或者onRejected
                p2的状态则是受onFulfilled或者onRejected的执行结果影响
    */
//    实际问题，x是Promise对象
var p = Promise.resolve('p');
var p1 = Promise.resolve(p);
var p2 = new Promise((resolve) => resolve(p));
p2.then(() => console.log('p2'));
p1.then(() => console.log('p1.1'))
  .then(() => console.log('p1.2'))
  .then(() => console.log('p1.3'));

// 输出结果：p1.1，p1.2，p2，p1.3
// 现象：Promise.resolve()
// 原因：p是一个对象，需要异步创建一个新Promise对象，延迟一个时序；通过p.then获取p的终态，又延迟一个时序；然后获取p1的终态
/*
    async function async1() {
        console.log("async1 start")
        await async2();
        console.log("async1 end")
    }
    chrome71中，等价于
        function async1() {
            console.log("async1 start");
            return new Promise(resolve => resolve(async2())).then((result) => console.log("async1 end"))
        }
    chrome73中，等价于
        function async1(){
            console.log("async1 start")
            return Promise.resolve(async2()).then((result) => console.log("async1 end"))
        }
*/

// 实际问题2，x是thenable，非promise对象
var thenable = {
  then: (resolve) => {
    console.log('thanable.then');
    resolve();
  }
};
var p = Promise.resolve('p');
var p1 = Promise.resolve(thenable);
var p2 = new Promise((resolve) => resolve(thenable));
console.log('p === p1', p === p1);
p2.then(() => console.log('p2.1'))
  .then(() => console.log('p2.2'))
  .then(() => console.log('p2.3'));
p1.then(() => console.log('p1.1'))
  .then(() => console.log('p1.2'))
  .then(() => console.log('p1.3'));
// 输出结果和var p1和var p2定义顺序有关
//
// 原因：Promise.resolve()或new Promise()创建新Promise时，直接就确定了新Promise的状态；Promise状态确定时会把then回调投入到微队列，所以再Promise.resolve等价new Promsie时，谁的状态先确定，谁就先添加回调。故输出结果和p1与p2定义顺序强关联
```

```js
/*
        Promise.resolve(value) 不等价 new Promise(resolve => resolve(value))
        demo1
            new Promise(resolve => resolve()).then(() => console.log(1))
            Promise.resolve().then(() => console.log(2))
            输出1，2
        demo2
            let p = new Promise( resolve => resolve())
            new Promise(resolve => resolve(p)).then(() => console.log(1)) // 回调函数会被延迟一个EventLoop
            Promise.resolve(p).then(() => console.log(2))
            输出：2，1
        释疑：
            Promise.resolve(value)中，如果实参value是promise对象（不包含thenable对象），直接返回实参
            new Promise(resolve => resolve(value))中，如果实参value是promise对象或thenable对象，则会产生PromiseResolveThenableJob，从而增加一个异步job
        问题：
            如何理解异步Job？或者延迟一个EventLoop？
        ----------------------------------------------------------------------------------------------
        Promise A+规范重点分为三个部分：
            1、Promise状态: 
                初始态[pending]；终态[fullfilled, rejected]
                终值：value或reason，promise终态时，必须关联一个终值
            2、then方法的功能和注册的回调函数调用规则：
                必须通过then方法访问promise的终态。promise.then(onFulfilled, onRejected)
            3、The Promise Resolution Procedure：描述promise对象如何变成终态
                基本原则：
                    如果x是thenable对象，则采用x最终值
                    否者直接fullfill promise对象
            注意：在ES2015 Promise实现中thenable对象的then方法调用是异步的，作为微任务下一个时序执行

            Promise A+规范只定义了then方法
            E2015中Promise API提供了更多了方法（Promise.prototype.catch, Promise.prototype.finally, Promise.race, Promise.all）这些都是基于then的扩展方法，方便开发使用

            Promise的回调通过micor-task实现的。

    */
```

### async and await

### 宏队列和微队列，异步队列、eventloop、

### JS 语言重点特性

- `1、关于闭包`

```js
// 问题：
//      什么是闭包？闭包是指有权访问另一个函数作用域中的变量的函数。
//      闭包常见创建方式？在一个函数内部创建另一个函数。
// demo1
function log(total) {
  var arr = [];
  while (total > 0) {
    arr.push(function () {
      console.log(total);
    });
    total--;
  }

  return arr;
}
var a = log(5);
let length = a.length;
while (length--) {
  a[length](); // 0，0，0，0，0
}
// demo2
function log(total) {
  var arr = [];
  while (total > 0) {
    total--;
    var tmp = total; // var的声明会提升，最终存储的还是total最后计算的值
    arr.push(function () {
      console.log(tmp);
    });
  }

  return arr;
}
const a = log(5);
let length = a.length;
while (length--) {
  a[length](); // 0，0，0，0，0
}
// demo3
function log(total) {
  var arr = [];
  while (total > 0) {
    total--;
    arr.push(function () {
      var tmp = total; // 闭包自己存储了值，每一个闭包都会生成一个tmp
      console.log(tmp);
    });
  }

  return arr;
}
const a = log(5);
let length = a.length;
while (length--) {
  a[length](); // 4，3，2，1，0
}
// demo4 通过IIFE(立即调用函数表达式：Immediately Invoked function expression)实现，同样使用了函数栈的局部变量属性临时存储值
```

- `apply、call、bind函数的实现（结合执行环境和闭包的知识点）`

- `es6的extends`

```js
/*
        Javascript继承之extends
        ES6引入了关键字extends，用于实现class继承，但其本质仍然是构造函数和原型链
        extends之继承：
            1、子类Sub会继承超类Sup的 实例 共享方法，即原型继承
            2、子类Sub会继承超类的私有属性，非共享，实例独享，通过 借用构造函数方法（寄生组合式继承）
                super(this)的本质就是借用构造函数，调用Sup的构造函数在子类中实例化：Sup.constructor.call(this)，可以传参数
            3、静态方法的继承：
                Sub子类会继承Sup类的static方法，且能通过Sub.staticXXXX直接调用
            4、如果子类没有写constructor，系统有一个默认的constructor且调用super(this)
            5、super只能在子类Sub的构造函数中使用，实例化对象；且必须在使用this之前调用super
        // object()
        function object(o) { // o可以是某个Function的原型，不会破坏原型链
            function F() {}
            F.prototype = o // 保留了继承关系
            return new F()
        }
        // 寄生式继承
        function createAnother(original) {
            var clone = object(original) // 创建新对象
            clone.sayHi = () => {} // 增强对象

            return clone
        }
        // 寄生组合式继承(借助了两个辅助函数object和inheritPrototype，保留了原型链，即保留了继承关系)
        function inheritPrototype(SubType, SupType) {
            var prototype = object(SuperType.prototype)
            prototype.constructor = SubType // 改掉object的constructor F为SubType；同时保留了SupType的继承关系
            SubType.prototype = prototype
        }
        function Sup(name) {
            this.name = name
            this.colors = ["red", "blue", "green"]
        }
        Sup.prototype.sayName = () => {}

        function Sub(name, age) {
            Sup.call(this, name)
            this.age = age
        }
        inheritPrototype(Sub, Sup)
        Sub.prototype.sayAge = () => {}

    */
```

### Javacript apis

```js
/*
        标准内置对象：
            Null
            Undefined
            Boolean
            String
            Number
            Symbol

            Error
            Object
            Function
            RegExp
            Array
            Math
            Date
            JSON

            Promise
            Map
            WeakMap
            Set
            WeakSet
            Proxy
            Reflect
            ...
    */
```

### JS 浮点数计算精度丢失问题(https://2ality.com/2012/04/number-encoding.html)

```js
/*
        digits：指0-9任意的一个数字
        exponent：指数，之处小数点左边（负指数）或右边（正指数）有几个digits
                指数部分是11位，0-2047.为了支持负数，
                规定1023是0，即base = 1023
                小于1023是负数 curr - base
                大于1023是正数 curr - bse
                指数p = e-1023
                但有两个指数位是保留的，0和2047。指数2047表示无穷大或NaN；指数0表示数字0或者无穷小
        significand(有效数字)：包含digits，exponent
        significand = 1.f * 2^p = 1.f * 2^(e-1023)

        非负浮点数的表示：有效数字包括符号位、指数位和小数位
        表示整数：最大整数可以超出2^53，是因为整数52位，可以借指数位表示大整数。但是，IEEE754规定了只能解析52位，所以当借指数位时，小数位的部分需要补0，故超出2^53的整数表示不是依次递增1

        机械极小值（machine epsilon）
        s：符号位
        f：小数位（尾数位）
        e：指数位
        (-1)^s * %1.f * 2^(e-1023)    0 < e  < 2047
        (-1)^s * %0.f * 2^(e-1022)    e=0, f>0
        (-1)^s * 0                    e=0,f=0
        NaN                           e=2047, f>0
        (-1)^s*inifinity              e=2047, f=0
        Demos：
            f=%101,p=2    ===>    %1.101*2^2=%110.1
            f=%101,p=-2   ===>    %1.101*2^-2=%0.01101
            f=%0,p=0      ===>    %1.0*2^0 = %1

        JS采用IEEE754标准存储浮点数，即1位符号位，11位指数位，52位尾数位
        十进制数的存储：
        整数部分转化成二进制：
            通过除以2取余数方法，例如2转化成二进制就是：00 0010
        小数部分转化成二进制：
            通过乘以2取整方法，例如0.1转化成二进制：
                0.1*2 = 0.2，整数0
                0.2*2=0.4，整数0
                0.4*2=0.8，整数0
                0.8*2=1.6，整数1
                0.6*2=1.2，整数0
                0.2*2=0.4，整数0，开始循环，计算机只用64位存储浮点数，不得不舍弃部分精度(0舍1入)，故产生精度丢失问题

        解决方案：获取浮点数小数位，变成整数进行计算，再转化成小数。要注意整数的溢出问题

        0.1 + 0.2，0.1和0.2都无法精确存储，导致计算结果不准确
        0.55无法精确存储，导致计算结果不准确
    */
```

### JS 模块化（commonjs 和 es module）

- `commonjs：`
- `es module：`

### 浏览器同源策略：安全策略，用于限制一个 origin 的文档或脚本如何与另一个源的资源进行交互

```js
/*
        遵循同源策略的webapi：
            localstorage，以源进行分割，每个源有自己单独的存储空间，一个源中的js脚本只能访问自己源内的数据
            sessionstorage，同localstorage
            cookie，同localstorage，但可以为本域和父域设置cookie【domain，path，secure，httponly，expires，max-age】
            IndexDB，同localstorage
            DOM操作
            Ajax受同源策略限制，不允许跨域请求（但可以协商配置，允许跨源请求）
        不遵循同源策略：
            script标签（link标签，img标签，video标签，@font-face，iframe（可以通过修改document.domain共享）cookie或者处理iframe）
            websocket

        跨源通信方案：
            1、JSONP方式，通过script等内嵌替换标签的src属性，服务器返回JS代码，实现跨源
            2、主域相同子域不同，document.domain和iframe解决跨域共享cookie，进行通信
            3、location.hash（hashchange）和iframe，解决跨域通信问题
            4、window.name同一窗口的所有页面共享读写权限，通过修改该值实现跨域通信
            5、window.postMessage和message事件，跨文档通信API，允许跨窗口通信，不论是否同源
                本质上，window.postMessage(message, targetOrigin)是一个跨域无服务器垫片的ajax请求
            6、通过websocket进行跨域通信，websocket  不受同源策略限制
            7、CORS，是HTTP的一部分，它允许服务端指定哪些主机可以从这个服务端加载资源
    */
```

### web apis(宿主环境提供的 apis)

- `js自定义事件和模拟事件：`
  [事件相关 1](https://segmentfault.com/a/1190000004339133)
  [事件相关 2](https://www.cnblogs.com/zhangguicheng/p/12743437.html)

```js
/*
        预备知识：
            Event：UIEvent，MouseEvent等等，是定义的事件类型
            EventHandlers: 事件的处理器
            EventTarget：注册、管理、触发事件
            Node：是EventTarget的子类，具有EventTarget的能力
        1、js自定义事件
            1-1: Event
                const customEvent = new Event(type, options)
            1-2:CustomEvent
                const customEvent = new CustomEvent(type, options)
            1-3: document.createEvent(type)
                const evt = document.createEvent("CustomEvent")
                evt.initCustomEvent()
        2、js模拟事件
            1-1: MouseEvent
                const evt = new MouseEvent("click", options)
            1-2: document.createEvent("MouseEvent")
                const evt = document.createEvent("MouseEvent")
                evt.initMouseEvent("click", ...rest)
    */
```

- `两个tab页(tab和内嵌iframe)之间的交互方式`

```js
/*
        跨源tab通信方案：
            document.domain和iframe跨源通信
            location.hash(hashchange)和iframe跨源通信
            websocket进行跨源通信
            window.name统一窗口跨源通信
            window.postMessage和message事件
    */
/*
        同源tab通信方案：
            localstorage、sessionstorage、IndexDB、cookie
            包括跨源tab通信方案
    */
```

- `window、document`等实例
- `canvas apis：可以用于动画、游戏、数据可视化、图片编辑以及实时视频处理等方面。主要是2D图形；WebGL绘制2D和3D`

```js
/*
        栅格(canvas grid)：
        坐标空间（coordinate space）:
        路径：一系列点连成的线段

        canvas仅支持两种形式的图形绘制：矩形和路径
        canvas画布默认是300*150，可以通过canvas属性改变画布大小
        css样式样式设置canvas在屏幕的显示大小（似乎函数计算坐标以画布大小为准）

        HTMLCanvasElement（EventTarget <|-- Node <|-- Element <|-- HTMLElement <|-- HTMLCanvasElement）

        HTMLCanvasElement = {
            width： 画布宽度
            height：画布高度

            captureStream()， 捕捉画布实时视频
            getContext()，获取画布上下文（2D或3D），返回CanvasRenderingContext2D或WebGLRenderingContext
            toDataUrl()，返回数据URL，默认png，图像分辨率是96dpi
            toBlob()，创建一个Blob对象，表示canvas的图像
            transferControlToOffscreen()，将控制权转移到主线程或辅助线程上的offscreenCanvas对象

            事件
            webglcontextcreationonerror
            webglcontextlost
            webglcontextrestored
        }

        CanvasRenderingContext2D = {
            // 绘制矩形
            clearReact(x,y,width,height)
            fillReact(x,y,width,height)
            strokeReact(x,y,width,height)
            // 绘制文本
            fillText()
            strokeText()
            measureText()
            // 线型
            lineWidth()
            lineCap()
            lineJoin()
            miterLimit()
            getLineDash()
            setLineDash()
            lineDashOffset()
            // 文本样式
            font:
            textAlign:
            textBaseline:
            direction:
            // 填充和描边
            fillStyle:
            strokeStyle:
            // 渐变和图案
            createLinearGradient()
            createRadialGradient()
            createPattern()：使用指定的图片创建图案
            // 阴影
            shadowBlur:
            shadowColor:
            shadowOffsetX:
            shadowOffsetY:
            // 路径
            beginPath()
            closePath()
            moveTo(x, y)
            lineTo(x, y)
            bezierCurveTo()，3次贝塞尔曲线路径
            quadraticCurveTo()，2次贝塞尔曲线路径
                // 画一个以(x,y)为圆心,radius为半径的圆弧，从startAngle角度到endAngle，anticlockwise方向
            arc(x, y, radius, startAngle, endAngle, anticlockwise)
                // 以控制点和半径画圆弧，再连接控制点
            arcTo(x1, y1, x2, y2, radius)
            ellipse()
            rect()
            // 绘制路径
            fill()
            stroke()
            drawFocusIfNeeded()
            scrollPathIntoView()
            clip()
            isPointInPath()
            isPointStroke()
            // 变换
            currentTransform:
            ratate()
            scale()
            translate()
            transform()
            setTransform()
            resetTransform()
            // 合成
            globalAlpha:
            globalCompositeOperation:
            // 绘制图像
            drawImage()
            // 像素控制
            createImageData()
            getImageData()
            putImageData()
            // 图像平滑
            imageSmoothingEnabled()
            // canvas状态
            save:
            restore:
            canvas:
            // 点击区域
            addHitRegion()
            removeHitRegion()
            clearHitRegion()
        }
        WebGLRenderingContext
    */
```

- `WebGL API：`
- `DOM`

```js
/*
        关于CSS样式
            1、style标签：内联样式（还包括style属性），文档的样式信息或部分内容 <style type="text/css"></style>
            2、link标签和@import(需要卸载style标签内)：外联样式，<link rel="stylesheet" type="text/css" href="*.css"></link>
            2、document.styleSheets：
            3、element.style属性和element.style.cssText
    */
```

- `CSSOM：内联样式（标签style），嵌入样式（head style），外部样式（head link），优先级依次降低`

```js
// CSS选择器解析顺序从右向左（树结构，从左向右会损失性能）
/*
    BFC(Block Format context)：块级格式化上下文，一个独立的渲染区域。
        重点：和是否块级元素或内联元素无关，display可以修改
    创建BFC：
        float的值不是none
        position的值不是static或relative
        display的值不是inline-block，table-cell，flex，table-caption，inline-flex
        overflow的值不是visible
        父元素与正常文件流的子元素（非浮动元素）自动形成一个BFC
    CSS选择器中的伪类和伪元素
        伪类选择器：CSS选择器的一种，用于选择 处于特定状态 的元素，表现形式就是开头是冒号的关键字，:key-words
            :last-child
            :only-child
            :invalid
            用户行为伪类(动态伪类)
            :active
            :hover
            :focus
            :focus-visible
            :focus-within
            :any-link
            :checked
            :current
            :default
            :dir
            :empty
            :enabled
            :first
            :first-child
            :first-of-type
            :future
            :left
            :link
        伪元素选择器：开头为双冒号的关键字，::key-words，也支持单冒号写法
            ::first-line
            ::first-letter
            ::selection
            ::soelling-error
            ::grammar-error
            ::before
            ::after

*/

/*
CSS Selectors
    1、type selector
    2、universal selector   ----> *
    3、attribute selector   ----> []
    4、class selector       ----> .
    5、ID selector          ----> #
    6、pesudo(假的)-class    ---->
        6-1：:lang
        6-2：:nth-child()
        6-3：:nth-last-child()
        6-4：:nth-of-type()
        6-5：:nth-last-of-type()
        6-5：:not()
    6、pesudo-class         ---->
    6、pesudo-class         ---->
6、CSS
---------------6-1、CSS样式表（CSS Style Sheets，DOM接口CSSStyleSheet）---------------    
    6-1、CSS Style Sheets：代表style sheet的抽象概念，对应DOM接口CSSStyleSheet，
        StyleSheet（StyleSheetList）：抽象的基础的样式表
        StyleSheet = {
            type：CSSOMString，"text/css"
            href：USVString，内联样式返回null；外部样式返回绝对地址
            ownerNode：Element，null或与之关联的DOM节点
            parentStyleSheet：CSSStyleSheet，
            title：DOMString，
            media：MediaList，
            disabled：boolean，
        }
    重点：CSSStyleSheet = {
            ownerRule：CSSRule，null 或 关联的样式规则（选择器和css声明块）
            cssRules：CSSRuleList，CSS样式表关联的css规则

            long insertRule(CSSOMString rule, long index)
            undefined deleteRule(long index)
        }
---------------6-2、CSS Style Sheet Collections-----------------------------------
    6-2、CSS Style Sheet Collections：每一个文档都会关联0或多个CSS Style sheets
        StyleSheetList：CSSStyleSheet的有序集合，
        StyleSheetList = {
            length：long，集合中的样式表总数

            CSSStyleSheet item(long index)，返回集合中的样式表（CSS style sheet）
        }

        DOM结构：
            document.styleSheets，返回StyleSheetList实例
---------------6-3、Fetching CSS Style Sheets-----------------------------------
    6-3、Fetching CSS Style Sheets
        interface mixin LinkStyle {
            CSSStyleSheet sheet
        }
        link标签实例含有属性sheet
 ---------------6-4、CSS Rules-----------------------------------   
    6-4、CSS Rules：就是实现了CSSRule接口，并含有选择器和声明块，对应DOM接口CSSStyleRule
        CSSRule（CSSRuleList）：基础类
            CSSRule = {
                cssText：CSSOMString，可修改，CSSRule的字符串表示
                parentRule：CSSRule | null，父样式规则
                parentStyleSheet：CSSStyleSheet | null，父样式表引用
                type：short，常量值，创建CSSRule时初始化
            }
    重点：CSSStyleRule：CSSRule的派生类，即CSS rules
            CSSStyleRule = {
                selectorText：CSSOMString ，选择器字符串表示
                style：CSSStyleDeclaration，CSS声明语句块（花括号内容）
            }
    重点：CSSImportRule：CSSRule的派生类，
            CSSImportRule = {
                href: USVString
                media: MediaList
                styleSheet: CSSStyleSheet
            }
    重点：CSSGroupingRule：CSSRule的派生类，at-rule
            CSSMediaRule = {
                cssRules: CSSRuleList
                long insertRule(CSSOMString rule, long index)
                undefined deleteRule(long index)
            }
    重点：CSSMediaRule：CSSRule的派生类，
            CSSMediaRule = {

            }
    重点：CSSFontFaceRule：CSSRule的派生类，
            CSSFontFaceRule = {

            }
    重点：CSSPageRule：CSSRule的派生类，
            CSSPageRule = {
                selectorText: CSSOMString
            }
    重点：CSSNamespaceRule：CSSRule的派生类，
            CSSNamespaceRule = {
                namespaceURI: CSSOMString
                prefix: CSSOMString
            }
    重点：CSSKeyFramesRule：CSSRule的派生类，
            CSSKeyFramesRule = {

            }
    重点：CSSKeyFrameRule：CSSRule的派生类，
            CSSPageRule = {

            }
    6-4-1、CSSRuleList是CSSStyleRules的有序集合
        CSSRuleList = {
            getter CSSRule item(long index)
            long length
        }
-------------6-5、CSS声明（CSS Declaration，无DOM接口）-----------------------------
        6-5、CSS Declaration：CSS声明是一个抽象概念，没有在DOM中开放接口
            CSS Declaration = {
                name: 声明的属性名
                value: 对应值
                importantFlag：import标识
                case-sensitive-flag：大小写标识
            }
            Demos: 
                background: red !important;
------------6-6、CSS声明块（CSS Declarations，DOM接口CSSStyleDeclaration）---------------
        6-6、CSS Declaration Blocks（CSS Declarations）：CSS Declaration的有序集合，
            在DOM中开放了接口CSSStyleDeclaration，
            CSSStyleDeclaration = {
                cssText：CSSOMString，空字符串或者序列化后的css declarations
                length：long，返回css declaration的个数
                parentRule: 
                cssFloat:
                camel-cased:

                item：（long） => CSSOMString，根据索引获取属性
                getPropertyValue(property)：根据属性获取属性值
                getPropertyPriority(property)：获取元素优先级["", "important"]
                setProperty(property, value, priority)
                removeProperty(peoperty)
            }
            Demos：
                {
                    background: red;
                    width: 100px;
                    height: 100px;
                }
-------------6-7、CSS Values-------------------------------------------
-------------7、DOM Access to CSS Declaration Blocks-------------------
    7-1、ElementCSSInlineStyle
        元素style属性返回CSSStyleDeclaration，且computedFlag是unset，parent CSS rule
        是null，owner node就是当前element
    7-2、window.getComputedStyle(element, CSSOMString pseudoElt)
        返回CSSStyleDeclaration，且computedFlag是set，parent CSS rule是null，owner node是obj
    7-3、document.styleSheets访问

    对比：
        element.style：读取的是元素的内联样式，即style属性上的值；该值可读可写
        getComputedStyle：读取的是最终样式，包括内联样式、嵌入样式和外部样式；返回值只读
--------------------------------------------------------------------

    */
/*
        JS操作css几种方式：
            1、通过style标签生成样式
                var style = document.createElement("style")
                style.type = "text/css"
                style.appendChild(document.createTextNode(newStyle))
                document.head.appendChild(style)
            2、通过link标签添加样式
                var link = document.createElement("link")
                link.type = "text/css"
                link.rel="stylesheet"
                link.href=""
                document.head.appendChild(link)
            3、修改元素style属性(类型是CSSStyleDeclaration和CSSStyleSheet, CSSStyleRule中的style属性是CSStyleDeclaration,CSSRule不一样)
                element.style.height = ""
                element.setAttribute("height", XXX)
                element.setAttribute("style", XXX)
                element.setProperty("height", XXX)
            4、修改元素className属性
                element.className=""
            5、修改文档的document.styleSheets属性（link和style实例也可以返回样式表link.sheet,style.sheet）
                修改style.cssText
                document.styleSheets[0].cssRules.cssText = "height: 100px;width: 100px;"
                document.styleSheets[0].addRule(".box", "height: 100px")
                document.styleSheets[0].insertRule(".box", "height: 100px", 0)

                StyleSheet对象是文档中链接或嵌入的样式表，包括link的外部样式表和style的内部样式表,样式表是由CSS规则组成，可以通过CSSRule操作每一条规则
                StyleSheet = {
                    media: 【screen、print】，默认screen，
                    disabled：打开或关闭一张样式表
                    href：返回StyleSheet对象链接的样式表地址，内联，值为null
                    title：StyleSheet对象的title值
                    type：通常是text/css
                    parentStyleSheet：CSS允许@import，该属性反悔了包括当前样式表的那张样式表（父样式表）
                    ownerNode：通常是link或style
                    cssRules：类数组对象，CSS规则，
                        cssRules[0].cssText，是对应的CSS规则字符串形式: sheet.cssRules[0] ====> "p {color: black;}"
                        cssRules[0].style.color = "red"，用来读写具体的CSS命令
                    insertRule: function() {}：插入函数
                    deleteRule: funciton(){}：删除函数
                }


                document.styleSheets只读属性，是一个StyleSheetList
    */
```

- `Fetch API`
- `HTML Drag and Drop API`
- `IndexedDB`
- `Intersection Observer API`
- `Storage`
- `Streams`
- `TouchEvents`
- `URL API`
- `Web Animations API`
- `Web Storage API`
- `Web Workers API`
- `WebGL`
- `WebRTC`
- `WebVR API`
- `WebVTT`
- `WebSockets API`

### chrome devtools(调试工具)

- `代理工具：`charles 等
- `chrome remote debug：`

## CSS

## html

### meta 标签：元数据元数，表示不能由其他元素表示任何元素局信息

```js
/*
        <meta name="" content="" />：文档级别的元数据
        <meta http-equiv />：编译指令，与类似命名的http头部相同
        <meta charset="utf-8" />：字符集声明
        <meta itemprop />提供了用户定义的元数据

        charset：声明了文档的字符编码。必须是与ASCII大小写无关的"utf-8"
        content：包含了http-equiv或name的值
        http-equiv：定义了一个编译指示命令，取值都是http的头
        name：和content一起使用，提供元数据
        使用场景：
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
            <meta name="theme-color" content="#000000" />
    */
```

### base 标签：指定 root url

```js
/*
        <base href="" target=""/>
            href： root url
            target：【_blank，_self，_parent，_top】
        可以通过document.baseURI访问root url，默认是document.location.href
    */
```

### script 标签：

### style 标签：

```js
/*
        <style type="text/css" media="all">
        </style>
    */
```

### title 标签：定义文档的标题，显示在浏览器的标题栏或标签页上

### link 标签：外部资源链接元素，规定了当前文档和外部资源的关系

```js
/*
        link常用场景：
            1、链接外部样式表
            2、创建站点图标：PC站的favicon（favorite icon缩写，又称为website icon，page icon，url icon）图标和移动设备上显示在屏幕上的图标
            href属性：指定外部资源路径
            sizes：图标大小
            type：链接自愿的MIME类型
            media：媒体查询条件
            rel：relationship，【stylesheet、icon、apple-touch-icon-precomposed、preload】
            as：配合rel=preload使用
            crossorigin：【anonymous， use-credentials】
            disabled：配合rel=stylesheet使用
            hreflang：语言
            importance：【auto、high、low】
            integrity：
            referrerpolicy：指定引荐来源网址
            title：

            methods：
            prefetch：
            target：
            使用场景：
                <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />
                <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    */
```

![favicon_location](./favicon_location.jpeg)

### iframe 标签（https://www.cnblogs.com/hq233/p/9849939.html）

```js
/*
        iframe标签：
            frameborder：是否显示边框
            height：高度
            width：宽度
            name：名字，window.frames[name]可以访问
            scrolling：是否可滚动
            src：资源schema
            srcdoc：代替html中body的内容
            sandbox：对iframe进行一些限制

            页面嵌入同源iframe，可以互相访问，互相操作DOM
            页面可以
                通过iframe.contentWindow获取window对象（dom节点提供的api）
                通过iframe.contentDocument获取document对象（dom节点提供的api）
            iframe可以通过
                window.parent获取上一级window对象
                window.top获取顶级容器window对象
                window.self获取window自身引用

        iframe妙用：
            1、http长轮询（iframe实现长轮询）（iframe做轮询，异步发送请求使用iframe实现，可以不跳转页面）
                http长轮询是，server收到请求后，有数据立即响应请求；没有数据，就会等待数据处理，超时，就以空数据形式响应请求；需要服务端配合实现方案
                浏览器收到数据为空，会再次发送同样的http请求到server
                缺点：造成服务器资源浪费
            2、http短轮询是，sever收到请求后，不管是否有数据，server立即响应请求；
                浏览器收到空数据，隔一段时间发送相同的http请求到server
            3、websokcet：客户端与服务端建立的持久化链接
    */
//    iframe长轮询
var iframeCon = document.querySelector('#container');
var text = '';
var iframe = document.createElement('iframe');
iframe.id = 'frame';
iframe.style = 'display: none;';
iframe.name = 'polling';
iframe.src = 'target.html';
iframeCon.appendChild(iframe);
iframe.onload = function () {
  var iloc = iframe.contentWindow.location;
  var idoc = iframe.contentDocument;
  setTimeout(function () {
    text = idoc.getElementByTagName('body')[0].textContent;
    console.log('text===>', text);
    iloc.reload(); // 刷新页面，再次获取信息，并且会触发onload
  }, 2000);
};
// 广告应用iframe
// 防止被iframe
if (window !== window.top) {
  window.top.location.href = 'correctUrl';
}
// X-Frame-Options：http头【DENY，SAMEORIGIN，ALLOW-FROM】
// sanbox：不能使用locastorage、cookie；不能发送script请求；不能发送ajax请求；不能发送表单；不能创建新弹窗和window
```

## React 技术栈

### props and state

### React diff 算法

### React Hooks

### React 生命周期

```js
/*
        class(旧版)：

        constructor(props, context// 默认空对象)
        componentWillMount()    // 无参数
        render()                // 无参数
        componentDidMount()     // 无参数

        componentWillReceiveProps(nextProps, context)
        shouldComponentUpdate(nextProps, nextState, nextContext)
        componentWillUpdate(nextProps, nextState, nextContext)
        render()
        componentDidUpdate(prevProps, prevState, snapShot)

        componentDidCatch(error, errorInfo)
        componentWillUnmount() // 无参数
        -----------------------------
        class(新版):
        constructor(props, context)
        static getDerivedStateFromProps(nextProps, prevState)
        render()
        componentDidMount() // 无参数

        static getDerivedStateFromProps(props, state)
        shouldComponentUpdate(nextProps, nextState, nextContext)
        render()
        getSnapshotBeforeUpdate(prevProps, prevState) // 返回值是DidUpdate的snapshot参数值
        componentDidUpdate(prevProps, prevState, snapshot)

        static getDerivedStateFromError(nextProps, prevState)
        componentWillUnmount() // 无参数

    */
```

## webpack 和 rollup

## babel 和 typescript，flow

## nodejs

## 数据结构：

- `数据的逻辑结构：`反映了数据元素之间的某种关系，可以利用该关系进行相关操作。有时就把逻辑结构简称为数据结构。逻辑结构形式地定义为（K，R）（或（D，S）），其中，K 是数据元素的有限集，R 是 K 上的关系的有限集
- `数据的存储结构：`反映了元素所占存储单元之间的关系，可以利用该关系进行相关操作

```js
/*
        数据的bai逻辑结构是对数据之间关系的du描述，有时就把逻辑结构zhi简dao称为数据结构。逻辑结构形式地定义为（K，R）（或（D，S）），其中，K是数据元素的有限集，R是K上的关系的有限集
        数据结构在计算机中的表示（映像）称为数据的物理（存储）结构。它包括数据元素的表示和关系的表示

        逻辑结构设计的任务是将基本概念模型图转换为与选用的 数据模型 相符合的逻辑结构
        物理设计的任务是根据具体计算机系统的特点 ，为给定的数据模型确定合理的存储结构和存取方法
        
        逻辑上的数据结构反映成分数据之间的逻辑关系
        物理上的数据结构反映成分数据在计算机内部的存储安排。数据结构是数据存在的形式
    */
```

### 通用线性表：

### 数组：

### 队列：

### 栈：

### 树：

### 图：

### 哈希表：

### 排序算法（十大排序算法：内部排序算法和外部排序算法）

- `术语：`

```js
/*
        内部排序算法：纯内存空间排序
        外部排序算法：内存+disk空间
        in-place：占用常量内存，和规模n无关的算法为in-place
        out-place：占用额外内存，与规模n有关的算法为out-place
        稳定：排序前后，相同元素位置不变；否者就是不稳定

        交换排序：冒泡排序_稳定 和 快速排序_不稳定, in-place
        插入排序：插入排序_稳定 和 希尔排序_不稳定, in-place
        选择排序：选择排序_不稳定 和 堆排序_不稳定, in-place
        归并排序_稳定_out-place
        技术排序_out-place
        桶排序_out-place
        
        算法对比：
        归并排序：内存够，读取次数少，稳定，O(nlogn)
        快速排序：内存够，元素基本有序，不稳定，O(nlogn)，递归容易内存溢出
        堆排序：内存够，元素无序，不稳定，O(nlogn)
        希尔排序：内存够，元素无序，不稳定，O(nlogn)
    */
```

#### 交换排序

- `冒泡排序(BubbleSort)：`依次比较相邻元素，知道所有元素做过比较得出最大(小)元素，对剩余的元素再次进行比较获取次大（小）元素，直到所有元素通过比较交换位置为止，即可得出排序后的元素序列

```js
/*  
    稳定，O(n^2)，in-place，O(1)
    1、比较相邻的两个元素。如果第一个元素比第二个大，就交换他们两个。
    2、对每一组相邻元素做同样的操作1，从开始第一队到最后一对。比较完所有数据，最后一个数据应该是最大的数据。
    3、针对剩下的待排序数据重复1和2步骤
    4、持续对越来越少的元素重复1和2步骤，知道没有数据需要比较
*/
```

- `快速排序(QuickSort)：`对冒泡排序的改进。通过一趟排序将待排数据分割成两个独立的部分，其中一部分的所有数据都比另一部分的所有数据小。然后再按照此方法对这两部分数据进行快速排序，直到分割部分数据只剩下一个数据为止。即可得到排序元素序列。整个排序过程可以使用递归结构完成。

```js
/*
    不稳定，O(nlogn)，in-place，O(logn)
    1、选择哨兵元素sentry，记录元素的开始start，结束end的位置
    2、
    3、
*/
function QuickSort(arr) {
  if (!arr) {
    throw new TypeError('类型错误');
  }
  if (arr.length <= 1) {
    return arr;
  }
  let sentry = arr[0];
  let index = 0;
  let start = 1;
  let end = arr.length - 1;
}
```

#### 插入排序

- `一般插入排序：`
- `希尔排序：`

#### 选择排序

- `一般选择排序：`
- `堆排序：`

###
