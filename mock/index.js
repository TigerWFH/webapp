(function (modules) {
  function webpackJsonpCallback(data) {}
  function checkDeferredModules() {}
  var installedModules = {};
  var installedCSsChunks = {};
  var installedChunks = {};
  var deferredModules = {};
  function jsonpScriptSrc(chunkId) {}
  function __webpack_require__(moduleId) {}
  // 主逻辑
  var jsonpArray = (window["webpackJsonp"] = window["webpackJsonp"] || []);
  var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
  // 修改window["webpackJsonp"]的push属性，后面的chunk包都是直接使用window["webpackJsonp"]
  jsonpArray.push = webpackJsonpCallback;
  // 修改jsonpArray的指向，恢复push属性为数组的push函数而非webpackJsonpCallback
  jsonpArray = jsonpArray.slice();
  // 执行jsonpArray中的模块
  for (let i = 0; i < jsonpArray.length; i++) {
    webpackJsonpCallback(jsonpArray[i]);
  }
  var parentJsonpCallback = oldJsonpFunction;
  // 执行延迟的模块
  checkDeferredModules();
})([]);
