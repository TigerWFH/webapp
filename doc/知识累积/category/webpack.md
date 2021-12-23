# webpack

## Conepts

- `Entry:`webpack 构建依赖图的开始模块文件
- `Ouput:`webpack 命名打包文件以及存储打包文件的位置
- `Loader:`webpack 只能识别 javascript 和 json，其它资源需要使用 loader 转换成 JavaScript 模块
- `Plugins:`webpack 功能增强插件
- `Mode:`[development, production, none]，启用 webpack 内置优化方案
- `BrowserCompatility:`webpack 支持所有兼容 ES5 的浏览器（IE8 以下不支持）。webpack 需要 promise 或 require.ensure，旧浏览器需要 polyfill<https://webpack.js.org/guides/shimming/>
- `Environment：`webpack5 node@10.13.0+

## webpack config

```js
/*
  webpack configs：
    1、context：string, 基础目录，绝对路径，解析入口文件和loader
    2、entry：[string | array | object], string和array配置单页应用；object配置多页应用
    3、output: webpack如何输出，输出到哪里
    4、resolve：webpack解析模块配置
    5、module：webpack如何解析不同的资源
    6、plugins：webpack插件，增强webpack功能
    7、mode：内置优化选择
    8、optimization：根据mode选项，优化代码
*/
```

## webpack loader and plugins

```js
/*
--------------------------------------------------------------------------------------------------
loaders: 
    raw-loader: 将file以字符串形式载入webpack系统
    style-loader：
    css-loader: 劫持@import和url()，并解析
    file-loader:处理通过import和require载入的文件，并拷贝到指定目录
      import img from "./img.png"
      const img = require("./img.png")
        url-loader: 将file转为Data URL格式数据
        scss-loader:
        babel-loader:
        postcss-loader
        eslint-loader:
--------------------------------------------------------------------------------------------------
plugins:
    mini-css-extract-plugin
    html-webpack-plugin
    -------------------------webpack 插件是一个具有 apply 方法的 JavaScript 对象
        class SelfPlugin {
            apply(compiler) {
                compiler.hooks.compilation.tap("add-cross-origin-content", (state) => {
                    state.body.forEach(item => {
                        item.attributes.crossorigin = "anonymous"
                    })
                })
            }
        }

        exports = module.exports = SelfPlugin
    --------------------------------------------------------------------------------------------------
 */
```

## webpack 事件流顺序

```js
/*
 */
```

## webpack 中的 chunk，module

## tapable

## other

```js
/*
    
    webpack生命周期：
        compiler和compilation对象
        compiler：代表着webpack的配置和完整的生命周期
        compilation：则是构建过程
    --------------------------------------------------------------------------------------------------
    webpack3和webpack4对比：
        0、webpack4号称0配置开箱即用
        1、Node最低版本不一样：最低支持Node6.11.5和Node4.0
        2、配置项增加mode：[node, development, production]，开启内置优化
            terserplugin代替了uglifyjs-webpack-plugin，对输出代码进行压缩
        3、原生支持JSON文件格式，不需要json-loader
        4、内置的uglifyjs-webpack-plugin升级，支持并行处理
        5、使用minicssextractplugin代替extract-text-webpack-plugin，处理css文件
        6、使用optimization.splitChunks和optimization.runtimeChunk代替CommonsChunkPlugin
    webpack5:


*/
```

## webpack 打包后内容

### `webpack的runtime`

#### webpack@3+

- `runtime:`

```js
(function (modules) {
  // webpackBootstrap
  // install a JSONP callback for chunk loading
  var parentJsonpFunction = window["webpackJsonp"];
  window["webpackJsonp"] = function webpackJsonpCallback(
    chunkIds,
    moreModules,
    executeModules
  ) {
    // add "moreModules" to the modules object,
    // then flag all "chunkIds" as loaded and fire callback
    var moduleId,
      chunkId,
      i = 0,
      resolves = [],
      result;
    for (; i < chunkIds.length; i++) {
      chunkId = chunkIds[i];
      if (installedChunks[chunkId]) {
        resolves.push(installedChunks[chunkId][0]);
      }
      installedChunks[chunkId] = 0;
    }
    for (moduleId in moreModules) {
      if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
        modules[moduleId] = moreModules[moduleId];
      }
    }
    if (parentJsonpFunction)
      parentJsonpFunction(chunkIds, moreModules, executeModules);
    while (resolves.length) {
      resolves.shift()();
    }
    if (executeModules) {
      for (i = 0; i < executeModules.length; i++) {
        result = __webpack_require__(
          (__webpack_require__.s = executeModules[i])
        );
      }
    }
    return result;
  };

  // The module cache
  var installedModules = {};

  // objects to store loaded and loading chunks
  var installedChunks = {
    21: 0,
  };

  // The require function
  function __webpack_require__(moduleId) {
    // Check if module is in cache
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    // Create a new module (and put it into the cache)
    var module = (installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {},
    });

    // Execute the module function
    modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    );

    // Flag the module as loaded
    module.l = true;

    // Return the exports of the module
    return module.exports;
  }

  // This file contains only the entry chunk.
  // The chunk loading function for additional chunks
  __webpack_require__.e = function requireEnsure(chunkId) {
    var installedChunkData = installedChunks[chunkId];
    if (installedChunkData === 0) {
      return new Promise(function (resolve) {
        resolve();
      });
    }

    // a Promise means "currently loading".
    if (installedChunkData) {
      return installedChunkData[2];
    }

    // setup Promise in chunk cache
    var promise = new Promise(function (resolve, reject) {
      installedChunkData = installedChunks[chunkId] = [resolve, reject];
    });
    installedChunkData[2] = promise;

    // start chunk loading
    var head = document.getElementsByTagName("head")[0];
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.charset = "utf-8";
    script.async = true;
    script.timeout = 120000;

    if (__webpack_require__.nc) {
      script.setAttribute("nonce", __webpack_require__.nc);
    }
    script.src =
      __webpack_require__.p +
      "static/js/" +
      chunkId +
      "." +
      ({
        0: "commissionCertify",
        1: "nomatch",
        2: "home",
        3: "orderList",
        4: "withdrawRecord",
        5: "addOrder",
        6: "goodsDetail",
        7: "incomeDetail",
        8: "cashout",
        9: "newClerkHome",
        10: "orderResult",
        11: "clerkHome",
        12: "editPeopleInfo",
        13: "manualAdd",
        14: "addStaff",
        15: "drugstoreService",
        16: "qrcode",
        17: "inviting",
        18: "commissionHome",
        19: "vendor",
        20: "main",
      }[chunkId] || chunkId) +
      "." +
      {
        0: "9fabebf2",
        1: "9ce008c9",
        2: "0471e90d",
        3: "c2b5d6f0",
        4: "5532fdac",
        5: "21cb9a73",
        6: "c122d115",
        7: "223575d7",
        8: "b56827e8",
        9: "a386febc",
        10: "9e43c4cd",
        11: "c03389b9",
        12: "d850193f",
        13: "24c6f7c7",
        14: "2c39c548",
        15: "7973c3a7",
        16: "fe147719",
        17: "13ab0746",
        18: "72318765",
        19: "bb87580c",
        20: "af221876",
      }[chunkId] +
      ".chunk.js";
    var timeout = setTimeout(onScriptComplete, 120000);
    script.onerror = script.onload = onScriptComplete;
    function onScriptComplete() {
      // avoid mem leaks in IE.
      script.onerror = script.onload = null;
      clearTimeout(timeout);
      var chunk = installedChunks[chunkId];
      if (chunk !== 0) {
        if (chunk) {
          chunk[1](new Error("Loading chunk " + chunkId + " failed."));
        }
        installedChunks[chunkId] = undefined;
      }
    }
    head.appendChild(script);

    return promise;
  };

  // expose the modules object (__webpack_modules__)
  __webpack_require__.m = modules;

  // expose the module cache
  __webpack_require__.c = installedModules;

  // define getter function for harmony exports
  __webpack_require__.d = function (exports, name, getter) {
    if (!__webpack_require__.o(exports, name)) {
      Object.defineProperty(exports, name, {
        configurable: false,
        enumerable: true,
        get: getter,
      });
    }
  };

  // getDefaultExport function for compatibility with non-harmony modules
  __webpack_require__.n = function (module) {
    var getter =
      module && module.__esModule
        ? function getDefault() {
            return module["default"];
          }
        : function getModuleExports() {
            return module;
          };
    __webpack_require__.d(getter, "a", getter);
    return getter;
  };

  // Object.prototype.hasOwnProperty.call
  __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };

  // __webpack_public_path__
  __webpack_require__.p = "./";

  // on error function for async loading
  __webpack_require__.oe = function (err) {
    console.error(err);
    throw err;
  };
})(
  /************************************************************************/
  []
);
```

#### webpack@4+

- `runtime:`

```js
/*
    编译后webpack的runtime代码
  */
(function (modules) {
  // install a JSONP callback for chunk loading
  // chunk包加载后，会通过window["webpackJsonp"].push形式执行该函数，chunk包中的所有modules隐含在第二个参数中。该函数功能待分析
  function webpackJsonpCallback(data) {
    var chunkIds = data[0];
    var moreModules = data[1];
    var executeModules = data[2];

    var moduleId,
      chunkId,
      i = 0,
      resolves = [];
  }

  function checkDefferredModules() {}
  // The module cache
  var installedModules = {};
  // object to store loaded CSS chunks
  var installedCssChunks = {};
  // Object to store loaded and loading chunks
  var installedChunks = {};

  var deferredModules = [];
  // script path function，获取静态资源分包chunk的路由
  function jsonpScriptSrc(chunkId) {}
  // The require function
  function __webpack_require__(moduleId) {}
  //
  __webpack_require__.e = function requireEnsure(chunkId) {};
  // expose the modules object(__webpack_modules__)
  __webpack_require__.m = modules;
  // expose the module cache
  __webpack_require__.c = installedModules;
  // define getter function for harmony exports
  __webpack_require__.d = function (exports, name, getter) {};
  // define __esModule on exports
  __webpack_require__.r = function (exports) {};
  //
  __webpack_require__.t = function (value, mode) {};
  //
  __webpack_require__.n = function (module) {};
  //
  __webpack_require__.o = function (object, property) {};
  // __webpack_public_path__
  __webpack_require__.p = "./";
  // on error function for async loading
  __webpack_require__.oe = function (err) {};

  // 启动代码
  // 将webpack模块挂载到window下
  var jsonpArray = (window["webpackJsonp"] = window["webpackJsonp"] || []);
  var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
  // 修改webpack数据的push属性为自定义的webpackJsonpCallback
  jsonpArray.push = webpackJsonpCallback;
  // 恢复临时变量jsonpArray的push属性
  jsonpArray = jsonpArray.slice();
  // 执行jsonpArray中的模块
  for (var i = 0; i < jsonpArray.length; i++) {
    webpackJsonpCallback(jsonpArray[i]);
  }
  var parentJsonpFunction = oldJsonpFunction;

  // run deferred modules from other chunks
  checkDeferredModules();
})([]);
```

- `webpack module形式`

```js
  function(module, exports, __webpack_require__) {
    // do something
  }
  function(module, exports) {

  }
  function(module, __webpack_exports__, __webpack_require__) {

  }
```

- `webpack chunk形式`

```js
/* 
    任意chunk包：其实就是执行runtime中的webpackJsonpCallback(data)
      data[1]: chunkId列表
      data[2]: moreModules，当前chunk包含的modules
      data[3]: excuteModules，当前chunk执行的modules
 */
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  [2],
  Array(241).concat([function (module, exports, __webpack_require__) {}]),
]);
```

- `核心：webpackJsonpCallback(data)`

```js
function webpackJsonpCallback(data) {
  var chunkIds = data[0];
  var moreModules = data[1];
  var executeModules = data[2];

  // add "moreModules" to the modules object,
  // then flag all "chunkIds" as loaded and fire callback
  var moduleId,
    chunkId,
    i = 0,
    resolves = [];
  for (; i < chunkIds.length; i++) {
    chunkId = chunkIds[i];
    if (installedChunks[chunkId]) {
      resolves.push(installedChunks[chunkId][0]);
    }
    installedChunks[chunkId] = 0;
  }
  for (moduleId in moreModules) {
    if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
      modules[moduleId] = moreModules[moduleId];
    }
  }
  if (parentJsonpFunction) parentJsonpFunction(data);

  while (resolves.length) {
    resolves.shift()();
  }

  // add entry modules from loaded chunk to deferred list
  deferredModules.push.apply(deferredModules, executeModules || []);

  // run deferred modules when all chunks ready
  return checkDeferredModules();
}
```
