# Webpack config

## webpack 和 webpack-dev-server

> webpack 的 publicPath 指定了资源所在目录，且 webpack-html-plugin 会将 publicPath+资源名一同注入到 html 模板中
>
> webpack-dev-server 的 publicPath 指定了资源所在目录，既 web 服务根目录，其作用和 webpack 的一样

## context：string，基础目录，绝对路径。用来从配置中解析入口（entry）和 loader，默认使用当前目录（CWD）

## entry：string|[string]|object|function(返回 string|[string]|object)

```js
/*
        应用程序的起点入口。
            SPA：一个入口
            MPA：多个入口
        命名：
        动态入口：
    */
```

## output：指明了 webpack 如何输出资源（bundle、assert）？资源输出到哪里？

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

## module：指定对不同文件进行处理的 loaders

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

## plugin：配置插件，扩展 webpack 功能

## mode：指定 webpack 内置优化选项

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

## optimization：webpack@4+，会根据 mode 参数做性能优化。所有优化都可以配置和覆盖

```js
/*
        minimize：boolean，是否使用TerserPlugin插件压缩js代码，production环境默认是true
        minimizer：覆盖webpack内置的压缩器TerserPlugin，可以是自定义参数的TerserPlugin或其它具有压缩功能的插件
        splitChunks：webpack4+，提供了新的默认动态载入的分包策略。将commonschunkplugin替换成splitchunksplugin


        runtimeChunks：为每一个入口生成一个runtime chunk
    */
```

## resolve 分为 resolve：如何解析模块（包）和 resolveLoader 两部分

```js
    // resolve
    modules: 指定webpack包目录
    extendsions: 解析确定扩展名的包
    alias: 创建import或require的别名，简化模块导入
    plugins：resolve plugins，例如PnpWebpackPlugin,ModuleScopePlugin,DirectoryNamedWebpackPlugin
    // resolveLoader：用于解析webpack的loader packages
```

## bail：

## node：配置是否使用 NodeStuffPlugin 插件 polyfill 或 mock nodejs 的 globals

## performance：

# webpack 代码拆分：bundle spliting 和 code spliting（require.ensure 和 dynamic import）

# 常用 plugins

## Out of the box：开箱即用

## TerserPLugin：基于 terser 的 js 代码压缩工具。webpack5+自带该插件

> terser：A JavaScript parser（语法分析器） and mangler/compressor（压缩器） toolkit for ES6+.terser 是 uglify-es 的一个分支。

> uglify-es 不再维护；uglify-js 不支持 es6+

```
    npm install terser-webpack-plugin
```

## CommonsChunkPlugin（移除）和 SplitChunksPlugin

> webpack 内部 graph 中使用父子关系表示 chunk 和包含在 chunk 内的 module 之间的关系。CommonsChunkPlugin 用于避免重复的依赖以提供更好的性能优化
> webpack4+，移除了 CommonsChunkPlugin 插件，使用 optimization.splitChunks 代替，即 SplitChunksPlugin

> webpack will automatically split chunks based on these conditions 详情见 splitChunkPlugin 插件页面

```
    npm install commons-webpack-plugin
```

## PnpWebpackPlugin

## PnpWebpackPlugin.moduleLoader

## ModuleScopePlugin

## DirectoryNamedWebpackPlugin

## NodeStuffPlugin
