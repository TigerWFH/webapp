# 关于 http

## 参考资料

## https

> http over ssl（主要任务是提供私密性，信息完整性和身份认证）

```js
/*
  HTTP  SMTP   FTP
  --------------------
  Secure Socket Layer -------------->SSL
  --------------------
  TCP/IP Layer
*/
```

### SSL<https://www.cnblogs.com/outsider0606/p/14621832.html>

> SSL 握手协议：它建立在 SSL 记录协议之上，用于在实际的数据传输开始之前，通讯双方进行身份认证、协商加密算法、交换加密密钥等

- `SSL记录层`为高层协议提供基本的安全服务
- `SSL握手协议层`包括 SSL 握手协议（SSL HandShake Protocol）、SSL 密码参数修改协议（SSL Change Cipher Spec Protocol）和 SSL 告警协议（SSL Alert Protocol）。握手层的这些协议用于 SSL 管理信息的交换，允许应用协议传送数据之间相互验证，协商加密算法和生成密钥等。

```js
/*
客户端证书：向服务端证明『客户端』是对的客户端
服务端的证书：向客户端证明『服务端』是对的服务端
-------------------------------------------
*/
```

## HTTP/1.1 协议<https://www.ietf.org/rfc/rfc2616.txt>

> HTTP 协议是以 ASCII 码传输，建立在 TCP/IP 协议之上的应用层协议。请求分为状态行、请求头、消息主体

```plain
    状态行：method url version
    请求头：headers
    消息体：entity-body
```

> 响应分为状态行、响应头，消息主体

```plain
    状态行：protocol/version status desc
    响应头：headers
    消息体：entity-body
```

## HTTP 请求方法：OPTIONS、GET、POST、PUT、DELETE、HEAD、TRACE、CONNECT

## HTTP 首部字段类型

- `通用首部字段（General）`请求报文和响应报文都会使用的首部字段
  - `Cache-Control：`控制缓存的行为
    - `缓存请求指令：`
      - `no-cache：`客户端发送请求包含该指令，表示不会接收缓存过的响应，强制缓存服务器必须把请求妆发给源服务器
      - `no-store：`不缓存请求或响应的任何内容（无参数）
      - `max-age = [秒]：`响应的最大 Age 值（参数必须）
      - `max-stable：`接收已经过期的响应（参数可以省略）
      - `min-fresh = [秒]：`期望在指定时间内的响应仍有效（参数必须）
      - `no-transform：`代理不可更改媒体类型（无参数）
      - `only-if-cached：`从缓存中获取资源（无参数）
      - `cache-extention：`新指令标记（token）
    - `缓存响应指令：`
      - `public：`告诉客户端，可以向任意方提供响应的缓存（无参数）。明确表明其他用户也可以利用缓存
      - `private：`告诉客户端，仅向特定用户返回响应（无参数）。缓存服务器只对特定的用户提供资源缓存的服务，对于其他用户发送的请求，则不会提供对应的缓存服务
      - `no-cache：`告诉客户端，缓存前必须先确认其有效性（参数可省略）,不缓存过期的资源
      - `no-store：`告诉客户端，不要不缓存
      - `no-transform：`告诉代理不可修改媒体类型
      - `max-age=[秒]：`告诉客户端响应的最大 Age 值
      - `s-maxage=[秒]：`公共缓存服务器的最大 Age
      - `must-revalidate：`可缓存但必须再向源服务器进行确认
      - `proxy-revalidate：`要求中间服务器对缓存的响应有效性再进行确认
      - `cache-extension：`新指令标记
- `请求首部字段（Request Header）`客户端向服务端发送请求时使用的首部字段
  - `Pragma: no-cache：`表示客户端要求所有的代理服务器都不返回缓存的资源
- `响应首部字段（Response Header）`服务器端向客户端发送响应内容时使用的首部信息
- `实体首部字段（Entity Header）`针对请求报文和响应报文的实体部分使用的首部，补充了资源内容的更新时间等与实体有关的信息

## HTTP 缓存

> 优先级：pragma > cach-control > expires，理论上 pragma 和 expires 不应该同时出现
>
> 浏览器缓存过程：

- 浏览器第一次加载资源，服务器返回 200，浏览器将资源文件从服务器上请求下载下来，并把 response header 及该请求的返回时间(要与 Cache-Control 和 Expires 对比)一并缓存(经验证，当 cache-control 和 expires 同时出现时，两者中只要有一个导致强缓存失效，浏览器就会发请求到服务器验证资源新鲜度)；
- 下一次加载资源时，先比较当前时间和上一次返回 200 时的时间差，如果没有超过 Cache-Control 设置的 max-age，则没有过期，命中强缓存，不发请求直接从本地缓存读取该文件（如果浏览器不支持 HTTP1.1，则用 Expires 判断是否过期）；
- 如果时间过期，服务器则查看 header 里的 If-None-Match 和 If-Modified-Since ；
- 服务器优先根据 Etag 的值判断被请求的文件有没有做修改，Etag 值一致则没有修改，命中协商缓存，返回 304；如果不一致则有改动，直接返回新的资源文件带上新的 Etag 值并返回 200；
- 如果服务器收到的请求没有 Etag 值，则将 If-Modified-Since 和被请求文件的最后修改时间做比对，一致则命中协商缓存，返回 304；不一致则返回新的 last-modified 和文件并返回 200；

### 强缓存 header

> 不会向服务器发送请求，直接从缓存中读取资源（from disk cache 或 from memory cache）

- `pragma: no-cache`通用首部
  响应 header； 值域={no-cache}，告诉客户端不要禁用缓存，http1.0
- `expires: GMT格式时间，绝对时间 // 启用缓存，并设置主体缓存有效期`响应 header；值域={GMT 格式时间}，时间相对于服务器时间；http1.0
- `cache-control: 控制缓存行为`通用 header；http1.1
  - `通用`值域={no-store, no-cache, max-age, no-transform, stale-if-error }
  - `请求header`值域={max-stale, min-fresh, only-if-cached,}
  - `响应header`值域={s-maxage, must-revalidate, proxy-revalidate, must-understand, private, public, immutable, stale-whie-revalidate}

### 协商缓存（新鲜度校验）

> 向服务器发送请求，服务器会根据这个请求的 request http headers 的一些参数判断是否命中协商缓存，如果命中，则返回 304 状态码，并带上新的 response header 通知浏览器从缓存中读取资源
>
> 其本质是节约带宽

- `If-Modified-Since：`浏览器在下一次加载资源时发送给服务器，会将上一次的 Last-Modified 值放在 If-Modified-Since 中
- `Last-Modified：`该资源最后一次更改时间，作为 response header 返回给
- `If-None-Match：`条件式请求首部。
- `Etag：`是资源的特定版本的标识符。

### 禁止缓存

- `cache-control：`
  - `no-store：`禁用缓存
  - `no-cache：`使用缓存，但是必须进行新鲜度校验
- `header禁止缓存：`
  - `Cache-Control: no-store, no-cache, must-revalidate`
  - `Expires: GMT格式设置为当前时间`
- `html禁止缓存`
  - `<script src="xxx?random=random>"`
  - `<meta http-equiv="pragma" content="no-store">`
  - `<meta http-equiv="expires" content="Wed, 26 Feb 1997 00:00:00">`
  - `<meta http-equiv="Cache-Control" content="no-cache, must-revalidate">`

### 资源缓存位置

- `缓存在内存`from memory cache
- `缓存在磁盘`from disk cache

## POST 规范规定，POST 提交的数据必须放到消息体中，但协议没有规定数据使用什么编码方式。开发者完全可以自己决定消息主体的格式

[mimetype](./mimetype.md)

> 数据能够被服务端解析才有意义，一般服务端框架会内置一些编码方式，方便解析前端传送的数据。服务端是根据 content-type 字段值获得请求体的数据是何种编码方式
>
> post 提交数据方案包含两个部分：content-type(暗含数据编码方式了) 和请求体编码方式
>
> `Content-Disposition`

- `application/json`

```plain
    POST http://www.example HTTP/1.1
    Content-Type: application/json;charset=utf-8
    {"title":"test"}
```

- `application/x-www-form-urlencoded(表单形式之一)，数据按照k1=v1&k2=v2方式进行编码，并对k和v进行url转码`

```plain
    POST http://www.example HTTP/1.1
    Content-Type: application/x-www-form-urlencoded;charset=utf-8
    title=test&sub%5B%5D=1&sub%5B%5D=2&sub%5B%5D=3
```

- `multipart/form-data(表单形式之二, http协议不包含该content-type，属于http客户端的扩展)`

```plain
    POST http://www.example.com HTTP/1.1
    Content-Type:multipart/form-data; boundary=----WebKitFormBoundaryrGKCBY7qhFd3TrwA
    ------WebKitFormBoundaryrGKCBY7qhFd3TrwA
    Content-Disposition: form-data; name="text"
    title
    ------WebKitFormBoundaryrGKCBY7qhFd3TrwA
    Content-Disposition: form-data; name="file"; filename="chrome.png"
    Content-Type: image/png
    PNG ... content of chrome.png ...
    ------WebKitFormBoundaryrGKCBY7qhFd3TrwA--
```

- `application/octet-stream：只能提交二进制，而且只能提交一个二进制，如果提交文件的话，只能提交一个文件,后台接收参数只能有一个，而且只能是流（或者字节数组）`

- `text/xml`

```plain
    POST http://www.example.com HTTP/1.1
    Content-Type: text/xml
    <?xml version="1.0"?>
    <methodCall>
        <methodName>examples.getStateName</methodName>
        <params>
            <param>
                <value><i4>41</i4></value>
            </param>
        </params>
    </methodCall>
```

## http 长链接和短链接

- `http长短链接本质：TCP链接在time时间内是否断开`
  > http 长短链接本质是 TCP 的链接保持和断开
  >
  > http1.0 时，默认是短链接，每次 http 事务都要建立 TCP 链接并断开 TCP 链接
  >
  > http1.1 以后，默认长链接，在 tcp 指定的时间内，tcp 链接一旦建立，就会保持 t 时间，然后才断开
- `http超时本质：TCP超时`

### TCP 三次握手和 4 次挥手

> 建立连接：三次握手
>
> 断开链接：四次挥手

### http 协议头

- `connection:keep-alive`

### 请求超时：就是建立 TCP 三次握手的时间限制

```plain
    三次握手：
    C（发送sync包，并进入SYN_SEND状态）------------->S
    C（SYN_SEND状态）<--------------S(接收到C的sync包，发送ACK+SYNC包，ACK确认C的SYNC，SYNC是S的包，并进入SYN_RECE状态)
    C(接收到S的ACK+SYNC，并发送ACK包给S，并进入ESTABLISHED状态)-------------->S（SYN_RECE状态，接到包进入ESTABLISHED状态）

    以上三步，都存在丢包可能，所以就有了timeout机制，超时未收到应该，就重新发包

    http协议请求超时，主要也就是TCP链接建立超时
```

### 响应超时：建立起 TCP 链接后，到第一次接收到数据之间的时间限制（包括第一次到第二次，第二次到第三次……）

```plain
    1、经测试，chrome存在响应超时，即后台一直处理业务，超过time时间没有返回，浏览器会将请求置为失败状态，走到catch中，chrome大概是5分钟
    2、一般，响应后台应该统一在后台处理，当处理耗时任务时，需要设置好超时time值，及时反馈给请求
```

## 跨域

### 浏览器同源策略

> 用于限制一个 origin 的文档或者它加载的脚本如何能与另一个 origin 的资源进行交互
>
> `protocol+host+port` 完全相同才是同源；否者是非同源
>
> 使用 document.domain 来允许子域安全访问其父域时，您需要在父域和子域中设置 document.domain 为相同的值。这是必要的

- `同源策略的限定`
  - ``
  - ``
  - ``

### 如何允许跨源访问 CORS

> CORS(Cross-Origin Resource Sharing)，跨域资源共享
>
> CORS 是 http 的一部分，它允许服务端来指定哪些主机可以从这个服务端加载资源

- `跨域资源共享标准新增了一组HTTP首部字段`允许服务器声明哪些源站通过浏览器有权限访问哪些资源

  > 响应首部

  - `Access-Control-Allow-Origin`：指定了允许访问当前当前资源的外域 URI
  - `Access-Control-Expose-Headers`：在跨域访问时，XMLHttpRequest 只能获取部分 headers，服务端设定该 header，指定更多的可访问 headers
  - `Access-Control-Max-Age`：
  - `Access-Control-Allow-Credentials`：
  - `Access-Control-Allow-Methods`
  - `Access-Control-Allow-Headers`

  > 请求首部

  - `Origin`
  - `Access-Control-Request-Method`
  - `Access-Control-Request-Headers`

### 如何禁止跨源共享 CSRF（Cross Site Request Forgery）

### 跨源数据存储访问

- `localStorage、IndexedDB`受同源策略影响，以源进行分隔，每个源都拥有自己单独的存储空间
- `Cookies`子域和父域

## 浏览器输入 url 到显示页面背后的事情

```plain
    1、输入url并回车
    2、浏览器拿到域名后，请求域名DNS获取对应的IP（有可能出错，域名不存在；未找到对应的IP等）
    3、拿到IP后，建立TCP链接
    4、TCP链接建立后，封装HTTP数据包并通过TCP进行数据交换
```

## 浏览器缓存控制

### html 控制缓存方法

```html
<!-- 告诉浏览器当前页面不需要缓存，每次请求页面都需要取服务器请求资源 -->
<meta http-equiv="Pragma" content="no-store" />
```

### http 协议头控制缓存

> 浏览器根据 http 响应头，确定是否缓存以及缓存周期

- `Pragma：`
- `Expires：`缓存标识字段，缓存的绝对有效时间，HTTP1.0
- `Cache-Control：`缓存标识字段，优先级高于 Expires

  - `public：`所有内容都将被缓存（客户端和代理服务器都可缓存）
  - `private：`内容只缓存到私有缓存中（仅客户端可以缓存，代理服务器不可缓存）
  - `no-cache：`必须做新鲜度校验（协商缓存）
  - `no-store：`所有内容都不允许缓存
  - `max-age=[秒]：`缓存的内容在本次响应后多少秒失效

- `If-Modified-Since：`
- `Last-Modified：`
- `If-None-Match：`
- `Etag：`
