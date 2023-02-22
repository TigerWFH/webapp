# 关于 python 服务部署

## 本地 hosts

```js
/*
127.0.0.1 www.monkey.com
127.0.0.1 www.sit.monkey.com
127.0.0.1 www.dev.monkey.com
127.0.0.1 www.prod.monkey.com
127.0.0.1 www.cat.com
127.0.0.1 www.fish.com
*/
```

## 关于域名

[关于域名](https://segmentfault.com/q/1010000007985539)

> www.monkey.com，其中monkey.com才是域名；
>
> www.monkey.com是monkey.com的子域，最初www是提供网站服务的`计算机名`，
>
> mail.monkey.com 中的 mail 也是`计算机名`
> www 是主机名 随意填写 域名解析的时候填写主机记录和记录值 (服务器 IP 或域名)
> 意思是将 www.baidu.com 解析到哪 不同的主机名可以解析到不同的 IP。主机名是标识某一台服务器提供的服务是什么吗，如 smtp.163.com 的主机名 smtp 标识邮箱服务，www.163.com的主机名标识万维网服务
>
> 子域名的概念

## uWSGI

[参考资料](https://uwsgi-docs.readthedocs.io/en/latest/WSGIquickstart.html)

> uWSGI 是一个 Web 服务器，它实现了 WSGI 协议、uwsgi、http 等协议。Nginx 中 HttpUwsgiModule 的作用是与 uWSGI 服务器进行交换。

> 为什么有了 uWSGI 为什么还需要 nginx？因为 nginx 具备优秀的静态内容处理能力，然后将动态内容转发给 uWSGI 服务器，这样可以达到很好的客户端响应。

> WSGI 看过前面小节的同学很清楚了，是一种通信协议。

> uwsgi 同 WSGI 一样是一种通信协议。

> 而 `uWSGI` 是实现了 uwsgi 和 WSGI 两种协议的 Web 服务器。

### 安装 uWSGI

> pip install uwsgi
>
> uwsgi --http :9090 --wsgi-file foobar.py
>
> uwsgi --http :9090 --wsgi-file foobar.py --master --processes 4 --threads 2
>
> uwsgi --http :9090 --wsgi-file foobar.py --master --processes 4 --threads 2 --stats 127.0.0.1:9191

## cgi、fastCgi、wsgi、uwsgi

- `CGI(Common Gateway Interface)`
- `WSGI(Python Web Server Gateway Interface)`

  > WSGI 是作为 Web 服务器与 Web 应用程序或应用框架之间的一种低级别的接口，以提升可移植 Web 应用开发的共同点。WSGI 是基于现存的 CGI 标准而设计的。很多框架都自带了 WSGI server ，比如 Flask，webpy，Django、CherryPy 等等。当然性能都不好，自带的 web server 更多的是测试用途，发布时则使用生产环境的 WSGI server 或者是联合 nginx 做 uwsgi 。

  > WSGI 的设计确实参考了 Java 的 servlet

[资料](https://cloud.tencent.com/developer/article/1393779?from=article.detail.1611614&areaSource=106000.2&traceId=nyV4VtMy1R9EeEJ07T1Uq)

## cgi 和 servlet 对比

[资料](https://www.cnblogs.com/zengweiming/p/3758525.html)
