# webpack HMR

## live reloading

## Hot Module Replace

## webpack 生态下配置 HMR

```js
// webpack.config.js
module.exports = {
  devServer: {
    hot: true
  }
};
// index.js

if (module.hot) {
  // capture hot update
  module.hot.accept('', () => {});
}
```

- `style-loader：`内置了 css 模块热更
- `react-hot-reload：`内置了 react 模块热更
- `vue-loader：`内置 Vue 模块热更

## Webpack HMR 特性核心流程

> webpack-dev-server（WDS） 托管`静态资源`服务，同时以`runtime`形式，向`应用`注入`HMR客户端代码`
>
> 浏览器加载应用，执行注入的 HMR 客户端代码，与 WDS 简历 websocket 连接
>
> Webpack 监听到文件变化后，增量构建发生变更的模块，并通过 Websocket 推送 hash 事件
>
> HMR 客户端收到 hash 事件后，请求 manifest 资源清单文件，确认增量变更范围
>
> HMR 客户端加载发生变更的增量模块
>
> Webpack 运行时触发变更模块的 module.hot.accept 回调，执行代码变更逻辑

### HotModuleReplacementPlugin

- `生成manifest文件：`JSON 格式，包含所有发生变更的模块列表，命名为[hash].hot-update.json
- `模块变更文件：`JS格式，包含编译后的模块代码，命名为[hash].hot-update.js
> 
