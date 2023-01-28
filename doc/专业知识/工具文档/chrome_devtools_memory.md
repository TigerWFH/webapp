# chrome-devtools

[参考资料 1](https://zhuanlan.zhihu.com/p/80792297)

[参考资料 2](https://www.cnblogs.com/gyjWEB/p/4564151.html)

```plain
    我的页面是否占用了过多的内存? - Performance内存查看工具(勾选Memory) 和 Chrome任务管理(Chrome task manager) 能帮助你确认你是否使用了过多的内存。Memory view 能跟踪页面渲染过程中DOM节点计数，documents文档计数和JS事件监听计数。作为一个经验法则：避免对不再需要用到的DOM元素的引用，移除不 需要的事件监听并且在存储你可能不会用到的大块数据时要留意

    我的页面有没有内存泄漏? - 对象分配跟踪(Object allocation tracker)通过实时查看JS对象的分配来帮助你定位泄漏。你也可以使用堆分析仪(Heap Profiler)生成JS堆快照，通过分析内存图和比较快照之间的差异，来找出没有被垃圾回收清理掉的对象

    我的页面垃圾强制回收有多频繁? - 如果你的页面垃圾回收很频繁，那说明你的页面可能内存使用分配太频繁了。Timeline内存查看工具(Timeline memory view) 能够帮助你发现感兴趣的停顿
```

## 术语

- `对象大小(Object Size)：`分为两种，Shallow Size 和 Retained Size 两种
- `(Shallow Size)：`对象本身大小，不包含其引用的对象，常规对象的 Shallow 由其成员变量的数量和类型决定；数组有数组元素的类型和数组长度决定
- `(Retained Size)：`对象自身大小（Shallow Size），加上从该对象直接或间接访问到对象的 Shallow Size 之和

```plain
    一个对象一旦删除后，它引用的依赖对象就不能被GC Root引用到，它们所占用的内存就会被GC释放回收
    GC Root是由控制器组成的，这些控制器是由build-in函数（native code）到V8引擎之外的JavaScript对象的引用时创建的
    所有控制器都能够在堆快照的GC roots -> Handle Scope和GC roots -> Global handlers中找到
```

- `distance：`是从 window 对象到达对应对象的最短路径长度

```plain
    没看明白？？？
    Window 全局对象 (所有iframe中的)。在堆快照中有一个distance字段，它是从window对象到达对应对象的最短路径长度。
    由所有document能够遍历到的DOM节点组成的文档DOM树。不是所有节点都会被对应的JS引用，但有JS引用的节点在document存在的情况下都会被保留。
    有很多对象可能是在调试代码时或者DevTools console中(比如：console中的一些代码执行结束后)创建出来的。

    内存图有一个根部开始，可能是浏览器的window对象或nodejs模块中的Global对象，这些对象如何被回收受用户控制，不能被GC根遍历到的对象都将被内存回收。
    堆是由各种互相关联的对象组成的网状结构
```

## V8 相关术语

### Javascript 对象描述

- `原始类型：`number,boolean,string,Symbol,BigInt,

## Chrome Devtools Memory

### 查看 chrome tab 占用内存

- `Setting -> More Tools -> Task Manager`

### 查看页面内存实时变化过程以及占用内存

- `Chrome Devtools Performance中的js Heap`

### 更多内存信息，动态跟踪页面渲染过程中 DOM 节点数，documents 文档计数和 JS 事件监听计数

- `Chrome Devtools Memory`
- `ICON1：记录`
- `ICON2：清除`
- `ICON3：GC`
- `Heap snapshot：`打印堆快照，堆快照文件显示页面的 javascript 对象和相关 DOM 节点（C++对象）之间的内存分配
- `Allocation instrumentation on timeline：`在时间轴上记录内存信息，随着时间变化记录内存信息
- `Allocation smpling：`内存信息采样，使用采样的方法记录内存分配
- `Button Take snapshot：`
- `Button Load：`

## 测试内存泄露 Demo

[Demo](https://ulan.github.io/misc/leak.html)
![泄露图示](./imgs/js-leak-demo.png)
