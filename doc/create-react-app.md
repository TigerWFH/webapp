# 分析create-react-app脚手架项目
## 关于静态资源路径
* webpack运行前会先运行env、paths文件，env会运行paths
* first，分析paths
```
    预备知识，commonjs的模块知识
    1、require载入模块，会运行js，计算出最终状态的导出对象；同时会把结果缓存在require.cache中，每次载入模块前，都会先读cache，key=require('XXX')
    2、require.cache可以使用delete清除缓存模块（不要手动delete nodejs模块，会出错）,delete require.cache[require('XXX')]
    3、环境变量：Mac可以直接在终端使用export NODE_ENV=XXXXX;也可以使用配置文件/etc/profile;/etc/paths;~/.bash_profile;~/.bash_login;
    ~/.profile;~/.bashrc
    4、public path：即web静态资源的服务路径
    5、dotenv是nodejs下的一个模块，功能：可以通过.env文件增添nodejs的环境变量
    6、dotenv-expandupdate已经存在的process.env环境变量

    paths的解析：
    1、appDirectory设置为nodejs进程目录
    2、以appDirectory为根路径，使用path.resolve解析目标绝对路径
    3、public path配置点1：获取环境配置的PUBLICK_URL(可以配置process.env.PUBLICK_URL)，即envPublicUrl
    4、public path配置点2：package.json中的homepage，即publicUrl
    5、获取服务路径优先级：envPublicUrl > publicUrl > './'

    paths模块作用：导出各个目标文件夹的绝对路径，其中public path有两个配置点即process.env.PUBLIC_URL，PACKAGE.homepage，没有配置使用'./'兜底

    env的解析：
    1、require paths
    2、delete require.cache[require.resolve('./paths')]
    3、读入NODEJS环境变量process.env.NODE_ENV
    4、读取目录下VERSION的版本号
    5、读取dotenv的四个配置文件（NODE_ENV=['development','test','pre','production']，只看到测试环境判断NODE_ENV !== 'test'）
        5-1：.env
        5-2：.env.$NODE_ENV.local
        5-3：.env.$NODE_ENV
        5-4：.env.local（测试环境不存在）
        所有环境通用配置，放在.env中；环境相关配置，放在对应的环境配置文件中。
        .env.*.local系列属于项目级配置，优先级较高
        .env.*系列属于工程级配置，所有项目共享，优先级低
    6、处理NODE_PATH（没看明白意图是什么，注释说：推荐从NODE_PATH中resolve modules）
    7、处理NODE_ENV和REACT_APP_XXX环境变量，并通过DefinePlugin插件，注入到编译时期全局变量

    env模块作用：
        1、根据配置文件.env，.env.local，.env.$NODE_ENV，.env.$NODE_ENV.local，配置环境变量process
        2、根据process.env配置的React_APP_XXX变量，使用Webpack的DefinePlugin注入到应用中
        3、默认注入的数据
            NODE_ENV: process.env.NODE_ENV || 'development'
            PUBLIC_URL: publicUrl(paths中的资源路径)
            APP_VERSION: app_version（VERSION的版本）
        4、导出数据对象raw和stringified
            raw：
            stringified = {process.env: {key: JSON.stringify(value)}}使用JSON序列化后的raw，方便使用DefinePlugin
        5、放出了配置编译时期全局变量的入口：在.env中配置以React_APP_开头的变量
```
* publicPath
* publicUrl