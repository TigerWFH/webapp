# 计算机网络相关

> - 操作系统中的网络控制软件（协议栈）、网卡、集线器、交换机、路由器等设备
> - 应用程序并不是自己去控制网络，而是委托操作系统控制网络

## 术语

- `解析（resolution）`
- `解析器（resolver）`
- `Socket库`：用于调用网络功能的程序组件集合。Socket 库是加州大学伯克利分校开发的 UNIX 操作系统 BSD 中 C 语言库，互联网中所使用的大多数功能都是基于 Socket 库开发的，非 C 语言类库也是参照该库开发，成为了事实上的标准
- `MAC：`网卡的 ROM 中保存着全世界唯一的 MAC 地址，这是在生产网卡时写入的。会被网卡驱动读取并分配给 MAC 模块
- `DNS：`DNS 缓存表
- `集线器：`将信号发往所有线路，广播
- `交换机：MAC 地址表`，根据 Mac 地址将信号进行转发，点到点
- `路由器：路由表`，
  - `路由器的每个端口都有 MAC 地址和 IP 地址`
  - `根据 IP 地址进行转发`
  - `路由器会忽略主机号，只匹配网络号`
  - `路由表的子网掩码列只表示在匹配网络包目标地址时需要对比的比特数量`
  - `路由表中的默认路由：子网掩码为0.0.0.0的记录表示默认路由`
  - `网络路由`
  - `主机路由`
  - `路由器也会使用ARP查询下一个转发目标的MAC地址`
- ``

## Linux 网络命令

- `tracepath：`用来追踪并显示报文到达目的主机所经过的路由
- `iptables：`Linux 管理员用来设置 IPv4 数据包过滤条件和 NAT 的命令行工具
- `route：`操作基于内核的 IP 路由表，主要作用是创建一个静态路由让指定一个主机或者网络接口
  - `route del xxx`
  - `route add -net xxx`
- `ping：`
- `lspci | grep Ethernet：`查看网卡信息
- `sudo ethtool -i eno1：`查看网卡驱动信息
- `netstat -apn：`查看本机端口的网络连接情况
- `nc：`端口扫描和模拟 server 或者 client 通信
- `ifconfig：`
- `tcmpdump：`网络抓包

## Linux 防火墙命令

- `启动：`systemctl start firewalld
- `查看状态：`systemctl status firewalld
- `停止：`systemctl disable firewalld
- `禁用：`systemctl stop firewalld
- `查看版本：`firewall-cmd --version

## 浏览器是如何 DNS 服务器发出查询的？

> DNS 解决的是域名到 IP 的转换
>
> `DNS客户端`（`DNS解析器`）：一般 DNS 解析器`包含在操作系统的 socket 库`中
>
> - 向 DNS 服务器查询，要知道 DNS 服务的地址，这个地址是`预先配置`到系统中的
> - DNS 服务器记录的数据结构：域名、Class、记录类型等等
> - 根域 DNS 服务器的 IP 共 13 个，所有的 DNS 服务器都会保存。DNS 服务器的信息已经包含在 DNS 服务器程序的配置文件中了，只要安装 DNS 服务器程序，就会自动配置好

- `DNS查询过程`
  > - 首先查询最近的 DNS 服务器，即操作系统中配置好的，查询不到查询根域名 DNS
  > - 根 DNS 说我不知道，但是你可以去问问 com
  > - com DNS 说我不知道，但是你可以去问问 wfh.com
  > - wfh.com DNS 说我不知道，但是你可以去问问www.wfh.com
  > - 然后就可以查到了
  > - 实际使用中，DNS 是有缓存且非单一域名管理

## IP 和 MAC 地址的转换

### ARP（Address Resolution Protocol）：地址解析协议

- `广播：`通过广播查询 Mac 地址

### RARP

## 代理

- `正向代理：`正向代理代理的对象是客户端。一对一、多对一
  - `隐藏了真实的请求客户端，服务端不知道真实的客户单是谁。客户端请求的服务都有代理服务器请求。例如科学上网`
- `反向代理：`，反向代理代理的对象是服务端，也是负载均衡的原理。一对一、多对多

## OSI 的七层模型

- `应用层（Application Layer）：`就是应用程序，不同网络应用程序可能使用不同的协议。浏览器使用 http 协议，邮箱客户端使用 POP，SMTP 协议等
- `表示层（Presentation Layer）：`主要负责数据格式的转换，确保一个系统的应用层发送的消息可以被另一个系统的应用层读取，编码转换，数据解析，管理数据的解密和加密，同时也对应用层的协议进行翻译（Telnet、Rlogin、SNMP、Gopher）
- `会话层（Session Layer）：`负责网络中两节点的建立，在数据传输中维护计算机网络中两台计算机之间的通信连接，并决定何时终止通信，无具体协议（SMTP、DNS）

- `传输层（Transport Layer）：`处理端口，是实现两个用户进程间端到端的可靠通信，处理数据包的错误等传输问题。TCP、UDP 协议
- `网络层（Network Layer）：`处理 IP，进行逻辑地址寻址，实现不同网络之间的路径选择，IP 就在网络层。IP、ICMP(ping、trace)
- `数据链路层（Datalink Layer）：`物理地址（MAC 地址），网络设备的唯一身份标识。建立逻辑连接、进行硬件地址寻址，相邻的两个设备间的互相通信。SLIP、CSLIP、PPP、ARP、RARP、MTU
- `物理层（Physical layer）：`物理媒介。ISO2110、IEEE802.1A、IEEE802.2、IEEE802

## TCP/IP 五层模型

- `应用层：`
- `传输层：`四层交换机、四层路由器
- `网络层：`路由器、三层交换机
- `数据链路层：`网桥、以太网交换机（二层交换机）、网卡（物理层+数据链路层）
- `物理层：`中继器、集线器、双绞线

## <https://baijiahao.baidu.com/s?id=1672386438120484176&wfr=spider&for=pc>

- `工具：微片、`
- `socks5协议：shadowsocks、shadowsocksR、v2ray、trojan等工具`
- `VPN协议相对于socks5的优势：`

  - `VPN协议能够实现真正意义上的全局代理，VPN更接近底层，甚至可以被当做是一张虚拟网卡`

    > 网页浏览器、邮件服务器、文件服务器等都跑在应用层，而 socks5 工作在第 5 层（会话层），所以可以代理以上应用层数据。

    > 游戏数据一般跑在传输层，使用 TCP 和 UDP 进行通讯，所以一般不能代理游戏

    > 虚拟网卡工具：SSTAP、Proxifier、tun2socks

    > 主流 vpn 协议：PPTP、L2TP、OpenVpn、SSTP 都跑在数据链路层或网络层，故能劫持大部分流量

    > SSL：SSL 建立在可靠的传输层协议（如：TCP）之上，与应用层协议（如：HTTP，FTP，TELNET…）独立无关，它可以有效地避免网上信息的偷听、篡改、以及信息的伪造。SSL 协议在应用层协议通信之前完成加密算法、通信密钥的协商以及服务器认证工作，应用层协议传送加密数据，从而保证通信的私密性。

    > SSL VPN，SSL 通过简单易用的方法实现信息远程连通。任何安装浏览器的机器都可以使用 SSL VPN， 这是因为 SSL 内嵌在浏览器中，它不需要象传统 IPSec VPN 一样必须为每一台客户机安装客户端软件。

    > VPN 无法消除流量特征

## VPN, Virtaul Private Network，不在是一个单纯的经过加密的访问隧道了，它已经融合了访问控制、传输管理、加密、路由选择、可用性管理<https://www.cnblogs.com/kungfupanda/archive/2013/07/18/3198093.html>

### PPTP，点对点隧道协议；L2TP 是 PPTP 的延续版本。PPTP 只能在两端点间建立单一隧道。 L2TP 支持在两端点间使用多隧道

### IPSec 隧道模式

### SSLVPN

### SSL VPN，Safe Socket Layer，基于应用层的访问控制，具有数据加密、完整性检测和认证机制，更适用于远程接入

> SSL 协议指定了在应用程序协议（HTTP、FTP、Telnet 等等）和 TCP/IP 协议之间进行数据交换的安全机制，为 TCP/IP 连接提供数据加密、服务器认证、以及可选的客户机认证

### IPSec VPN，工作在网络层，实现对整个网络的透明访问

> IETF 组织提出了一组基于密码学的安全的开放网络安全协议，总称为 IP 安全体系架构——IPSec,IPSec VPN 建立在该体系架构之上，通过为通信双方建立一个安全隧道来保障通信安全。

- `作用：在公用网络上建立专用网络，进行加密通讯`
