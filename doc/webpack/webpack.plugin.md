# Compiler事件执行顺序以及对应的Plugin：childCompiler不复制这些hooks:"make","compile","emit","afterEmit","invalid","done","thisCompilation"
```js
    /* environment、afterEnvironment、
    entryOption、afterPlugins、afterResolvers、
    beforeRun、run、
    normalModuleFactory、contextModuleFactory、beforeCompile、compile、thisCompilation、compilation、make、
    afterCompile、shouldEmit、emit、afterEmit、done  */ 
    1、environment------>SyncHook,[]
    2、afterEnvironment------>SyncHook,[]
    3、entryOption------>SyncBailHook,[vConsolePlugin, EntryOptionPlugin]
    4、afterPlugins------>SyncHook,[]
    5、afterResolvers------>SyncHook,[NodeSourcePlugin, AMDPlugin]
    6、beforeRun------>AsyncSeriesHook,[NodeEnvironmentPlugin]
    7、run------>AsyncSeriesHook,[fork-ts-checker-webpack-plugin, ManifestPlugin]
    8、normalModuleFactory------>SyncHook,[ModuleNotFoundPlugin, IgnorePlugin, SideEffectsFlagPlugin]
    9、contextModuleFactory------>SyncHook,[IgnorePlugin]
    10、beforeCompile------>AsyncSeriesHook,[]
    11、compile------>SyncHook,[ExternalsPlugin,fork-ts-checker-webpack-plugin,smp]
	12、thisCompilation------>SyncHook,[HtmlWebpackPlugin, mini-css-extract-plugin, JsonpTemplatePlugin, FetchCompileWasmTemplatePlugin, SplitChunksPlugin, RuntimeChunkPlugin]
	childCompiler的thisCompilation------>[NodeTemplatePlugin, LibraryTemplatePlugin]

	13、compilation------>SyncHook,[InlineChunkHtmlPlugin, InterpolateHtmlPlugin, DefinePlugin, smp, FunctionModulePlugin, NodeSourcePlugin, LoaderTargetPlugin, SourceMapDevToolPlugin, JavascriptModulesPlugin, JsonModulesPlugin, WebAssemblyModulesPlugin, MultiEntryPlugin, CompatibilityPlugin, HarmonyModulesPlugin, AMDPlugin, CommonJsPlugin, LoaderPlugin, LoaderPlugin, NodeStuffPlugin, RequireJsStuffPlugin, APIPlugin, ConstPlugin, UseStrictPlugin, RequireIncludePlugin, RequireEnsurePlugin, RequireContextPlugin, ImportPlugin, SystemPlugin, EnsureChunkConditionsPlugin, RemoveParentModulesPlugin, RemoveEmptyChunksPlugin, MergeDuplicateChunksPlugin, FlagIncludedChunksPlugin, SideEffectsFlagPlugin, FlagDependencyExportsPlugin, FlagDependencyUsagePlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, WasmFinalizeExportsPlugin, OccurrenceOrderModuleIdsPlugin, OccurrenceOrderChunkIdsPlugin, DefinePlugin, TerserPlugin, OptimizeCssAssetsWebpackPlugin, TemplatedPathPlugin, RecordIdsPlugin, WarnCaseSensitiveModulesPlugin, ManifestPlugin]

	childCompiler的compilation------>SyncHook,[InlineChunkHtmlPlugin, InterpolateHtmlPlugin, DefinePlugin, smp, FunctionModulePlugin, NodeSourcePlugin, LoaderTargetPlugin, SourceMapDevToolPlugin, JavascriptModulesPlugin, JsonModulesPlugin, WebAssemblyModulesPlugin, MultiEntryPlugin, CompatibilityPlugin, HarmonyModulesPlugin, AMDPlugin, CommonJsPlugin, LoaderPlugin, LoaderPlugin, NodeStuffPlugin, RequireJsStuffPlugin, APIPlugin, ConstPlugin, UseStrictPlugin, RequireIncludePlugin, RequireEnsurePlugin, RequireContextPlugin, ImportPlugin, SystemPlugin, EnsureChunkConditionsPlugin, RemoveParentModulesPlugin, RemoveEmptyChunksPlugin, MergeDuplicateChunksPlugin, FlagIncludedChunksPlugin, SideEffectsFlagPlugin, FlagDependencyExportsPlugin, FlagDependencyUsagePlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, WasmFinalizeExportsPlugin, OccurrenceOrderModuleIdsPlugin, OccurrenceOrderChunkIdsPlugin, DefinePlugin, TerserPlugin, OptimizeCssAssetsWebpackPlugin, TemplatedPathPlugin, RecordIdsPlugin, WarnCaseSensitiveModulesPlugin,  -LoaderTargetPlugin, -SingleEntryPlugin,  ManifestPlugin]

	14、make------>AsyncParallelHook,[HtmlWebpackPlugin, MultiEntryPlugin]
		childCompiler的make------>[SingleEntryPlugin]
    15、afterCompile------>AsyncSeriesHook,[]
    16、shoulEmit------SyncBailHook,["NoEmitOnErrorsPlugin"]
    17、emit------>AsyncSeriesHook,["HtmlWebpackPlugin",,"fork-ts-checker-webpack-plugin","OptimizeCssAssetsWebpackPlugin","ManifestPlugin"]
	18、afterEmit------>AsyncSeriesHook,[]
	19、done------>AsyncSeriesHook,["fork-ts-checker-webpack-plugin","fork-ts-checker-webpack-plugin","smp"]
    // 未触发
    20、additionalPass------>AsyncSeriesHook,[]
    21、failed------>SyncHook,[]
    22、watchRun------>AsyncSeriesHook,["fork-ts-checker-webpack-plugin","ManifestPlugin"]
    23、watchClose------>SyncHook,["fork-ts-checker-webpack-plugin"]
    24、invalid------>SyncHook,[]
```
# Compilation事件顺序
```js
	addEntry------>SyncHook,监听器：[]
	additionalAssets------>AsyncSeriesHook,监听器：[]
	afterOptimizeExtractedChunks------->SyncHook,监听器：[]
	assetPath------>SyncWaterfallHook,监听器：[]
	beforeChunkIds------>SyncHook,监听器：[]
	dependencyReference------>SyncWaterfallHook,[]
	failedEntry------>SyncHook,[]
	failedModule------>SyncHook,[]
	finishRebuildingModule------>SyncHook,[FlagDependencyExportsPlugin]
	moduleAsset------>SyncHook,[ManifestPlugin]
	needAdditionalPass------>SyncBailHook,[]
	needAdditionalSeal------>SyncBailHook,[]
	optimizeExtractedChunks------>SyncBailHook,[]
	optimizeExtractedChunksAdvanced------>SyncBailHook,["RemoveEmptyChunksPlugin"]
	optimizeExtractedChunksBasic------>SyncBailHook,["EnsureChunkConditionsPlugin","RemoveParentModulesPlugin","RemoveEmptyChunksPlugin"]
	rebuildModule------>SyncHook,["FlagDependencyExportsPlugin"]
	unseal------>SyncHook,[]

	// ---------------------------
	childCompiler------>监听器：[]
	finishModules------>SyncHook,监听器：[FlagDependencyExportsPlugin, WasmFinalizeExportsPlugin]
	seal------>SyncHook,监听器：[WarnCaseSensitiveModulesPlugin]
	optimizeDependenciesBasic------>SyncBailHook,监听器：[]
	optimizeDependencies------>SyncBailHook,监听器：[SideEffectsFlagPlugin, FlagDependencyUsagePlugin]
	optimizeDependenciesAdvanced------>SyncBailHook,监听器：[]
	afterOptimizeDependencies------>SyncHook,监听器：[]
	beforeChunks------>SyncHook,监听器：[]
	afterChunks------>SyncHook,监听器：[WebAssemblyModulesPlugin]
	optimize------>SyncHook,监听器：[]
	optimizeModulesBasic------>SyncBailHook,监听器：[]
	optimizeModules------>SyncBailHook,监听器：[]
	optimizeModulesAdvanced------>SyncBailHook,监听器：[]
	afterOptimizeModules------>SyncHook,监听器：[]
	optimizeChunksBasic------>SyncBailHook,监听器：[EnsureChunkConditionsPlugin, RemoveParentModulesPlugin, RemoveEmptyChunksPlugin, MergeDuplicateChunksPlugin]
	optimizeChunks------>SyncBailHook,监听器：[]
	optimizeChunksAdvanced------>SyncBailHook,监听器：[RemoveEmptyChunksPlugin]
	afterOptimizeChunks------>SyncHook,监听器：[]
	optimizeTree------>AsyncSeriesHook,监听器：[]
	afterOptimizeTree------>SyncHook,监听器：[]
	optimizeChunkModulesBasic------>SyncBailHook,监听器：[]
	optimizeChunkModules------>SyncBailHook,监听器：[ModuleConcatenationPlugin]
	optimizeChunkModulesAdvanced------>SyncBailHook,监听器：[]
	afterOptimizeChunkModules------>SyncHook,监听器：[]
	shouldRecord------>SyncBailHook,监听器：[NoEmitOnErrorsPlugin]
	reviveModules------>SyncHook,监听器：[RecordIdsPlugin]
	optimizeModuleOrder------>SyncHook,监听器：[OccurrenceOrderModuleIdsPlugin]
	advancedOptimizeModuleOrder------>SyncHook,监听器：[]
	beforeModuleIds------>SyncHook,监听器：[]
	moduleIds------>SyncHook,监听器：[]
	optimizeModuleIds------>SyncHook,监听器：[]
	afterOptimizeModuleIds------>SyncHook,监听器：[]
	reviveChunks------>SyncHook,监听器：[RecordIdsPlugin]
	optimizeChunkOrder------>SyncHook,监听器：[OccurrenceOrderChunkIdsPlugin]
	beforeChunksIds------>SyncHook,监听器：[]
	optimizeChunkIds------>SyncHook,监听器：[FlagIncludedChunksPlugin]
	afterOptimizeChunkIds------>SyncHook,监听器：[]
	recordModules------>SyncHook,监听器：[RecordIdsPlugin]
	recordChunks------>SyncHook,监听器：[RecordIdsPlugin]
	beforeHash------>SyncHook,监听器：[]
	chunkHash------>SyncHook,监听器：[]
	contentHash------>SyncHook,监听器：[JavascriptModulesPlugin]
	afterHash------>SyncHook,监听器：[]
	recordHash------>SyncHook,监听器：[]
	beforeModuleAssets------>SyncHook,监听器：[]
	shouldGenerateChunkAssets------>SyncBailHook,监听器：[]
	beforeChunkAssets------>SyncHook,监听器：[]
	chunkAsset------>SyncHook,[]
	additionalChunkAssets------>SyncHook,监听器：[]
	record------>SyncHook,监听器：[]
	additinalAssets------>AsyncSeriesHook,监听器：[]
	optimizeChunkAssets------>AsyncSeriesHook,监听器：[TerserPlugin, OptimizeCssAssetsWebpackPlugin]
	afterOptimizeChunkAssets------>SyncHook,监听器：[SourceMapDevToolPlugin]
	optimizeAssets------>AsyncSeriesHook,监听器：[]
	afterOptimizeAssets------>SyncHook,监听器：[]
	needAddtionalSeal------>
	afterSeal------>AsyncSeriesHook,监听器：[]
	buildModule------>SyncHook,监听器：[smp,SourceMapDevToolModuleOptionsPlugin,TerserPlugin]
	normalModuleLoader------>SyncHook,["smp","LoaderTargetPlugin","LoaderPlugin","LoaderTargetPlugin"]
	succeedModule------>SyncHook,[smp]
	succeedEntry------>SyncHook,[]
```
# 依次执行的内部插件
* `JsonpTemplatePlugin：`为compiler的thisCompilation事件注册监听器
```
    thisCompilation广播执行该插件，执行JsonpMainTemplatePlugin、JsonpChunkTemplatePlugin、JsonpHotUpdateChunkTemplatePlugin等插件
```
* `FetchCompileWasmTemplatePlugin：`为compiler的thisCompilation事件注册监听器
```
    
```
* `FunctionModulePlugin：`为compiler的compilation事件注册监听器
```
```
* `NodeSourcePlugin：`为compiler的compilation和afterResolvers事件注册监听器
```js
    /**
     * compilation和afterResolvers
     * 该插件为afterResolvers事件注册监听器
     * 执行：
     *  1、为compiler.resolverFactory.hooks.resolver事件注册监听器，涉及插件AliasPlugin
     * */ 
```
* `LoaderTargetPlugin：`为compiler的compilation事件注册监听器
```js
    /**
     * compilation和afterResolvers
     * */ 
```
* `WebWorkerTemplatePlugin：`为thisCompilation事件注册监听器
```
```
* `FetchCompileWasmTemplatePlugin：`为thisCompilation事件注册监听器
```
```
* `NodeTemplatePlugin：`为thisCompilation事件注册监听器
```
```
* `ReadFileCompileWasmTemplatePlugin：`为thisCompilation事件注册监听器
```
```
* `FunctionModulePlugin：`为compilation事件注册监听器
```
```
* `NodeTargetPlugin：`实际注册的是ExternalsPlugin
```
```
* `ExternalsPlugin：`为compile事件注册监听器
```
```
* `LibraryTemplatePlugin：`为thisCompilation事件注册监听器
```
```
* `EvalSourceMapDevToolPlugin：`为compilation事件注册监听器
```
```
* `SourceMapDevToolPlugin：`为compilation事件注册监听器
```
```
* `EvalDevToolModulePlugin：`为compilation事件注册监听器
```
```
* `JavascriptModulesPlugin：`为compilation事件注册监听器
```
```
* `JsonModulesPlugin：`为compilation事件注册监听器
```
```
* `WebAssemblyModulesPlugin：`为compilation事件注册监听器
```
```
* `EntryOptionPlugin：`为entryOption事件注册监听器
```js
    /**
     * entryOption：SyncBailHook
     * 该插件为entryOption事件注册监听器,监听器返回true
     * 执行：
     *  1、参数context = options.context = process.cwd();entry = options.entry（entry可以是string，array，object，function）
     *  2、如果entry参数是string | array | object，则使用itemToPlugin处理
     *      string：则执行插件SingleEntryPlugin，为compilation和make事件注册监听器
     *      object：则执行为每一项key执行一次SingleEntryPlugin，为compilation和make事件注册监听器
     *      array：则执行MultiEntryPlugin，为compilation和make事件注册监听器
     *  3、如果entry参数function，则执行DynamicEntryPlugin插件，为compilation和make事件注册监听器
     * 作用：
     * 
    */
   /**
    * EntryOptionPlugin
    *     ************ 类**************      
    *           EntryOptionPlugin       
    *     ************ 属性************
    *       无 
    *     ************ 操作 ***********
    *       apply(compiler): void
    *     *****************************
    */
   apply(compiler) {
		compiler.hooks.entryOption.tap("EntryOptionPlugin", (context, entry) => {
			if (typeof entry === "string" || Array.isArray(entry)) {
				itemToPlugin(context, entry, "main").apply(compiler);
			} else if (typeof entry === "object") {
				for (const name of Object.keys(entry)) {
					itemToPlugin(context, entry[name], name).apply(compiler);
				}
			} else if (typeof entry === "function") {
				new DynamicEntryPlugin(context, entry).apply(compiler);
			}
			return true;
		});
    }
     /**
    * SingleEntryPlugin
    *     ************ 类**************      
    *           SingleEntryPlugin       
    *     ************ 属性************
    *       this.context = context
    *       this.entry = entry
    *       this.name = name 
    *     ************ 操作 ***********
    *       apply(compiler): void
    *     *****************************
    */
   /**
    * MultiEntryPlugin
    *     ************ 类**************      
    *           MultiEntryPlugin       
    *     ************ 属性************
    *       this.context = context
    *       this.entry = entry（数组）
    *       this.name = name 
    *     ************ 操作 ***********
    *       apply(compiler): void
    *     *****************************
    */
   /**
    * DynamicEntryPlugin
    *     ************ 类**************      
    *           DynamicEntryPlugin       
    *     ************ 属性************
    *       this.context = context
    *       this.entry = entry(function)
    *     ************ 操作 ***********
    *       apply(compiler): void
    *     *****************************
    */
```
* `CompatibilityPlugin：`为compilation事件注册监听器
* `HarmonyModulesPlugin：`为compilation事件注册监听器
* `AMDPlugin：`为compilation和afterResolvers事件注册监听器
```js
    /**
     * compilation和afterResolvers
     * afterResolvers：SyncHook
     * 该插件为afterResolvers事件注册监听器
     * 执行：
     *  1、为compiler.resolverFactory.hooks.resolver事件注册监听器，涉及插件AliasPlugin
     * 作用：
     * */ 
    /**
    * AMDPlugin
    *     ************ 类**************      
    *           AMDPlugin       
    *     ************ 属性************
    *       this.amdOptions = amdOptions
    *       this.options = options
    *     ************ 操作 ***********
    *       apply(compiler): void
    *     *****************************
    */
   compiler.hooks.compilation.tap(
			"AMDPlugin",
			(compilation, { contextModuleFactory, normalModuleFactory }) => {
				compilation.dependencyFactories.set(
					AMDRequireDependency,
					new NullFactory()
				);
				compilation.dependencyTemplates.set(
					AMDRequireDependency,
					new AMDRequireDependency.Template()
				);

				compilation.dependencyFactories.set(
					AMDRequireItemDependency,
					normalModuleFactory
				);
				compilation.dependencyTemplates.set(
					AMDRequireItemDependency,
					new AMDRequireItemDependency.Template()
				);

				compilation.dependencyFactories.set(
					AMDRequireArrayDependency,
					new NullFactory()
				);
				compilation.dependencyTemplates.set(
					AMDRequireArrayDependency,
					new AMDRequireArrayDependency.Template()
				);

				compilation.dependencyFactories.set(
					AMDRequireContextDependency,
					contextModuleFactory
				);
				compilation.dependencyTemplates.set(
					AMDRequireContextDependency,
					new AMDRequireContextDependency.Template()
				);

				compilation.dependencyFactories.set(
					AMDDefineDependency,
					new NullFactory()
				);
				compilation.dependencyTemplates.set(
					AMDDefineDependency,
					new AMDDefineDependency.Template()
				);

				compilation.dependencyFactories.set(
					UnsupportedDependency,
					new NullFactory()
				);
				compilation.dependencyTemplates.set(
					UnsupportedDependency,
					new UnsupportedDependency.Template()
				);

				compilation.dependencyFactories.set(
					LocalModuleDependency,
					new NullFactory()
				);
				compilation.dependencyTemplates.set(
					LocalModuleDependency,
					new LocalModuleDependency.Template()
				);

				const handler = (parser, parserOptions) => {
					if (parserOptions.amd !== undefined && !parserOptions.amd) return;

					const setExpressionToModule = (outerExpr, module) => {
						parser.hooks.expression.for(outerExpr).tap("AMDPlugin", expr => {
							const dep = new AMDRequireItemDependency(module, expr.range);
							dep.userRequest = outerExpr;
							dep.loc = expr.loc;
							parser.state.current.addDependency(dep);
							return true;
						});
					};

					new AMDRequireDependenciesBlockParserPlugin(options).apply(parser);
					new AMDDefineDependencyParserPlugin(options).apply(parser);

					setExpressionToModule("require.amd", "!!webpack amd options");
					setExpressionToModule("define.amd", "!!webpack amd options");
					setExpressionToModule("define", "!!webpack amd define");

					parser.hooks.expression
						.for("__webpack_amd_options__")
						.tap("AMDPlugin", () =>
							parser.state.current.addVariable(
								"__webpack_amd_options__",
								JSON.stringify(amdOptions)
							)
						);
					parser.hooks.evaluateTypeof
						.for("define.amd")
						.tap(
							"AMDPlugin",
							ParserHelpers.evaluateToString(typeof amdOptions)
						);
					parser.hooks.evaluateTypeof
						.for("require.amd")
						.tap(
							"AMDPlugin",
							ParserHelpers.evaluateToString(typeof amdOptions)
						);
					parser.hooks.evaluateIdentifier
						.for("define.amd")
						.tap(
							"AMDPlugin",
							ParserHelpers.evaluateToIdentifier("define.amd", true)
						);
					parser.hooks.evaluateIdentifier
						.for("require.amd")
						.tap(
							"AMDPlugin",
							ParserHelpers.evaluateToIdentifier("require.amd", true)
						);
					parser.hooks.typeof
						.for("define")
						.tap(
							"AMDPlugin",
							ParserHelpers.toConstantDependency(
								parser,
								JSON.stringify("function")
							)
						);
					parser.hooks.evaluateTypeof
						.for("define")
						.tap("AMDPlugin", ParserHelpers.evaluateToString("function"));
					parser.hooks.canRename
						.for("define")
						.tap("AMDPlugin", ParserHelpers.approve);
					parser.hooks.rename.for("define").tap("AMDPlugin", expr => {
						const dep = new AMDRequireItemDependency(
							"!!webpack amd define",
							expr.range
						);
						dep.userRequest = "define";
						dep.loc = expr.loc;
						parser.state.current.addDependency(dep);
						return false;
					});
					parser.hooks.typeof
						.for("require")
						.tap(
							"AMDPlugin",
							ParserHelpers.toConstantDependency(
								parser,
								JSON.stringify("function")
							)
						);
					parser.hooks.evaluateTypeof
						.for("require")
						.tap("AMDPlugin", ParserHelpers.evaluateToString("function"));
				};

				normalModuleFactory.hooks.parser
					.for("javascript/auto")
					.tap("AMDPlugin", handler);
				normalModuleFactory.hooks.parser
					.for("javascript/dynamic")
					.tap("AMDPlugin", handler);
			}
        );
        // afterResolvers事件监听器
		compiler.hooks.afterResolvers.tap("AMDPlugin", () => {
			compiler.resolverFactory.hooks.resolver
				.for("normal")
				.tap("AMDPlugin", resolver => {
					new AliasPlugin(
						"described-resolve",
						{
							name: "amdefine",
							alias: path.join(
								__dirname,
								"..",
								"..",
								"buildin",
								"amd-define.js"
							)
						},
						"resolve"
					).apply(resolver);
					new AliasPlugin(
						"described-resolve",
						{
							name: "webpack amd options",
							alias: path.join(
								__dirname,
								"..",
								"..",
								"buildin",
								"amd-options.js"
							)
						},
						"resolve"
					).apply(resolver);
					new AliasPlugin(
						"described-resolve",
						{
							name: "webpack amd define",
							alias: path.join(
								__dirname,
								"..",
								"..",
								"buildin",
								"amd-define.js"
							)
						},
						"resolve"
					).apply(resolver);
				});
		});
```
* `CommonJsPlugin：`为compilation事件注册监听器
* `LoaderPlugin：`为compilation事件注册监听器
* `NodeStuffPlugin：`为compilation事件注册监听器
* `RequireJsStuffPlugin：`为compilation事件注册监听器
* `APIPlugin：`为compilation事件注册监听器
* `ConstPlugin：`为compilation事件注册监听器
* `UseStrictPlugin：`为compilation事件注册监听器
* `RequireIncludePlugin：`为compilation事件注册监听器
* `RequireEnsurePlugin：`为compilation事件注册监听器
* `RequireContextPlugin：`options.resolve.modules、extensions、mainFiles，为compilation事件注册监听器
* `ImportPlugin：`为compilation事件注册监听器
* `SystemPlugin：`为compilation事件注册监听器
* `WarnNoModeSetPlugin：`为thisCompilation事件注册监听器
* `EnsureChunkConditionsPlugin：`为compilation事件注册监听器
* `RemoveParentModulesPlugin：`为compilation事件注册监听器
* `RemoveEmptyChunksPlugin：`为compilation事件注册监听器
* `MergeDuplicateChunksPlugin：`为compilation事件注册监听器
* `FlagIncludedChunksPlugin：`为compilation事件注册监听器
* `SideEffectsFlagPlugin：`为compilation和normalModuleFactory事件注册监听器
* `FlagDependencyExportsPlugin：`为compilation事件注册监听器
* `FlagDependencyUsagePlugin：`为compilation事件注册监听器
* `ModuleConcatenationPlugin：`为compilation事件注册监听器
* `SplitChunksPlugin：`为thisCompilation事件注册监听器
* `RuntimeChunkPlugin：`为thisCompilation事件注册监听器
* `NoEmitOnErrorsPlugin：`为compilation和shouldEmit事件注册监听器
* `WasmFinalizeExportsPlugin：`为compilation事件注册监听器
* `NamedModulesPlugin：`为compilation事件注册监听器
* `HashedModuleIdsPlugin：`为compilation事件注册监听器
* `OccurrenceModuleOrderPlugin：`为compilation事件注册监听器
* `NaturalChunkOrderPlugin：`为compilation事件注册监听器
* `OccurrenceChunkOrderPlugin：`为compilation事件注册监听器
* `NamedChunksPlugin：`为compilation事件注册监听器
* `DefinePlugin：`为compilation事件注册监听器
* `SizeLimitsPlugin：`为afterEmit事件注册监听器
* `TemplatedPathPlugin：`为compilation事件注册监听器
* `RecordIdsPlugin：`为compilation事件注册监听器
* `WarnCaseSensitiveModulesPlugin：`为compilation事件注册监听器
* `CachePlugin：`为thisCompilation事件注册监听器