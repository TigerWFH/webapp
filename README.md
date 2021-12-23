# 术语

## 前端项目目录结构

```js
/*
    project-demo
        ---node_modules/存放依赖
        ---doc/存放文档
        ---mock/存放mock数据
        ---scripts/存放脚本
        ---public/静态资源
        ---.gitignore(git忽略文件)
        ---package.json(项目描述文件)
        ---.eslintrc(eslint配置文件)
        ---src/存放源码
            ---common/存放公共资源
                ---controller/存放公共的服务资源
                ---images/存放图片资源
                ---font/字体资源
                ---other
            ---components/存放公共组件
            ---pages/页面资源，配置路由
                ---page1
                ---page2
                    ---components/存放当前页面的组件
                            ---Name/存放Name组件
                                ---index.(jsx|tsx)
                                ---index.(css|module.css|scss|module.scss|less|module.less)
                            ---Age/存放Age组件
                                ---index.(jsx|tsx)
                                ---index.(css|module.css|scss|module.scss|less|module.less)
                    ---controller/存放数据流相关内容（action、reducer或dva的model）
                    ---index.(jsx|tsx)配置路由的页面
----------------------------------------------------------------------------
注意：
    只有页面容器才能配置路由，组件不允许配置路由
    页面容器只能引用公共组件或自身目录下的组件
*/
```

## 编程

```js
/*
        个人理解：如果编程语言能够实现对应的feature，编程语言完全可以是承载函数式编程或面向对象编程
        待详读文章：https://fsharpforfunandprofit.com/posts/thinking-functionally-intro/
        https://www.yinwang.org/blog-cn/2013/03/31/purely-functional
        https://www.yinwang.org/blog-cn/2015/04/03/paradigms
        https://typelevel.org/cats-effect/
        http://blog.sigfpe.com/2006/08/you-could-have-invented-monads-and.html
        https://adit.io/posts/2013-04-17-functors,_applicatives,_and_monads_in_pictures.html#functors
        --------------------------------------------------------
        资料来源：https://www.zhihu.com/question/28292740

        It is important to understand that functional programming is not just a stylistic difference; it is a completely different way of thinking about programming, in the way that truly object-oriented programming (in Smalltalk say) is also a different way of thinking from a traditional imperative language such as C.

        命令式编程（imperative program）：比如C语言

        函数式编程 是一种风格，也是一种不同角度的思考方式，与编程语言无关
        面向对象编程 是一种风格，也是一种不同角度的思考方式，与编程语言无关

        风格（范式、经验、思考方式）随便怎么说
        --------------------------------------------------------
            函数式编程理论基础是lambda演算式。无类型的lambda演算规则如下：
                1、变量（variable）
                2、函数（lambda-abstraction）
                3、替代（beta-reduction）
            需要容易的进行函数式编程，语言需要提供一下特性：
                1、closure
                2、高阶类型推断：函数可以作为参数，其类型可以非常复杂
                3、tail-call：函数式风格没有赋值，也就没有for循环，要实现循环操作只能通过递归实现
                命令式编程的理论模型-----图灵机的特点。一条写满数据的纸带，一条根据纸带内容运动的机器。
        --------------------------------------------------------
        资料来源2：https://coolshell.cn/articles/10822.html/comment-page-2#comments
        --------------------------------------------------------
            函数式编程的三大特性（基础？？？）：
                1、immutable data（不可变数据）：默认变量是不可变的，利于并行
                2、first class functions（）：函数可以像变量一样被创建，修改，并当成变量一样传递，返回或是在函数中嵌套函数
                3、递归（tail-call）：递归代替for循环
            函数式技术点：
                1、map&reducer：代替for循环
                2、pipeline：
                3、recursing递归：
                4、currying柯里化：
                5、high order function高阶函数：这点和把函数当变量使用类似
            函数式编程的优势：
                1、parallelization并行：
                2、lazy evaluation惰性求值：编译器支持
                3、determinis确定性: 函数的确定性，纯


    */
```

## querystring：一般是指 URL 上的查询字符串

```js
/*
        默认情况下，querystring是指URL上的查询字符串，即?key1=value1&key2=value2
        GET方法请求没有请求体，传参方式就是querystring

        在URLSchema方案中，为了schema的通用性，定义了安全字符集。为了通用性，URLSchema的所有字符必须符合安全字符集要求。故对不再安全字符集范围内的字符需要编码。
        querystring是URLSchema的一部分，故需要进行编码，编码即urlencoded，和application/x-www-form-urlencoded对应

        npm包对应有qs：npm install qs
    */
```

## CONTENT-TYPE: POST 和 PUT 请求中，指定了发送给服务器的请求体中数据类型；响应中，指明了响应体中返回数据的类型，但浏览器可能会忽略该值，以实际内容为准

```js
/*
       格式：Content-Type：type/subtype;parameter
        媒体类型：type/subtype
            type：数据或资源类型
            subtype：数据或资源子类型
            例如：text/html,application/json,application/x-wwww-form-urlencoded,image/jpeg
        parameter：参数 

        常用的数据类型：
            application/json：告诉服务端请求体是序列化的JSON字符串
            application/x-www-form-urlencoded：表单的默认值，发送数据前要对key和val进行了URL编码（encodeURIComponent）
            multipart/form-data：表单包含type=file的input元素时数据编码方式
            text/plain：空格编码程+，但不对特殊字符编码
    */
```

# 基础设施

- API 封装和 APILoading
- polyfill
- ErrorPage
- URL 查询参数获取
- Alert 组件
- Modal 组件
- Toast 组件
- Mask 组件

# vscode 源码关键点

- `InstatiationService设计`
- `IPCProtocol设计`
- `ExtensionHost设计`
- `WorkbenchLayout设计`
- `VSCode打包机制`
- `Electron的API`

# vscode 中的 IPC 通信模块设计：通信基础还是 Electron 的 webContents.send、ipcMain.on 和 ipcRender.send、ipcRender.on

- `协议设计protocol`
- `通信信道channel`
- `连接connection`
- `服务端server`
- `客户端client`

```

```

# 面向对象方法：Booch、Coad（1989）、OMT（1991）、UML（1995），UML 不仅统一了 Booch 方法、OMT 方法、OOSE 方法的表示方法，而且对其作了进一步的发展，最终统一为大众接受的标准建模语言

# OMT 和 UML，题外话，面向对象分析（OOA），面向对象设计（OOD），面向对象编程（OOP）90 年代软件开发方法的主流

- OMT：是 1991 年由 James Rumbaugh 等 5 人提出的，是一种新兴的面向对象的开发方法。开发工作的基础`是对真实世界的建模`。围绕这些对象，使用分析模型进行独立语言的设计。
- OMT：对象模型（类图），是对客观世界实体模拟的对象及对象彼此之间的关系的映射，描述了系统的静态结构。通常用`类图`表示
- OMT：动态模型，规定对象模型中的对象的合法变化序列。通常用`状态图`表示
- OMT：功能模型，指明系统应该做什么。更直接地反映了用户对目标系统的需求。用`数据流图`表示
- OMT：功能模型指明应该做什么，动态模型明确了什么时候做，对象模型定义做事情的实体

## 设计模式：可复用面向对象软件的基础，则是使用了 OMT 表示方法

<table>
        <tr>
            <th>
                技术
            <th>
            <th>
                继承
            </th>
            <th>
                相识（关联、集合）
            </th>
            <th>
                聚集（组合）
            </th>
            <th>
                依赖
            </th>
            <th>
                创建
            </th>
            <th>
                实现
            </th>
        </tr>
    <tbody>
        <tr>
            <td>
                OMT
            </td>
            <td />
            <td>
                表述相同
            </td>
            <td>
                相识就是关联或者聚合，箭头
            </td>
            <td>
                聚集就是组合，白色菱形
            </td>
            <td>
                无聚合
            </td>
            <td>
                无依赖
            </td>
            <td>
                无创建，GOF自创
            </td>
            <td>
                无实现
            </td>
        </tr>
        <tr>
            <td>
                UML
            </td>
            <td />
            <td>
                表述相同
            </td>
            <td>
                关联或聚合概念，三角形或白色菱形
            </td>
            <td>
                组合就是聚集，黑色菱形
            </td>
            <td>
                白色菱形表示
            </td>
            <td>
                依赖，虚线三角形
            </td>
            <td>
                无创建，GOF自创
            </td>
            <td>
                三角形虚线
            </td>
        </tr>
    </tbody>
</table>
# 系统设计
[消息系统、事件系统和命令系统设计](https://tuhrig.de/messages-vs-events-vs-commands/)
# chrome插件离线下载：https://chrome-extension-downloader.com/ca85a45a24e78a17132bcab29077db37/https://chrome.google.com/webstore/detail/take-webpage-screenshots/mcbpblocgmgfnpjjppndjkmgjaogfceg?hl=zh-CN.crx
# 在线工具
* `js在线编程：`https://codepen.io/pen/?&editors=001
* `node对ES的支持程度查询：`https://node.green/
* `浏览器对ES的支持程度查询：`
* `浏览器对CSS样式支持程度查询：`https://wwww.caniuse.com
* `在线正则表达式：`https://regex101.com/
# typescript
[typescript默认配置项](https://www.tslang.cn/docs/handbook/compiler-options.html)
# 流的概念
[mmap](https://stackoverflow.com/questions/258091/when-should-i-use-mmap-for-file-access/258097#258097)
[更好的资料](https://www.zhihu.com/question/24734041)
[流](http://catb.org/esr/writings/taoup/html/ch07s02.html#plumbing)
[缓冲区和流概念](http://www.cppblog.com/gujiayue/archive/2016/05/27/213595.html)
# react-router-redux：已废弃，该库适用于react-router4.x以下；替代库connected-react-router
[react-router-redux](https://github.com/reactjs/react-router-redux)

[connected-react-router](https://github.com/supasate/connected-react-router)

```

    react-router-redux 是将react-router 和 redux 集成到一起的库，让你可以用redux的方式去操作react-router。例如，react-router 中跳转需要调用 router.push(path)，集成了react-router-redux 你就可以通过dispatch的方式使用router，例如跳转可以这样做 store.dispatch(push(url))。本质上，是把react-router自己维护的状态，例如location、history、path等等，也交给redux管理。一般情况下，是没有必要使用这个库的。

    connected-react-router：用于redux store同步并管理react-router的状态
```

# redux-actions：号称简化 redux 的一个库

[redux-actions](https://github.com/redux-utilities/redux-actions)

```

```

# 主流压缩工具：Uglify(保守，格式化逻辑基本还能看出来)，YUI Compressor，Google Closure Compiler(压缩率更高)

[Uglify](http://lisperator.net/uglifyjs/)

[YUI Compressor](http://developer.yahoo.com/yui/compressor/)

[Google Closure Compiler](https://developers.google.com/closure/compiler/)

# google-closure-compiler-js：谷歌 js 压缩工具，已废弃；最新包 google-closure-compiler

[google-closure-compiler-js](https://github.com/google/closure-compiler)

# google-closure-compiler：代理 google-closure-compiler-js 的最新库

# keymirror(可以配合 google 的压缩工具使用)

[keymirror 资料](https://segmentfault.com/q/1010000011048491)

[keymirror 资料 2](https://segmentfault.com/a/1190000008185613)

```

```

# Tapable

```
    Hook的执行方式与hook类型有关：
        basic hook：简单的线性的（in a row）执行所有的function
        Waterfall：线性的（in a row）执行function，且将上一个function的返回值传递给下一个function
        Bail：允许function执行提前退出。如果存在function返回anything，终止后续function的执行
        Loop：当监听器返回非undefined值时，循环执行当前监听器，直到监听器返回undefined；按照改规则，依次执行后续的监听器
    Hook添加监听器和触发监听器支持方式：
        SyncHook、SyncBailHook、
        SyncWaterfallHook、SyncLoopHook---》支持tap；call、callAsync、promise

        AsyncSeriesHook、AsyncSeriesBailHook、
        AsyncSeriesWaterfallHook---》支持tap、tapAsync、tapPromise；callAsync、promise

        AsyncParallelHook、AsyncParallelBailHook---》支持tap、tapAsync、tapPromise；callAsync、promise
    Hook参数列表：
        创建Hook实例时，传入构造函数的第一个数组参数的长度，就是监听器或触发器的参数列表，callback除外，例如
        let hook = new SyncHook(['arg1', 'arg2']);// 指定了监听器可使用的参数列表
        hook.tap('SyncHookPlugin', (t1, t2) => {// 使用call传递进来的参数
        })
        hook.call(c1, c2);// 触发器传递对应arg1和arg2的参数给监听器
        如果是AsyncHook，触发器需要添加一个cb参数，签名是：function cb(err?: any, result?: any): any
        hook.callAsync(c1,c2, (err, result) => {})
```

| 序号 | Hook                     | 执行方式     | 支持的 tap                | 要点                                                            |
| ---- | :----------------------- | :----------- | :------------------------ | --------------------------------------------------------------- |
| 1    | SyncHook                 | in a row     | tap                       | 不关心监听函数的返回值                                          |
| 2    | SyncBailHook             | in a row     | tap                       | 只要监听函数中有一个返回值不为 null，则跳过剩下的逻辑？？       |
| 3    | SyncWaterfallHook        | in a row     | tap                       | 上一个监听器返回值传递给下一个监听器                            |
| 4    | SyncLoopHook             | in a row     | tap                       | 监听函数返回 true 继续执行，直到返回 undefined 表示退出循环？？ |
| 5    | AsyncParallelHook        | not in a row | tap、tapAsync、tapPromise | 不关心监听函数的值                                              |
| 6    | AsyncParallelBailHook    | not in a row | tap、tapAsync、tapPromise | 监听器返回值不为 null，则终止后续监听器的执行，执行 callback    |
| 7    | AsyncSeriesHook          | in a row     | tap、tapAsync、tapPromise |
| 8    | AsyncSeriesBailHook      | in a row     | tap、tapAsync、tapPromise |
| 9    | AsyncSeriesWaterfallHook | in a row     | tap、tapAsync、tapPromise |

```js
    // tap、tapAsync、tapPromise的签名
    function tap(options, fn): void
    function tapAsync(options, fn): void
    function tapPromise(options, fn): void
    // call签名------>对应着监听器的入参格式
    // callAsync/Promise--->
    function call(params?: any): void
    function callAsync(params?: any, cb: func): void
    function promise(): void
    /*
    SyncHook、SyncBailHook、
    SyncWaterfallHook、SyncLoopHook---》支持tap；call、callAsync、promise

    AsyncSeriesHook、AsyncSeriesBailHook、
    AsyncSeriesWaterfallHook---》支持tap、tapAsync、tapPromise；callAsync、promise

    AsyncParallelHook、AsyncParallelBailHook---》支持tap、tapAsync、tapPromise；callAsync、promise
    */
```

```js
    /*
        SyncHook：一次执行监听器
    */
   function(arg1, arg2, arg3) {
        "use strict";
        var _context;
        var _x = this._x;
        var _fn0 = _x[0];
        _fn0(arg1, arg2, arg3);
        var _fn1 = _x[1];
        _fn1(arg1, arg2, arg3);
}
```

```js
    /*
        SyncBailHook：监听器返回非undefined值，终止后续监听器执行并返回监听器返回的值
    */
   function(arg1) {
        "use strict";
        var _context;
        var _x = this._x;
        var _fn0 = _x[0];
        var _result0 = _fn0(arg1);
        if(_result0 !== undefined) {
            return _result0;
        } else {
            var _fn1 = _x[1];
            var _result1 = _fn1(arg1);
            if(_result1 !== undefined) {
                return _result1;
            } else {
            }
        }
    }
```

```js
    /*
        SyncWaterfallHook：监听器返回值作为下一个监听器的第一个参数传入，且触发器会返回最终返回值
    */
   function(SyncWaterfallHook) {
        "use strict";
        var _context;
        var _x = this._x;
        var _fn0 = _x[0];
        var _result0 = _fn0(SyncWaterfallHook);
        if(_result0 !== undefined) {
            SyncWaterfallHook = _result0;
        }
        var _fn1 = _x[1];
        var _result1 = _fn1(SyncWaterfallHook);
        if(_result1 !== undefined) {
            SyncWaterfallHook = _result1;
        }
        return SyncWaterfallHook;
    }
```

```js
    /*
        SyncLoopHook：当监听器返回非undefined值，继续执行当前监听器，直到返回undefined;依次执行剩下的所有监听器
    */
   function(syncLoopHook) {
        "use strict";
        var _context;
        var _x = this._x;
        var _loop;
        do {
            _loop = false;
            var _fn0 = _x[0];
            var _result0 = _fn0(syncLoopHook);
            if(_result0 !== undefined) {
                _loop = true;
            } else {
                var _fn1 = _x[1];
                var _result1 = _fn1(syncLoopHook);
                if(_result1 !== undefined) {
                    _loop = true;
                } else {
                    if(!_loop) {
                    }
                }
            }
        } while(_loop);
    }
```

```js
    /*
        AsyncParallelBailHook：会将result作为继续执行的判断条件之一，其余同AsyncParallelHook
        callback签名：function cb(err?: any, result?: any): any
        result !== undefined终止执行
    */
    function(arg1, _callback) {
        "use strict";
        var _context;
        var _x = this._x;
        var _results = new Array(2);
        var _checkDone = () => {
            for(var i = 0; i < _results.length; i++) {
                var item = _results[i];
                if(item === undefined) return false;
                if(item.result !== undefined) {
                    _callback(null, item.result);
                    return true;
                }
                if(item.error) {
                    _callback(item.error);
                    return true;
                }
            }
            return false;
        }
        do {
            var _counter = 2;
            var _done = () => { _callback(); };
            if(_counter <= 0) break;
            var _fn0 = _x[0];
            _fn0(arg1, (_err0, _result0) => {
                if(_err0) {
                    if(_counter > 0) {
                        if(0 < _results.length && ((_results.length = 1), (_results[0] = { error: _err0 }), _checkDone())) {
                            _counter = 0;
                        } else {
                            if(--_counter === 0) _done();
                        }
                    }
                } else {
                    if(_counter > 0) {
                        if(0 < _results.length && (_result0 !== undefined && (_results.length = 1), (_results[0] = { result: _result0 }), _checkDone())) {
                            _counter = 0;
                        } else {
                            if(--_counter === 0) _done();
                        }
                    }
                }
            });
            if(_counter <= 0) break;
            if(1 >= _results.length) {
                if(--_counter === 0) _done();
            } else {
                var _fn1 = _x[1];
                _fn1(arg1, (_err1, _result1) => {
                    if(_err1) {
                        if(_counter > 0) {
                            if(1 < _results.length && ((_results.length = 2), (_results[1] = { error: _err1 }), _checkDone())) {
                                _counter = 0;
                            } else {
                                if(--_counter === 0) _done();
                            }
                        }
                    } else {
                        if(_counter > 0) {
                            if(1 < _results.length && (_result1 !== undefined && (_results.length = 2), (_results[1] = { result: _result1 }), _checkDone())) {
                                _counter = 0;
                            } else {
                                if(--_counter === 0) _done();
                            }
                        }
                    }
                });
            }
        } while(false);
    }
```

```js
    /*
        AsyncParallelHook：直接执行监听器(in a row)，
        此处Parallel可以理解为只要监听器不出错，所有的监听器都会执行（监听器之间没有关联逻辑）
        callback签名：function cb(err?: any): any
        如果出错，直接执行触发器的callback，逻辑由监听器的callback控制
        如果是最后一个监听器，则执行触发器的callback，逻辑由监听器的callback控制

        如果监听器没有了，终止执行，
        执行下一个监听器
     */
    function(arg1, _callback) {
        "use strict";
        var _context;
        var _x = this._x;
        do {
            var _counter = 2;
            var _done = () => { _callback(); };
            if(_counter <= 0) break;
            var _fn0 = _x[0];
            _fn0(arg1, _err0 => {
                if(_err0) {
                    if(_counter > 0) {
                        _callback(_err0);
                        _counter = 0;
                    }
                } else {
                    if(--_counter === 0) _done();
                }
            });
            if(_counter <= 0) break;
                var _fn1 = _x[1];
                _fn1(arg1, _err1 => {
                    if(_err1) {
                        if(_counter > 0) {
                            _callback(_err1);
                            _counter = 0;
                        }
                    } else {
                        if(--_counter === 0) _done();
                    }
            });
        } while(false);
    }
```

```js
    /*
        AsyncSeriesHook：会对每一个监听器封装，以callback形式传递给上一个监听器，但不care上一个监听器的执行结果
        callback签名：function cb(err?: any):any
        如果监听器出错直接执行触发器的_callback
        否者执行下一个监听器：callback
     */
    // callAsync
    function(arg1, arg2, _callback) {
        "use strict";
        var _context;
        var _x = this._x;
        function _next0() {
            var _fn1 = _x[1];
            _fn1(arg1, arg2, _err1 => {
                if(_err1) {
                    _callback(_err1);
                } else {
                _callback();
                }
            });
        }
        var _fn0 = _x[0];
        _fn0(arg1, arg2, _err0 => {
            if(_err0) {
                _callback(_err0);
            } else {
                _next0();
            }
        });
    }
    // promise
    function(arg1, arg2) {
        "use strict";
        return new Promise((_resolve, _reject) => {
                var _sync = true;
                function _error(_err) {
                    if(_sync)
                        _resolve(Promise.resolve().then(() => { throw _err; }));
                    else
                        _reject(_err);
                };
                var _context;
                var _x = this._x;
                function _next0() {
                    var _fn1 = _x[1];
                    var _hasResult1 = false;
                    var _promise1 = _fn1(arg1, arg2);
                    if (!_promise1 || !_promise1.then)
                        throw new Error('Tap function (tapPromise) did not return promise (returned ' + _promise1 + ')');
                    _promise1.then(_result1 => {
                            _hasResult1 = true;
                            _resolve();
                        }, _err1 => {
                            if(_hasResult1) throw _err1;
                            _error(_err1);
                        });
                }
                var _fn0 = _x[0];
                var _hasResult0 = false;
                var _promise0 = _fn0(arg1, arg2);
                if (!_promise0 || !_promise0.then)
                    throw new Error('Tap function (tapPromise) did not return promise (returned ' + _promise0 + ')');
                _promise0.then(_result0 => {
                        _hasResult0 = true;
                        _next0();
                    }, _err0 => {
                        if(_hasResult0) throw _err0;
                        _error(_err0);
                    });
                _sync = false;
            });
    }
```

```js
    /*
        AsyncSeriesBailHook：会对每一个监听器进行封装，以callback形式传递给上一个监听器，并根据上一个监听器执行结果确认最终的callback（可以是对下一个监听器封装后的callback，也可以是触发器直接传递进来的_callback）
        callback（_callback）签名：funciton callback(err?: any, result?: any): any
        如果监听器执行出错，直接执行_callback
        如果result !== undefined，直接执行_callback
        否者执行 callback
     */
    // 2个监听器
    function(AsyncSeriesBailHook, _callback) {
        "use strict";
        var _context;
        var _x = this._x;
        function _next0() {
            var _fn1 = _x[1];
            _fn1(AsyncSeriesBailHook, (_err1, _result1) => {
                if (_err1) {
                    _callback(_err1);
                } else {
                    if (_result1 !== undefined) {
                        _callback(null, _result1);
                    } else {
                        _callback();
                    }
                }
            });
        }
        var _fn0 = _x[0];/* 获取第一个监听器 */
        // 执行第一个监听器
        _fn0(AsyncSeriesBailHook, (_err0, _result0) => {
            if (_err0) {
                _callback(_err0);
            } else {
                if (_result0 !== undefined) {
                    _callback(null, _result0);
                } else {
                    _next0();
                }
            }
        });
    }
    // 3个监听器
    function(AsyncSeriesBailHook, _callback) {
        "use strict";
        var _context;
        var _x = this._x;
        // 对第三个监听器封装
        function _next1() {
            var _fn2 = _x[2];
            _fn2(AsyncSeriesBailHook, (_err2, _result2) => {
                if(_err2) {
                    _callback(_err2);
                } else {
                    if(_result2 !== undefined) {
                        _callback(null, _result2);
                    } else {
                        _callback();
                    }
                }
            });
        }
        // 对第二个监听器封装
        function _next0() {
            var _fn1 = _x[1];
            _fn1(AsyncSeriesBailHook, (_err1, _result1) => {
                if(_err1) {
                    _callback(_err1);
                } else {
                    if(_result1 !== undefined) {
                        _callback(null, _result1);
                    } else {
                        _next1();
                    }
                }
            });
        }
        // 直接执行第一个监听器
        var _fn0 = _x[0];
        _fn0(AsyncSeriesBailHook, (_err0, _result0) => {
            if(_err0) {
                _callback(_err0);
            } else {
                if(_result0 !== undefined) {
                    _callback(null, _result0);
                } else {
                    _next0();
                }
            }
        });
    }
```

```js
    /*
        AsyncSeriesWaterfallHook：会对每一个监听器进行封装，以callback形式传递给上一个监听器
        第一个监听器的参数来自于触发器参数列表，执行第一个监听器，
        callback签名：function cb(err?: any, result?: any): any
        如果出错，直接执行_callback(err)
        如果未出错，且result !== undefiend，将arg1 = result，且执行下一个监听器
        如果未出错，且result === undefined，直接使用arg1执行下一个监听器
        注：多余的参数不尝试被替换，仅仅将第一个参数替换为result
        除非出错，所有的监听器都线性执行
     */
    function(arg1, arg2, _callback) {
        "use strict";
        var _context;
        var _x = this._x;
        function _next0() {
            var _fn1 = _x[1];
            _fn1(arg1, arg2, (_err1, _result1) => {
                if(_err1) {
                    _callback(_err1);
                } else {
                    if(_result1 !== undefined) {
                        arg1 = _result1;
                    }
                    _callback(null, arg1);
                }
            });
        }
        var _fn0 = _x[0];
        _fn0(arg1, arg2, (_err0, _result0) => {
            if(_err0) {
                _callback(_err0);
            } else {
                if(_result0 !== undefined) {
                    arg1 = _result0;
                }
                _next0();
            }
        });
    }
```

# webpack 常规插件

## config（https://webpack.docschina.org/configuration/entry-context/#context）

- `entry`和`context`：webpack 通过这两个属性共同决定入口文件的路径，context 可以理解为资源入口的路径前缀，必须是绝对路径

```js
/**
 * 类型：
 *  string: "./app/entry"  单页面配置 等价 {main: "./app/entry"}
 *  array: ["./app/entry", "./app/entry2"] 单页面配置，需要配合output.library配置使用，多入口,等价{main: ["./app/entry", "./app/entry2"]}，使用数组意味着数组内的各个模块没有依赖关系， 你可能想在HTML中放入"googleAnalytics.js"，可以像下图这样把它添加到到bundle.js的结尾（参考资料：https://zhuanlan.zhihu.com/p/24744677）
 *  object: {a: "./app/entry", b: "./app/entry"} 多页面配置，对象中的key对应着output.filename中的[name]
 *
 * 如果webpack的entry是string或array，就只会生成一个Chunk，这是chuank的名字是main
 * 如果webpack的entry是object，就会生成多个Chunk，Chunk的名字是object中的键名
 *
 *
 */
```

- `output`：object，最少配置一个属性 filename

```js
/**
 * 单个chunk文件配置：
 *  module.exports = {
 *      output: {
 *          filename: "bundle.js"
 *      }
 *  }
 *  多个chunk文件配置（包括多入口和commonschunkplugin插件，应该使用占位符（substitutions）确保每个chunk具有唯一的名字）
 *
 * module.exports = {
 *  entry: {
 *      app: "./src/app.js",
 *      search: "./src/search.js"
 *  },
 *  output: {
 *      filename: "[name].bundle.js", // 使用名字命名app.bundle.js和search.bundle.js
 *      filename: "[id].bundle.js", // 使用内部chunkId命名
 *      filename: "[contenthash].bundle.js", // 使用生成内容hash命名，也可以组合使用
 *      path: __dirname + "./dist"
 *  }
 * }
 *
 *
 **/
```

- `速度分析，分析webpack打包速度：`speed-measure-webpack-plugin
- `体积分析，分析打包后文件大小：`webpack-bundle-analyzer
- `多进程多实例构建：`thread-loader、parallel-webpack、HappyPack
- `多进程多实例并行压缩：`parallel-uglify-plugin 和 uglifyjs-webpack-plugin、terser-webpack-plugin（支持 es6 语法压缩）配合使用
- ``

# iScroll 组件库

# Swiper 组件库

# 缓存：https://github.com/CJY0208/react-router-cache-route/blob/master/README_CN.md

# 待学习知识

```
    可迭代协议：可迭代协议允许 JavaScript 对象定义或定制它们的迭代行为。要成为可迭代对象， 一个对象必须实现 @@iterator 方法

    可迭代对象：实现了可迭代协议的对象

    实现可迭代对象的迭代行为的具体方式有种，普通函数循环实现，也可以是生成器函数

    迭代器协议：迭代器协议定义了产生一系列值（无论是有限个还是无限个）的标准方式。当值为有限个时，所有的值都被迭代完毕后，则会返回一个默认返回值。

    迭代器：只有实现了一个拥有以下语义（semantic）的 next() 方法，一个对象才能成为迭代器

    迭代器加上[@@iterator]就成了可迭代对象
    var myIterator = {
        next: function(){
            ...
        },
        [Symbol.iterator]: function() {
            return this
        }
    }
    生成器函数：会返回一个迭代器；GeneratorFunction、function* expression

    生成器：Generator

    Generator函数的声明
        function* foo(x) {
            yield x + 1;
            yield x + 2;

            return x + 3;
        }
```

# 视觉优化

```
    1、接口数据回来之前，使用骨架图
    2、接口回来之后，
        2-1：成功：渲染视觉效果
        2-2：失败：跳转错误页
```

# React 的 TS 类型

- `DOM`: Node, Element, HTMLElement, HTMLDivElement
- `ReactNode`: ReactChild | ReactFragment | ReactPortal | boolean | null | undefined
- `ReactChild`: ReactElement | ReactText
- `ReactElement`: 带有 props 的 js 对象
- `ReactText`: string | number
- `ReactFragment`: {} | ReactNodeArray
- `ReactNodeArray`: interface ReactNodeArray extends Array<ReactNode>{}
- `ReactPortal`: interface ReactPortal extends ReactElement {key: Key | null;children: ReactNode;}

# React 的 event

```
    React的event是合成事件，native事件全部冒泡到document，document将native event封装成合成事件在进行派发，所以，如果使用addeventlistener为dom添加事件，会比JSX的onXXX优先执行。因为，native事件首先冒泡到子结点，执行子结点的native onXXX，冒泡到document后，合成事件才会被dispatch到JSX对应的结点，执行JSX的onXXX
```

# React

## React Event

```js
    /**
     * SyntheticEvent：ReactEvent是合成事件，实现了W3C规范，和nativeEvent有着相似的接口
     * native事件的冒泡和捕获阶段执行完毕，才会执行React的合成事件
     *
     * 结论：React的捕获事件触发，原生捕获事件触发，原生冒泡事件触发、React的冒泡事件触发
     * 分析：基于React的事件系统，捕获阶段React最先获取事件，接着走到native，然后走到native的冒泡阶段，最后走React的冒泡（因为React的所有事件都是委托到document节点下的，所以冒泡最慢）
     * 以下代码结果输出：
     *  ReactContainerCapture=========>
     *  ReactDemoCapture=========>
     *  containerCapture======>
     *  demoCapture======>
     *  demo======>
     *  container======>
     *  ReactDemo=========>
     *  ReactContainer=========>
     */
    componentDidMount() {
        const container = document.getElementById("container")
        const demo = document.getElementById("demo")
        if (container) {
            container.addEventListener("click", function() {
                console.log("containerCapture======>")
            }, {
                capture: true
            })
            container.addEventListener("click", function() {
                console.log("container======>")
            }, {
                capture: false
            })
        }
        if (demo) {
            demo.addEventListener("click", function() {
                console.log("demoCapture======>")
            }, {
                capture: true
            })
            demo.addEventListener("click", function() {
                console.log("demo======>")
            }, {
                capture: false
            })
        }
    }
    onReactContainer = () => {
        console.log("ReactContainer=========>")
    }
    onReactContainerCapture = (event: any) => {
        console.log("ReactContainerCapture=========>")
    }
    onReactDemo = () => {
        console.log("ReactDemo=========>")
    }
    onReactDemoCapture = () => {
        console.log("ReactDemoCapture=========>")
    }
    <div id="container"
        onClick={this.onReactContainer}
        onClickCapture={this.onReactContainerCapture}>
        <div id="demo"
            onClick={this.onReactDemo}
            onClickCapture={this.onReactDemoCapture}>
                点击测试
        </div>
    </div>
```

## 关于 ReactAPIs

```
    1、import React, {Component, Suspense, lazy } from 'react';
    APIs：
        1、React.Component
        2、React.PureComponent
        3、React.memo
        4、createElement
        5、createFactory
        6、cloneElement
        7、isVAlidElement
        8、React.Fragment
        9、React.createRef
        10、React.forwardRef
        11、React.lazy
        12、REact.Suspense
        Hooks
        13、useState
        14、useEffect
        15、useContext
        16、useReducer
        17、useCallback
        18、useMemo
        19、useRef
        20、useImperativeHandle
        21、useLayoutEffect
        22、useDebugVAlue
```

## Render props 模式：是 React Component 之间逻辑代码重用的技术。准确将，使用一个函数 prop 属性，返回 React Element，即<Demo func={params => ReactElement} />。ReactRouter 库使用了 render props 技术

Components are the primary unit of code reuse in React, but it is not always obvious how ti share the state or behavior that one component encapsulates to other components that need that same state.

HOC 似乎不会共享 state

- `Use Render Props for Cross-Cutting Concerns`

```js
    // 追踪鼠标位置
    class MouseTracter extends React.Component {
        constructor(props) {
            super(props)
            this.handleMouseMove = this.handleMouseMove.bind(this)
            this.state = {x: 0, y: 0}
        }
        handleMouseMove(event) {
            this.setState({
                x: event.clientX,
                y: event.clientY
            })
        }
        render(){
            return (
                <div style={{height: "100vh"}} onMouseMove={this.handleMouseMove}>
                    <h1>Move the mouse around</h1>
                    <p>The current mouse position is ({this.state.x}, {this.state.y})</p>
                </div>
            )
        }
    }

    // 对于MouseTracter，如何共享获取的鼠标位置状态给第三方Component
    // 1、抽象出Mouse组件
    class Mouse extends React.Component {
        constructor(props) {
            super(props)
            this.handleMouseMove = this.handleMouseMove.bind(this)
            this.state = {
                x: 0,
                y: 0
            }
        }
        handleMouseMove(event) {
            this.setState({
                x: event.clientX,
                y: event.clientY
            })
        }
        render() {
            return (
                <div style={{height: "100vh"}} onMouseMove={this.handleMouseMove}>
                    <p>The current mouse position is({this.state.x}, {this.state.y})</p>
                </div>
            )
        }
    }
    // 此时并没有对Mouse的逻辑真正的复用
    class MouseTracter extends React.Component {
        render() {
            return (
                <div>
                    <h1>Move the mouse around!</h1>
                    <Mouse />
                </div>
            )
        }
    }
    // Demo1猫捉老鼠游戏：一个Cat组件同样需要鼠标坐标状态
    // 实现代码1：完全copy的已有的代码，实现了这种特殊的use case，每一种特殊的use case都这样重写一遍代码，里面获取鼠标位置的代码是重复的
    class Cat extends React.Component {
        render() {
            const mouse = this.props.mouse;
            return <img src="/cat.png" style={{position: 'absolute', left: mouse.x, right: mouse.y }}/>
        }
    }
    class MouseWithCat extends React.Component {
        constructor(props) {
            super(props)
            this.handleMouseMove = this.handleMouseMove.bind(this)
            this.state = {
                x: 0,
                y: 0
            }
        }
        handleMouseMove(event) {
            this.setState({
                x: event.clientX,
                y: event.clientY
            })
        }

        render() {
            <div style={{height: "100vh"}} onMouseMOve={this.handleMouseMove}>
                <Cat mouse={this.state} />
            </div>
        }
    }
    class MouseTracter extends React.Component {
        render() {
            return (
                <div>
                    <h1> Move the mouse around!</h1>
                    <MouseWithCat />
                </div>
            )
        }
    }
    // 实现代码2，使用render props消除实现代码1中的重复代码(state可以传递给子组件)
    // Cat同代码实现1
    class Mouse extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                x: 0,
                y: 0
            }
            this.handleMouseMove = this.handleMouseMove.bind(this)
        }
        handleMouseMove(event) {
            this.setState({
                x: event.clientX,
                y: event.clientY
            })
        }
        render() {
            return (
                <div style={{height: "100vh"}} onMouseMove={this.handleMouseMove}>
                    {
                        this.props.render(this.state)
                    }
                </div>
            )
        }
    }
    class MouseTracter extends React.Component {
        render() {
            return (
                <div>
                    <h1>Move mouse around!</h1>
                    <Mouse render={mouse => <Cat mouse={mouse} />} />
                </div>
            )
        }
    }
    // HOC(render props就是一个HOC)
    function withMouse(Component) {
        render() {
            return (
                <Mouse render={mouse => (<Component {...this.props} mouse={mouse} />)} />
            )
        }
    }
```

- `Using Props Other Than render：`可以使用任意的 props 名称，不一定是 render
- `Caveats警告**************************一下是警告*****************************`
- `Be careful when using Render Props with React.PureComponent：`因为是 props，不会 update，应为 shouldComponentUpdate 一直返回 false

## HOCs：是一个成熟的 pattern，是 React Component 重用代码的技术。准确讲，React 中年的高阶就是一个接受 Component 为参数，并返回新 Component 的函数。HOCs 用于解决一下问题:

- `Use HOCs for Cross-Cutting Concerns`

```js
// Cross-Cutting Conterns：跨组件的共同关注点（就是将不同组件使用到的共同逻辑分离出来，分离关注点）
class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      comments: DataSource.getCommnets()
    };
  }
  componentDidMount() {
    DataSource.addChangeListener(this.handleChange);
  }
  componentWillUnmount() {
    DataSource.removeChangeListener(this.handleChange);
  }
  handleChange() {
    this.setState({
      comments: DataSource.getComments()
    });
  }
  render() {
    return (
      <div>
        {this.state.comments.map((comment) => {
          <Comment comment={comment} key={comment.id} />;
        })}
      </div>
    );
  }
}
class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      blogPost: DataSource.getblogPost(props.id)
    };
  }
  componentDidMount() {
    DataSource.addChangeListener(this.handleChange);
  }
  componentWillUnmount() {
    DataSource.removeChangeListener(this.handleChange);
  }
  handleChange() {
    this.setState({
      comments: DataSource.getblogPost(this.props.id)
    });
  }
  render() {
    return <TextBlock text={this.state.blogPost} />;
  }
}
// 共同的操作就是从数据源拉取数据
function withSubscribtion(wrappedComponent, cb) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        data: cb(DataSource, props)
      };
    }
    componentDidMount() {
      DataSource.addChangeListener(this.handleChange);
    }
    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange);
    }

    render() {
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}
function CommentList(props) {
  return (
    <div>
      {props.data.map((comment) => {
        <Comment comment={comment} key={comment.id} />;
      })}
    </div>
  );
}
function BlogPost(props) {
  <TextBlock text={props.blogPost} />;
}
const CommentListWithSubscription = withSubscription(
  CommentList,
  (DataSource, props) => DataSource.getComments()
);
const BlogPostWithSubscription = withSubscription(
  BlogPost,
  (DataSource, props) => DataSource.getBlogPost(props.id)
);
```

- `Don’t Mutate the Original Component. Use Composition`

```js
// 不能修改wrappedComponent，会产生很多问题，例如多个HOCs嵌套使用
// 直接修改InputComponent原型，当有第二个Hoc进行同样的操作，lopProps的操作就会被覆盖
function logProps(InputComponent) {
  InputComponent.prototype.componentDidUpdate = function (preProps) {
    console.log('Current props:', this.props);
  };
  // The fact that we're returning the original input is a hint that it has been mutated.

  return InputComponent;
}
// 不修改wrappedComponent，使用Composition方式，即将inputComponent包裹进container component
function logProps(WrappedComponent) {
  return class extends React.Component {
    componentDidMount() {
      console.log('Current props:', this.props);
    }
    render() {
      // Wraps the input component in a container, without mutating it. Good!
      return <WrappedComponent {...this.props} />;
    }
  };
}
const EnhancedComponent = logProps(InputComponent);
```

<!-- 高阶潜规则：高阶为component增加新特性 -->

- `Convention: Pass Unrelated Props Through to the Wrapped Component(过滤掉与shared code相关的props，不要向下传递)`
  不应该将与 shared 相关的 props 属性传递给 origin component

```js
    render() {
        const { extraProp, ...passThroughProps } = this.props
        const injectedProp = someStateOrInstanceMethod;

        return (
            <WrappedComponent
            injectedProp={injectedProp}
            {...passThroughProps} />
        )
    }
```

- `Convention: Maximizing Composability（最大限度的组合性）：有点类似链式调用的感觉`

Functions whose output type is the same as its input type are really easy to compose together

- `Convention: Wrap the Display Name for Easy Debugging`
- `Caveats（警告）***********************一下是高阶技术的使用陷阱******************************`
- `Don’t Use HOCs Inside the render Method：`HOC 每次返回新的实例，1、性能问题；2、丢失状态
- `Static Methods Must Be Copied Over：`高阶无法传递静态函数
- `Refs Aren’t Passed Through：`高阶无法传递 ref 引用 prop
  When you apply a HOC to a component, though, the original component is wrapped with a container component. That means the new component does not have any of the static methods of the original component.

```js
// Define a static method
WrappedComponent.staticMethod = function () {};
// Now apply a HOC
const EnhancedComponent = enhance(WrappedComponent);
// the enchaned component has no static method, to solve this, you should copy the methods onto the container before returning it
function enhance(WrappedComponent) {
  class Enhance extends React.Component {}
  hoistNonReactStatic(Enhance, WrappedComponent);

  return Enhance;
}
```

## React.forwardRef：解决 HOC 无法传递 ref 的场景

## refs: 提供了访问 DOM 节点和 React 中 render 创建的 ReactElement 的途径

-

[React APIs](https://reactjs.org/docs/react-api.html)

# create-react-app 创建的 ts 项目

- 使用 typescript
- 没有分包

# 关于规范，ISOC 和 W3C 是互联网领域两大国际协会组织

- IETF（互联网工程任务组）是 ISOC 下属结构，负责互联网基础标准的开发和推动，其发布的内容称为征求意见稿（Request For Comments）
- W3C（万维网联盟），是有与 web 相关的企业机构成立的业界同盟，主要负责 web 标准的开发和推动工作（本来也是 IETF 的工作），包括 XHTML2、HTML5、CSS3、WebApp 等
- [w3c 规范](https://www.w3.org/TR/)
- [IETF](https://www.ietf.org)

# javascript（来自 javascript 高级程序设计）

## 模块化发展进程

- `服务端模块化方案：`CommonJS（Node）
- `浏览器端模块化方案：`AMD（RequireJS），CMD（SeaJS），UMD 的全称是 Universal Module Definition，也就是通用模块标准。它的目标是使一个模块能运行在各种环境下，不论是 CommonJS、AMD，还是非模块化的环境（当时 ES6 Module 还未被提出），ES6 Module

```js
/**
 * commonjs：多用于nodejs
 *  1、关键字：
 *      1-1：module，代表当前模块，是一个对象
 *      1-2：module.exports(exports)，对外的接口，加载某个模块本质就是加载module.exports属性
 *      1-3：require方法，用于加载模块，模块加载的过程也是解析执行过程，导出最终执行结果即module.exports
 *  2、一个文件就是一个模块，一个文件就是一个模块，拥有自己独立的作用域、变量、方法等
 * */

/**
 * amd(Asynchronous Module Definitio)：https://github.com/amdjs/amdjs-api/wiki/AMD
 * 定义模块：define(id?, dependencies?, factory)
 * 加载模块：require([dependencies], function() {})
 */
// 定义模块alpha
define('alpha', ['require', 'exports', 'beta'], function (
  require,
  exports,
  beta
) {
  exports.verb = function () {
    return beta.verb();
    //Or:
    return require('beta').verb();
  };
});
require(['alpha'], function (alpha) {
  alpha.verb();
});
/**
 * cmd(Common Module Definiton)：通用模块定义规范
 * 定义模块：define(id?, dependencies?, factory(require, exports, module){})
 *          define.cmd是一个对象
 * 加载模块：require(id)，require.async(id, callback?)
 * 导出接口：exports，对象，提供模块接口
 * 模块：   module，对象
 */
define({ foo: 'bar' });
/**
 * umd(Universal Module Definition)：通用模块定义
 */
/**
 * es6 module
 * import
 * export (default)
 */
```

## https://codesandbox.io/s/pjqnl16lm7?file=/src/ProfilePageFunction.js在线写代码

## js 中的比较

- `==：`纯在隐式类型转换，引用对象也是值比较
- `===：`没有类型转换，类型不同直接返回 fasle，引用对象也是值比较
- `Object.is：`类似==，但是没有类型转换，与===不同，Object.is 对数字-0 和+0 返回 false，Number.NaN 和 NaN 返回 true

## 关于 js 中的深拷贝和浅拷贝

```js
/***
 * libs：immutable.js
 * 深拷贝几种方式：
 *  1、JSON.stringfy()和JSON.parse()，纯数据，会丢失方法
 *  2、递归拷贝，lodash.cloneDeep()
 *  3、Object.assign()一层深拷贝，属性对象还是浅拷贝
 *
 * lodash：
 *      防抖动：debounce，
 *              概念：对于短时间内连续触发的事件（例如滚动事件），防抖的含义就是，在某个事件内，事件处理函数只执行一次
 *              效果：在指定delay时间内大量触发同一事件，只会执行最后一次
 *              实现：setTimeout
 *              遗留问题：一直抖动一直不执行，可以改进
 *      节流：throttle，
 *              概念：在一定时间内，只执行一次，可以说是对防抖的改进，防止一直抖动一直不执行的问题
 */
function debounce(fn, delay) {
  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(fn, delay);
  };
}
function throttle(fn, delay) {
  let run = true; // 是否可以执行
  return function () {
    if (!run) {
      return;
    }
    run = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      run = true;
    }, delay);
  };
}
```

## 关于 script 动态加载:https://www.cnblogs.com/rubylouvre/archive/2011/02/12/1952160.html

```js
/**
 * 加载外部js文件时，可以注册script.onload监听文件是否加载完成、解析执行完成
 * 注册script.onerror可以监听外部js文件资源请求失败场景
 * 注册window.onerror可以监听所有js抛出的异常，包括外部js文件，js加载失败不会触发window.onerror
 * 如果外部js抛出异常，window.onerror会在script.onload事件之前触发
 *
 *
 *
 * window.onerror = function(err, url, l)：用来捕捉js全局异常
 * script的onerror事件，IE6-8和opera11都不支持，可以使用setTimeout使用异步操作
 * script支持onload和onerror事件，加载失败重试场景
 * onload：资源加载完成，且加载的js执行之后触发onload事件
 * onerror：资源请求失败后执行
 * JSONP的 回调函数总是在script的onload事件（IE的onreadystatechange）之前就被调用，因此在回调执行之时，为script标签增加一个属性，然后等到onload发生的时候，检查有没有这个属性，来以此判定是否请求成功
 */
```

## 术语

```
    1、表达式上下文(expression context)
    2、语句上下文(statement context)
    3、执行上下文(execution context)
    4、活动对象(activation object)
    5、匿名函数(拉姆达函数，anonymous function)
```

## 关于数据存储位数

```
    1、ECMAScript中的所有数据都以IEEE-754 64位格式存储，但位操作符并不直接操作64位的值。而是先将64位的值转为32位的整数，然后执行。再将结果装换成64位的。
    2、移位操作：左移（空位补0）、有符号右移（空位补符号位）、无符号右移（都当做无符号数处理，空位补0，也可以理解为符号位）
    3、表达式中的{}和语句中的{}意义不同，前者（表达式上下文，expression context）表示字面量的开始或表达式的开始，后者（语句上下文，statement context）表示语句块
    4、访问对象属性的方法有两种：1、点表示法2、中括号表示法
```

## 关于 new 操作符

```
    1、创建一个新对象
    2、将构造函数的作用域赋给新对象（因此this指向这个对象，且该对象的constructor指向函数，
    this.__proto__即新对象的__proto__和构造函数的prototype一样）
    3、执行构造函数中的代码
    4、返回新对象
```

## 关于 instanceof 运算符

```
    语义：检测构造函数的prototype是否存在于实例上的原型链中
    原理：constructor.prototype和instance.__proto__
    作用域：instanceof操作符假定只有一个全局执行环境，存在两个时返回结果就不能保证了
    代码：
        function instanceof(ins, con) {
            let _proto = ins.__proto__;
            let proto = con.prototype;
            let result = false;
            while(_proto && !result) {
                result = _proto === proto;
                _proto = _proto.__proto__;
            }

            return result;
        }
```

## 函数类型

- arguments

```

```

- 关于 apply、call 和 bind

```
    apply(thisArg, argsArray):修改函数的this指针为thisArg，且以argsArray为参数调用函数
        function getGlobal() {
            return this;
        }
        Function.prototype.mockApply = function(target, paramList) {
            if (typeof this !== 'function') {
                throw new TypeError("调用者不是函数");
            }
            if (!target || !(target instanceof Object)) {
                let origin = target;
                target = getGlobal();
                target['origin'] = origin;
            }
            if (!paramList) {
                paramList = [];
            }
            if (!Array.isArray(paramList)) {
                throw new TypeError('参数不是数据');
            }
            let args = [];
            for (let i = 0; i < paramList.length; i++) {
                args.push(paramList[i]);
            }

            target['fn'] = this;
            let result = eval('target.fn(' + args.join() + ')');
            delete target.fn;
            return result;
        }
    call(thisArg, arg1,arg2,...):修改函数的this指针为thisArg，且以arg1，arg2，arg3，...为参数调用函数
    bind(thisArg[,arg1[,arg2[,...]]]):创建一个新函数且this指针指向thisArg参数，其余参数是新函数的参数
```

- 闭包：是指有权访问另一个函数作用域中的变量的函数

```

```

## [Promise:用于表示一个异步操作的最终状态及其结果值](https://promisesaplus.com)

- 构造函数：Promise(executor)，executor 在 Promise 返回之前被同步调用，executor 内部会执行一些异步操作，根据异步操作的结果调用 resolve 或者 reject 确定 Promise 的状态
- Promise.all(iterable)
- Promise.race(iterable)：封装实现 fetch 的超时机制
- Promise.reject(reason)
- Promise.resolve(value)
- Promise.prototype.catch(onRejected)
- Promise.prototype.then(onFulfilled, onRejected)
- Promise.prototype.finally(onFinally)

```

```

# css

## background

```js
/*
        background: 简写，定义元素背景属性，包括color、image、origin、size、repeat。
            可以指定多背景层,元素的背景占据了元素的全部尺寸，包括内边距和边框，但不包括外边距
        1、backgroun-color: 背景颜色
        2、background-clip: 规定背景的绘制区域，[content-box, padding-box, border-box]

        3、background-image: 属性用于为一个元素设置一个或者多个背景图像,支持渐变函数 url()
        4、background-origin: 背景图片的定位区域，[padding-box, border-box, content-box]
        5、background-position: 背景图片的起始位置，背景图像如果要重复，将从这一点开始，[关键字和百分比值]
        6、background-size: 背景图像的尺寸，[length, percentage, cover(可能展示不全), contain]
        7、background-repeat: 设置是否及如何重复背景图
        8、background-attachment: 如何设置固定的背景图，[scroll, fixed, inherit]
        9、background-blend-mode: 定义每个背景层（颜色和/或图像）的混合模式, []
    */
```

## flex

```
    space-between：最左最右元素贴着容器，元素之间间距相等，|AXXBXXC|
    space-around：所有元素左右间距相等，即|XXAXXXXBXXXXCXX|
    space-evenly：容器和所有元素之间间距相等，即|XXAXXBXXCXX|
```

## 计算机图形学中的坐标系

- `建模坐标系：`模型自身的坐标系
- `世界坐标系（用户坐标系）：`绘制所有模型的坐标系
- `观察者坐标系（视点、摄像机坐标系）：`从观察者角度对世界坐标系内的对象重新定位和描述的坐标系

## css 动画属性

```
    1、animation：用来指定一组或多组动画，每组之间用逗号隔开。
        1-1：animation-name：指定的keyframes的名字
        1-2：animation-duration：动画持续时间
        1-3：animation-timing-function：动画的变化速度曲线
        1-4：animation-delay：延迟多久执行动画
        1-5：animation-iteration-count：默认为1，动画循环次数，infinite无限循环
        1-6：animation-direction：动画播放方向
        1-7：animation-play-state：对动画进行暂停操作
        1-8：animation-fill-mode：在动画开始之前和之后属性的应用值（动画间隙如何填充？？？）
        1-9：animation：1-8属性的简写形式
    关键点：
        1、动画包括两个部分:描述动画的样式规则（animation）和用于指定动画开始、结束以及中间点样式的关键帧（@keyframes）
    2、transition
        2-1：transition-proterty：对当前元素的某个属性进行动画效果
        2-2：transition-duration：动画持续时间
        2-3：transition-delay：动画延迟多久进行
        2-4：transition-timing-function：动画速度函数
        2-5：transition：1-4属性的简写形式
    3、animation和transition对比
        3.1：transition只能指定单个css属性；@keyframes可以指定多个css属性
        3.2：transition只有两个状态，beigin和end；@keyframes可以有多个状态，begin、middle、middle、……、end
        3.3：transition只能变化一次；@keyframes可以无限循环
```

## 2D/3D 变化属性（好文章：http://acgtofe.com/posts/2013/09/css-3d-transform）

（flash、canvas、WebGL、WebVR）
https://3dtransforms.desandro.com/
https://3dtransforms.desandro.com/carousel

```
为一个元素指定perspective属性，就可以使它的子元素共享同一个透视变化。但是，如果不创建三维渲染上下文，只有指定了perspective的元素的直接子元素，可以产生透视变化。而要使更深层级的子元素，也共享同一个透视变化，则需要使用transform-style。位于同一个三维渲染上下文的元素，它们的透视变化都是相同的，灭点也相同，就好像它们都位于同一个三维空间内。

在没有这个三维渲染上下文时（也就是不设置transform-style），三维变换的元素也是可以看到三维效果的（单独使用perspective）。但是，这时候的三维变换其实只是一种绘制效果（painting effect），就像二维变换那样。我们知道，在网页中，元素之间的覆盖关系取决于绘制顺序，绘制顺序靠后的元素将显示在前面。更专业一点说，是网页中的堆叠上下文（stacking context，详细见Elaborate description of Stacking Contexts）。常用的z-index属性，也是控制元素的堆叠上下文。

   1、transform:
    取值：
        <!-- 变换矩阵 -->
        matrix(n,n,n,n,n,n)
        matrix3d(n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n)
        <!-- 平移 -->
        translate(x,y)
        translate3d(x,y,z)
        translateX(x)
        translateY(x)
        translateZ(x)
        <!-- 缩放 -->
        scale(x,y?)
        scale3d(x,y,z)
        scaleX(x)
        scaleY(y)
        scaleZ(z)
        <!-- 旋转 -->
        rotate(x,y,z,angle)
        rotateX(angle)
        rotateY(angle)
        rotateZ(angle)
        <!-- 倾斜 -->
        skew(x-angle,y-angle)
        skewX(angle)
        skewY(angle)
        <!-- 透视 -->
        perspective(n)
   2、transform-origin: x-axis y-axis z-axis，更改元素变形的原点。默认是元素中心
        translate中的百分比锚点是元素的宽和高
   3、transform-style：指定当前元素的子元素位于3D空间还是2D平面（https://zhuanlan.zhihu.com/p/23873085）
   The transform-style CSS property determines if the children of the element are positioned in the 3D-space or are flattened in the plane of the element. If flattened, the children will not exist on their own in the 3D-space. As this property is not inherited, it must be set for all non-leaf descendants of the element.

   4、transform-box：实验属性
   5、perspective：透视点（视点、Camera）到屏幕（画纸、镜头，就是图像最终所在的平面）的距离
   6、perspective-origin：透视点（视点，Camera）的位置，MDN说是消失点似乎不太准确
   7、backface-visibility：指定当元素背面朝向观察者时是否可见（加元素本身上）
   css3D，和绘画如出一辙，自己虚拟除了Z轴，利用透视学在二位平面模拟三维空间
   webgl，则确确实实存在Z轴，这是两者明显的区别
   对比webgl：
    5和6属性，相当于设定了Camera的位置和到屏幕的距离
    3属性，默认是flat，扁平化即二位空间，设置3d则激活了当前元素的三维空间属性
    1,2和7则是对元素的处理

```

- `3D渲染上下文（3D rendering context）`

```js
/**
 * 1、为元素添加translate-style: preserve-3d属性，创建3D上下文
 * 2、
 */
```

[参考资料](https://www.oxxostudio.tw/articles/201506/css-3d.html)

# webapi

## Event: 表示在 DOM 中出现的事件

### 属性

- `boolean bubbles：`只读，表示事件是否会在 DOM 中冒泡。一些特定的事件类型会冒泡.这时,该事件对象的 bubbles 属性为 true. 你可以检查该属性的值来判断一个事件对象是否冒泡.
- `boolean cancelBubble：`Event.stopPropagation()的别名。在事件处理器函数返回之前，将此属性的值设为 true，也可以组织事件继续冒泡
- `boolean cancelable：`表示事件是否可以取消
- `boolean composed：`
- `currentTarget：`
- `boolean defaultPrevented：`
- `target：`对事件原始目标的引用，指最初派发（dispatch）事件时指定的目标
- `type：`
- `isTrusted：`

### 方法

- `createEvent()`
- `composedPath()`
- `preventDefault()`
- `stopPropagation()：`停止冒泡，阻止事件在 DOM 中继续冒泡
- `stopImmediatePropagation()：`
- ``
- ``

## XMLHttpRequest

## Fetch

## 二进制文件

- Blob：表示一个不可变、原始数据的类文件对象，构造函数函数是 Blob()

```
    属性：
        size：对象包含数据大小，单位字节
        type：表示Blob表示数据的MIME类型。如果类型位置，该字段为空
    方法：
        Blob.slice(start, end, contentType),返回一个新的Blob对象，截断内容
        Blob.stream()返回一个ReadableStream对象
        Blob.text()返回一个promise且包含所有内容的utf8格式的USVString
        Blob.arrayBuffer()返回一个promise且包含所有内容的二进制格式的ArrayBuffer
    读取Blob内容的方法：
        1、FileReader：可以把Blob读取成字符串或者数据URL
        2、Response
注：MIME即媒体类型，是一种标准，表示文档、文件或字节流的性质和格式。
[MIME类型](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types)
```

- File：基于 Blob，继承了 Blob 的功能并将其扩展支持用户系统上的文件，构造函数是 File()

```
    属性：
        lastModified：最后修改时间，UNIX时间起始值（1970年1月1日00:00:00 UTC）
        lastModifiedDate：Date对象
        name：文件名
        size：文件大小
        webkitRelativePath：文件的path或URL
        type：MIME类型
    方法：
        无，但是继承了Blob的方法
```

- FileReader：能处理 Blob 和 File,该对像允许 web 应用异步读取存储在用户计算机上的文件，构造函数 FileReader()，继承于 EventTarget

```
    属性：
        error：DOMException，表示在读取文件时发生的错误
        readyState：EMPTY(0表示没有加载数据；LOADING(1)表示正在加载数据;DONE(2)已完成全部读取请求
        result：文件的内容，该属性仅在操作完成后才有效
    事件处理：
        onabort：读取操作被中断，触发
        onerror：读取操作出错，触发
        onload：读取操作完成，触发
        onloadstart：读取操作开始，触发
        onloadend：读取结束（无论成功失败），触发
        onprogress：读取过程中触发
    方法：
        abort：终止读取操作
        readAsArrayBuffer：result是一个ArrayBuffer对象
        readAsBinaryString：result是原始二进制字符床
        readAsDataURL：result属性中将包含一个data: URL格式的Base64字符串以表示所读取文件的内容
        readAsText：result属性中将包含一个字符串以表示所读取的文件内容
```

- URL.createObjectURL()：能处理 Blob 和 File
- createImageBitmap()：能处理 Blob 和 File
- XMLHttpRequest.send()：能处理 Blob 和 File
- FormData：接口提供了一种表示表单数据的键值对的构造方式，经过它的数据可以使用 XMLHttpRequest.send() 方法送出

```
    方法：
        append(name, value, filename?)：新增
        delete(name)：删除
        entries()：
        get(name)：
        getAll(name)：
        has(name)：
        keys()：
        set(name, value, filename)：
        values()：
```

# RFC5890 涉及的术语

- `text`
- `letter`
- `digit`
- `symbol`
- `name(Net,Host,Gateway, or Domain name)`就是一个由字母（A-Z），数字（0-9），减号线（连字符，中划线）和英文句号（.）组成的不超过 24 个字符的字符串。注意，英文句号仅用于界定域名的标签，名字中不允许存在空格和空白，不区分大小写，必须以字母开头，不能以连字符或英文句号为结尾。[rfc952](https://tools.ietf.org/html/rfc952)
- `domain style name(structured name)结构化名字是网络发展的结果：`结构化的名字中的每一部分（each element）都严格准守上一条名字的规范，结构化名字的每一部分（element or component）从左到右书写，每一部分都是用英文句号(.)隔开，例如：USC-ISTF.ARPA [rfc921](https://tools.ietf.org/html/rfc921)
- `LDH code point`: LDH 代码点是指 ASCII 中的字符，数字，连字符对应的编码值。`LDH`是 ASCII 字符，数字和连字符（中划线）的缩写
- `Label`: 就是域名（domain name）组成的独立组件。标签（labels）经常使用"."分割，例如，域名www.example.com是由三个标签组成："www","example","com"
- `LDH labels:`LDH labels 是由 ASCII 字母，数字，中划线组成的不超过 63 字节的字符串（最多 63 个字符），且字符串首尾不能是中划线，LDH labels 包括 A-label 等
- `R-LDH labels:`IDNA 创建的 LDH 的子集
- `NR-LDH labels:`IDNA 创建的 LDH 的子集
- `A-label:`
- `U-label:`
- `set-cookie：`[domain attribute](https://tools.ietf.org/html/rfc6265#section-4.1.1)

```
    4.1.2.3 domain attribute
    domain sttribute知名了哪些域名会被发送cookie。如果domain attribute是example.com，则UA在向example.com和www.example.com发送请求时都会带上cookie（注意：如果domain attribute的值最前面有点"."，UA会忽略这个点；但是如果最后有一个点"."，会导致UA忽略domain attribute这个属性）

```

# 关于 cookie 是 http 协议的一部分（所以使用的是 rfc6265 文档）

- 关于域名的前置点，没有前置点，只匹配当前域名；有前置点，则匹配当前域名和所有子域名

```
    UA,user agent,用户代理，没有特别说明意思相同
```

- user agent 相关的 cookie 的属性，[rfc6265 第 5.3 节](https://tools.ietf.org/html/rfc6265#section-5)

```
    1、name：由cookie正文指定
    2、value：由cookie正文指定
    3、expiry-time：由cookie中的expires和max-age产生
    4、domain：由cookie中的domain指定
    5、path：由cookie中的path指定
    6、creation-time：useragent自行获取

    7、last-access-time：useragent自行获取
    8、persistent-flag：在expiry-time未知为true，否者为false，标识是session cookie
    9、host-only-flag：在cookie中不包含domain或domain属性为空，或者domain不合法（不等于页面url的domain，也不是页面domain的大域）时为true，此时我们把这个cookie称之hostonly cookie。
    10、secure-only-flag：在cookie中包含secure属性为true，标识仅在https环境使用这个cookie；、
    11、http-only-flag：在cookie中包含httponly属性时为true，标识cookie不允许js操作；否者为false
```

- 设置 cookie 的方式[cookie 前置点讨论](https://stackoverflow.com/questions/9618217/what-does-the-dot-prefix-in-the-cookie-domain-mean)

```
    1、set-cookie[rfc6265第5.2节](https://tools.ietf.org/html/rfc6265#section-5)
        1-1：name
        1-2：value
        1-3：domain
        1-4：path
        1-5：expires
        1-6：max-age
        1-7：secure
        1-8：httponly
    2、document.cookie
        2-1：name
        2-2：value
        2-3：domain
        2-4：path
        2-5：expires
        2-6：max-age
        2-7：secure
```

- cookie 中的域问题[参考资料](https://imququ.com/post/host-only-cookie.html)

```
获取cookie时，首先是domain匹配，然后是path，secure，httponly，name等属性
如果host-only-flag为true，只有当前域名与cookie的domain属性完全相同才可以进入后续流程。
如果host-only-flag为false，符合域规则（domain-matches）的域名都可以进入后续流程。
Demo：
    monkey.com   www.monkey.com，monkey.com下的cookie访问规则：
    当host-only-flag为true，www.monkey.com访问不了monkey.com的cookie
    当host-only-flag为false，www.monkey.com能够访问monkey.com的cookie
```

- Conversion operations
- rfc5.1.2 canonicalized host name

```
    规范化的域名是按照如下的算法生成的字符串：
    1、将域名转换成单个的域名标签序列
    2、
```

- rfc5.1.3 domain matching

```
    5.1.3 域名匹配
    如果符合以下两种场景，given string就会匹配cookie domain string：
    1、given string和cookie domain string完全相同。注意：given string和cookie domain string都要格式为小写字符
    2、以下场景都符合的条件进行匹配：
        2-1：cookie domain string是given string的后缀（换句话说，cookie domain string是given string的根域（大域））
        2-2：cookie domain string最后的点号"."是在做domain match的时候会被去掉
        2-3：given string是域名，不能是ip

```

- rfc5.1.4 Paths and Path-Match

```

```

- rfc5.3 Storage Model(备注：关于点的问题，需要细读 rfc5.1.2 以及其它)

```
    5.3 UA存储cookie的模型
        UA会存储cookie的一下字段：name，value，expiry-time，domain，path，creation-time，last-access-time，persistent-flag，host-only-flag，secure-only-flag，http-only-flag共计11个字段。
        UA接收到request-url带过来的包含cookie名，cookie值，cookie属性的cookie时，必须按照一下算法流程处理cookie：
        步骤1：判断UA是否需要处理cookie，不需要时直接忽略该cookie。例如，UA设置阻止接收第三方响应设置的cookie或者cookie超出了限制大小。
        步骤2：使用cookie名和cookie值创建一个新cookie，并使用当前日期和时间设置creation-time和last-access-time属性。
        步骤3：如果cookie属性列表包含Max-Age属性，设置cookie的persistent-falg为true，用cookie属性列表中的最后一个Max-Age的值设置cookie的expiry-time值；否者如果cookie属性列表中包含Expires而不包含Max-Age，设置cookie的persistent-flag为true，用cookie属性列表中的最后一个Expires的值设置cookie的expiry-time值；否者，设置persistent-flag为false，用最新日期设置expiry-time的值（实测是session cookie）
        步骤4：如果cookie属性列表包含domain属性，用属性列表中的最后一个domain的属性值设置cookie的domain值；否者，domain属性为空字符串
        步骤5：如果ua配置了拒绝接受"public suffixes"，且domain属性是一个public suffixes，如果domain属性值和***规范化***的请求域名完全一样，设置domain为空字符串，否者忽略接收的cookie并终止操作（public suffixes详见规范描述）
        步骤6：如果domain属性非空，如果***规范化***的请求域名和domain不匹配，忽略cookie且终止操作；否者，设置cookie的host-only-flag为false，用domain属性值设置cookie的domain；如果domain属性为空，设置host-only-flag属性为true，使用***规范化***的请求域名设置cookie的domain
        步骤7：
        步骤8：
        步骤9：
        步骤10：如果UA接收到了non-HTTP API的cookie，而且cookie的http-only-flag属性已经被设置为true，则终止操作并完全忽略掉cookie（进一步确认non-HTTP）

        步骤11：当创建新cookie时，如果cookie存储器已经存在了一个同名，同域，同路径的cookie时，按一下步骤处理：
            11-1：让旧cookie和新cookie同时存在，且同名同域同path（）
            11-2：如果cookie来自non-HTTP api而且旧cookie的http-only-flag为true，则终止操作并删除新创建的cookie
            11-3：将新cookie的creation-time更新成旧cookie的creation-time（待补充）
            11-4：删除旧的cookie
        步骤12：将新cookie插入cookie storage中
```

# 关于项目技术栈：直接使用 create-react-app 创建 typescript 项目

- react：UI 框架
- react-router：路由
- react-redux：将 react 和 redux 联系起来
- redux：状态管理
- redux-thunk：异步 action 处理
- redux-logger：redux 中的 log
- typescript：引入类型识别，（awesome-typescript-loader 和 ts-loader）
- sass：css 新技术
- react-loadable：动态加载
- babel：支持最新的 js 语法

# chrome devtolls

## performance

- 涉及的事件
  event|interface|targets|description
  ---|:--:|:--:|:---
  `beforeunload`|BeforeUnloadEvent|`Window`|Fired at the Window when the page is about to be unloaded, in case the page would like to show a warning prompt
  `pagehide`|PageTransitionEvent|`Window`|Fired at the Window when the page's entry in the session history stops being the current entry
  `pageshow`|PageTransitionEvent|`Window`|Fired at the Window when the page's entry in the session history becomes the current entry
  `visibilitychange`|Event|`Document`|浏览器标签页被隐藏或显示的时候会触发 visibilitychange 事件
  `webkitvisibilitychange`|
  `load`|Event|`Window、Elements`|Fired at the Window when the document has finished loading; fired at an element containing a resource (e.g. img, embed) when its resource has finished loading
  `unload`|Event|`Window`|Fired at the Window object when the page is going away
  `readystatechange`|Event|`Document`|Fired at the Document when it finishes parsing and again when all its subresources have finished loading
  `DOMContentLoaded`|Event|`Document`|Fired at the Document once the parser has finished
- 涉及事件触发顺序

```
    说明:
        document.readyState属性描述了文档的加载状态，该值的变化会触发readystatechange事件：
        loading：document正在加载
        interactive：文档已被解析完成，资源仍在加载，触发DOMContentLoaded事件
        complete：文档和所有的资源加载完成，触发load事件
    进入页面：
    1、readystatechange: document.readyState=interactive(触发DOMContentLoaded)
    2、DOMContentLoaded
    3、readystatechange: document.readyState=complete(触发load)
    4、load（window上的load事件）
    5、pageshow（persisted标识是否来自缓存）
    离开页面
    6、离开页面时
        6-1、beforeunload(Window)
        6-2、pagehide(Window)
        6-3、visibilitychange(document，会反复触发，比如tab切换窗口)
        6-3、unload(parent frame unload will happen before child frame unload )

    Demo：
    <script>
    document.addEventListener('readystatechange', () => {
        console.log(`document.readystatechange:${document.readyState}`);
    });
    document.addEventListener('DOMContentLoaded', () => {
        console.log("document.DOMContentLoaded");
    });
    document.addEventListener('visibilitychange', () => {
        console.log('document.visibilitychange');
    })
    window.addEventListener('load', () => {
        console.log("event: window.load");
    });
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            console.log("window.pageshow:", event.persisted);
        }
        else {
            console.log("window.pageshow:", event.persisted);
        }
    });
    window.addEventListener('beforeunload', () => {
        console.log("window.beforeunload:");
    })
    window.addEventListener('pagehide', (event) => {
        if (event.persisted) {
            console.log("window.pagehide:", event.persisted);
        }
        else {
            console.log("window.pagehide:", event.persisted);
        }
    });
    window.addEventListener('unload', () => {
        console.log('window.unload');
    })
</script>
```

# 关于浏览器的 back forward cache：Firefox 1.5 对整个 web 页面的一个浏览器会话进行了内存缓存，包括他们对 JavaScript 状态。在访问过的页面间后退和前进不需要页面加载同时保存 JavaScript 状态。这个特性，被称为 bfcache（“后退前进缓存”）

- `问题描述`：地址中间页 back 后做了判断逻辑，结果页面无反应
- `问题原因`：bfcache 技术原因造成
- [关于 bfcache](https://developer.mozilla.org/zh-CN/docs/Mozilla/Firefox/Releases/1.5/Using_Firefox_1.5_caching)
-

# 项目问题描述及其 Demo

1. 关于 UI state 存放在 state 树还是保存在组件中的问题？
2. 使用 immutable 库要解决的问题？代替方案：react 自身的 helper
3. react 组件 shouldComponentUpdate 优化问题

# 抽象出常规开发中关于 state 的设计规范，能快速抽出 UI Domain Model 和 Business Domain Model 的对应关系

- `UI Domain Model：`1、展示数据的 model；2、入参的 model
- `Business Domain Model`: 1、入参；2、出参

# node 的一些知识点

- process.cwd：node 执行命令的目录
- \_\_dirname：执行文件所在的目录
- path：包含文件名
- directory：目录，不包括文件名
  - node fs 模块
    - fs.realpathSync：返回指定路径的绝对路径
  - node path 模块
    - path.resolve：将入参拼接成绝对路径
  - node url 模块
    - url.parse：返回 URL 对象{auth：名字和密码,hash：fragment,host：包括端口在内,hostname：不包括端口,href：完整 url,path：路径和查询字符串,pathname：路径,port：端口,protocol：协议,query：查询字符串,search：？参数,slashed：}
- 配置项：
  - 使用 env.PUBLICK_URL 或 package.homepage 作为静态资源服务的 public path，打包路径，env.PUBLICK_URL > package.homepage > /。必须配置跟路径，不能配置相对路径

# webpack 配置项

1. **Entry：**
2. **Output：**
3. **Loaders：**
4. **Plugins：**
5. **Mode：** {production,development,none}，可以使用 webpack 内置的优化功能
6. BrowserCompatibility：webpack 支持的浏览器

7. **bail：**
8. **devtool：** 指定是否生成 source-map，一级生成的 source-map 的类型
9. **optimization：**
10. **resolve：** 指定 webpack 如何查询模块，去哪里找模块。例如：import loadash from 'loadash';
    - alias：配置 from 后模块的 path。例如：from '../../util/add.js' ===> from 'Util/add.js'
    - modules： 指定 webpack 搜索模块的路径
    - extensions：识别的文件后缀
11. **resolveLoader：** 用于解析 loader 包，配置类似 resolve
12. **module：**
13. **node：**
14. **performence：**

# H5 的 touch

- touchStart
- touchMove
- touchEnd
- touchCancel：touch 监听被中断时，会被触发：touch 期间来电
- 根据跑过的 demo 猜测

```
    1、默认行为是绑定到event上的，所以在任何一个handler中都可以调用e.preventDefault阻止掉
    2、默认行为会根据事件捕获或冒泡中绑定到event？因为阻止了事件的冒泡，但是阻止不了默认行为
```

# 字符集

- 常见字符集：`ASCII`（美国信息互换标准编码，包括控制字符和可显示字符）、`ASCII扩展字符集`（增加了表格符号、计算符号、希腊字母和特殊的拉丁符号）、GB2312（简化汉字等等）、BIG5（台湾繁体中文）、GB18030（中日韩等）、`Unicode`（万国码，使用十六进制，且以 U 开头。例如字母 A：U+）
- 基于 Unicode 的编码方案：`UTF-8`、`UTF-16`、`UTF-32`
- 字形（glyph）：
- 字符集（Charset）：是多个字符的集合，为`字符`确定唯一整数而非`字形`
- 代码点（code point）：字符集为字形分配的一个正整数
- 字符（Character）：是各种文字和符号的总称，包括国家文字、标点符号、图形符号、数字符号，一个字符是指：一个代码点和对应代码点的字形
- javascript 使用 unicode 字符集，使用 UTF-16 编码方案：`fromCharCode`不能处理所有 unicode，可以使用`fromCodePoint`

```
    UCS-2(2-byte Universal Character Set)使用固定的2字节长度进行编码，码元是16位，表示范围是0x0000-0xFFFF，只能表示unicode中的bmp平面
    UTF-16(16-bit Unicode Transformation Format)是对UCS-2的扩展，每一个code point可以使用一个或两个16位码元(代理对，surrogate pair)表示，范围是0x000000到0x10FFFF
```

- 代理对(surrogate pair):

```
    对于utf-16，超出bmp的字符可以使用代理对表示，且只能使用utf-16进行编码，使用2个16位码元，例如0xD834 0xDF06，被称为代理对
    代理对表示的是一个超出bmp的字符
    代理对的第一个码元范围是：0xD800-0xDBFF，称为高位代理（high surrogate or a lead surrogate）
    代理对的第二个码元范围是：0xDC00-0xDFFF，称为低位代理（low surrogate or a trail surrogate）
    UCS-2没有代理对概念，会把代理对当成两个独立的字符
```

- [代理对转换](http://unicode.org/versions/Unicode3.0.0/ch03.pdf)

```
    大于0xFFFF的code point都可以用<H,L>表示
    H = Math.floor((C - 0x10000) / 0x400) + 0xD800
    L = (C - 0x10000) % 0x400 + 0xDC00
    C = (H - 0xD800) * 0x400 + L - 0xDC00 + 0x10000
```

- `码元(code unit)`：编码方案中最小字节，例如：utf8 码元是 8bit，utf16 是 16bit，utf32 是 32bit
- 编码方案：将`码位（Code Point）`转换成`字节序列`（储存或传输）的规则
- `汉文(Han Script):`是汉语、日本语、朝鲜语、韩国语等的书写系统中的文字(script)，越南语中也曾使用汉文
- `汉字（CJK Ideograph，China、Japan、Corea 表意文字）:`是汉文的基本单元（就像字母是英语的基本单元）
- `汉文化圈`中的许多国家或地区都对汉字提出了自己的编码标准，Unicode 将这些标准加在一起进行统一编码，力求实现原标准与 unicode 编码之间的无损转换。Unicode 从语义(semantic)、抽象字形(abstract shape)，具体字形(typeface)三个维度，把不同编码标准里起源相同、本意相同、形状一样或稍异的汉字赋予相同的编码，这些编码的字符称为`中日韩统一表意文字（此处可称为汉字）`
- [js unicode-aware](http://blog.stevenlevithan.com/archives/javascript-regex-and-unicode)
- [javascript 解决 unicode 方案](https://mathiasbynens.be/notes/javascript-unicode#regex)
  [js 中 unicode 参考资料 1](https://mathiasbynens.be/notes/javascript-unicode#regex)
  [js 中 unicode 参考资料 2](https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae)
  [js 中正则匹配 unicode 参考资料](http://blog.stevenlevithan.com/archives/javascript-regex-and-unicode)

# [Unicode](http://www.unicode.org/charts/)

## 术语

```
    古代把独体字叫做文，合体字叫做字，现如今统称文字。
    文字的基本个体叫做字。
    腓尼基字母基本上是所有字母的跟。

    世界上各民族的文字，概括起来有三大类型，即
    表形文字：也称象形文字，是描绘物体的形象，是从图形文字发展出来的，只能表示具体的事物，无法表示抽象概念
    表意文字：是一种图形符号，只代表语素不代表音节，主要是东亚国家，例如汉字、彝文、东巴文、水书等等
    表音文字：是使用少量的字母记录语言中的语音，从而记录语言，世界大多数国家的文字都是表音文字，例如日语假名、拉丁字母、

    近代世界五种重要的文字系统：
        1、汉字：表意文字
        2、拉丁字母(Latin alphabet，罗马字母，Roman alphabet)：表音文字
        3、斯拉夫字母(Slavic，西里尔字母，Cyrillic)：表音文字
        4、阿拉伯字母(Arabic)：表音文字
        5、梵文字母（Sanskrit，印度字母）：表音文字

    世界三大字母系统：
        1、拉丁字母（也称罗马字母，Latin alphabet，Roman ailphabet）：英语，法语等等
        2、斯拉夫字母：俄罗斯语、乌克兰语
        3、阿拉伯字母：0x0600-0x06FF
    script：字系统（包括字母系统和中国文字系统）
    language：语言，不同的语言可以使用相同的字母系统
    writing system：书写系统，包括字系统(script)和符号(symbols)与标点(punctuation)
```

## Unicode 是什么？有谁维护？

```
    Unicode是通用字符编码集，为世界上所有的语言和其它符号进行唯一编码的字符集
    由Unicode Consortium维护
```

## Unicode 涉及范围？

```
    Unicode为世界上所有古老和现代的书写系统包含的符号进行编码，也包括书写系统中使用的technical symbols，punctuations 和other symbols。为各种类型的用户，无论是商人还是学者，无论是主流书写系统还是小众书写系统服务。
```

## Unicode 覆盖了哪些语言？

```

```

## Scripts(语言的字系统，包括字母系统和汉字系统)

```
    1、European Scripts（欧洲字系统）：
    2、African Scripts（非洲字系统）：
    3、South Asian Scripts（南亚字系统）：
    4、Indonesia & Oceania Scripts（印度尼西亚和大洋洲字系统）：
    5、Middle Eastern Scripts（中东字系统）：
    6、East Asian Scripts（东亚字系统）
        6-1：Bopomofo
        6-2：CJK Unified Ideographs (Han)
        6-3：CJK Compatibility Ideographs
        6-4：CJK Radicals / Kangxi Radicals
        6-5：Hangul Jamo
        6-6：Hangul Syllables
        6-7：Hiragana
        6-8：Kana Extended-A
        6-9：Kana Supplement
        6-10：Small Kana Extension
        6-11：Kanbun
        6-12：Katakana
        6-13：Lisu
        6-14：Miao
        6-15：Nushu
        6-16：Tangut
    7、Central Asian Scripts（中亚字系统）：
    8、Southeast Asian Scripts（东南亚字系统）：
    9、American Scripts（美洲字系统）：
    10、Modifier Letters（修饰字母）：
    11、Combining Marks（组合标记）：
    12、Other（其它）：
```

## Symbols and Punctuation（符号和标点符号）

```
    1、Notational Systems（符号系统）
    2、Numbers & Digits（digit：从0到9的任一个数字，number：数字）
    3、Emoji & Pictographs（表情和象形文字）
    4、Specials（特殊符号）
    5、Punctuation（标点符号）
    6、Mathematical Symbols（数学符号）
    7、Alphanumeric Symbols（字母数字符号）
    8、Technical Symbols（技术符号）
    9、Other Symbols（其它符号）
    10、Private Use（私有）
    11、Surrogates（代理）
    12、Noncharacters in Charts（图表中的非字符）
    -------------------------------
    13、Game Symbols（游戏符号）
    14、Yijing Symbols（易经符号）
    15、Noncharacters in blocks（块中的非字符）
    16、Noncharacters at end of ...

```

## [Unicode Character Property](https://www.unicode.org/Public/UCD/latest/ucd/PropertyValueAliases.txt)

[以下翻译资料来自维基百科](https://en.m.wikipedia.org/wiki/Unicode_character_property)

```
    术语：
        line-breaking、newline、line feed: 换行(符)
        carriage return: 回车
        code point: 代码点
        script: (一种语言的)字母系统
        character properties: 字符属性

    unicode标准为每一个代码点(code point)赋了一些字符属性（character properties）。应用程序可以使用这些属性对字符（代码点）进行处理，like in line-breaking， script direction right-to-left or applying controls.稍微不合理的地方是，一些没有指定字符的代码点和标记为"<not a character>"的代码点也有字符属性。字符属性是unicode标准规定的。

    为了规范的简单性，对于拥有相同字符属性的代码点可以直接指定一个范围。
```

- `character name`：一个 unicode 字符会有一个独一无二的名字（name，na），名字由大写字母，数字，连字符（-），空格，组成，符合一定规则，详见维基百科。例如：U+4E00 CJK UNIFIED IDEOGRAPH-4E00.有一些代码点没有 name 属性，例如 Controls(General Category: Cc)，Private use(Co)，Surrogate(Cs)，Non-characters(Cn) and Reversed(Cn)

  2.0 以后，1.0 的名字被定义到 Alias 属性上，便于向后兼容

- `Character name Alias`：2.0 以后，name 属性不允许改变，如果已有的名字不够好，就为 code point 添加一个 Character name Alias 属性，代替 character name
- `General Category`：每一个代码点都有一个 General Category 属性和对应的值。没有指定字符的代码点和标记为"<not a character>"的代码点也有该属性。

```
    一级分类
        letter:
        Mark:
        Number:
        Punctuation:
        Symbol:
        Separator:
        Other:
```

- `Punctuation（标点符号）`：字符具有分隔符属性，表示他们是标点符号。该属性都有一个 YES 或 NO 的值：Dash、Quotation_Mark、Sentence_Terminal、Terminal_Punctuation

```
    Dash: 与连字符（Hyphen）和减号（Minus Sign）不一样，en dash，horizontalbar，em dash
    Quotation mark glyphs Quotation marks in Unicode:各种引号(英文系统："", '', “”,‘’),(中文系统：《》，「」，『』，』」)
    Terminal punctuation:(.?!)
    标点符号（Punctuation）：
        撇号（apostrophe）：用于英文缩写，I'am
        括号（brackets）：[](){}<>
        冒号（colon）：
        逗号（comma）：
        破折号（dash）：en dash短破折号，em dash长破折号
        省略号（ellipsis）：
        感叹号（exclamation mark）：
        句号（full stop，period）：
        书名号（guillemets）：
        连字符（hyphen）：
        连字符减号（hyphen-minus）：
        问号（question marks）：
        分号（semicolon）：
        斜线（slash，solidus，stroke）
    分词符号（Word dividers）：
        间隔号（interpunct）：
        空格（space）：
```

- `Whitespace（空白字符）`：包括 spaces，tabs 和 new line

```
    在12.1中，有25个空白字符
        CHARACTER TABULATION
        LINE FEED
        LINE TABULATION
        FORM FEED
        CARRIAGE RETURN
        SPACE
        NEXT LINE
        NO-BREAK SPACE
        OGHAM SPACE MARK
        EN QUAD
        EM QUAD
        EN SPACE
        EM SPACE
        THREE-PER-EM SPACE
        FOUR-PER-EM SPACE
        FIGURE SPACE
        PUNCTUATION SPACE
        THIN SPACE
        HAIR SPACE
        LINE SEPERATOR
        PARAGPAPH SEPRATOR
        NARROW NOBREAK SPACE
        MEDIUM MATHEMATICAL SPACE
        IDEOGRAPHIC SPACE
```

# node 应用

```js
// node应用调试方法
node debug app.js
node --debug app.js
node --dbu-brk app.js
```

# 数据劫持

- Object.defineProperty
- Proxy and Reflect

```js
// js中的数据就两种：原始类型(undefined、string、number、boolean、Symbol、BigInt)和引用类型（Null、Object）
// 规范中：null意味着no Object value，所以typeof null === 'object'； undefined意味着no value，typeof undefined === 'undefined'；
// Stack(栈)：基本数据（原始类型，primitives）类型存储在Stack中，Stack也会存储引用类型在Heap中的指针（地址）
// Heap(堆)：引用类型存储在Heap中，是真实的数据
// Heap自动分配内存，不会自动释放；Stack自动分配固定内存，会由系统自动释放内存
// object：es5：Object、Array、Function、RegExp、Date；es6：Map、Set、WeakMap、WeakSet；
// es没有的：Dictonary、List、LinkList、DoubleLinkedList、Queue、Stack、Hash
// 数据容器：Map、Set、WeakMap、WeakSet、Object、Array
// 原生Map、Set、WeakMap、WeakSet

// 劫持数据
function hold(data) {
  if (!data || typeof data !== 'object') {
    return;
  }
  if (Array.isArray(data)) {
  } else {
    Object.keys(data).forEach((key) => {
      Object.defineProperty(data, key, {
        configurable: true,
        enumerable: true,
        get: function () {
          // do something
          console.log('get===>', data[key]);
          return data[key];
        },
        set: function (value) {
          // do something
          console.log('set===>', value);
          data[key] = value;
        }
      });
    });
  }
}
```

# IOS 开发证书

- `Apple ID：`Apple Account，苹果官房账户
- `Apple Developer Account：`苹果开发者账户，只有拥有开发者账号，才可以申请开发/发布证书以及相关配置授权文件，才能在 IOS 真机调试

```js
/**
 * 开发者账号分为Individual和Company/Organization两种类型
 */
```

- `App ID:`用于标识一个或一组 App，应该和 XCode 中的 Bundle Identifier 是一致(Explicit)或匹配(Wildcard)

```js
/**
 * Explicit App ID:
 * Wildcard App ID:
 * App Group ID:
 */
```

- `证书Certificate`
- `非对称密码（公私钥）`
- `签名Signature，CodeSign，Verify`
- `(Team) Provisioning Profiles`
- `ios证书`

```js
/**
 * ios证书是用来证明ios app内容的合法性和完整性的数字证书，只有经过签名验证，才能保证来源可信
 * Development证书：用于开发和调试应用程序
 * Production证书：主要用来分发应用程序
 */
```

# Android 开发配置

- `gradle：`类似 Maven 的自动化构建工具，基于 groovy；Maven 基于 xml 配置，繁琐

```js
// 关于gradle目录和下载的配置
/**
 * 每一个使用gradle构建的工程，根目录下都会有一个gradle/wrapper目录，保存着gradle-wrapper.jar和gradle-wrapper.properties文件，这个是wrapper目录，指定了对应的gradle。正常情况下是通过该wrapper下载对应的gradle（Use default gradle wrapper），也可以自己指定目录（use local gradle distribution）
 *
 * gradle-wrapper.properties内容如下：
 *  distributionBase=GRADLE_USER_HOME
 *  distributionPath=wrapper/dists
 *  zipStoreBase=GRADLE_USER_HOME
 *  zipStorePath=wrapper/dists
 *  distributionUrl=https\://services/gradle.org/distributions/gradle-3.1-all.zip
 *
 *  distributionUrl：指定gradle的zip包的下载地址和版本
 *      gradle分三个版本：完整版(all)，二进制版(binary)和源码版(source)，不能编译工程
 *  zip***属性，指定了下载gradle包的位置
 *  distribution**，指定了加压后文件的位置
 */

// *.gradle的关键字：
/**
 * buildscript:
 * allprojects:
 * task:
 * apply: 声明式Android应用还是库模块
 *
 * android闭包，配置项目构建的各种属性
 *  android.compileSdkVersion指定项目编译的SDK版本
 *  android.buildToolsVersion指定构项目建工具的版本
 *  ……
 *
 * dependencies闭包，指定项目的所有依赖关系，本地依赖、库依赖以及远程依赖
 *
 * repositories闭包，指定仓库位置
 */

// 关于项目构建的配置，一般gradle项目会出现2个或以上的build.gradle文件，根目录和app目录下
/**
 * 根目录下的build.gradle
 *
 * buildscript {
 * }
 * allprojects {
 * }
 * task {
 * }
 *
 *
 * app下的build.gradle
 *
 * apply XXX
 * anrdoid {
 * }
 * dependencies {
 * }
 *
 */

/*
        gradle-wrapper插件和gradle版本对应关系：https://blog.csdn.net/snailbaby_soko/article/details/100925461
    */
//    可用的maven仓库
/**
 * maven { url 'https://jitpack.io' }
 * maven {
 *  url "https://plugins.gradle.org/m2/" // gradle插件仓库
 * }
 * maven {
 *  url "https://maven.aliyun.com/nexus/content/groups/public/" // mavencenter镜像
 * }
 * maven {
 *  url "https://maven.aliyun.com/nexus/content/repositories/jcenter/" // jcenter镜像
 * }
 * maven {
 *  url "https://maven.aliyun.com/nexus/content/repositories/google/" // google镜像
 * }
 *
 */
```

## 前端安全问题

- `XSS(Cross Site Scripting)跨站脚本攻击`注入非法的 html 标签或者 javascript 代码，控制用户浏览器的行为

```js
/*
        1、DOM XSS：使用DOM可以允许程序和脚本动态的访问和更新文档的内容、结构和样式。它不需要服务器解析响应的直接参与，触发XSS靠的是浏览器端的DOM解析，可以认为完全是客户端的事情。
        2、反射型XSS：发出请求时，XSS代码出现在URL中，最后输入提交到服务器，服务器解析后在响应内容中出现这段XSS代码，最后浏览器解析执行
        3、存储型XSS：存储型XSS又被称为持久性XSS，它是最危险的一种跨站脚本，相比反射型XSS和DOM型XSS具有更高的隐蔽性，所以危害更大，因为它不需要用户手动触发。 允许用户存储数据的web程序都可能存在存储型XSS漏洞，当攻击者提交一段XSS代码后，被服务器端接收并存储，当所有浏览者访问某个页面时都会被XSS，其中最典型的例子就是留言板。

        只要是用户输入的地方，就存在攻击的入口

        防御：
            1、httpOnly，禁止js脚本读取cookie
            2、对用户输入进行严格的检查，对一些标签进行转译
    */
```

- `CSRF（Cross Site Request Forgeries）跨站点请求伪造`

```js
/*
        危害：利用已认证用户信息，伪造或窃取信息
        防御：
            1、验证码
            2、请求来源限制：RefererCheck
            3、token：使用token机制验证请求是是否合法
    */
```

- `Clickjacking`点击劫持，是指利用透明的按钮或连接做成陷阱，覆盖在 Web 页面之上。然后诱使用户在不知情的情况下，点击那个连接访问内容的一种攻击手段。这种行为又称为界面伪装(UI Redressing)

## 代理工具

- charles
- whistle（http://wproxy.org/whistle/install.html）

## npm 配置 node-sass 二进制源

> npm config set sass_binary_site=https://npm.taobao.org/mirrors/node-sass

# github

## jekyll：将纯文本转化为静态网站和博客

> 只需要 markdown、liquid、html&css 就可以部署静态网站；支持自定义链接、分类、静态页、文章和布局

[jekyll](https://www.jekyll.com.cn/)
[Liquid 模板语言](https://github.com/shopify/liquid/wiki/liquid-for-designers)
[模板变量文档](https://github.com/jekyll/jekyll/wiki)

## github pages：个人或者个人项目的静态网站

- `个人：`https://[username].github.io
  > 以[username].github.io 为仓库名，建立个人网站仓库
- `个人项目：`https://[username].github.com/[project]
  > 通过项目设置，设定项目 github pages 的分支

> 建立默认分支 gh-pages，github 默认 gh-pages 分支作为项目的 GitHub Pages source

> 每一个项目都有一个主页，列出项目的源文件

> 代替项目资源列表，使用户可以自定义项目主页。这就是 github page 功能。github pages 可以被认为是用户编写的、托管在 github 上的静态网页

> gihtub 提供模板，允许站内生成网页，也允许用户自己 编写网页。上传的网页会被 Jekyll 程序再处理

> Jekyll 是一个静态站点生成器，会根据网页源码生成静态文件。本地编写符合 Jekyll 规范的源码，上传到 github，由 github 生成并托管整个网站

> github 规定只有没有父节点的 gh-pages 分支才会生成网页文件

```js
/*
        Demo：
        一、
            mkdir jekyll_demo
            cd jekyll_demo
            git init
            // 创建没有父节点的分支gh-pages
            git checkout --orphan gh-pages
        二、
            根目录创建配置文件_config.yml，jekyll的配置文件
            baseurl: /jekyll_demo
            目录结构：
                /jekyll_demo
                    ------_config.yml
                    ------_layouts
                            ------default.html
                    ------_posts
                            ------2021-02-02-helloworld.html
                    ------index.html
        三、
            创建_layouts目录，用于存放模板文件
            回根目录，创建一个__posts目录，存放文章
            helloworld.html
                ---
                layout: default
                title: 你好，世界
                ---
                <h2>{{page.title}}</h2>
                <p>这是我的第一篇文章</p>
                <p>{{page.date | date_to_string }}</p>
        四、
            创建首页index.html
        五、
            发布内容：git add .
                    git commit -m "first post"
                    git remote add origin https://github.com/TigerWFH/demo.git
                    git push origin gh-pages
        六、
            绑定域名：可以使用github提供的域名，也可以换成自己的域名
            具体方法是在repo的根目录下面，新建一个名为CNAME的文本文件，里面写入你要绑定的域名，比如example.com或者xxx.example.com。

如果绑定的是顶级域名，则DNS要新建一条A记录，指向204.232.175.78。如果绑定的是二级域名，则DNS要新建一条CNAME记录，指向username.github.com（请将username换成你的用户名）。此外，别忘了将_config.yml文件中的baseurl改成根目录"/"。

    */
```

## github actions

- `术语：`
- `CI：`是指持续集成，属于开发人员的自动化流程。成功的 CI 意味着：应用代码的新更改会定期构建、测试并合并到共享存储中。该解决方案可以解决在一次开发中有太多应用分支，从而导致相互冲突的问题。
- `CD：`是指持续交付或持续部署。持续交付通常是指开发人员对应用的更改会自动进行错误测试并上传到存储库（如 GitHub 或容器注册表），然后由运维团队将其部署到实时生产环境中。这旨在解决开发和运维团队之间可见性及沟通较差的问题
- `github访问敏感数据：`

```js
/*
        runner：github分配用来执行CI/CD的构建服务器（也可以自建runner）
        workflow(工作流): 持续集成部署的过程。CI/CD的工作流
        job(任务): 比如构建、测试和部署。每个workflow由多个job构成
        step(步骤): 每个job由多个step组成
        action(动作): 每个step可以依次执行一个或多个action
        github actions的配置文件是：workflow文件，存放在代码仓库的.github/workflows目录
        workflow文件采用YAML格式，文件名人气，后缀是.yml，一个库可以有多个workflow文件。github只要发现.github/workflows目录中的.yml文件，就会自动运行该文件

        *.yml文件：
            name: Github Actions Demo               // workflow的名称
            on: push || [push, pull_request]        // 指定触发workflow的条件，通常是某些事件
    */
```

## 关于 babel 和 typescript(https://github.com/wessberg/rollup-plugin-ts#using-it-with-just-typescript)

### 为什么不单独使用 typescript 或 babel？

- `typescript只能编译到特定的ecmascript版本，即target属性`，但是浏览器和其它 runtime 已经支持了很多新语言特性（既有 es5 特性，也有 es6 特性）。typescript 是"all-or-nothing"模式，要想用 typescript 编译，你只能等到 runtime 全部支持某个 ecmascript 才行
- `babel的设计更加颗粒状化，能够基于一条一条的特性进行语法转换。`使用@babel/preset-env 可以仅为 runtime 未为支持的特性进行转换，而不必转换已经支持的特性
- `Babel已经有了支持typescript的插件（https://babeljs.io/docs/en/babel-plugin-transform-typescript）：`这使得仅仅使用 babel 称为可能，但也需要注意一些问题

```js
/*
        问题：
            1、Babel compiler工作模式是 file-by-file，意味着babel只能使用和reason about文件。然而typescript则是读取到源文件，能够更好地处理处理代码和处理代码类型比babel。也是rollup-plugin-ts实现的根基，该插件做了@babel/babel-plugin-typescript没有做的一些事情
                1-1：输出typescript diagnostics
                1-2：输出typescript声明文件以及声明map文件
                1-3：Remove type-only imports that wouldn't otherwise be transformed by Rollup and would lead to issues like this one
                1-4：Use const enums and all other files that will require type information
    */
```

### When combined with Babel, what does TypeScript do, and what does Babel do?

- `what does TypeScript do?`

```js
/*
        1、上报typescript diagnostics
        2、输出声明文件和输出声明map文件
        3、移除typescript特有的特性，比如类型、类型导入、枚举量、装饰器
    */
```

- `what does Babel do?`剩下的都是 babel 的事情了。
- `rollup-plugin-ts：`默认包含@babel/plugin-transform-runtime 和 tslib 的原因？(https://github.com/wessberg/rollup-plugin-ts/blob/master/documentation/explainer/why_is_babel-plugin-transform-runtime_and_tslib_included_by_default.md)

```js
/*
        重点：
        That's unfortunate. @babel/plugin-transform-runtime and tslib enables you to move reference these helpers via import statements such that they can be shared across files and code split correctly
    */
```

```js
/*
    Does this plugin work with Code Splitting?
Absolutely, even with Declaration files. Things will work seamlessly.

Why wouldn't you use just TypeScript?
The TypeScript compiler, while extremely powerful, has the restriction that it can only target a specific ECMAScript version. In reality, browsers and other ECMAScript environments has varying support for newer language features. Some browsers support even those features that haven't been publicized yet, while others support only parts of the latest language features.

In effect, a browser may support a lot of modern features such as classes and proper lexical scoping, but lack others. With TypeScript, it's "all-or-nothing": If you want to support a Browser with partial support, you must target the latest publicized ECMAScript version that the browser fully supports.

Babel, on the other hand, is far more granular in its design and applies syntax transformations on a feature-by-feature basis. Combined with something like @babel/preset-env, individual transformations can be applied for only those language features that are missing. This means that you can use things like classes and lexical scoping in browsers that otherwise doesn't fully support all of the ES2015 specification.

Okay, then why wouldn't you use just babel?
Babel has recently received support for parsing and transforming TypeScript. It would be intriguing to just use Babel for everything. However, there are significant caveats:

The Babel compiler works on a file-by-file basis, meaning it is simple to use and reason about, whereas the TypeScript compiler works with Programs, or in other words sets of related SourceFiles. This gives TypeScript the advantage over Babel that it has a greater understanding of your codebase in general and can understand your types across files. In the context of this plugin, this enables TypeScript to do things that you simply wouldn't be able to do with the TypeScript plugin for Babel:

Emit TypeScript diagnostics
Emit TypeScript declaration (.d.ts) files and TypeScript declaration map (.d.ts.map) files.
Remove type-only imports that wouldn't otherwise be transformed by Rollup and would lead to issues like this one
Use const enums and all other files that will require type information.
When combined with Babel, what does TypeScript do, and what does Babel do?
First, TypeScript will be used for:

Reporting diagnostics.
Emitting TypeScript declaration (.d.ts) files and TypeScript declaration map (.d.ts.map) files.
Removing TypeScript-specific features such as types, type-only imports, enums, and TypeScript decorators.
Babel will then be used for all other syntax transformation from then on, depending on the combination of default, provided, and forced presets and plugins.

Why is @babel/plugin-transform-runtime and tslib included by default?
*/
```

<!-- first -->

```json
// package.json
{
  "name": "my-library",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "build": "rollup -c",
    "watch": "rollup -c --watch"
  },
  "devDependencies": {
    "rollup": "^2.21.0",
    "typescript": "^3.9.6",
    "@wessberg/rollup-plugin-ts": "^1.2.28"
  },
  "main": "dist/cjs/index.js",
  "module": "dist/esm/index.js",
  "types": "dist/esm/index.d.ts"
}
```

```js
// rollup.config.js
import ts from '@wessberg/rollup-plugin-ts';
import pkg from './package.json';
import { builtinModules } from 'module';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true
    }
  ],
  plugins: [ts()],
  external: [
    ...builtinModules,
    ...(pkg.dependencies == null ? [] : Object.keys(pkg.dependencies)),
    ...(pkg.devDependencies == null ? [] : Object.keys(pkg.devDependencies)),
    ...(pkg.peerDependencies == null ? [] : Object.keys(pkg.peerDependencies))
  ]
};
```

```json
// tsconfig.json
{
  "include": ["src/**/*.*"],
  "compilerOptions": {
    "strict": true,
    "target": "es2017",
    "module": "esnext",
    "declaration": true,
    "lib": [
      "es5",
      "es2015",
      "es2016",
      "es2017",
      "es2018",
      "es2019",
      "es2020",
      "esnext"
    ],
    "alwaysStrict": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true
  }
}
```

<!-- second -->

```json
// package.json
{
  "name": "my-library",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "build": "rollup -c",
    "watch": "rollup -c --watch"
  },
  "devDependencies": {
    "rollup": "^2.21.0",
    "typescript": "^3.9.6",
    "@wessberg/rollup-plugin-ts": "^1.2.28"
  },
  "main": "dist/cjs/index.js",
  "module": "dist/esm/index.js",
  "types": "dist/esm/index.d.ts"
}
```

```js
// rollup.config.js
```

## babel-plugin-import 按需加载库目录结构设置：

```js
/**
 * framework模块入口js
 * 由于framework模块使用了babel-plugin-import(按需打包)
 * 请确保export公布的模块名称，与模块的文件名保持一致，
 * 例如:
 *   import Network from './network'
 *   Network与 './network'的文件名一致不区分大小写
 *
 * 如果命名带有驼峰，请讲文件名按照 '-' 分割开
 * 例如:
 *  import NetworkAny from './network-any'
 *  NetworkAny 按照驼峰拆分使用'-'隔开，所以文件名应该命名为 'network-any'
 */
```

[babel-import_dynamic](./import_dynamic.png)

# Vue

- `Vue.js 的核心是一个允许采用简洁的模板语法来声明式地将数据渲染进 DOM 的系统`

## 模板语法：{{}}

## 指令，指令都是 v-开始

```html
<div v-bind:title="message">
  <div v-if="bSeen">现在你看到我了</div>
  <div v-for="todo in todos">{{todo.text}}</div>
  <div>
    <p>{{message}}</p>
    <button v-on:click="reversMessage">反转消息</button>
  </div>
</div>
```

```js
var app = new Vue({
  el: '#app',
  data: {
    message: '页面加载',
    bSeen: true,
    todos: [
      {
        text: '学习javascript'
      },
      {
        text: '学习React'
      },
      {
        text: '学习Vue'
      }
    ]
  },
  methods: {
    reversMessage: () => {
      this.message = this.message.split('').reverse().join('');
    }
  }
});
```

- `v-bind:`将 Vue 实例的 message 属性值与 div 的 title 属性值保持一致
- `v-if：`
- `v-for：`
- `v-on：`
- `v-model：`表单和应用状态之间的绑定

## 组件：在 Vue 中，组件本质上就是一个拥有预定义的选项的 Vue 实例

- `注册组件：`

```js
    Vue.component("name", {
        props: ["todo"]
        template: "<li>{{todo.text}}</li>"
    })
    var app = new Vue({
        el: "app",
        data: {
            groceryList: [
                {
                    text: "fish",
                    id: 0
                },
                {
                    text: "monkey",
                    id: 1
                },
                {
                    text: "cat",
                    id: 2
                }
            ]
        },
        methods: {

        }
    })
```

```html
<!-- name component instance -->
<name
  v-bind:title=""
  v-for="item in groceryList"
  v-bind:todo="item"
  v-bind:key="item.id"
  v-model
>
</name>
```

- `自定义元素：`WebComponent(https://www.w3.org/wiki/WebComponents/FV)的一部分，Vue的组件语法部分参考了该规范

```js
/*
        Web Components 规范已经完成并通过，但未被所有浏览器原生实现。目前 Safari 10.1+、Chrome 54+ 和 Firefox 63+ 原生支持 Web Components。相比之下，Vue 组件不需要任何 polyfill，并且在所有支持的浏览器 (IE9 及更高版本) 之下表现一致。必要时，Vue 组件也可以包装于原生自定义元素之内
            customElements是Window对象上的只读属性，返回一个CustomElementRegistry对象的引用，可用于注册新的custom elements或获取自定义元素
            CustomElementRegistry接口：
                define：定义一个新的自定义元素
                get：返回指定自定义元素的构造函数或者undefined
                upgrade：
                whenDefined：

        Vue 组件提供了纯自定义元素所不具备的一些重要功能，最突出的是跨组件数据流、自定义事件通信以及构建工具集成
    */
//    web components
class WordCount extends HTMLParagraphElement {
  constructor() {
    super();
    var wcParent = this.parentNode;
    function countWords(node) {
      var text = node.innerText || node.textContent;
      return text.split(/\s+/g).length;
    }

    var count = 'Words:' + countWords(wcParent);

    // create shadow root
    // shadow dom就是自定义组件渲染的实际dom，也可以不渲染，有生命周期
    var shadow = this.attachShadow({ mode: 'open' });
    var text = document.createElement('span');
    text.textContent = count;
    shadow.appendChild(text);

    setInterval(function () {
      var count = 'Words' + countWords(wcParent);
      text.textContent = count;
    }, 200);
  }
}

customElements.define('word-count', WorldCount, { extends: 'p' });
```

- `vue devtools：https://github.com/vuejs/vue-devtools#vue-devtools`方便调试

# 微信小程序

## text 组件垂直对齐问题

```js
/*
        使用flex布局，无法垂直居中，文字始终贴着容器底部

        解决方案：
            line-height: 0;
            height: 40rpx;
    */
```

# FTL 模板 Freemaker Template Language

> FreeMaker 不是直接反射到 Java 对象，Java 对象通过插件式对象封装，以变量方式在模板中显示
> FreeMaker 提供两个运算符避免空值!(指定缺失变量的默认值)和??(判断变量是否存在)

```js
/*
FTL 模板由 4 部分组成：
    注释，<#-- XXX -->，其中XXX会被解释引擎忽略
    插值，${XXX}，${XXX}会被引擎使用真实的值替换
    FTL指令，和HTML标签类似，但是前面要加#用于区分，引擎会解析标签中的表达式或逻辑
    文本，仅文本信息
*/
```

## 指令

```js
/*
assin指令：用于定义变量
    <#assign linkman="王先生">联系人:${linkman}
    <#assign info={"mobile": "123123123", "address": "XXXX"}>电话:${info.mobile} 地址:${info.address}
include指令：引入ftl模板
if指令：
    <#if success=true>
        你通过实名认证
    <#else>
        你未通过实名认证
    </#if>
    ------在代码中对success赋值
    map.put("success", true)
list指令：
    <#list goodsList as goods>
        ${goods_index+1} 商品名称：${goods.name} 价格：${goods.price}<br>
    </#list>
使用内置函数
*/
```

## 变量

## 宏

## 支持的数据类型有：Boolean、Date、Number、String、Sequence（java 中的数组，list，set 等）、hash（java 中的 Map）

## antd/x6 和 jsplumb 调研

## 编写有弹性的组件

### 不阻断数据流

- `渲染中不要阻断数据流（渲染结果应该响应 props 的变化）：`不论传递属性如何变化, 组件都将反映这些变化。应该保持对所有依赖数据流的渲染一致性
  > 误区：在初始化时，把 props 复制到 state，特定场景除外（例如赋初始值 initialValue、defaultValue）。后续的 props 变更无法反映到 state，进而无法 re-render，导致数据流和渲染结果不一致
  >
  > 直接使用 props 或基于 props 进行的计算：
  - `初始化是计算赋值给 state，问题同误区一样；`
  - `render中进行计算：`但是其它属性的变更，会导致计算重复进行，浪费资源
  - `在componentDidUpdate中进行计算：`但是每次 props 变更，都会都有两次 render 调用
  - `componentWillReceiveProps计算：`导致并发渲染产生问题
  - `getDerivedStateFromProps计算：`难用
- `不要再side effecs中阻断数据流：`side effects 也是数据流重要的一部分，应该保证 effetc 对所有依赖数据流的计算一致性
  > 注意这个“effect 依赖”数组并不是一个新概念。在类中，我们必须遍历所有方法调用，来搜索这些“依赖项”。useEffect API 只是显式地使用了相同的概念
  >
  > 注意，无论是将组件编写为类还是函数，都必须为 effect 响应所有 props 和 state 的更新
  >
  > 使用 class API，你必须自己考虑一致性，并验证对每个相关 prop 或 state 的更改是否该由 componentDidUpdate 处理。否则，组件对 prop 和 state 的更改不具有弹性。这甚至不是专属于 React 的问题。它适用于任何允许你单独处理 “创建” 和 “更新” 事件的 UI 库
  - `didMount中的请求和props关联`
  - `didUpdate打补丁：`意味着依赖的 props 属性越多，逻辑越重。FC 显示的要求你之名依赖，CLASS 自己收集依赖
- `不要再优化中阻断数据流：`手动优化，浅比较。避免使用自定义的比较方法，无论 SCU 还是 React.memo

### 时刻准备渲染（还是 props 转 state 的问题，如果父组件经常渲染，就会污染子组件的状态。让子组件丢失内部状态）

> 完全受控组件
>
> 非受控组件，是 key 强制销毁并生成组件

### 没有单例组件

### 隔离本地状态

> 如果你不确定某个状态是否属于本地，请问自己：“如果此组件呈现两次，交互是否应反映在另一个副本中？” 只要答案为“否”，那你就找到本地状态了。
