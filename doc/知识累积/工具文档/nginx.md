# nginx：nginx 是一个 HTTP 和反向代理服务器

## 参考资料

[参考资料](https://blog.csdn.net/u010994966/article/details/78193041)

## nginx 功能

### 代理

### 反向代理

### 负载均衡

- `负载均衡策略`
  - `轮询`
  - `权重`
  - `ip_hash`
  - `url_hash`
  - `fairy`

### HTTP 服务器（动静分离）：静态资源请求和应用接口请求分开

## nginx 配置

- `配置文件位置：/etc/nginx/nginx.conf`

### 配置项

- `other：全局配置`
- `events：nginx链接配置模块`
- `http：nginx http核心配置模块`
  - `server：虚拟主机配置模块，监听的端口和域名等信息`
    - `location：URI匹配`

```conf
user nobody; #指定运行nginx的用户和组
worker_processes 1; #指定工作进程数，一般设置为CPU核数
error_log logs/error.log notice/info; #指定错误日志，以及日志写入格式
pid logs/nginx.pid; #指定pid文件，存放主进程pid号
# nginx链接配置模块
events {
   worker_connections 1024; #指定每个工作进程最大连接数为1024
}
http {
  include mime.types; #通过include加载mime.types文件，里面的types模块将文件扩展名映射到MIME类型
  default_type application/json; #定义响应的默认mime类型
  log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $boty_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"'; #写入main内容格式
   access_log logs/access.log main;
   sendFile on;
   tcp_nopush on;
   keepalive_timeout 65;
   gzip on;
   server {
       listen 80;
       server_name localhost;
       charset koi-r;
       access_log logs/host.access.log main;
       # 将特定的文件或目录重新定位
       location / {
           # 设置请求的根目录
           root html;
           # 定义索引，按顺序匹配
           index index.html index.htm;
       }
       # 定义显示404错误的uri
       error_page 404 /404.html;
       # redirect server error pages to the static page /50x.html
       error_page 500 502 503 504 /50x.html
       location - /50x.html {
           root html;
       }
   },
   # another server
   server {

   }
   # https server
   server {
       listen 443 ssl;
       server_name xxx;
       ssl_certificate cert.pem;
       ssl_certificate_key cert.key;
       ssl_session_cache shared:SSL:1m;
       ssl_session_timeout 5m;
       #...
   }
}
```

### nginx 负载均衡配置<http://nginx.org/en/docs/http/load_balancing.html>

- `更多参数：`<http://nginx.org/en/docs/http/ngx_http_upstream_module.html#server>

- `内置负载均衡`

```conf
    http {
        # 负载均衡配置-轮询
        # upstream模块 配置反向代理服务器组，Nginx会根据配置，转发请求到某一台服务器，mytomcats是服务器组的名字
        upstream mytomcats {
            # server指令：配置处理请求的服务器IP或域名，端口可选，默认80
            # weight指令：默认是1，将请求平均分配给每一台server
            # max_failes指令：默认是1，server允许请求失败的次数，超过次数后，在fail_timeout时间内，不会被分配请求
            server 192.168.0.100:8080 weight=2 max_failes=3 max_timeout=15;
            server 192.168.0.101:8080 weight=3;
            server 192.168.0.102:8080 weight=1;
            # backup指令：备份机，所有服务器挂了之后才会生效
            server 192.168.0.102:8080 backup;
            # down指令：某台server不可用
            server 192.168.0.102:8080 down;
            # max_conns指令：分配最大连接数量
            server 192.168.0.103:8080 max_conns=1000;
            # resolve指令：将server指令的域名指定域名解析服务器
        }

        server {
            listen 80;
            location / {
                # proxy_pass将所有http请求转发到mytomcats服务器组配置中的某一台服务器上
                proxy_pass http://tomcats;
            }
        }
    }
```

- `第三方负载均衡`

  - `fair：根据服务响应时间分配请求`
  - `url_hash：按照请求url的hash结果分配请求，使每个url请求定向到同一个服务器`

  ```conf
    upstream mytomcats {
        server 192.168.0.100:8080;
        server 192.168.0.101:8080;
        server 192.168.0.102:8080;

        hash $request_url;
    }
  ```

## 配置文件

### nginx 部分配置项详解

- `http`
- `location：路由匹配`

```js
/*
    location [=|~|~*|^~] /uri/ {}
        =： 开头，表示精确匹配
        ^~：开头，表示uri以某个常规字符串开头，匹配url路径。nginx不对url做编码
        ~：开头，区分大小写的正则匹配
        ~*：开头表示不区分大小写的正则匹配
        !~和!~*：开头，区分大小写（不区分大小写）不匹配的正则匹配
        /：开头，通用匹配

    多个location，优先匹配最长路径的location

    location / {
        root html; // 定义网站根目录，可以是相对路径或绝对路径
        index index.html index.htm; // 定义默认页
    }
 */
```

- `server：包含在http中，每一个server就是一个虚拟主机（站点）`

```conf
    server {
        listen 80;
        server_name localhost;
        location / {
        }

        error_page 404 /404.html;
        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
            root html;
        }
    }

```

- `YAML：是一个JSON超集,`\*.yml
- `XML`
- `JSON`
- `INI：配置简单文件,`\*.ini,\*.cfg,\*.conf
- `TOML`
