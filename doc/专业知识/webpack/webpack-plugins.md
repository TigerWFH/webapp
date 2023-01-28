# webpack plugins

- `webpack graph`

## 问题描述

> 使用 CommonsChunkPlugin 将依赖的第三方打包到一个 vendor 的 chunk 中。与此同时，为了避免每次变更项目代码导致 vender chunk 的 chunkhash 改变，需要生成一个额外的 manifest chunk 文件。既就产生 3 个文件`vendor.chunk.js`, `manifest.chunk.js`, `main.chunk.js`
>
> 修改代码，打包会重新生成 `manifest.chunk.js`, `main.chunk.js`
>
> 新增模块，打包会重新生成`vendor.chunk.js`, `manifest.chunk.js`, `main.chunk.js`
>
> 期望：vendor.chunk.js 不重新打包
>
> 重新打包原因：引入了新模块，基于自然数的 moduleId 命名在新增模块场景下，导致部分模块的 ID 发生了变化，而模块 ID 的变化，导致引用方内容变化，进而导致 chunkhash 的改变
>
> 方案：找到和顺序无关的模块 id 命名方案，既 NamedHashPlugin 和 HashedModuleIdsPlugin

## webpack 内置插件

### HotModuleReplacementPlugin

### CommonsChunkPlugin

> 已经在 webpack@4 移除，使用 SplitChunksPlugin 替代

### SplitChunksPlugin

> 开箱即用，能满足大部分用户

### NamedChunksPlugin

webpack@5 optimization.namedChunks 移除，同时 移除了 NamedChunksPlugin

### NamedModulesPlugin

> webpack@5 optimization.namedModules 移除，同时移除了 NamedModulesPlugin

### HashedModuleIdsPlugin

> 基于模块相对路径创建生成 4 个字符的字符串作为模块 id，建议使用在生产环境

### DllPlugin and DllReferencePlugin

> 这两个插件提供了另外一种拆包方式，可以大幅度提升性能

### DefinePlugin

> 定义全局变量，场景 1 就是将编译变量带入到执行环境，例如 ENV

## webpack Contrib 插件

### MiniCssExtractPlugin

### StylelintWebpackPlugin

### TerserWebpackPlugin

## webpack 社区插件

### html-webpack-plugin
