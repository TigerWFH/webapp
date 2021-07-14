# Tapable V5.0.0.-beta.9

## js 创建对象方式

```js
    /* 创建对象方式：字面量模式、工厂模式、构造函数模式、纯原型链模式、构造函数+原型链 模式、动态原型链模式、寄生构造函数模式、稳定构造函数模式  */
    1、字面量模式：费时费力、无法识别对象（找不到除Object外的constructor）
        let o = {}
        o.name = 'monkey'
        o.age = 12
        o.getName = function() {}
    2、工厂函数模式（抽象创建过程，找不到除Object外的constructor）
        function createPerson(name, age) {
            let o = new Object()
            o.name = 'monkey'
            o.age = 12
            o.getName = function() {}

            return o
        }
    3、构造函数模式（公共的操作、方法每一份实例都会拷贝一份，浪费内存）
        function Person(name, age) {
            this.name = name
            this.age = age
            this.getName = function() {}
        }
    4、纯原型链模式（状态即数据属性也共享，实例之间无法区分; 无法传递参数进去，还是无法区分状态）
        function Person(){}
        Person.prototype.name = 'name'
        Person.prototype.age = 12
        Person.prototype.getName = function(){}
    5、构造函数+原型链模式（是目前ECMAScript中最广泛、认同度最高的一种模式）
        function Person(name, age) {
            this.name = name
            this.age = age
        }
        Person.prototype = {
            constructor: Person,
            getName: function() {}
        }
    6、动态原型模式（将外部原型代码也放到构造函数中）
        function Person(name, age) {
            this.name = name
            this.age = age
            if (typeof Person.prototype.getName !== 'function') {
                Person.prototype.getName = function() {}
            }
        }
    7、寄生构造函数模式（对象和Person无关；函数每一个实例都有一份，工厂模式一样的缺点）
        function Person(name, age) {
            var o = new Object()
            o.name = name
            o.age = age
            o.getName = function() {}

            return o
        }
        应用场景：为存在的对象增加额外属性(个人感觉毫无意义,直接实例化arr，arr.xxx不是一样能达到目的？当然批量使用情况下对代码抽象，单不一定使用这种伪构造函数啊)
        function SpecialArray() {
            var arr = new Array()
            arr.push.apply(arr, arguments)
            arr.toPipedString = function() {}

            return arr
        }
    8、稳妥构造函数模式（所谓车稳妥对象，指的是没有公共属性，而且其方法也不引用this的对象，已经篡改了定义）
        <!-- 就是一个闭包访问局部变量 -->
        function Person(name, age, job) {
            var o = new Object()
            o.getName = function() {
                alert(name)
            }

            return o
        }

```

## js 继承模式

```js
    /*
    继承方式：
    纯原型链模式
    借用构造函数模式
    组合继承模式
    原型式继承模式
    寄生式继承模式
    寄生组合式继承模式
    */
    1、纯原型链继承模式(本质是重写原型对象，会继承所有的东西，状态和操作)
        function SuperType() {
            this.property = true
        }
        SuperType.prototype.getProperty = function() {
            return this.property
        }

        function SubType() {
            this.sub = false
        }
        <!-- 继承，原型的constructor没有改写 -->
        SubType.prototype = new SuperType()
        SubType.prototype.getSub = function() {
            return this.sub
        }
    2、 借用构造函数继承模式（无法避免构造函数存在的问题，所有实例拷贝一份操作，浪费内存）
        function SuperType() {
            this.colors = [1,2]
        }
        function SubType() {
            SuperType.call(this)
        }
    3、组合继承模式（伪经典继承模式）
        function SuperType(name) {
            this.name = name
            this.colors = [1,2]
        }
        SuperType.prototype.getName = function() {}
        function SubType(name, age) {
            SuperType.call(this, name)
            this.age = age
        }
       //  继承方法
       SubType.prototype = new SuperType() // 直接使用SuperType.prototype似乎更好，减少SuperType中的状态
       SubType.prototype.constructor = SubType
       SubType.prototype.getAge = function() {}
    4、原型式继承模式
    5、寄生式继承模式
    6、寄生组合式继承模式
```

## tapable

> tapable 库暴露了以下 Hook Class，每种 Hook 在执行回调时存在差异
> 所有的 Hook 构造函数都接收可选的 option 参数，指定了一系列的参数名

- `SyncHook:`
- `SyncBailHook:`
- `SyncWaterfallHook:`
- `SyncLoopHook:`
- `AsyncParallelHook:`
- `AsyncParallelBailHook:`
- `AsyncSeriesHook:`
- `AsyncSeriesBailHook:`
- `AsyncSeriesWaterfallHook:`

### SyncHook example

```js
class Car {
  constructor() {
    this.hooks = {
      accelerate: new SyncHook(["newSpeed"]),
      brake: new SyncHook(),
      calculateRoutes: new AsyncParallelHook([
        "source",
        "target",
        "routesList",
      ]),
    };
  }
}

const myCar = new Car();
// 注册消息(事件)以及消息(事件)处理函数
myCar.hooks.brake.tap("WarningLampPlugin", () => warningLamp.on());
myCar.hooks.accelerate.tap("LoggerPlugin", (newSpeed) =>
  console.log(`${newSpeed}`);
);
```

### Hook

```js
this._args = args; // 记录参数名称
this.taps = [];
this.interceptors = [];
this._x = undefined;
```

### HookCodeFactory

### SyncHook

### this.taps = []

```js
    interface Tap {
        name: string; /* 监听器标识 */
        type: string; /* sync, async, promise*/
        fn: Function; /* 监听器本身 */
        stage: number; /* 优先级标识 */
        before?: string | Array; /* 优先级标识 */
        context: boolean;
    }
}
```

### this.interceptor = []

```js
    interface HookInterceptor {
	    call: (context?, ...args) => void,
	    loop: (context?, ...args) => void,
	    tap: (context?, tap: Tap) => void,
	    register: (tap: Tap) => Tap,
	    context: boolean
    }
    // demo
    myCar.hooks.caculateRoutes.intercept({
        call: (source, target, routesList) => {
            console.log("Starting to calculate routes");
        },
        registry: (tapInfo) => {
            console.log(`${tapInfo.name} is doing its job`)
            return tapInfo
        }
    })
```

### class HookMap

```js
    Class HookMap
    --属性----------------------
    this._map = new Map()
    this.name = name
    this._factory = factory
    this._interceptors = []
    --方法----------------------
    get(key) {}
    for(key) {}
    intercept(interceptor) {}
    --prototype，弃用提示----------------
    tap() {}
    tapAsync() {}
    tapPromise() {}
```

#### class HookCodeFactory

```js
    Class HookCodeFactory
    --属性--------------------
    this.config = config
    this.options = undefined
    this._args = undefined
    --方法-------------------
    create(options) {}
    setup(instance, options) {} /* 依赖注入？ */
    init(options) {}
    deinit() {}
    contentWithInterceptors(options) {}
    header() {}
    needContext() {}
    callTap(tapIndex, {onError, onResult, onDone, rethrowIfPossible}) {}
    callTapsSeries({onError, onResult, resultReturns, onDone, doneReturns, rethrowIfPossible}) {}
    callTapsLooping({onError, onDone, rethrowIfPossible}) {}
    callTapsParallel({onError, onResult, onDone, rethrowIfPossible}) {}
    args({before, after} = {}) {}
    getTapFn(idx) {}
    getTap(idx) {}
    getInterceptor(idx) {}
```

### class Hook

```js
    Class Hook
    --属性-------------
    this._args = args /* [] */
    this.name = name /*  string */
    this.taps = [] /* 存儲tap所有內容*/
    this.interceptors = []
    this._x = undefined /* 只存儲監聽器可執行函數，[]*/
    this._call = CALL_DELEGATE
    this.call = CALL_DELEGATE
    this._callAsync = CALL_ASYNC_DELEGATE
    this.callAsync = CALL_ASYNC_DELEGATE
    this._promise = PROMISE_DELEGATE
    this.promise = PROMISE_DELEGATE

    <!-- 自己给自己赋值一遍，有何意义？ -->
    this.compile = this.compile /* 只是一个接口 */
    this.tap = this.tap
    this.tapAsync = this.tapAsync
    this.tapPromise = this.tapPromise

    --方法------------
    compile(options) {}
    _createCall(type) {}
    _tap(type, options, fn) {}
    tap(options, fn) {}
    tapAsync(options, fn) {}
    tapPromise(options, fn) {}
    _runRegisterInterceptions(options) {}
    withOptions(options) {}
    isUsed() {}
    intercept(interceptor) {}
    _resetCopilation() {}
    _insert(item) {}
```

### class MultiHook

```js
    Class MultiHook
    --属性---------------------
    this.hooks: Hook = hooks
    this.name = name
    --方法---------------------
    tap(options, fn) {}
    tapAsync(options, fn) {}
    tapPromise(options, fn) {}
    isUsed() {}
    intercept(interceptor) {}
    withOptions(options) {}
```

### class SyncHook

```js
    class SyncHookCodeFactory extends HookCodeFactory
    --属性--------------------------------------------
    继承
    --方法--------------------------------------------
    content({ onError, onDone, rethrowIfPossible }) {
        return this.callTapsSeries({
            onError: (i, err) => onError(err),
            onDone,
            rethrowIfPossible
        })
    }

    const factory = new SyncHookCodeFactory()

    function SyncHook(args = [], name = undefined) {
        const Hook = new Hook(args, name);
        hook.constructor = SyncHook; /* 寄生构造函数不会有这一步 */
        hook.tapAsync - TAP_ASYNC;
        hook.tapPromise = TAP_PROMISE;
        hook.compile = COMPILE;
        return hook;
    }
```
