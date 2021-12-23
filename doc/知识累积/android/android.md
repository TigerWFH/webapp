# Android：（https://blog.csdn.net/mysimplelove/article/details/93722772）
```js
    /*
        启动的流程就是通过这六个大类在这三个进程之间不断通信的过程
        三个进程：
            1、Launcher进程，负责启动App
            2、SystemServer进程，存在于整个Android生命周期，管理和调度Android所有的服务。例如AMS、WindowsManager、PackageManageService等等
            3、App进程
        六个大类：
            1、ActivityManagerService(AMS)，是Android中最核心的服务之一，主要负责四大组件的管理，本身是一个Binder的实现类
            2、ActivityThread，应用的入口类，通过调用main方法，开启消息循环队列。ActivityThread所在的线程被称为主线程
            3、ApplicationThread，提供Binder通讯接口，AMS则通过代理调用此App进程的本地方法
            4、Instrumentation，监控应用程序和系统的交互
            5、ActivityManagerProxy，AMS服务在当前进程的代理类，负责与AMS通信
            6、ApplicationThreadProxy，ApplicationThread在AMS服务中的代理类，负责与ApplicationThread通信
        
        Activity是容器，
        Window附着于activity之上，
        View附着于Window之上

        APP启动流程（详细资料：https://blog.csdn.net/u013142672/article/details/107735211）
            —> Launcher 图标点击事件(startActivity(intent) intent使用·FLAG_ACTIVITY_NEW_TASK·标记)
            —> 通知AMS（Binder）
            —> AMS通知Launcher Paused
            —> Launcher 通知AMS 自己已经 Paused
            —> AMS查看是否有app进程的任务含有该Activity
            —> 如果有则将该任务切换到前台
            —> 如果没有则通知Zygote（Socket）
            —> Zygote孵化出一个新的VM进程
            —> VM载入相关类资源，并运行ActivityThread main方法
            —> 进入ActivityThread启动流程

        资料来源：https://blog.csdn.net/qq_25804863/article/details/106089102
        // App启动流程
        1、点击App图标或者自己编写程序：应用进程（Launcher）调用ATMS（ActivityTaskManagerService）
            Launcher启动App，调用App的Activity:startActivity()
            Instrumentation: execStartActivity()
            IActivityTaskManager通过Binder机制，调用system_server进程中的ActivityTaskManagerService:startActivity()
        2、ActivityTaskManagerService到ApplicationThread的调用过程
            system_server进程：
                ActivityTaskManagerService：
                    startActivity()
                    startActivityAsUser()
                ActivityStarter：
                    execute()
                    resumeTargetStacklfNeeded
                RootActivityContainer：
                    resumeFocusedStacksTopActivities()
                ActivityStack:
                    ...
                ActivityStackSupervisor:   ---------->通过IApplicationThread进行Binder通信，与App进程中的ApplicationThread通信
                    startSpecificActivityLocked()
                    realStartActivityLocked
                ActivityManagerInternal::startProcess --->AMS通过socket发送启动进程的请求-----》Zygote------》fork App进程

    */ 
```
## AMS(Activity Manager Service)是Android提供的管理Activity运行状态的系统进程，也管理其它组件
[初始化过程](./Android_init.jpg)
```js
/*
    https://www.pianshen.com/article/42361006180/
    Android系统是构建在linux系统上面的，启动过程涉及三个方面
    Boot Loader：系统引导bootloader加载boot.img，由bootloader加载内核kernel
    Linux Kernal：文件系统挂在，init，完成引导进程（文件解析、属性设置、启动服务、执行动作）
    Android系统服务：重要的服务进程zygote建立JavaRuntime，建立虚拟机启动AndroidSystemServer，系统服务SystemServer通过SystemManager管理安卓服务；桌面launcher各个服务已经就绪，桌面程序Home在ActivityManagerService的服务过程中建立

    AMS启动流程：
        init进程是Android系统中的初始化进程，
        init生成了Zygote进程，
        安卓中的大多数进程和系统进程都是通过Zygote进程生成
*/ 
```
## 
[启动资料1](https://blog.csdn.net/qq_26825819/article/details/107913879)
[启动资料2](https://blog.csdn.net/qq_37196748/article/details/106478134)
system_service启动
ZygoteProcess是存在与system_service进程中的，算是系统zygote进程的代理，通过Socket与系统zygote进程进行通信
系统zygote进程

启动应用的时候，AMS会将携带着ActivityThread类名（"android.app.ActivityThread"）的命令通过Socket传递给当前系统zygote进程的SocketService,zygote进程通过FORK方法创建新的进程，此进程就即将成为新应用进程．

新进程是从zygote进程fork出来的，所以刚开始状态和zygote进程状态是一样的，此后就会退出zygote状态，然后通过反射运行ActivityThread的main方法．进而成为真正的应用进程

ActivityThread的main方法会创建ActivityThread实例instance，并调用instance.attach()方法

attach方法，实例化mAppThread即new ApplicationThread()

mAppThread会通过IActivityManager.attachApplication与系统进程system_service通信，系统进程system_service会记录下mAppThread的代理，并会把此代理作为新应用在system_service进程的标志，方便system_service区分不同的应用进程
Activity Service Manager(AMS)
[root_activity启动](./root_activity.png)
[普通activity启动](./activity.png)

## 包(https://developer.android.google.cn/reference/packages)
```js
/**
    android: 提供了全局对象
        Manifest:
        R:
    android.app:提供高层的程序模型和基本的运行环境
    android.view:提供基础的用户界面接口框架
    android.widget:包含各种UI元素（大部分是可见的）在应用程序的布局
    android.content:包含对各种设备上的数据进行访问和发布
    android.graphics:图形库
    android.media:多媒体库
    android.net:网络库
    android.os:提供了系统服务、消息传输和IPC机制
    android.database:数据库
    android.location:定位
    android.opengl:OpenGL库
    android.provider:提供访问Android内容提供者的类
    android.telephone: 拨打电话
*/
// 其他library
/**
    AndroidX
    Jetpack Compose
    AndroidX Test
    AndroidX Constant Layout
    Databinding Library
*/ 
```
* `Activity:`is an application component that provides a screen with which users can interact in order to do something, such as dial the phone, take a photo, send an email, or view a map. An activity can start other activities, including activities that live in separate applications.
* `Service:`is an application component that can perform long-running operations in the background without a user interface. For example, a service can handle network transactions, play music, or work with a content provider without the user being aware of the work going on

## ApplicationThread
## ActivityThread
## Activity Lifecycle
使用Context.startActivity()可以启动AndroidManifest.xml配置的所有activity
![Activity Lifecycle](./activity_lifecycle.png)
* `onCreate：`初始化activity
```
    可以在此处调用setContentView设置UI
    通过findViewById(int)获取对应UI，进行交互
```
* `onRestart：`
* `onResume：`
* `onPause：`暂停activity的交互，但视觉可见；通常使用ContentProvider存储状态
* `onStop：`
* `onDestroy：`
## 关于安卓应用的单activity多fragment还是多activity的问题
[资料](https://www.zhihu.com/question/298199624)
[资料2](https://www.zhihu.com/question/37375420?sort=created)
[activity](https://zhuanlan.zhihu.com/p/99024667)
## Android一些类（https://blog.csdn.net/lu1024188315/article/details/75722420）
说明，整个ActivityThread框架是基于Binder通信的C/S结构，从图可知Server端是ActivityThread、ApplicationThread，Client是AMS（ActivityManagerService），而 ApplicationThreadProxy可以看作AMS中Server 代表。
* `ActivityThread：`组合了一个ApplicationThread
```js
    /*
        ActivityThread：就是安卓应用的主线程（UI线程），ActivityThread的main方法是整个App的入口（启动Activity相关）
    */ 
    // ApplicationThread是ActivityThread的内部类，ActivityThread与启动Activity有关，那么 ApplicationThread就与启动Application有关了
    ApplicationThread mAppThread
    // H继承与Handle，重写了handleMessage的方法，这个类主要作用就是根据不同的情况处理各种业务，而且处理业务的方法一般是以handle开头，handleXXX的格式
    final H mH = new H()
    // mActivities包含了当前进程的所有的activity,注意不是简单的把activity做了数据集合，而是封装成了ActivityClientRecord， ActivityClientRecord是ActivityThread的内部类，ActivityClientRecord不仅仅保存了Activity本身 及其相关的信息 ，还会保存与该Activity有关的成员（例如window、windowManager等）
    ArrayMap<IBinder, ActivityClientRecord> mActivities
    //  mActivities是储存当前进程所用的Activity实例，那么 mServices就是 储存 当前进程所用的Service实例。
    ArrayMap<IBinder, Service> mServices
    很明显这个集合就是为了保存Application实例的，一个APP应用中使用一个类继承Application，子类的onCreate只被调用一次，
    // 很明显这个集合就是为了保存Application实例的，一个APP应用中使用一个类继承Application，子类的onCreate只被调用一次，这里为什么使用集合了呢?在LoadedAPK的makeApplication方法也能体现这一点，mApplication为null就创建一个Application实例，否则就返回它。但是其下面还有一行代码：mActivityThread.mAllApplications.add(app);在这里把刚刚创建Application实例到mAllApplications中保存起来了,那只有LoadedAPK角度分析，会发现在handleReceiver、handleCreateService方法。都有创建LoadedAPK实例，也调用了 makeApplication方法当然这个时候也会创建一个Application实例，所以不要单纯地以为只有启动Activity的时候才使用Application。
    final ArrayList<Application> mAllApplications = new ArrayList<Application>();
```
* `ApplicationThread：`ApplicationThread是ActivityThread的内部类，也是一个Binder对象。在此处它是作为IApplicationThread对象的server端等待client端的请求然后进行处理，最大的client就是AMS
* `ApplicationThreadNative：`
* `ApplicationThreadProxy：`
* `Activity：`Activity是Android的四大组件，使用户操作的可视化界面。
```js
    /*
        创建完Activity之后，调用setContentView方法完成界面的显示
        activity生命周期：
            在Android中维护了一个ActivityStack，新建的Activity会被放到栈顶，该Activity就处于运行状态。Activity有4种状态（运行中，暂停，停止（被覆盖或切入后台），销毁）

    */ 
```
* `Application：`应用程序生命周期
```js
    onCreate()// 初始化 应用程序级别 的资源，如全局对象、环境配置变量、图片资源初始化、推送服务的注册等等，不要执行耗时操作
    // 监听 应用程序 配置信息的改变，如屏幕旋转等
    onConfigurationChanged()
    // 监听 安卓系统整体内存较低时刻，Android 4.0前 检测内存使用情况，从而避免被系统直接杀掉 & 优化应用程序的性能体验
    onLowMemory()
    // 通知 应用程序 当前内存使用情况（以内存级别进行识别），根据当前内存使用情况进行自身的内存资源的不同程度释放，以避免被系统直接杀掉 & 优化应用程序的性能体验
    onTrimMemory()
    onTerminate()
    // 注册 / 注销对 应用程序内 所有Activity的生命周期监听
    registerActivityLifecycleCallbacks()
    unregisterActivityLifecycleCallbacks()
    // 注册（注销）ComponentCallbacks2回调
    registerComponentCallbacks()
    unregisterComponentCallbacks()
    // 
    registerOnProvideAssistDataListener()
    unregisterOnProvideAssistDataListener()
```
* `Window（PhoneWindow）：`