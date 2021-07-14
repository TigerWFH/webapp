# Webpack config
## context：string，基础目录，绝对路径。用来从配置中解析入口（entry）和loader，默认使用当前目录（CWD）
## entry：string|[string]|object|function(返回string|[string]|object)
```js
    /*
        应用程序的起点入口。
            SPA：一个入口
            MPA：多个入口
        命名：
        动态入口：
    */ 
```
## output：指明了webpack如何输出资源（bundle、assert）？资源输出到哪里？
```js
    /*
        path：对应绝对路径，资源存放目录。[hash]会被compilation hash替换
        pathinfo：
        filename：
            单个bundle时，就是一个string类型的bundle名称
            多bundle或codespliting或插件创建多bundle时，使用如下方式为每一个bundle命名：
            使用入口名称：[name].bundle.js
            使用内部chunkId：[id].bundle.js
            使用构建hash：[name].[hash].bundle.js
            使用chunk内容hash：[chunkhash].bundle.js
        chunkFilename：非入口chunk的名字，同filename的占位符
        publicPath：指定资源发布目录
    */ 
```
## module：指定对不同文件进行处理的loaders
```js
    /*
        noParse：
        rules：
            test：文件筛选
            enforce: [pre,post]，指定loader种类，没有值是普通loader，loader顺序有前置、行内、普通、后置排序，并按该顺序使用
            use:
            include:
            exclude:
            oneOf:
    */ 
```
## plugin：配置插件，扩展webpack功能
## mode：指定webpack内置优化选项
```js
    /*
        mode：[none, development, production]
            none：使用默认优化配置

            development：通过DefinePLugin设置process.env.NODE_ENV为development，
                启用NamedChunksPlugin和NamedModulesPLugin

            production：通过DefinePLugin设置process.env.NODE_ENV为production,
                启用FlagDependencyUsagePlugin，FlagIncludedChunksPlugin，ModuleConcatenationPlugin，
                NoEmitOnErrorsPlugin，OccurrenceOrderPlugin，SideEffectsFlagPlugin和TerserPLugin
    */ 
```
## optimization：webpack@4+，会根据mode参数做性能优化。所有优化都可以配置和覆盖
```js
    /*
        minimize：boolean，是否使用TerserPlugin插件压缩js代码，production环境默认是true
        minimizer：覆盖webpack内置的压缩器TerserPlugin，可以是自定义参数的TerserPlugin或其它具有压缩功能的插件
        splitChunks：webpack4+，提供了新的默认动态载入的分包策略。将commonschunkplugin替换成splitchunksplugin


        runtimeChunks：为每一个入口生成一个runtime chunk
    */ 
```
## resolve分为resolve：如何解析模块（包）和resolveLoader两部分
```js
    // resolve
    modules: 指定webpack包目录
    extendsions: 解析确定扩展名的包
    alias: 创建import或require的别名，简化模块导入
    plugins：resolve plugins，例如PnpWebpackPlugin,ModuleScopePlugin,DirectoryNamedWebpackPlugin
    // resolveLoader：用于解析webpack的loader packages
```
## bail：
## node：配置是否使用NodeStuffPlugin插件polyfill或mock nodejs的globals
## performance：
# webpack代码拆分：bundle spliting和code spliting（require.ensure和dynamic import）
# 常用plugins
## Out of the box：开箱即用
## TerserPLugin：基于terser的js代码压缩工具。webpack5+自带该插件
> terser：A JavaScript parser（语法分析器） and mangler/compressor（压缩器） toolkit for ES6+.terser是uglify-es的一个分支。

> uglify-es不再维护；uglify-js不支持es6+

```
    npm install terser-webpack-plugin
```
## CommonsChunkPlugin（移除）和SplitChunksPlugin
> webpack内部graph中使用父子关系表示chunk和包含在chunk内的module之间的关系。CommonsChunkPlugin用于避免重复的依赖以提供更好的性能优化
> webpack4+，移除了CommonsChunkPlugin插件，使用optimization.splitChunks代替，即SplitChunksPlugin

> webpack will automatically split chunks based on these conditions详情见splitChunkPlugin插件页面
```
    npm install commons-webpack-plugin
```
## PnpWebpackPlugin
## PnpWebpackPlugin.moduleLoader
## ModuleScopePlugin
## DirectoryNamedWebpackPlugin
## NodeStuffPlugin