# DNS 解析

## 问题：入网设备是如何获取 IP

- `通过动态主机配置协议（DHCP）`
  > 当一台设备连接到路由器时，路由器通过 DHCP 给入网设备分配一个 IP，同时会告诉入网设备 DNS 服务器地址
  >
  > 当入网设备连上 wifi 的时候，会发一个 DHCP Request 的广播，路由器收到这个广播后就会向入网设备分配一个 IP 地址并告知 DNS 服务器
- `手动配置`

## chrome DNS 解析

> Chrome 是调 res_ninit 这个系统函数(Linux)去获取`系统的 DNS` 服务器，这个函数是通过读取/etc/resolver.conf 这个文件获取 DNS
>
> Chrome 在启动的时候根据不同的操作系统去获取 DNS 服务器配置，然后把它放到 DNSConfig 的 nameservers，Chrome 还会监听网络变化同步改变配置
>
> Chrome 在启动的时候除了会读取 DNS server 之外，还会去取读取和解析`hosts文件`，放到 DNSConfig 的 hosts 属性里面，它是一个哈希 map
>
> 先看下`cache`有没有，然后再看`hosts`有没有，如果没有的话再`进行查询`

## DNS 记录类型

- `A记录：`把域名解析到一个 IPv4 地址
- `AAAA记录：`把域名解析到一个 IPv6 地址
- `CNAME记录：`解析到另外一个域名

[参考资料](https://zhuanlan.zhihu.com/p/32531969)
