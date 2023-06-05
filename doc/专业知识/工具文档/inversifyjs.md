# inversifyjs

## Definitions

- `容器（Container）：`将类和标识关联起来，并对类到实例化进行全生命周期的管理。本身还有父容器和子容器概念
- `container/container modules`
  > - `container modules`Container modules can help you to manage the complexity of your bindings in very large applications
  >   [container modules 参考资料](https://github.com/inversify/InversifyJS/blob/master/wiki/container_modules.md)
  > - `ContainerModule`
  > - `AsyncContainerModule`
- `scope：`它是和 class 的注入关联在一起的。一个类的注入可以支持一下三种模式
  > - `Transient`每次从容器中获取的时候（也就是每次请求）都是一个`新的实例`
  > - `Singleton`每次从容器中获取的时候（也就是每次请求）都是同一个`实例`
  > - `Request`社区里也称为 Scoped 模式，每次请求的时候都会获取`新的实例`；如果`这次请求中`该类被 require 多次，那么只返回同一个实例
- `标识（Token）`
- ``
- ``

## Inversifyjs 工作流

[参考资料](https://juejin.cn/post/7049717544109752350)

- Annotation: 打标签阶段
  > - `injectable：`标识一个`当前类`是否可依赖注入（是否可以通过容器进行管理）
  > - `inject：`装饰器，标识要注入的依赖类型。在解析阶段，会根据 inject 的参数在容器中查找依赖并注入
  > - `multiInject：`多绑定的依赖注入，获取的值为`数组`
  > - `named：`具名绑定
  > - `optional：`标明可选依赖，未找到绑定时为 undefined，可声明默认值
  > - `postConstruct：`类中该标签标注的方法，会在 constructor 执行后立即执行，同一个类中只能有一个该标签
  > - `unmanaged：`用于解除派生类的构造函数参数的数量
- Planning: 规划阶段
- Middleware: optional，激活阶段
- Resolution: 解析阶段
- Activation: optional，激活阶段

## APIs

- `Container`

  > - `ContainerModule`
  > - `Container.merge(a,b,...)`：合并容器的绑定内容，返回一个新容器
  > - `container.applyCustomMetadataReader(metadataReader):void`
  > - `container.applyMiddleware(...middleware):void`
  > - `container.createChild(containerOptions): Container`
  > - `container.bind(serviceIdencifier):BindingToSyntax`
  > - `container.get<T>(serviceIdencifier<T>):T`:Resolves a dependency by its runtime identifier. The runtime identifier must be associated with only one binding and the binding must be synchronously resolved, otherwise an error is thrown
  > - `container.getAsync<T>(serviceIdencifier<T>):Promise<T>`:Resolves a dependency by its runtime identifier. The runtime identifier must be associated with only one binding, otherwise an error is thrown
  > - `container.getNamed()`
  > - `container.getNamedAsync()`
  > - `container.getTagged()`
  > - `container.getTaggedAsync()`
  > - `container.getAll()`
  > - `container.getAllAsync()`
  > - `container.getAllNamed()`
  > - `container.getAllNamedAsync()`
  > - `container.getAllTagged()`
  > - `container.getAllTaggedAsync()`
  > - `container.isBound(serviceIdencifier)`判断 serviceIdencifier 是否有绑定 class
  > - `container.isCurrentBound(serviceIdencifier)`在当前容器，判断 serviceIdencifier 是否有绑定 class
  > - `container.isBoundNamed()`
  > - `container.isBoundTagged()`
  > - `container.load(...modules): void`: 调用每一个模块的注册函数
  > - `container.loadAsync()`
  > - `container.rebind(serviceIdencifier)`:替换已有的绑定 class（将 a 标识的 AClass 替换成 BClass）
  > - `container.rebindAsync()`
  > - `container.resolve()`类似 get，但是在没有 class 绑定的场景喜爱，允许用户自定义类实例
  > - `container.onActivation()`
  > - `container.onDeactivation()`
  > - `container.restore()`
  > - `container.snapshot()`
  > - `container.unbind(serviceIdentifier)`Remove all bindings binded in this container to the service identifer
  > - `container.unbindAsync(serviceIdentifier)`
  > - `container.unbindAll()`Remove all bindings binded in this container
  > - `container.unbindAllAsync()`
  > - `container.unload(...modules)`Removes bindings and handlers added by the modules
  > - `container.unloadAsync(...modules)`
  > - `container.parent`
  > - `container.id`

  ## CoreObject

  ### Bindings

  - `BindingToSyntax`
    > - `to`绑定一个类
    > - `toSelf`to 的简化版，当 serviceIdentifier（标识符）是构造函数时，直接绑定自身
    > - `toConstantValue`绑定一个常量
    > - `toDynamicValue`绑定为动态数值，解析时执行传入的函数获取依赖
    > - `toFactory`绑定为工厂方法
    > - `toAutoFactory`绑定为自动工厂方法，工厂方法自动生成为获取传入的 serviceIdentifier 的依赖注入
    > - `toProvider`绑定为异步工厂方法
    > - `toService`传递绑定，属于一个语法糖
  - `BindingInSyntax`
    > - `inTransientScope` （瞬时作用域模式）每次获取都是新的（也是 container 的默认依赖项作用域）
    > - `inSingletonScope` （单例作用域模式）创建的是覆盖类型绑定完整生命周期的单例。这意味着当我们使用 container.unbind 取消类型绑定时，inSingletonScope 会在内存中清除
    > - `inRequestScope` （请求作用域模式）创建的单例覆盖的是调用 container.get、container.getTagged 或 container.getNamed 时的完整生命周期。对这些方法的每一次调用都将解析一个根依赖项及其所有子依赖项。InversifyJS 在 planning 阶段内部创建了一个名为依赖关系图(具体见下文 planning 介绍)inRequestScope 作用域会对其中多次出现的对象使用单个实例。这样就减少了所需的解析数，并且在某些情况下可以用作性能优化的选项

- `BindingWhenSyntax`这个对象主要用于设置绑定条件，会在 planning 阶段找 activeBindings 时进行解析（见下文）
  > - `whenTargetNamed`
  > - `whenTargetIsDefault`
- `BindingOnSyntax`这个对象主要用于设置 binding 的 onActivation 钩子，设置后会在 Activation 阶段执行（见下文
