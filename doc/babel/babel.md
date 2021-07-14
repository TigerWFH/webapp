# acorn（https://github.com/acornjs/acorn）：a tiny,fast Javascript parser，written completely in Javascript
* `acorn：`the main parser
* `acorn-loose：`the error-tolerant parser
* `acorn-walk：`the syntax tree walker
# babel：基于acorn，是一个用于将ecmascript2015以上的代码转换成向前兼容的js代码的工具链
> babel转换包含两层含义：一个语法转换；一个是js api转换polyfill

> 隔离：更准确说防止污染全局作用域。例如适用babel编译一个库，适用了promise；但是应用自定义了promise，此时就会产生问题。

> 隔离的作用：就是将lib中promise，适用别名_promise代替，并实现promise的功能。防止污染全局作用域

* `转换语法`
* `通过@babel/polyfill为目标环境添加对应的语言特性`
* `源代码转换：`
## babel入门
### babel：分为三个阶段
* `1、parsing:`解析源代码为AST
* `2、transforming：`转换语法，重写并生成新AST
* `3、printing：`生成新代码
### ES2015以上的语法支持
```js
    /*
        ES3：
            memeber-expression-literals
            property-literals
            reserved-words
        ES5:
            property-mutators
        ES2015:
        ES2016:
        ES2017:
        ES2018:
        Modules:
            modules-amd:
            modules-commonjs:
            modules-systemjs:
            modules-umd:
        Experimental:
            class-propeties:
            ...
        Minification:
        React:
        Other:
        SynctaxPLugins：These plugins only allow Babel to parse specific types of syntax (not transform)。transform plugins automatically enable the syntax plugins. So you don't need to specify the syntax plugin if the corresponding transform plugin is used already
    */ 
```
### babel plugins:
* `Plugin/Preset Paths：`如果是npm包，babel会自动根据名字去node_modules目录下解析对应的包；如果是私有包，请指定相对或绝对路径
* `Plugin Shorthand：`如果包是以babel-plugin-开头，可以使用简写
```json
    {
        "plugins": [
            "myPLugin",
            "babel-plugin-myPLugin"
        ]
    }
```
* `Plugin Ordering：`
```js
    /*
        1、Plugins run before Presets
        2、Plugin ordering is first to last
        3、Preset ordering is reversed（last to first）
    */ 
   {
       "plugins": ["transform-decorators-legacy", "transform-class-properties"],
       "presets": ["@babel/preset-env", "@babel/preset-react"]
   }
    /*
        以上执行顺序：
            1、先执行plugins
            2、先执行transform-decorators-legacy，再执行transform-class-properties
            3、先执行@babel/preset-react，再执行@babel/preset-env
    */    
```
* `Plugin Options：`
```json
    {
        "plugins": [
            [
                "transform-async-to-module-method",
                {
                    "module": "bluebird",
                    "method": "coroutine"
                }
            ]
        ],
        "plugins": ["plguinA", ["pluginA"], ["plguinA", {}]]
    }
```
* `Plugin Development：`可以根据需要开发自己的babel插件
> 插件开发指南：https://github.com/thejameskyle/babel-handbook
### JSX and React转换：babel可以借助@babel/preset-react和babel-sublime插件更清爽的语法高亮提示体验
* `jsx-runtime：`React17.0.0-rc.2版本，引入全新的JSX转换，JSX的转换不再依赖React。在转换时可以引入新的jsx-runtime。
> 可以单独使用JSX，而不必依赖react

> 根据配置，JSX的编译输出优化

> 减少学习react概念的数量（相当于JSX独立了）

> create-react-app已经做了兼容处理，在v4.0中提供该特性；Next.js的v9.5.3启用；Gatsby在v2.24.5启用；Babelv7.9.0以上支持配置；Typescript的v4.1 beta版本启用；Flow的v0.126.0启用；
```js
    // npm install --save-dev @babel/preset-react，preset-react包含以下插件
    // @babel/plugin-syntax-jsx：
    // @babel/plugin-transform-react-jsx：v7.9.0增加，
    // @babel/plugin-transform-react-display-name：
    // with the development option，从v7.9.0以后，runtime会根据development参数自动添加以下插件[React Automatic Runtime, React Classic Runtime, Fragments]
    // @babel/plugin-transform-react-jsx-self
    // @babel/plugin-transform-react-jsx-source
    // v7.9.0以后，不再内置flow syntax，可以配置FlowPreset支持
    {
       "plugins": [
           "@babel/preset-react",
           {
               "pragma": "dom",
               "pragmaFrag": "DomFrag",
               "throwIfNamespace": false, // default true
               "runtime": "classic", // default classic
               "development: false 
           }
       ]
   }
```
### Type Annotations（Flow and Typescripts）：babel不做类型检查，必须配合flow或者typescript适用类型检查
```js
    /*
        Flow preset：flow(https://flow.org/en/docs/getting-started/)，a static type checker for javascript code
            npm install --save-dev @babel/preset-flow
            包含以下插件：
                @babel/plugin-transform-flow-strip-types
        typescript preset：使用typescript
            npm install -s-ave-dev @babel/preset-typescript
            包含以下插件：
                @babel/plugin-transform-typescript
    */ 
```
* `babel是plugable-插件化设计:`
```js
    /*
        1、组合自己的处理管道
        2、创建自己的preset插件集合
        3、撰写自己的插件plugin
    */ 
```
* `调试：`适用sourcemap进行调试
### 插件化设计：babel是插件化设计，可以重组插件改变插件执行顺序即transformation pipeline，也可以创建自己的插件集合（preset），也可以撰写自己的插件
* `在线撰写插件教程：`https://astexplorer.net/#/KJ8AjD6maa
* `插件模板生成器：`https://github.com/babel/generator-babel-plugin
### 可调式：使用sourcemap支持代码调试
### ECMAScript规范契合度：babel努力完全按照ECMAScript规范实现，也会考虑性能原因做一些tradeoff
### Compact：Babel努力实现以以最少代码实现对应功能
## babel的使用
### 基础包：所有的 Babel 模块都是作为独立的 npm 包发布的，并且（从版本 7 开始）都是以 @babel 作为冠名的
```js
    /*
        1、安装包：
            npm install --save-dev @babel/core,@babel/cli,@babel/preset-env
            npm install --save @babel/polyfill
        2、配置文件：
            babel.config.json(v7.8.0以上版本)
            babel.config.js(v7.8.0以下版本)
        3、命令行：
            ./node_modules/.bin/babel src --out-dir lib
            npm@v5.2.0包自带的npm包运行器npx将.node_modules/.bin/babel缩短为：npx babel
    */ 
```
* `@babel/core：`包含了babel的核心功能
```js
    const babel = require("@babel/core")

    babel.transformSync("code", optionsObject)
```
* `@babel/cli：`终端工具，运行./node_modules/.bin/babel的命令行工具
* `Polyfill：`从babel@7.4.0，不建议使用该包了。建议直接使用core-js/stable(模拟ECMAScript的功能)和regenerator-runtime/runtime(需要使用转译后的生成器函数)。@babel/polyfill已被弃用，详情https://github.com/zloirock/core-js#babelpolyfill
```js
    import "core-js/stable"
    import "regenerator-runtime/runtime"
```
> @babel/polyfill模块包含了core-js和一个自定义的regenerator-runtime来模拟ES2015+环境。这意味着你可以使用Promise和WeakMap等内置对象；可以使用Array.from等静态方法；可以使用Array.prototype.includes实例方法和生成器函数generator functions。为了添加这些功能，polyfill 将添加到全局范围（global scope）和类似 String 这样的原生原型（native prototypes）中。对于软件库/工具的作者来说，这可能太多了。如果你不需要类似 Array.prototype.includes 的实例方法，可以使用 transform runtime 插件而不是对全局范围（global scope）造成污染的 @babel/polyfill。更进一步，如你确切地指导你所需要的 polyfills 功能，你可以直接从 core-js 获取它们。env preset 提供了一个 "useBuiltIns" 参数，当此参数设置为 "usage" 时，就会加载上面所提到的最后一个优化措施，也就是只包含你所需要的 polyfill。使用此新参数后
### 配置文件：babel.config.json，.babelrc.json，
* `babel.config.json：`https://www.babeljs.cn/docs/config-files#project-wide-configuration
* `.babelrc.json：`https://www.babeljs.cn/docs/config-files#file-relative-configuration
* `配置到package.json中：`
```json
    // package.json
    {
        "babel": {
            "preset": [],
            "plugins": []
        }
    }
```
## babel plugins：
### 预设（Presets）：就是babel插件的集合
* `@babel/preset-env：`
* `@babel/preset-flow：`
* `@babel/preset-react：`
* `@babel/preset-typescript：`
* `自定义preset：`创建一个自己的 preset，只需导出一份配置即可。可以是返回一个插件数组。preset 可以包含其他的 preset，以及带有参数的插件
```js
    module.exports = function() {
        return {
            plugins: [
                "pluginA",
                "pluginB",
                "pluginC"
            ]
        }
    }
```
### 插件（Plugins）：实现特定功能js代码。开发文档：https://github.com/jamiebuilds/babel-handbook
* `@babel/runtime`：is a library that contains Babel modular runtime helpers and a version of regenerator-runtime
[runtime和polyfill比较](https://www.jianshu.com/p/73ba084795ce)
https://www.baidu.com/link?url=I0WOcK8XBJF1qC2yh_2arWlLG1CGfA8K4jweHHcsggE9uoANyznfWs4wVJmoMv1X&wd=&eqid=a87efa750017871100000004603da632
## babel config optinos
```json
    {
        "plugins": [],
        "presets": [],
        "targets": "Describes the environments you support/target for your project. > 0.25%, not dead. 可以是browserslist-compatible query",
        "targets": {
            "chrome": "58",
            "ie": "11",
            "opera": "",
            "edge": "",
            "firefox": "",
            "safari": "",
            "ios": "",
            "android": "",
            "node": "",
            "electron": "",
            "esmodules": true
        },//若没有，则默认编译成ES5
        "include": [],
        "exclude": [],
        "ignore": [],
        "only": [],
        "sourceMaps": true,
        "sourceMap": "同sourceMaps",
    }
```