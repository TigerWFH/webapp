# VPS

## 术语

- `VNC：`Virtual Network Console，虚拟网络控制台，是一款优秀的远程控制工具软件。CS 架构
  - `vncserver：`必须运行在被控制的主机
  - `vncviewer：`本地应用程序，用于远程接入运行 vncserver 的计算机并显示其环境
  - `vncpasswd：`vncserver 的密码设置工具
  - `vncconnect：`告诉 vncserver 连接到远程一个运行 vncviewer 的计算机的 IP 和端口号。这样我就可以避免给其他人一个接入的密码。

## 网络命令

- `ping：`是 ICMP 包测试，用来检测服务器状态和 IP 有没有被墙
- `tcping：`是 TCP 链接配置的端口，用来检测端口开放情况和服务端软件状态

## centos@7

### 查看防火墙

> 使用 systemctl，可以启动、停止、重新加载、重启服务、列出服务单元、检查服务状态、启用/禁用服务、管理运行级别和电源管理
>
> [参考资料](http://www.wjhsh.net/kelamoyujuzhen-p-10111596.html)
>
> [资料 2](https://www.cnblogs.com/ccl971123/p/15495698.html)

```bash
# 查看防火墙开启还是关闭
systemctl status firewalld.service
# 停止/启动防火墙
systemctl stop firewalld.service
systemctl start firewalld.service
# 重启
sudo firewall-cmd --reload
# 关闭开机自启
disable firewalld.service
# 允许http服务
sudo firewall-cmd --add-service=http --permanent
# 打开8080端口，命令末尾的–permanent表示用久有效，不加这句的话重启后刚才开放的端口就又失效了
sudo firewall-cmd --add-port=8080/tcp --permanent
# 可以查看端口开放情况
sudo firewall-cmd --list-all
```

## V2Fly

[project V 文档](https://www.v2fly.org/guide/install.html#%E5%B9%B3%E5%8F%B0%E6%94%AF%E6%8C%81)

> project V 使用 go 作为开发语言

## web proxy server 和 VPN

[VPN 原理以及实现](https://baijiahao.baidu.com/s?id=1728306251160631722&wfr=spider&for=pc)

[VPN 和 V2Ray、SSR、加速器有什么区别？](https://www.shutupandshowpages.com/index.php/2021/07/06/vpn%E5%92%8Cv2ray%E3%80%81ssr%E3%80%81%E5%8A%A0%E9%80%9F%E5%99%A8%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB%EF%BC%9F/)

[VPN 和代理区别](https://fanqiang.network/20780.html)

[浅谈 vpn、vps、Proxy 以及 shadowsocks 之间的联系和区别](https://medium.com/@thomas_summon/%E6%B5%85%E8%B0%88vpn-vps-proxy%E4%BB%A5%E5%8F%8Ashadowsocks%E4%B9%8B%E9%97%B4%E7%9A%84%E8%81%94%E7%B3%BB%E5%92%8C%E5%8C%BA%E5%88%AB-b0198f92db1b)

[各种加密代理协议的简单对比](https://blankwonder.medium.com/%E5%90%84%E7%A7%8D%E5%8A%A0%E5%AF%86%E4%BB%A3%E7%90%86%E5%8D%8F%E8%AE%AE%E7%9A%84%E7%AE%80%E5%8D%95%E5%AF%B9%E6%AF%94-1ed52bf7a803)

### web proxy server

> V2Ray 的运行原理与其他代理工具基本相同，使用特定的中转服务器完成数据传输
>
> V2Ray 可同时开启多个协议支持，包括 Socks、HTTP、Shadowsocks、VMess、Trojan 和 VLESS 等。每个协议可单独设置传输载体，比如 TCP、mKCP 和 WebSocket 等。

### VPN

> VPN 全称为虚拟私人网络(Virtual Private Network)，常用于连接中、大型企业或团体间私人网络的通讯方法，利用隧道协议（Tunneling Protocol）来达到发送端认证、消息保密与准确性等功能。
>
> VPN 以 CS 架构运行
>
> VPN 如果一旦应用在某电脑上，所有内部流量全部都转移到落地服务器再分发会导致两个比较大的问题：
> 1、访问国内未墙网速慢
> 2、无法访问本地局域网设备，如 NAS、TM 服务器、局域网打印机等，非常不方便。

- `TUN/TAP`
  > TUN/TAP 是操作系统内核中的虚拟网络设备，由软件进行实现，向操作系统和应用程序提供与硬件网络设备完全相同的功能。其中 TAP 是以太网设备(二层设备)，操作和封装以太网数据帧，TUN 则是网络层设备(三层设备)，操作和封装网络层数据帧。
  > [重点讲 TUN/TAP 文章](https://baijiahao.baidu.com/s?id=1728306251160631722&wfr=spider&for=pc) > [重点知识 2](https://segmentfault.com/a/1190000009249039)

## ipconfig

> window 系统，查看 TCP/IP 配置的命令

## ifconfig

> linux 用于显示或配置网络设备的命令：network interface configuring

```javascript
/*
ifconfig [-a][-V][-s]
-a：查看所有网卡状态
-V：查看ifconfig命令的版本信息
-s：查看统计信息
ifconfig eth0 192.168.1.1 netmask 255.255.0.0 // 设置网卡ip和子网掩码
ifconfig eth0 down // 关闭网卡
ifconfig eth0 up   // 启用网卡
ifconfig eth0 netmask 255.255.0.0
ifconfig eth0 // 查看第一块网卡状态
*/
```

## route 命令，配置路由

```javascript
/*
route [-CFvnee]
route [-v][-A family] add [-net|-host] target [neymask Nm] [gw Gw] [metric N] [mod] [reinstate] [[dev] if]
-v 使用冗余输出模式
-A family：指定特定的地址族（inet，inet6）
-n 使用数字显示的地址
-e 使用与netstat相同的输出格式
-ee 参数会产生很长的输出，包括内核路由表的几乎所有内容
-net 目标是一个网段
-host 目标是一个单独的主机
-F 显示内核FIB路由表可能被-e和-ee参数改变
-C 显示内核中路由缓存信息
del 删除一个路由表项
add 添加一个路由标项
*/
```

## netstat

> Netstat 是在内核中访问网络连接状态及其相关信息的程序，它能提供 TCP 连接，TCP 和 UDP 监听，进程内存管理的相关报告
