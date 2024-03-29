# DDD 领域设计<https://zhuanlan.zhihu.com/p/404940984>

> 领域驱动设计的概念是 2004 年 Evic Evans 在《Domain-Driven Design: Tracking Complexity in the Heart of Software》，中文译名：领域驱动设计：软件核心复杂性应对之道
>
> 面临现实世界的复杂问题，如何以软件的形式落地？领域驱动设计是一套方法论，指导我们将复杂问题进行拆分、拆分出各个子系统间的关联以及是如何运转的。
>
> Evic Evans 将软件的设计分为 2 个部分：战略设计和战术设计。
>
> 在战略设计层面提出了域、子域、限界上下文等概念。战略设计指导如何拆分一个复杂的系统。
>
> 在战术设计层面提出了实体、值对象、领域服务、领域事件、聚合、工厂、资源库等重要概念。战术设计指导对于拆分的单个子系统如何进行落地，在落地过程中应该遵循那些原则。

## 术语

- `域：`对应一个问题空间
- `子域：`把域这个大问题空间拆分成若干个小的更容易解决的问题空间
- `限界上下文：`解决方案空间，每个子域对应一个或多个解决方案空间

## 领域

> 领域与具体开发技术无关。就是你的软件系统要解决的实际问题相关的所有东西的集合
