# ReactDOM APIs

React 支持所有的 popular browsers，包括 IE9 以上。IE9 和 IE10 需要 polyfills。

## 1、render(element, container[, callback])

- 将 React element 渲染到对应的容器 container 中取，去过已经存在，则 update 对应的 element。如果提供了 callback，则渲染完毕会执行 callback。

```
    container._reactRootContainer: ReactDOMBlockingRoot = {
        _internaleRoot: FiberRootNode = {
            current: FiberNode = initialFiberNode
        }
    }

    initialFiberNode.stateNode: FiberRootNode = container._reactRootContainer._internalRoot

    // Fiber树的head是FiberRootNode，会挂载一个initialFiberNode
    FiberNodeHead = container._reactRootContainer._internalRoot

    function render(element, container, callback) {
        // ...
        return legacyRenderSubtreeIntoContainer(null, element, container, false, callback)
    }
    function legacyRenderSubtreeIntoContainer(parentComponent, children, container, forceHydrate, callback) {
        var root: ReactDOMBlockingRoot = container._reactRootContainer;
        var fiberRoot;
        if (!root) {//第一次加载
            root = container._reactRootContainer = legacyCreateRootFromDOMContaine(container, forceHydrate)
            fiberRoot = root._internalRoot;

            <!-- 有条件的调用updateContainer -->
        }
        else {//update
            <!-- 直接调用updateContainer -->
        }

    }

    function legacyCreateRootFromDOMContaine(container, forceHydrate): ReactDOMBlockingRoot {
        // 1、会清除container下的子元素
        // 2、返回
        return createLegacyRoot(container, options)
    }

    function createLegacyRoot(container, options): ReactDOMBlockingRoot {
        return new ReactDOMBlockingRoot(container, LegacyRoot, options)
    }

    function ReactDOMBlockingRoot(container, tag, options) {
        this._internalRoot: FiberRootNode = createRootImpl(container, tag, options)
    }
    function createRootImpl(container, tag, options): FiberRootNode {
        var root: FiberRootNode = createContainer(container, tag, hydrate)

        return root
    }
    function createContainer(container, tag, hydrate): FiberRootNode {
        return createFiberRoot(container, tag, hydrate)
    }
    // 这里初始化一部分数据
    function createFiberRoot(containerInfo, tag, hydrate, hydrationCallbacks): FiberRootNode {
        // 创建FiberRootNode节点，初始化一下数据
        var root = new FiberRootNode(containerInfo, tag, hydrate)
        // 创建Head Fiber节点，初始化一下数据
        var uninitializedFiber: FiberNode = createHostRootFiber(tag)
        // FiberRootNode节点的current指向Head Fiber
        root.current = uninitializedFiber
        // HeadFiber的stateNode指向FiberRootNode
        uninitializedFiber.stateNode = root
        // 初始化HeadFiber的updateQueue属性
        initializedUpdateQueue(uninitializedFiber)

        return root
    }
    function FiberRootNode(containerInfo, tag, hydrate) {
        this.tag = tag;
        this.current = null;
        this.containerInfo = containerInfo;
        this.pendingChildren = null;
        this.pingCache = null;
        this.finishedExpirationTime = NoWork;
        this.finishedWork = null;
        this.timeoutHandle = noTimeout;
        this.context = null;
        this.pendingContext = null;
        this.hydrate = hydrate;
        this.callbackNode = null;
        this.callbackPriority = NoPriority;
        this.firstPendingTime = NoWork;
        this.firstSuspendedTime = NoWork;
        this.lastSuspendedTime = NoWork;
        this.nextKnownPendingLevel = NoWork;
        this.lastPingedTime = NoWork;
        this.lastExpiredTime = NoWork;
        {
            this.interactionThreadID = tracing.unstable_getThreadID();
            this.memoizedInteractions = new Set();
            this.pendingInteractionMap = new Map();
        }
    }
    function createHostRootFiber(tag): FiberNode {
        // ...
        return createFiber(tag, pendingProps, key, mode)
    }

    function updateContainer(element, container/* FiberRootNode */, parentComponent, callback) {
        var current$1: FiberNode = container.current
        var update = createUpdate(expirationTime, suspenseConfig) // update.next = update;update.priority=XXX
        update.payload = {
            element: element /* vDom树 */
        }
        update.callback = callback
        enqueueUpdate(current$1, update)
        scheduleWork(current$1, expirationTime)

        return expirationTime
    }
    // 重点函数
    function workLoopSync() {
        // performUnitOfWork: FiberNode
        while(workInProgress !== null) {
            workInProgress = performUnitOfWork(workInProgress)
        }
    }
    // unitOfWork = workInProgress: FiberNode
    function performUnitOfWork(unitOfWork) {
        var current: FiberNode = unitOfWork.alternate
        startWorkTimer(unitOfWork);
        setCurrentFiber(unitOfWork);
        var next;
        if(){
            /* vDom  */
            next = beginWork$1(current, unitOfWork, renderExpirationTime$1)
        }
        else {
            next = beginWork$1(current, unitOfWork, renderExpirationTime$1)
        }
        resetCurrentFiber();
        unitOfWork.memoizedProps = unitOfWork.pendingProps;
        if (next === null) {
            // If this doesn't spawn new work, complete the current work.
            next = completeUnitOfWork(unitOfWork);
        }
        ReactCurrentOwner$2.current = null;
        return next;
    }
    function beginWork$1(current, unitOfWork, expirationTime) {
        try {
            return beginWork(current, unitOfWork, expirationTime)
        }
        catch (originalError) {

        }
    }
    function beginWork(current, workInProgress, expirationTime) {
        var updateExpirationTime = workInProgress.expirationTime;
        if (current !== null) {
            var oldProps = current.memoizedProps;
            var newProps = workInProgress.pendingProps;
            if () {

            }
            else if (updateExpirationTime < renderExpirationTime) {
                didReceiveUpdate = false
                switch(workInProgress.tag) {
                    case HostRoot:{

                    }
                    case HostComponent:{
                        return updateHostComponent(current, workInProgress, renderExpirationTime);
                    }
                    case ClassComponent: {

                    }
                    case HostPortal: {

                    }
                    case ContextProvider: {

                    }
                    case Profiler: {

                    }
                    case SuspenseComponent: {

                    }
                    case SuspenseListComponent: {

                    }
                }
                return bailoutOnAlreadyFinishedWork(current, workInProgress, renderExpirationTime);
            }
            else {
                didRecieveUpdate = false
            }
        }
        else {
            <!-- vDom -->
            didRecieveUpdate = false
        }
        workInProgress.expirationTime = NoWork
        switch(workInProgress.tag) {
            case FunctionComponent: {
                var _Component = workInProgress.type;
                var unresolvedProps = workInProgress.pendingProps;
                var resolvedProps = workInProgress.elementType === _Component ? unresolvedProps : resolveDefaultProps(_Component, unresolvedProps);

                return updateFunctionComponent(current, workInProgress, _Component, resolvedProps, renderExpirationTime);
            }
            <!-- vDom -->
            case ClassComponent: {
                var _Component2 = workInProgress.type;
                var _unresolvedProps = workInProgress.pendingProps;
                var _resolvedProps = workInProgress.elementType === _Component2 ? _unresolvedProps : resolveDefaultProps(_Component2, _unresolvedProps);

                return updateClassComponent(current, workInProgress, _Component2, _resolvedProps, renderExpirationTime);
            }
            case HostRoot: {
                return updateHostRoot(current, workInProgress, renderExpirationTime);
            }
        }
    }
    <!-- vDom -->
    function completeWork(){
        <!-- 创建dom -->
    }
    <!-- vDom -->
    function updateClassComponent(current, workInProgress, Component, nextProps, renderExpiration) {
        if (workInProgress.type !== workInProgress.elementType) {

        }
        var hasContext
        if (isContextProvider(Component)) {

        }
        else {
            hasContext = false
        }
        prepareToReadContext(workInProgress, renderExpirationTime)
        <!-- classComponent的实例化 -->
        var instance = workInProgress.stateNode // 默认是null
        var shouldUpdate
        if (instance === null) {
            if (current !== null) {
            }
            <!-- 构建classComponent的实例 -->
            constructorClassInstance(workInProgress, Component, nextProps)
            mountClassInstance(workInProgress, Component, nextProps)
            shouldUpdate = true
        }
        else if (current === null){
        }
        else {
        }

        var nextUnitOfWork = finishClassComponent(current, workInProgress, Component, shoulUpdate, hasContext, renderExpirationTime)
        {

        }

        return nextUnitOfWork
    }
    <!-- vDom -->
    function finishClassComponent(current, workInProgress, Component, shouldUpdate, hasContext, renderExpiration) {
        markRef(current, workInProgress)
        if(){}
        var instance = workInProgress.stateNode
        ReactCurrentOwner$1.current = workInProgress
        var nextChildren
        if (didCaptureError && typeof Component.getDerivedStateFromError !== 'function') {

        }
        else {
            setIsRendering(true)
            <!-- 调用render函数 -->
            nextChildren = instance.render()
        }
        if() {

        }
        else {
            reconcileChildren(current, workInProgress, nextChildren, renderExpirationTime);
        }
    }
    <!-- vDom -->
    function constructorClassInstance(workInProgress, ctor, props) {
        var isLegacyContextConsumer = false
        var unmaskedContext = emptyContextObject
        var context = emptyContextObject
        var contextType = ctor.contextType
        {
            if ('contextType' in ctor) {
            }
        }
        if (typeof contextType === 'object' && contextType !== null) {
            context = _readContext(contextType)
        }
        else {
            unMaskedContext = getUnmaskedContext(workInProgress, ctor, true)
            var contextTypes = ctor.contextTypes
            isLegacyContextConsumer = contextTypes !== null && contextTypes !== undefined
            context = isLegacyContextConsumer ? getMaskedContext(workInProgress, unmaskedContext) : emptyContextObject
        }
        {
            if (workInProgress.mode & StrictMode) {
                new ctor(props, context)
            }
        }
        <!-- vDom实例创建 -->
        var instance = new ctor(props, context)
        var state = workInProgress.memoizedState = instance.state !== null && instance.state !== undefined ? instance.state : null
        adoptClassInstance(workInProgress, instance)
        {
            if (typeof ctor.getDerivedStateFromProps === 'function' && state === null) {

            }
            if (typeof ctor.getDerivedStateFromProps === 'function' || typeof instance.getSnapshotBeforeUpdate === 'function') {

            }
        }

        return instance
    }
    <!-- vDom -->
    function adoptClassInstance(workInProgress, instance) {
        instance.updater = classComponentUpdater
        <!--    FiberNode.stateNode存放ClassComponent实例或者FiberRootNode实例    -->
        workInProgress.stateNode = instance
        // ...
    }
    <!-- vDom -->
    function mountClassInstance(workInProgress, ctor, newProps, renderExpirationTime) {
        {
            checkClassInstance(workInProgress, ctor, newProps)
        }
        var instance = workInProgress.stateNode
        instance.props = newProps
        instance.state = workInProgress.memoizedState;
        instance.refs = emptyRefsObject;
        initializeUpdateQueue(workInProgress);
        var contextType = ctor.contextType
        if (typeof contextType === 'object' && contextType !== null) {

        }
        else {
            var unmaskedContext = getUnmaskedContext(workInProgress, ctor, true)
            instance.context = getMaskedContext(workInProgress, unmaskedContext)
        }
        {
            if (instance.state === newProps) {

            }
            if (workInProgress.mode && StrictMode) {
                ReactStrictModeWarnings.recordLegacyContextWarning(workInProgress, instance);
            }
            {
                ReactStrictModeWarnings.recordUnsafeLifecycleWarnings(workInProgress, instance);
            }
        }
        processUpdateQueue(workInProgress, newProps, instance, renderExpirationTime)
        instance.state = workInProgress.memoizedState

    }
    <!-- vDom -->
    function processUpdateQueue(workInProgress, props, instance, renderExpirationTime) {
        var queue = workInProgress.updateQueue
        hasForceUpdate = false
        {
            currentlyProcessingQueue = queue.shared
        }
        var baseQueue = queue.baseQueue
        var pendingQueue = queue.shared.pending
        if (pendingQueue !== null) {

        }
        if (baseQueue !== null) {

        }

    }
    <!-- HeadFiberNode -->
    // 重点函数，更新props和state，返回vDom对应的FiberNode
    function updateHostRoot(current, workInProgress, renderExpirationTime): FiberNode {
        pushHostRootContext(workInProgress);
         var updateQueue = workInProgress.updateQueue;
         do {

             pendingQueue === null,终止循环
         } while(true)

         var nextState = workInProgress.memoizedState;
          var nextChildren = nextState.element; // Demo tree
         reconcileChildren(current, workInProgress, nextChildren, renderExpirationTime);
    }

    function reconcileChildren(current, workInProgress, nextChildren, renderExpirationTime) {
        if (current === null) {
            // vDom走这里
            workInProgress.child = mountChildFibers(workInProgress, null, nextChildren, renderExpirationTime);
        }
        else {
            // 走这里
            workInProgress.child = reconcileChildFibers(workInProgress, current.child, nextChildren, renderExpirationTime);
        }
    }

    function reconcileChildFibers(returnFiber, currentFirstChild, newChild, expirationTime) {
        // ...
        if () {
            switch(newChild.$$typeof) {
                case REACT_ELEMENT_TYPE:
                    return placeSingleChild(reconcileSingleElement(returnFiber, currentFirstChild, newChild, expirationTime));
                case REACT_PORTAL_TYPE:
                    retrun placeSingleChild(reconcileSinglePortal(returnFiber, currentFirstChild, newChild, expirationTime));
            }
        }
    }
    function reconcileSingleElement(returnFiber, currentFirstChild, element, expirationTime) {
        var key = element.key
        var child = currentFirstChild
        while(child !== null) {
            // 没有执行
        }
        if (element.type === REACT+FRAGMENT_TYPE) {

        }
        else {
            var _created4 = createFiberFromElement(element, returnFiber.mode, expirationTime)

            _created4.ref = coerceRef(returnFiber, currentFirstChild, element)
            <!-- 将元素对应FiberNode的returnFiber属性指向HeadFiberNode（parentFiberNode）） -->
            _created4.return = returnFiber
            return _created4
        }
    }
    function createFiberFromElement(element, mode, expirationTime) {
        var owner = null
        owner = element._owner
        var type = element.type
        var key = element.key
        var pendingProps = element.props
        var fiber = createFiberFromTypeAndProps(type, key, pendingProps, owner, mode, expirationTime)
        fiber._debugSource = element._source
        fiber._debugOwner = element._owner

        return fiber
    }
    function createFiberFromTypeAndProps(type, key, pendingProps, owner, mode, expirationTime) {
        var fiber
        var fiberTag = IndeterminateComponent
        var resolvedType = type
        if (typeof type === 'function') {
            if (shouldConstructor(type)) {
                fiberTag = ClassComponent
                {
                    resolvedType = resolveClassForHotReloading(resolvedType)
                }
            }
            else {
                resolvedType = resolveFunctionForHotReloading(resolvedType);
            }
        }
        else if (typeof type === 'string') {

        }
        else {

        }
        <!-- 这里建立了vDom对应的FiberNode -->
        fiber = createFiber(fiberTag, pendingProps, key, mode)
        fiber.elementType = type
        fiber.type = resolvedType
        fiber.expirationTime = expirationTime

        return fiber
    }

```

- 返回指向组件的指针或 null（无状态组件返回 null），最新版返回 void，异步渲染无法实时获取组件指针

## 2、hydrate(element, container[, callback])

- 代替 render，配合 ReactDOMServer 用于服务端渲染

## 3、unmountComponentAtNode(container)

- 移除容器中的 React 组件，并清除对应的事件处理函数和状态
- 返回 true 或 false

## 4、findDOMNode(component)

- StricktMode 下，已经弃用该 api 接口
- 大部分情况下，可以使用 ref 代替该 api 接口
- 无法用在无状态组件上
- 无法用在未 mount 的组件上

## 5、createPortal(child, container)

- 创建 Portal

# React

## 1、React.Component：使用 ES6 的 class 语法定义组件的基类

- Component 的生命周期函数

```
Mounting--------
    constructor(props)
    UNSAFE_componentWillMount()
    static getDerivedStateFromProps(props, state) : IState | null
    render(): 返回React Elements,Arrays and Fragments and Portals and String and Numbers and Booleans and null
    componentDidMount()
Updating----------
    UNSAFE_componentWillReceiveProps(props, state)
    static getDerivedStateFromProps(props, state): IState | null
    shouldComponentUpdate(nextProps, nextState): boolean
    render()
    UNSAFE_componentWillUpdate()
    getSnapshotBeforeUpdate(prevProps, prevState): snapshot
    componentDidUpdate(prevProps, prevState, snapshot)：做有条件的setState
Umounting------------
    componentWillUnmount()
ErrorHandling----------
    static getDerivedStateFromError(error)
    componentDidCatch(error, info)
Other----------------
    setState(updater, callback): IState | null
    forceUpdate(callback)
Class Properties------------
    defaultProps
    displayName
```

## 2、React.PureComponent：优化的 Component

## 3、React.memo：类似 PureComponent 的用于 Function 组件的 api

## 4、createElement(type, config, children)：创建一个 React 虚拟 dom

## createElementWithValidation（type, props, children）

```
    function createElementWithValidation(type, props, children) {
        //1、 校验type，使用react内置的类型进行比较
        //2、调用createElement(type, props, children)
        var element = createElement.apply(this, arguments)
        //3、校验子元素的key
        //4、校验proptypes
    }
    function createElement(type, config, props) {
        //1、处理config.ref
        //2、处理config.key
        //3、处理config.self
        //4、处理config.source
        //5、处理除1，2，3，4的config，并作为element的props
        //6、处理children，并在开发环境中使用Object.freeze冻结children，合并到props中
        //7、将defaultProps合并到props中，props优先级高于defaultProps，即{...defaultProps, props}
        //8、劫持key和ref，给出警告信息，不允许通过props.key(ref)访问这两个属性
        //9、返回ReactElement(type, key, ref, source, ReactCurrentOwner.current, props)
    }
    function ReactElement(type, key, ref,self, source, owner, props) {
        // 返回一个element实例，通过Object.defineProperty定义内部属性，即_开头的属性
        // type可以是原生dom名: 'div'，也可以是ReactElement自定义组件或函数: ComponentName
        // 使用Object.freeze冻结props和element
        return element = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            ref: ref,
            key: key,
            props: props,
            _owner: owner,
            _store: {
                validated: false
            },
            _self: self,
            _source: source,
        }
    }

```

## 5、createFactory()：返回一个 创建指定类型 React 虚拟 dom 的 函数

## 6、cloneElement()：

## 7、isValidElement()：

## 8、React.Children：

## 9、React.Fragment：

## 10、React.createRef：创建一个通过 ref 属性指向 react 组件的 ref 对象

```js
    class Demo extends Component {
        constructor(props) {
            this.demo = React.CreateRef()
        }

        componentDidMount() {
            this.demo.current.focus()
        }

        render() {
            return <input type="text" ref={this.demo}>
        }
    }
```

## 11、React.fowardRef：创建一个可以向自身 render 内容传递 ref 的组件，应用场景是 HOCs 和将 ref 指向真实 DOM

```js
    // HOCs和指向真实DOM使用一致，最终都是使用React.forwardRef返回一个组件
    // ref指向真实DOM
    const FancyButton = React.forwardRef((props, ref) => {
        <button ref={ref}>
            {
                props.children
            }
        </button>
    })
    const ref = React.createRef()
    <FancyButton ref={ref}>
        Click Me
    </FancyButton>
    // HOCs
    function logProps(Component) {
        class LogProps extends React.Component {
            componentDidUpdate(prevProps) {
                console.log('old props:', prevProps);
                console.log('new props:', this.props);
            }

            render() {
                const {forwardedRef, ...rest} = this.props;
                // Assign the custom prop "forwardedRef" as a ref
                return <Component ref={forwardedRef} {...rest} />;
            }
        }

        // Note the second param "ref" provided by React.forwardRef.
        // We can pass it along to LogProps as a regular prop, e.g. "forwardedRef"
        // And it can then be attached to the Component.
        return React.forwardRef((props, ref) => {
            return <LogProps {...props} forwardedRef={ref} />;
        });
    }
```

## 12、React.lazy()：定义动态加载组件，需要和 React.Suspense 配合使用

```js
    cosnt SomeComponent = React.lazy(() => import('./SomeComponent'))
```

## 13、React.Suspense：配合 React.lazy 使用，类似 Loading 作用

```js
    cosnt OtherComponent = React.lazy(() => import('./OtherComponent'))

    function MyComponent() {
        return <React.Suspense fallback={<Spinner />}>
            <div>
                <OtherComponent />
            </div>
        </React.Suspense>
    }
```

## 14、useState

## 15、useEffect

## 16、useContext

## 17、useReducer

## 18、useCallback

## 19、useMemo

## 20、useRef

## 21、useImperativeHandle

## 22、useLayoutEffect

## 23、useDebugValue

## 24、React.createContext：跨层传递数据；Class.contextType：可以指向 React.createContext 的返回值，class 可以直接通过 this.context 使用创建的 Context 对象

```js
// React.createContext
const MyContext = React.createContext("default");
MyContext.displayName = "Monkey";
// Class.contextType
class Demo extends React.Component {
  static contextType = MyContext;
  componentDidMount() {
    let value = this.context;
  }
  componentDidUpdate() {
    let value = this.context;
  }
  componentWillUnmount() {
    let value = this.context;
  }

  render() {
    let value = this.context;
    return null;
  }
}
// 或者
Demo.contextType = MyContext;
//  1、Context.Provider：可以修改context，子组件可以接受到修改的context
//      All consumers that are descendants of a Provider will re-render whenever the Provider’s value prop changes
//  2、Context.Consumer：消费context的方法1
//  3、class.contextType：Class Component消费context的方法2
```

## 25、旧版 context 接口

```js
/*
        为context中的字段设定类型检测
        static childContextTypes = {
            key: PropTypes.类型
        }

        设置组件的context
        getChildContext() {
            return {
                key: value
            }
        }

        子组件使用context
        static contextTypes = {
            key: 类型
        }
        console.log(this.context)
    */

class Title extends Component {
  // 使用context
  static contextTypes = {
    theme: string,
  };
  render() {
    return <div>Title</div>;
  }
}

class Message extends Component {
  // 定义context
  static childContextTypes = {
    theme: string,
  };
  getChildContext() {
    return {
      theme: "red",
    };
  }
}
```

## instance.render 调用的地方

```
    1、会为每一个vDom生成一个Fiber
    2、会为render之后的vDom生成一个Fiber
    function finishClassComponent(current, workInProgress, Component, shouldUpdate, hasContext, renderExpirationTime) {
        // ....
        var instance = workInProgress.stateNode; // Rerender
        if () {

        }
        else {
            nextChildren = instance.render()
        }
        if () {

        }
        else {
             reconcileChildren(current, workInProgress, nextChildren, renderExpirationTime);
        }
        workInProgress.memoizedState = instance.state

    }
```

# Fiber 结构

```

```
