# 关于 redux 及其生态

## redux

- ts 的类型定义

```plain
    泛型类型
    function identity<T>(arg: T): T{
        return arg
    }
    let myIdentity:<T>(arg: T)=>T = identity
    let myIdentity: <U>(arg:U)=>U = identity
    let myIdentity:{<T>(arg:T):T} = identity
    export interface Action<T = any>{
        type: T
    }
    泛型接口
    interface GenericIdentityFn{
        <T>(arg:T):T;>
    }
    function identity<T>(arg:T):T{
        return arg
    }
    let identity: GenericIdentityFn = identity;
    interface GenericIdentityFn<T> {
        (arg: T): T;
    }
    function identity<T>(arg: T): T {
        return arg;
    }
    let myIdentity: GenericIdentityFn<number> = identity;
    泛型类
    class GenericNumber<T>{
        zeroValue: T;
        add: (x: T, y: T) => T;
    }
    let myGenericNumber = new GenericNumber<number>();
    myGenericNumber.zeroValue = 0;
    myGenericNumber.add = function(x, y) { return x + y; };
    泛型约束
    interface Lengthwise {
        length: number;
    }
    function loggingIdentity<T extends Lengthwise>(arg: T): T {
        console.log(arg.length);  // Now we know it has a .length property, so no more error
        return arg;
    }


    export interface AnyAction extends Action {
        <!-- 允许任意额外的属性被定义到action中 -->
        [extraProps: string]: any
    }
    export interface ActionCreator<A> {
        (...args: any[]): A
    }
    export interface ActionCreatorsMapObject<A = any>{
        [key: string]: ActionCreator<A>
    }
```

- 内部 ActionTypes

```plain
    INIT: @@redux/INIT${randomString()}
    REPLACE: @@redux/REPLACE${randomString()}
    PROBE_UNKNOWN_ACTION: () => @@PROBE_UNKNOWN_ACTION${randomString()}
```

- dispatch：会将 currentState 和 action 注入 reducer，并执行 reducer 更新 currentState。每一次 dispatch 都会触发监听器，无论是否有 state 更新
- subscribe：注册监听 store 的监听器
- getState：返回当前 current
- replaceReducer
- observable
- createStore 执行

```plain
    1、createStore(reducer, preloadedState?, enhancer): store
    2、如果enhancer存在，执行return enhancer(createStore)(reducer, preloadedState)
        此处的enhancer是applyMiddleware返回的闭包
    3、执行createStore(reducer， preloadState)
    3-1、currentReducer = reducer
    3-2、currentState = preloadedState(undefined)
    3-3、currentListeners = []
    3-4、nextListeners = currentListeners
    3-5、isDispatching = false
    4、执行dispatch({type: ActionTypes.INIT})
    4-1、redux原生action必须是plain object
    4-2、isDispatching = true, currentState=currentReducer(currentState, action)
    5、依次执行listeners, 并返回action
    6、return store = {
        dispatch,
        subscribe,
        getState,
        replaceReducer,
        [$$observable]: observable
    }
```

- 结论:
- 1、对于 redux，每一次的 dispatch 都会触发 subscribe 注册的监听器
- 2、reducer 返回的可能是原对象的引用，也可能是新对象：currentState=currentReducer(currentState, action)
- bindActionCreator：返回一个对象

```plain
    一般情况下你可以直接在 Store 实例上调用 dispatch。如果你在 React 中使用 Redux，react-redux 会提供 dispatch 函数让你直接调用它 。
    惟一会使用到 bindActionCreators 的场景是当你需要把 action creator 往下传到一个组件上，却不想让这个组件觉察到 Redux 的存在，而且不希望把 dispatch 或 Redux store 传给它

    将actionCreators
```

## redux-thunk：对 action 注入 dispatch 和 getState，并改造 dispatch

> 所有的 action 先过 middlewares，再到 reducer

- thunk：变成特有名词，主要用于 caculate delay，计算延迟

```plain
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => (next) => (action) => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
```

## redux-soga

## 预备 react 知识点

- `React的context知识点`

```plain
    1、context提供了可以不通过props传递数据的能力
    2、context用于为嵌套过深且需要共享数据的场景
    3、使用context会使得组件的复用变得更加困难
    4、如果仅是为了数据传递层级过深，更好的技术是component composition,而非context。案例见官网传递avatar组件
    5、另一种技术是render props，The term “render prop” refers to a technique for sharing code between React components using a prop whose value is a function.
    // Context lets us pass a value deep into the component tree
    // without explicitly threading it through every component.
    // Create a context for the current theme (with "light" as the default).

    const ThemeContext = React.createContext('light')
    class App extends React.Component {
        render() {
            // Use a Provider to pass the current theme to the tree below.
            // Any component can read it, no matter how deep it is.
            // In this example, we're passing "dark" as the current value.
            <ThemeContext.Provider value='dark'>
                <Toolbar />
            </ThemeContext>
        }
    }
    // A component in the middle doesn't have to
    // pass the theme down explicitly anymore.
    function Toolbar(props) {
        return (
            <div>
                <ThemeButton />
            </div>
        )
    }
    class ThemedButton extends React.Component {
        // Assign a contextType to read the current theme context.
        // React will find the closest theme Provider above and use its value.
        // In this example, the current theme is "dark".
        static contextType = ThemeContext;
        render() {
            return <Button theme={this.context} />
        }
    }
    6、context的APIs
        const Context = React.createContext(defaultValue)：创建Context对象，当错，component没有匹配到Provider，会使用默认值
        Context.Provider：<Context.Provider value={'some value'}>：每一个context都包含一个Provider组件，允许消费组件监听context的变化
                All consumers that are descendants of a Provider will re-render whenever the Provider’s value prop changes
                        Provider可以嵌套；可以为多个消费组件提供数据；
        Class.contextType：允许用户直接使用this.context访问最近的Provider提供的对应的context值
            Class.contextType = Context;
        Context.Consumer：A React component that subscribes to context changes. This lets you subscribe to a context within a function component
            <Context.Consumer>
                {
                    value => <Child>{value}</Child>
                }
            </Context.Consumer>
        Context.displayName：用于为ReactDevTools提供信息

```

- `React的hooks知识点`

## react-redux

```plain
    function Provider({ store, context, children }) {
    const contextValue = useMemo(() => {
        const subscription = new Subscription(store)
        subscription.onStateChange = subscription.notifyNestedSubs
        return {
            store,
        subscription
        }
  }, [store])

  const previousState = useMemo(() => store.getState(), [store])

  useEffect(() => {
    const { subscription } = contextValue
    subscription.trySubscribe()

    if (previousState !== store.getState()) {
      subscription.notifyNestedSubs()
    }
    return () => {
      subscription.tryUnsubscribe()
      subscription.onStateChange = null
    }
  }, [contextValue, previousState])

  const Context = context || ReactReduxContext

  return <Context.Provider value={contextValue}>{children}</Context.Provider>
}

if (process.env.NODE_ENV !== 'production') {
  Provider.propTypes = {
    store: PropTypes.shape({
      subscribe: PropTypes.func.isRequired,
      dispatch: PropTypes.func.isRequired,
      getState: PropTypes.func.isRequired
    }),
    context: PropTypes.object,
    children: PropTypes.any
  }
}

export default Provider
```
