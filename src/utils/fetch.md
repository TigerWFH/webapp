# 关于 fetch ，用于访问和操纵 HTTP 管道的一些具体部分。是一种简单、合理的跨网异步获取资源。涉及 Response、Request、Header、Body 等

## BS 架构

```js
/*
    B-S架构：
    Javascript------》准备http请求数据------》UserAgent（Browser）
                                                |
                                                |
    Java、Php 《------ 接收的http数据《------ Server（Tomcat等等）
    |
    |
    Java、Php处理请求，并准备http响应数据 ------》Server-----》UserAgent----》Javascript

    进行通信的是B-S，前端和服务端只是准备数据的

*/
```

## HTTP 协议结构

```js
/*
 *1、 http协议报文实体基本结构：
 * ---------------------------
 *  请求行: 请求方法、URL字段、协议版本
 *  请求头：各种header
 *  空行：请求头结束标识
 *  请求体：请求数据
 *
 *  请求结构实体：
 *      请求方法 空格 URL 空格 协议版本 回车符 换行符
 *      头部字段名:值 回车符 换行符
 *      ...
 *      头部字段名:值 回车符 换行符
 *      回车符 换行符
 *      请求正文
 * 2、http协议响应实体基本结构
 * ---------------------------
 *  响应行（status line）：协议版本 状态码 描述
 *  响应头（header line）：
 *  响应体（entity body）：响应消息体
 *
 *  协议版本 空格 状态码 空格 状态码描述 回车符 换行符
 *  头部字段:值 回车符 换行符
 *  ...
 *  头部字段: 值 回车符 换行符
 *  回车符 换行符
 *  响应正文
 *  注意：---------------------------
 *  HTTP协议中的方法：
 *  HTTP1.0定义了三种请求方法：GET、POST和HEAD
 *  HTTP1.1定义了5中请求方法：OPTIONS、PUT、DELETE、TRANCE和CONNECT
 *  HTTP2.0协议解析采用新的二进制格式，HTTP1.x解析基于文本
 *          请求体   响应体     安全     幂等   可缓存   表单支持
 *  POST     有      有        否       否      条件    是
 *  PUT      有      无        否       是      否      否
 *  PATCH    有      无         否      否      否      否
 *  DELETE   支持   支持        否       是      否      否
 *  GET      无      有        是       是      是      是
 *  HEAD     无       无      是       是       是      否
 *  OPTIONS  无      有      是         是      否      否
 *  TRACE    无      无        否        是      否     否
 *  CONNECT  无      有        否      否       否      否
 */
```

## fetch 请求的结果是一个 promise

- `fetch支持CORS和HTTP扩展`
- `fetch不支持同步请求`
- `fetch不支持中断请求，XMLHttpRequest.abort配合服务端`
- `fetch不支持查看请求进度， XMLHttpRequest.onprogress可以`
- `Response 还限制了响应内容的重复读取和转换，同一个response只能json、text等其他操作一次`
- `规范规定 遇到网络问题或者 fetch 被中断时，fetch 会 reject，其余都是 resolve`
- `http status：`本身融合通信状态和业务状态
- `fetch：`对 http status 做了屏蔽，只关心通信状态。通信成功 resolve，失败 reject
- `fetch提供了Response、Request、Header、Body等接口处理相关操作`

```js
/*
    reject场景：
        1、代理（比如浏览器）断网
        2、服务器未启动
        3、域名无法解析
        总结就是：TCP链接没有建立起来
    其余都进入resolve场景，与http status无关，但response: Response提供了ok字段，用来判断http status状态
        response = {
            headers: Header对象
            redirected: 标识response是否来自一个重定向
            type: response的类型，例如basic, cors
            url: 包含response的URL
            status: number， response的状态码
            statusText: string, 与HTTP状态码消息对应
            ok: boolean，检查response.status是否在200-299这个范围
            body: ReadableStream

            clone()
            error()
            redirect()
            // body接口实现，即以下函数是对应的数据解析方法
            arrayBuffer()
            blob()
            formData()
            json()
            text()

        }
        1、response.ok = true 表示 200-299，服务器正确处理请求
        2、response.ok = false 表示其它 http status，表示服务器处理异常
        数据解析方式要根据content-type决定

*/
```

## GET 和 POST

GET 和 POST 等方法基于 TCP 通信，本质上没有区别。只是 http 规范做了规范约定，约定了不同方法引起不同的操作

- GET 和 OPTION：将请求参数写入 url，切进行 url 编码。content-type: application/x-www-url-encoded；GET 产生一个 TCP 数据包
- POST 等方法：将参数写入 request body; POST 产生两个 TCP 数据包（复杂请求的预请求 options）

## http 协议规定，post 数据必须放在 body 中，但没有规定编码方案

- `Content-Type：服务端根据请求中的 Content-Type 字段，获取编码方案`

```js
/*
 * 3、Content-Type：请求实体对应的MIME信息(GET没有请求实体)
 * 3-1、Content-Type即InternetMediaType，互联网媒体类型，也叫做MIME类型。HTTP在网络上传输数据对象时，会打上MIME的数据格式标签，用于区分数据类型
 * 3-2、Content-Type的格式
 *      Content-Type: type/subtype; parameter
 *      type：主类型，任意的字符串。如text,*代表所有
 *      subtype：子类型，任意字符串。如html,json,*代表所有
 *      parameter：可选参数，例如charset,boundary等
 *
 *      Demos：
 *          Content-Type: text/html
 *          Content-Type: image/jpeg
 *          Content-Type: application/javascript
 * 3-3、HTTP中常用的MIME类型以及对应的编码方案
 *      application/x-www-form-urlencoded：数据被编码为key1=value1&key2=value2形式
 *      multipart/form-data：会生成boundary用于分割不同的字段，在请求实体里每个参数以------boundary开始，然后附加信息和参数名，然后是空行，最后是参数内容
 *          使用FormData传输数据
 *      applicetion/json: 轻量级数据格式，以key-value形式组织数据
 *          JSON
 *      text/plain：request payload（HTML5增加数据已纯文本方式进行编码，其中不含任何空间或格式字符
 *
 *      至于编码后的数据，get拼接到url上（数据暴露）；post放到body中
 */
```

- `图片或文件上传方案`

```js
/*
    1、使用base64上传图片，对应application/json
    2、使用二进制流上传图片或文件，对应multipart/form-data
*/
```
