# 分析mini-css-stract-plugin插件：按照webpack执行顺序分析
## 预备知识
```
    1、schema-utils：
    2、compilation的hooks执行流程
    3、class NormalModuleFActory extends Tapable
        context, resolverFactory, options
        hooks = {
            resolver: SyncWaterfallHook,
            factory: SyncWaterfallHook,
            beforeResolve: AsyncSeriesWaterfallHook,
            afterResolve: AsyncSeriesWaterfallHook,
            createModule: SyncBailHook,
            module: SyncWaterfallHook,
            createParser: HookMap,
            parser: HookMap,
            createGenerator: HookMap,
            generator: HookMap
        }
        resolverFactory = resolverFActory
        ruleSet = new RuleSet(options.defaultRules.concat(options.rules))
        context = context
```
## 1、处理options，生成Compiler实例并返回
```js
    /*
        1、处理options
        2、生成Compiler实例，并返回
        3、挂载options到Compiler实例上
     */ 
```
## 2、执行配置项options中的plugins：即执行"mini-css-extract-plugin"实例的apply，并以Compiler实例为参数
```js
    /* 为thisCompilation注册监听  */ 
    apply(compiler) {
        compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
            compilation.dependencyFactory.set(CssDependency, new CssModuleFactory())
            compilation.dependencyTemplates.set(CssDependency, new CssDependencyTemplate()())
            compilation.mainTemplate.hooks.renderManifest.tap(pluginName, (result, {chunk}) => { 
            })
            compilation.chunkTemplate.hooks.renderManifest.tap(pluginName, (result, {chunk}) => {
            })
            compilation.mainTemplate.hooks.hashForChunk.tap(plugin, (result, {chunk}) => {
            })
            compilation.hooks.contentHash.tap(pluginName, (chunk) => {  
            })
            const { mainTemplate } = compilation
            mainTemplate.hooks.localVars.tap(pluginName, (source, chunk) => {
            })
            mainTemplate.hooks.requireEnsure.tap(pluginName, (source, chunk, hash) => {
            })
        })
    }
```
## 3、对Compiler部分hooks进行广播：广播hooks：environment、afterEnvironment
## 4、通过WebpackOptionsApply类，处理内部插件，并广播部分hooks，返回options
```js
    /*
        广播的hooks：entryOption、afterPlugins、afterResolvers
     */ 
```
## 5、执行compiler.run
```js
    /*
        广播hooks：beforeRun、run、
     */ 
```
## 6、执行compiler.compile
```js
    /*
        广播hooks：normalModuleFactory、contextModuleFactory、beforeCompile、compile
     */ 
```
## 7、创建Compilation实例，广播Compiler的hooks并返回Compilation实例
```js
    /*
        广播hooks：thisCompilation
        接收到广播，mini-css-extract-plugin插件注册的hooks会被执行：
            1、设置依赖工厂：dependencyFactory
            2、设置依赖Template：dependencyTemplates
            3、为mainTemplate的hooks注册监听器
                mainTemplate.hooks.renderManifest
                mainTemplate.hooks.hashForChunk
                mainTemplate.hooks.localVars
                mainTemplate.hooks.requireEnsure
            4、为compilation.hooks.contentHash注册监听器
     */ 
```
## 8、继续广播Compiler的hooks
```js
    /*
        广播hooks：compilation、make
     */ 
```
## compilation的hooks之一childCompiler会造成重新make
```js
    /*
        CachePlugin：会为compilation.hooks.
    */ 
```
