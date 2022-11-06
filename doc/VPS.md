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
