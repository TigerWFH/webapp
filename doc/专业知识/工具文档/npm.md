# npm

## 参考资料

[文档](https://docs.npmjs.com/about-packages-and-modules)

> npm 包是 CommonJS 规范的一部分<https://segmentfault.com/a/1190000018888081>

> npm 由三部分组成，分别是网站（https://www.npmjs.org）、命令行工具（CLI）和注册表（https://www.npmjs.org/signups）

## npm 依赖安装

> - `npm@2会安装每一个依赖包的所有依赖。依赖树的逻辑结构和物理结构保持一致。`

```js
/* 
  project A
    ------node_modules
                ---ProjectB
                    ---node_modules
                            ---ProjectC@1
                ---ProjectC@2
                    ---node_modules
                            ---ProjetE@1
                ---ProjectD
                    ---node_modules
                            ---ProjectE@2
                ---ProjectE@2
 */
```

> - `npm@3才用了扁平依赖关系树。依赖树的逻辑结构和物理结构可能不一致。npm必须为所有使用到的模块构建一个完整的依赖关系树，这是一个耗时的操作，是npm安装速度慢的一个很重要的原因`

```js
/*
    并未完全消除冗余
        Project
            ---node_modeuls
                ---A
                    ---E@1
                ---B
                    ---E@1
                ---E@2
    通过npm dedupe处理，但是依然会遗留问题

 */
```

> - ``
> - ``
> - ``

## npm 配置文件

```js
/*
        项目配置文件：${PROJECT_DIR}/.npmrc
        用户配置文件：${HOME}/.npmrc
        系统配置文件：${PREFIX}/etc/npmrc
        npm内置配置：${NPM_PATH}/npmrc
    */
```

## npm 配置项<https://www.npmjs.cn/misc/config/>

> npm 包可以分为客户端、服务端、客户单和服务端混合的包。主流模块规范时 CommonJS 和 ESM。
> JS 文件后缀.mjs 和.js，优先加载.mjs

- `main：`定义 CommonJS 规范下的入口文件，browser 环境和 node 环境均可使用。使用 require()引入时优先检查该字段。如果 main 字段不存在，Node 按照模块文件定位的规则依次查找包目录下的 index.js、index.node、index.json；
  [main, module, browser, unpkg 资料](https://github.com/webpack/webpack/issues/5673)

- `module：`定义 npm 包的 ESM 规范的入口文件，browser 环境和 node 环境均可使用
- `browser：`定义 npm 包在 browser 环境下的入口文件<https://github.com/defunctzombie/package-browser-field-spec>
- `unpkg`
- `exports:`可以指定当 import \*\*时，导入的模块<https://webpack.docschina.org/guides/package-exports/>，代替了 main 字段，

## Scoped packages and scope modules

```js
/*
        1、关于scoped packages
            所有的npm包都有名字。
            npm通过scope组织管理一组相关联的包
            @somescope/somepackagename
        2、installing scoped packages
            scoped packages安装在node_modules/@somescope/目录下
            npm install @scope/scopepackage
            // package.json
            "dependencies": {
                "@scope/scopepackage": "1.3.0"
            }
        3、using scoped packages
            require("@scope/scopepackage")
        4、publish
            clis或者npm@2发布，可以发布到任何npm仓库
        5、应用场景
            公司的私有仓库，使用统一的scope定义在私有仓库。并在私有仓库中定义私有包。
        6、私有仓库和公共仓库共存配置：
            私有仓库使用scope：@wfh，仓库地址是https://registry.github.com/tigerwfh/
            可在配置文件中进行配置：
            // .npmrc
            registry=https://registry.npm.taobao.org
            @wfh:registry=https://registry.github.com/tigerwfh/
        7、npm原生支持多用户登陆
            // 配置私有仓库
            npm login --registry=https://registry.github.com/tiger/ --scope=@wfh
            npm install和npm publish会进行识别
        注意：
            命名空间scope和仓库是两个问题
            具有命名空间的包可以存放到公共npm仓库，也可以存放到私有仓库
    */
```

## 搭建 npm 私有仓库:使用 nexus 搭建 npm 包私有仓库<https://www.cnblogs.com/tuituji27/p/11171780.html>

```js
/*
        1、工具集：npm、verdaccio搭建自己的私有仓库
            npm init --scope=@wfh
        2、
    */
```

## npm packages and npm modules

### npm package

> A package is a file or directory that is described by a package.json file. A package must contain a package.json file in order to be published to the npm registry.

### npm module：node_modules 下的文件或目录就是 npm module，更准确讲，可以被 nodejs 并不是所有的 module 就是 package，只有包含了 package.json 才算是 npm package

> A module is any file or directory in the node_modules directory that can be loaded by the Node.js require() function.To be loaded by the Node.js require() function, a module must be one of the following:
> A folder with a package.json file containing a "main" field.
> A JavaScript file.

### package.json

```js
/*
name:
version:可以被node-semver<https://github.com/npm/node-semver>解析，符合语义化版本规范<https://semver.org/>
description:
keywords:
homepage:
bugs:
    url:
    email:
license:
funding:
files:
main: Node模块
browser: 客户端模块
bin:可执行文件，会被自动安转到path
man:
directories:
repository:
scripts: 定义脚本命令，使用npm run执行
config:
<https://penx.medium.com/managing-dependencies-in-a-node-package-so-that-they-are-compatible-with-npm-link-61befa5aaca7>

dependencies: 项目运行时所依赖的模块
devDependencies: 项目开发时所依赖的模块
peerDependencies: 当前项目期待所在宿主环境提供的依赖
peerDependenciesMeta:
bundledDependencies:
optionalDependencies:

engines:
os:
cpu:
private:
publishConfig:
workspaces:
*/
/*
    关于npm link
    项目：my-app,my-lib,third-party-lib
    my-app通过npm link依赖my-lib
    my-lib依赖third-party-lib（devDependencies，peerDependencies）
    依赖树：
        my-app
            node_modules
                my-lib(symlink)
                third-party-lib
        my-lib
            node_modules
                third-party-lib
    node-dependency-resolution意味着my-lib和my-app使用的third-party-lib是不一样的
    这样会产生问题：third-party-lib需要一个global实例时，会重复

    如果my-lib没有devDependencies，就这样了
        my-app
            node_modules
                my-lib(symlink)
                third-party-lib
        my-lib
    但是webpack打包会产生问题

    symlink，node 有一个--preserve-symlinks参数，该参数会让node将symlink当做一个子目录，既my-lib是my-app的依赖目录
    或者webpack resolve.symlinks设置为false，产生如下依赖书
        my-app 
            node_modules
                my-lib
                    node_modules
                        third-party-lib
                third-party-lib
    运行npm dedupe命令处理依赖重复问题，但无法处理软连接
    lerna做了hoisting，解决这个问题
    webpack：
        通过webpack aliases为duplicated的包做别名
        增加duplicate-package-checker插件做提示
        resolve: {
            alias: {
                react: path.resolve('./node_modules/react'),
                'react-dom': path.resolve('./node_modules/react-dom')
            }

场景2：
    my-app
        node_modules
            liba@1.0.0
        my-lib
            node_modules
                liba@2.0.0
    webpack 和 node 的module resolution是一样的，先查询当前目录下的node_moduoes查找依赖，找不到回溯到上一层的node_moduels查找依赖，直到根目录
    webpack打包，会把liba@2.0.0和liba@1.0.0都打包进去，这就产生了一个问题：liba包邮全局变量时，会产生冲突？？
场景3：
    liba全局变量冲突问题
        
        
*/
```

## node dependency resolution(module rsolution)<https://nodejs.org/api/modules.html#modules_loading_from_node_modules_folders>

<https://medium.com/@vcarl/problems-with-npm-link-and-an-alternative-4dbdd3e66811>

## npm 命令行工具

- `npm install：`该命令安装依赖以及依赖的依赖，依赖安装依据 npm-shrinkwrap.json，package-lock.json，yarn.lock 优先级

```js
/*
    npm package定义：
        文件夹：含有package.json的文件夹
        压缩包：含有package.json的压缩包
        url：可以下载到含有package.json压缩包的url
        仓库：name@version形式发布在仓库的包
            name@tag形式
            name包含最新lastest tag
        git remote url，同url
    
    npm install：在本地node_modules目录安装依赖，默认安装dependencies和devDependencies中的所有包
    npm install -g(--global)在全局安装
    npm install --production(NODE_ENV=production)，只安装dependencies
    npm install --production=false，安装dependencies和devDependencies
    
    npm install 默认（-P，--save-prod）保存在dependencies中
        -D, --save-dev保存在devDependencies
        -O, --save-optional, optionalDependencies
        --no-save,不保存到dependencies
        -E, --exact，dependencies
        -B, --save-bundle

    需要手动维护peerDependencies
<https://stackoverflow.com/questions/18875674/whats-the-difference-between-dependencies-devdependencies-and-peerdependencies>
dependencies are installed on both:
    npm install from a directory that contains package.json
    npm install $package on any other directory
devDependencies are:
    also installed on npm install on a directory that contains package.json, unless you pass the --production flag (go upvote Gayan Charith's answer).
    not installed on npm install "$package" on any other directory, unless you give it the --dev option.
    are not installed transitively.
peerDependencies:
    before 3.0: are always installed if missing, and raise an error if multiple incompatible versions of the dependency would be used by different dependencies.
    expected to start on 3.0 (untested): give a warning if missing on npm install, and you have to solve the dependency yourself manually. When running, if the dependency is missing, you get an error (mentioned by @nextgentech)
    in version 7 peerDependencies are automatically installed unless an upstream dependency conflict is present that cannot be automatically resolved
总结：（已经验证过了）
    
    npm install会安装dependencies和依赖的dependencies
    npm install会安装devDependencies（--production=false就不安装了），但决不会安装依赖的devDependencies
    npm版本不同，对peerDependencies侧策略不同，3-6不主动安装
*/
```

- `npm outdated:`展示依赖名，安装依赖版本，devpendencies 依赖版本，最新依赖版本，位置
- `npm pack`

## third-party

- `commander`
- `chalk`
- `git-clone`
- `semver`
- ``
- ``
- ``
