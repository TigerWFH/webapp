# 网络库

## 理解

```text
    从编程人员的眼光来看，Winsock 或者 POSIX socket 是对 TCP/IP 协议栈中 物理，链路，网络，传输层的封装和抽象，在这个基础上将传输的数据根据应用层协议（如楼主提到的http、ftp）进行解析和处理，便可实现端对端的网络应用。
常用的应用程协议处理在某些系统的平台 SDK 中会有封装好的类库，比如 Win32 的 WinHttp, WinInet，或者可以找开源的第三方库，他们一般都是基于 POSIX 中的 Socket API 的。

ACE 是个很不错的开源跨平台网络中间件类库，它在自身提供的 Socket API， 进程，线程，并发机制的 Wrapper Facade之上，封装并实现了多种分布式应用的模式和框架，但是个人觉得不太适合初学者。

所以建议还是按照这个学习曲线，把基础打扎实，然后再转入到库和框架的运用当中：
TCP/IP 协议栈基础 -> POSIX socket API 以及重要的系统调用（如 select） - > 特定平台的 socket 实现 (比如楼主所说的 Winsock) -> 相关的类库或函数库

如果是特定在Win32平台下编程的话，可以减少对第二项的重视程度，然后在学习第四项时选择 MFC 中和 Windows Sockets 和 Internet Services 相关的类进行学习（你可以从MFC的类库层次图上得到相关的信息）。此外 MSDN->Win32 and COM Development->Networking->Network Protocols 这一部分有很多值得你学习的内容。

WINPCAP等SDK
WINSOCKET也有
ACE 和 boost asio 都还不错
```
