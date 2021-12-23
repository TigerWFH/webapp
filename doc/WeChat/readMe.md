# 微信小程序开发
## 使用场景问题
```js
    /*
        场景：
            微信小程序中的H5页面唤醒非自身小程序。
        参考文档：
            https://developers.weixin.qq.com/community/develop/doc/000a6eec018c8843dc691d56e56009
        结论：
            1、微信小程序中承载H5页面的容器web-view不支持跳转非自身的小程序。只能跳转当前小程序页面。
            2、微信小程序之前是可以相互唤起的

            wx.miniProgram.navigateTo()跳转小程序自身页面
            wx.navigateToMiniProgram(Object obect)可以跳转另外一个小程序

            H5无法直接唤醒另一个微信小程序，只能通过微信小程序中间页的方式
        -----------------------------------------------------------------------------
    */ 
```
## 微信公众号
```js
    /*
        微信公众号分类：
            订阅号：定位于消息内容资讯的发布
                普通订阅号：个人，免费
                认证订阅号：偏向于资讯发布主体，允许菜单外链，300元/年
            服务号：定位于需要有交互能力服务内容的企业
                普通服务号：企业，简单内容展示，允许菜单外链，苗费
                认证服务号：企业，交互功能，支持微信支付，支持高级开发，300元/年
    */ 
```
## 2017年1月9日，微信小程序正式上线
## mp.weixin.11.com：公众平台，可以申请 公众号账号、申请 小程序账号。但不同账号可以登录公众号平台或小程序平台。是给运行在微信内的网页&小程序，提供使用微信接口的能力
## open.weixin.qq.com：开发平台，可以通过UnionID机制，将app、小程序、公众号、网页等绑定在一起，获取一个唯一的参数就是unionID，为了将这些应用打通。微信开放平台 是给非微信内的应用，提供使用微信能力。其中，非微信内的应用是指包括：独立的app，第三方网站（通常是pc站）等。使用的核心能力，主要是授权登录、微信支付、分享朋友圈等等
## 微信账户体系：unionID，openID，appID
* `appID：`区分不同的应用，App、公众号、小程序、第三方网站
* `openID`：通过一个微信用户在不同的应用中会有不同的openID，如果把这些应用关联到同一个开放平台，那么他们扣回有相同的unionID
* `unionID`：不同的应用之间，可以通过unionID确定唯一用户

```js
    /*
        在微信的账户体系中，主要涉及3个东西：unionID、openID、appID在微信开放平台上，可以绑定自己的App、公众号、第三方网站等，把他们通过开放平台关联起来其中，不同的应用（包括App、公众号等），会分配唯一的appID，通过 appID 来对应用做区分同一个用户在不同的应用里，会拥有不同的openID。不过，如果把这些应用关联到同一个开放平台，那么他们就会有相同的unionID。不同的应用之间，我们可以通过unionID来确定唯一用户PS：注意，在开放平台绑定App或是公众号等应用时，最好要确保他们都是同一个主体（也就是上传的主体证件/公司信息是一样的），不然部分权限会申请不下来，到时候换主体就麻烦了~
    */ 
```
## 微信小程序技术构成
```js
    /*
        JSON做配置
        CSS+XML实现视图的描述
        Javascript语言实现逻辑层结构
    */ 
```
* `微信js-sdk：`微信JS-SDK是 微信公众平台 面向网页开发者提供的基于微信内的网页开发工具包
> 业务性功能需要通过wx.config进行JS-SDK权限校验

> 非业务性功能不需要JSSDK权限校验

> 如果使用的是小程序云开发静态网站托管的域名的网页，可以免鉴权直接跳任意合法合规小程序，调用 wx.config 时 appId 需填入非个人主体的已认证小程序，不需计算签名，timestamp、nonceStr、signature 填入非空任意值即可
```js
/*
    在使用微信JS-SDK对应的JS接口前，需确保已获得JS接口的权限。
    所有的JS接口只能在 企业号 应用的可信域名下调用(包括子域名)，可在企业号应用中心里设置应用可信域名
    1、引入JS-SDK文件
    2、通过config接口注入权限校验配置
        所有需要使用JS-SDK的页面必须先注入配置信息，否则将无法调用（同一个url仅需调用一次，对于变化url的SPA的web app可在每次url变化时进行调用,目前Android微信客户端不支持pushState的H5新特性，所以使用pushState来实现web app的页面会导致签名失败，此问题会在Android6.2中修复）
*/ 
    wx.config({
        debug: true,
        appId: "". // 必填，企业号的唯一标识
        timestamp: "", // 必填，生成签名的时间戳
        nonceStr: "", // 必填，生成签名的随机串
        signature: "", // 必填，签名
        jsApiList: [] // 必填，需要使用的JS接口列表
    })
/*
    关于签名：https://qydev.weixin.qq.com/wiki/index.php?title=%E5%BE%AE%E4%BF%A1JS-SDK%E6%8E%A5%E5%8F%A3
        1、access_token：是企业号的全局唯一票据，调用接口时需要携带AccessToken。需要用GroupID和Secret换取。常规情况，access_token有效期是7200s。请求方式：
            https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=id&corpsecret=secrect
            corpid：企业ID，每个企业号拥有唯一的CorpID
            corpsecret：管理组的凭证。secret是管理组凭证密钥，系统管理员在企业号管理后台创建管理组时，企业号后台为该管理组分配一个唯一的secret。通过该secret能够确定管理组，及管理组所拥有的对应用、通讯录、接口的访问权限。
        2、jsapi_ticket：是企业号用于调用微信JS接口的临时票据，常规有效期是7200s，通过access_token获取。由于获取jsapi_ticket的api调用次数非常有限，频繁刷新jsapi_ticket会导致api调用受限，影响自身业务，开发者必须在自己的服务全局缓存jsapi_ticket。请求方式：
            https://qyapi.weixin.qq.com/cgi-bin/get_jsapi_ticket?access_token=ACCESS_TOKEN
        3、获取jsapi_ticket之后，生成签名
        需要鉴权的jsApiList接口：https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#63

*/ 
/*
    通过ready接口处理成功验证
*/ 
    wx.ready(function() {
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中
    })
/*
    通过error接口处理失败验证
*/ 
    wx.error(function(res) {

    })
/*
    非业务功能性接口：https://developers.weixin.qq.com/miniprogram/dev/component/web-view.html
    web-view网页中可使用JSSDK@1.3.2提供的
*/ 
    wx.miniProgram.navigateTo
    wx.miniProgram.navigateBack
    wx.miniProgram.switchTab
    wx.miniProgram.reLaunch
    wx.miniProgram.redirectTo
    wx.miniProgram.postMessage
    wx.miniProgram.getEnv
```
* `项目目录结构：`
```js
    /*
    ------------------------------------------------------------------------------------
        小程序1.6.3开始，支持自定义组件
        1、创建自定义组件
            自定义组件包括json,wxml,wxss,js四个文件
            json文件声明组件："component": true
            wxml文件：编写组件模板
            wxss文件：组件样式
            js文件：使用Component()注册组件，包括组件状态和逻辑
        2、页面使用自定义组件
            在页面JSON文件中进行声明
            {
                "usingComponents": {
                    "component-tag-name": "path/to/the/custom/component"
                }
            }
    ------------------------------------------------------------------------------------
        project
            components
                chatroom
                    chatroom.js
                    chatroom.json
                    chatroom.wxml
                    chatroom.wxss
                    dots.gif
                    photo.png
            images
            pages
                demo
                    demo.js // Page({})
                    demo.json
                    demo.wxml
                    demo.wxss
            style
            app.js // 小程序入口，即App({})
            app.json // 小程序项目配置（微信提供），配置页面以及路由；配置global对象；其它配置
            app.wxss // 全局样式，可以通过@import导入
            sitemap.json
    */ 
```
## 开发预备
* `注册小程序账号`
[注册小程序](https://mp.weixin.qq.com/cgi-bin/registermidpage?action=index&lang=zh_CN&token=)
* `账号信息：`
```js
    /*
        AppId：小程序ID
    */ 
```
* `H5调用微信sdk步骤`
```js
    /*
        1、绑定域名：登录微信公众平台，功能设置填写"JS接口安全域名"
        2、引入JS文件
        3、通过微信config接口注入权限验证配置
        4、通过ready接口处理成功验证

        微信登录接口：wx.login
        检测登录态：wx.checkSession
        小程序跳转：wx.navigateToMiniProgram，打开另一个小程序
        返回：wx.navigateBackMiniProgram，返回到上一个小程序

    */ 
```
