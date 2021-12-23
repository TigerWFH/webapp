# 关于 http

## 参考资料

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

## POST 规范规定，POST 提交的数据必须放到消息体中，但协议没有规定数据使用什么编码方式。开发者完全可以自己决定消息主体的格式

> 数据能够被服务端解析才有意义，一般服务端框架会内置一些编码方式，方便解析前端传送的数据。服务端是根据 content-type 字段值获得请求体的数据是何种编码方式

> post 提交数据方案包含两个部分：content-type(暗含数据编码方式了) 和请求体编码方式

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

## 浏览器输入 url 到显示页面背后的事情

```plain
    1、输入url并回车
    2、浏览器拿到域名后，请求域名DNS获取对应的IP（有可能出错，域名不存在；未找到对应的IP等）
    3、拿到IP后，建立TCP链接
    4、TCP链接建立后，封装HTTP数据包并通过TCP进行数据交换
```

## 请求超时：就是建立 TCP 三次握手的时间限制

```plain
    三次握手：
    C（发送sync包，并进入SYN_SEND状态）------------->S
    C（SYN_SEND状态）<--------------S(接收到C的sync包，发送ACK+SYNC包，ACK确认C的SYNC，SYNC是S的包，并进入SYN_RECE状态)
    C(接收到S的ACK+SYNC，并发送ACK包给S，并进入ESTABLISHED状态)-------------->S（SYN_RECE状态，接到包进入ESTABLISHED状态）

    以上三步，都存在丢包可能，所以就有了timeout机制，超时未收到应该，就重新发包

    http协议请求超时，主要也就是TCP链接建立超时
```

## 响应超时：建立起 TCP 链接后，到第一次接收到数据之间的时间限制（包括第一次到第二次，第二次到第三次……）

```plain
    1、经测试，chrome存在响应超时，即后台一直处理业务，超过time时间没有返回，浏览器会将请求置为失败状态，走到catch中，chrome大概是5分钟
    2、一般，响应后台应该统一在后台处理，当处理耗时任务时，需要设置好超时time值，及时反馈给请求
```
