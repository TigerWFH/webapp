# VPS

## 术语

- `PDU：`Protocol Data Unit，协议数据单元，不同层的协议数据单元名称不同
  - `应用层：`message
  - `传输层：`segment
  - `网络层：`packet
  - `数据量路层：`frame
  - `物理层：`bit
  - `封装：`将数据按照协议报文格式进行组装的过程，就叫做封装
    - `切片：`
    - `加控制信息：`
  - `解封装：`封装的逆操作
- `网络号：`net-id，标识主机所在网络
- `主机号：`host-id，标识主机
- `IP：`全 0 和全 1 都是保留地址
  - `A类IP：`8 位网络号 1-126，且以 0 开始，1.0.0.1 - 126.255.255.254
  - `B类IP：`16 为网络号 128.1-191.255，且以 10 开始，128.1.0.1-191.255.255.254
  - `C类IP：`24 位网络号 192.0.1-223.255.255，且以 110 开始，192.0.1.1-223.255.255.254
  - `D类IP：`多播地址，以 1110 开始，224.0.0.1-239.255.255.254
  - `E类IP：`保留，以 1111 开始
  - `回送地址：`127 开头
- `路由规则rule`：多个规则可以指向同一个路由表
- `路由表route：`

  > `路由表字段：`

  - `Destination/Mask：`目的网段地址/子网掩码
  - `Dummy(Gateway)：`网关地址
  - `Flags：`
  - `Nettif：`
  - `Expire：`
    |destination|gateway|flags|Netif|Expire|
    |:--|:--|:--|:--|:--|
    |default|192.168.50.1|UGScg|en1|
    |127|127.0.0.1|UCS|lo0|
    |127.0.0.1|127.0.0.1|UH|lo0|
    |169.254|link#5|UCS|en1|!|
    |192.168.50.1|4:42:1a:d4:c6:c8|UHLWIir|en1|1198|
    > default 是默认路由
    ***
    > link#5 表示没有网关，发给 169.254.*.*的数据包直接从 en1 发出
    ***
    > 4:42:1a:d4:c6:c8，直接填充 MAC 地址，通过 en1 发包。其他需要 ARP 协议广播查询 MAC 地址

  > `路由：`是指分组从源到目的地时，决定`端`到`端`路径的网络范围的进程。主机和路由器都会维护一张路由表，里面存放着`目的地址段`和`下一跳的地址`。

  ***

  > `主机路由（特定路由，这里的Destination是目的主机，非目的网络）：`因特网所有的分组转发都是基于`目的主机所在的网络`，但在大多数情况下都允许特例，即对`特定的目的主机`指明一个路由，这种路由就叫做`特定路由`，其表现形式： 192.168.3.20/32 位或子网掩码：255.255.255.255，这里的`192.168.3.20是主机，不是网络段`

  ***

  > `网络路由（对应主机路由，就是网络段路由）`

  ***

  > `缺省路由：`是特殊的静态路由，当网络报文的路由无法匹配到当前路由表中的路由记录时，缺省路由用来指示路由器或网络主机将该报文发往指定位置。表现形式：`目的地址为0.0.0.0，子网掩码0.0.0.0或目的地址是default`

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

## 网卡命名规范

> XNU is Not Unix
>
> XNU 是 Mac 和 iOS 的核心。XNU 是 Darwin 的核心，也是 OS X 的核心
>
> App 和系统自带 App 都是运行在用户空间
>
> `协议栈`是操作系统`内核`实现的，以系统调用方式供`用户空间应用`调用
>
> `ifconfig` 展示了 `device interface names`，对应了物理或者虚拟网卡。`用户空间`如果要访问这些设备，必须通过 `Unix domain socket` 进行通信
>
> [XNU 资料](https://justinyan.me/post/4009)

---

- `Unix dimain socket：`用户区应用要和 ifconfig 显示的网卡接口通信，需要使用到 UnixDomainSocket（内核提供）

  > Unix domain Socket 可以简称为 UDS，不同程序间的数据可以在操作系统层，借助于文件系统来进行数据交换。
  >
  > int socket(int family, int type, int protocol)

- `IP socket`

---

> 系统默认命名规则，默认情况下，systemd 会使用一下策略：
> 方案 1：eno1
> 方案 2：ens1
> 方案 3：enp2s0
> 方案 4：enx78e7d1ea46da
> 方案 5：传统不可预测的命名，eth0

---

### 传统网卡命名，系统默认命名

> eth[0,1,2...]：以太网
>
> wlan[0,1,2...]：无线局域网

### 一致网络设备命名规范（CONSISTENT NETWORK DEVICE NAMING）

> 支持两种命名规范：biosdevname 和 net.ifnames

### net.ifnames 规范:设备类型+设备位置+数字

> 设备类型【en、wl、ww】

- `en 以太网 Ethernet`
- `wl 无线局域网 WLAN`
- `ww 无线广域网 WWAN`

> 设备位置【】

- `o<index>:`on-board device index number，板载设备索引号
- `s<slot>[f<function>][d<dev_id>]:`hotplug slot index number，热插拔插槽索引号
- `x<MAC>:`MAC address，MAC 地址
- `p<bus>s<slot>[f<function>][d<dev_id>]:`PCI 地理位置
- `p<bus>s<slot>[f<function>][u<port>][...][c<config>][i<interface>]:`USB 端口链

```plain
eno1：板载1号以太网卡
enp0s2：PCI扩展卡的2号端口以太网卡
ens33：热插拔插槽3号PCI-E插槽的3号端口以太网卡
wlp3s0：第3号PCI扩展卡的0号端口无线局域网卡

```

### biosdevname 方案

- `内嵌网络接口卡（LOM）：` em[1234...][a]，em1
- `PCI卡网络接口：`pp[b], p3p4
- `虚拟功能：`pp\_[c], p3p4_1

## Mac 命令 ifconfig 输出内容

> ifconfig 输出网络接口。一些是物理接口，一些是虚拟接口（逻辑接口）

```javascript
/*
参考资料：《Mac OS® X and iOS Internals》第17章 Interfaces in OS X and iOS
bond：bsd/net/if_bond.c, Bonding two or more interfaces
bridge：bsd/net/if_bridge.c, Layer II bridging (new in Lion)
gif：bsd/net/if_gif.c, Generic IP-in-IP tunneling (RFC2893), 通用IP-in-IP隧道（RFC89）
lo： bsd/net/if_loop.c, Loopback interface

pflog：bsd/net/if_pflog.c, Packet fi ltering (new in Lion): receives copies of all
packets logged by PF.

stf：bsd/net/if_stf.c, 6to4 (RFC3056) connectivity

utun：bsd/net/if_utun.c, User tunnels: used by VPN and other processes
to provide a pseudo interface, whose traffi c will be
rerouted through a user-mode process

vlan：bsd/net/if_vlan.c, Virtual Local Area Networks

en：IONetworkingFamily, Ethernet or 802.11 interfaces
fw：IOFireWireIP, IP over FireWire (IEEE-1394). OS X only
pdp_ip： AppleBaseBandFamily, Cellular data connection (iPhone, iPad 1/2)
ppp： PPP, Point-to-Point protocol (pppd)

p2p：Point-to-Point协议，类似awdl
awdl：AWDL全称是Apple Wireless Direct Link，即无线直连网卡
ap：
llw：


许多VPN将在TUN/TAP(L3/L2)虚拟网络设备之后添加其它设备，通常是utun或utap
*/
```

## ipconfig

> window 系统，查看 TCP/IP 配置的命令

## route 命令，配置路由

> window 系统，查看路由

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

lo0: flags=8049<UP,LOOPBACK,RUNNING,MULTICAST> mtu 16384
  ether ac:de:48:00:11:22
  options=1203<RXCSUM,TXCSUM,TXSTATUS,SW_TIMESTAMP>
  inet 127.0.0.1 netmask 0xff000000
  inet6 ::1 prefixlen 128
  inet6 fe80::1%lo0 prefixlen 64 scopeid 0x1
  nd6 options=201<PERFORMNUD,DAD>
------------------------------------------------------------------
  lo0：回环网络接口，lo是loopback缩写，不代表真正的网络接口，是一个虚拟的网络几口，通常用于对本机的网络测试。并非真实存在，并不真实地从外界接收和发送数据包，而是在系统内部接收和发送数据包，因此虚拟网络接口不需要驱动程序。
  flags：标识，取值有：【UP、DOWN、RUNNING】
    UP：网卡启用
    DOWN：网卡停用
    RUNNING：接口工作中
    MULTICAST：主机支持多播
    BROADCAST：表示主机支持广播
    MTU：最大传输单元
  options：
  inet：IP地址
  netmask：子网掩码
  broadcast：广播地址
  ether(Ethernet)：表示连接类型（以太网），后面是硬件Mac地址
  inet6：ipv6地址
  nd6

  Metric（Met）：度量值，用于计算一条路由的成本，供操作系统使用
  RX packets（RX-OK）：接收时，正确的数据包数
  RX erro（RX-ERR）：接收时，错误的数据包数
  RX dropped（RX-DRP）：接收时，丢弃的数据包数
  RX overru（RX—OVR）：接收时，过速丢失的数据包数
  RX frame：接收时，发生frame错误而丢失的数据包数
  RX bytes：接收的数据量

  TX packages（TX-OK）：发送时，正确的数据包数
  TX erro（TX-ERR）：发送时，错误的数据包数
  TX dropped（TX-DRP）：发送时，丢弃的数据包数
  TX overru（TX-OVR）：发送时，过速丢失的数据包数
  TX carrier：发送时，发生carrier丢失的数据包数
  TX bytes：发送的数据量

  Interrupt IRQ：中断地址
  Base address：基址
*/
```

## netstat

> Netstat 是在内核中访问网络连接状态及其相关信息的程序，它能提供 TCP 连接，TCP 和 UDP 监听，进程内存管理的相关报告

- `netstat -r`查看路由,netstat -r Routing tables
- `netstat -nr`查看路由，不做域名解释

```javascript
// netstate命令格式
/*
netstat -i
Name Mtu Network Address Ipkts Ierrs Opkts Oerrs Coll
*/
/*
Active Internet connections(including servers)
Proto    Recv-Q    Send-Q    LocalAddress     ForeignAddress   (state)

Active Multipath Internet connections
Proto/ID Flags LocalAddress ForeignAddress (state)

Active LOCAL(UNIX) domain sockets
Address Type Recv-Q Send-Q Inode Conn Refs Nextref Addr

Registered kernel control modules
id flags pcbcount rcvbuf sndbuf name

Active kernel event sockets
Proto Recv-Q Send-Q vendor class subcl

Active kernel control sockets
Proto Recv-Q Send-Q unit id name

Routing tables
  Destination（目标地址）
  Gateway（网关）
  Flags（路由标志位）:U（Up，路由处于活动状态），H（Host：路由目标是单个主机），G（Gateway：网关），S（Static：手工配制路由），C（Clone，生成一个新路由），W（WasCloned：指明一个路由），L（Link：路由涉及到了以太网硬件）
  Netif Expire（网络接口，例如en0）
*/
```
