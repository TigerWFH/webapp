/**
 * 常用的两个辅助工具库：loader-utils和schema-utils
 * loader分为同步和异步
 * 同步loader签名：
 * function loaderName(source, sourceMap?) {
 *      return source; || this.callback(err, source, sourceMap, ...);
 * }
 * 异步loader签名：
 * 异步必须调用this.async()来获取callback函数
 * function loaderName(source, sourceMap?) {
 *      
 * }
 * 壹、webpack模块解析规则
 *      使用enhanced-resolve，webpack能够解析三种文件路径：绝对路径、相对路径、模块路径（node_modules）
 *  指向文件或目录时
 *      resolve.modules可以配置模块查找路径，
 *      resolve.alias创建别名，
 *      resolve.extensions配置resolver解析器能够接受的扩展名
 *  指向文件夹时
 *      包含package.json，根据第一个resolve.mainFields查找
 *      不包含package.json，根据resolve.mainFields查找或import/require目录下查找
 * 
 * 
 * 
 * 
 * 
 *  关于loader：
 *      多数组配置中，loader执行顺序是从数组最后一个到第一个，例如[style-loader, css-loader, scss-loader]，执行顺序是：scss-loader，css-loader，style-loader
 *      顺序中的第一个被调用的loader，拿到的参数是source的内容
 *      顺序中最后一个被调用的loader，webpack期望它返回JS代码，source map是可选值
 *      加载中间的loader被链式调用，它们拿到上个loader的返回值，为下一个loader提供输入
 *  loader实用工具：
 *      loader-utils: 获取options
 *      schema-utils: 获取校验options的JSON Schema常量
 *  */ 
var loaderUtils = require('loader-utils')

module.exports = function(source, input) {

    const options = loaderUtils.getOptions()
    console.log('options=========>', options)

    this.callback(null, source, input);
    return `export default ${JSON.stringify(source)}`
    // this.callback(err: Error | null, content: string | Buffer, sourceMap:? SourceMap, abstractSyntaxTree:? AST);
}