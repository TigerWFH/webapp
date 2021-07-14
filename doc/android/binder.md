# Android Binder机制（https://zhuanlan.zhihu.com/p/145332697）(https://blog.csdn.net/augfun/article/details/82343249)
## ServiceManager服务，是Android OS的整个服务的管理程序
* `AIDL`
* `RemoteService`
```js
    /*
        Android 很多核心功能都是由一系列 Services 支持，Android apps基本上需要各式各样的IPC需求
        为什么不是 Local Socket？或者 Shared Memory，那是因为安全性无法得到保障。Android 的权限系统需要一种可靠的方式来保证各种 Services 的访问是在权限系统的监控下进行的，上述提到的解决方案就做不到了，因为不管是套接字还是共享内存，现有的 Linux 内核都不存在一种检验双方身份的方法存在，任何通过套接字或者共享内存走的数据都可以伪造，而在这个基础上做任何验证，代价都是相当高的。Android 的选择是基于内核，重新开发一套 IPC 机制，让它固有这些特性，也就是让系统可以在 Ring0 能保障交互双方身份的正确性，并且这种基于内核的方案效率还很高。既然要基于内核，就一定要对内核动手脚，Android 采用驱动的方式实现这个技术，而不是直接修改 Linux 内核。这样你就可以假设，手机中有一个“设备”，应用之间通过这个设备来交互，而这个设备自身有一套身份校验机制，这样就比基于用户态的 IPC 方案来的安全得多，也快得多了
        IPC解决方案：
        1、LocalSocket：安全性无法得到保证
        2、SharedMemory：安全性无法得到保证
        3、Binder：Binder是Android系统进程间通信(IPC)方式之一
        * ActivityService
        * WindowService
        * MediaService
    */ 
```
AIDL生成就是IMyService接口，而Stub（本地调用，同一进程）和Proxy（远程调用，跨进程）则是这个接口的两个内部类，分别是Binder类和BinderProxy类的子类
```plantuml
    @startuml
        interface IBinder {}
        interface IInteface {}

        interface IMyService {}
        IInteface <|-- IMyService

        class Binder {}
        IBinder <|.. Binder

        class BinderProxy {}
        IBinder <|.. BinderProxy

        class IMyService.Stub {}
        Binder <|-- IMyService.Stub
        IMyService <|.. IMyService.Stub

        class IMyService.Proxy {}
        IMyService <|.. IMyService.Proxy
        IMyService.Proxy *-- BinderProxy
    @enduml
```
### MediaService，该服务注册了提供媒体播放的服务程序MediaPlaerService
### MediaPlayerClient，这个是与MediaPlayerSErvice交互的客户端
```C++
    // framework\base\Media\MediaServer\Main_mediaserver.cpp
```