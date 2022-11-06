# VPS

## 术语

- `VNC：`Virtual Network Console，虚拟网络控制台，是一款优秀的远程控制工具软件。CS 架构
  - `vncserver：`必须运行在被控制的主机
  - `vncviewer：`本地应用程序，用于远程接入运行 vncserver 的计算机并显示其环境
  - `vncpasswd：`vncserver 的密码设置工具
  - `vncconnect：`告诉 vncserver 连接到远程一个运行 vncviewer 的计算机的 IP 和端口号。这样我就可以避免给其他人一个接入的密码。
