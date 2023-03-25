# react 相关知识点

## React APIs 引入版本

### react@18.0.0

> - `useId`
> - `startTransition`
> - `useTransition`
> - `useDeferredValue`
> - `useSyncExternalStore`
> - `useInsertionEffect`
> - `createRoot`
> - `hydrateRoot`
> - `renderToPipeableStream`
> - `renderToReadableStream`

### react@17.0.0

> - `Delegate events to roots instead of document`

### react@16.13.0

> - `ReactDOM.version`

### react@16.11.0

> - `Remove unstable_createRoot and unstable_createSyncRoot experimental APIs.`

### react@16.9.0

> - `React.Profile`

### react@16.8.0

> - `add hooks`

### react@16.6.0

> - `React.memo()`
> - `React.lazy()`
> - `React.Suspense`
> - `getSnapshotFromError`

### react@16.3.0引入

> - `React.createRef()`：代替 callback ref
> - `React.forwardRef()`：让组件将 ref 转给 child
> - `React.StrictMode`
> - `getDerivedStateFromProps`
> - `getSnapshotBeforeUpdate`

### react@16.0.0

> - `依赖了set、map、requestanimationframe`
> - `ReactDOM.createPortal()`

###

## 基础

### react elements

> Elements are the smallest building blocks of React apps
>
> React elements are immutable. Once you create an element, you can’t change its children or attributes.
>
> Unlike browser DOM elements, React elements are plain objects, and are cheap to create

```js

```

### component 和 props

> Components let you split the UI into independent, reusable pieces, and think about each piece in isolation

- `类组件`
- `函数式组件`
- `Composing Components`
- `props, component cannot modify its own props`

### state and lifecycle

> State is similar to props, but it is private and fully controlled by the component

- `setState`

```js
/**
 * setState(updater, callback)
 * 1、updater可以是对象，也可以是function(state, props) => state
 * 2、如果updater是null或者返回null，组件不会rerender
 * 3、updater函数中的state是对组件state的引用，props是对组件props的引用，但是返回该引用同样会触发rerender
 *
 * 结论：除非setState设置null，否者只要调用setState一定会引起组件的rerender
 * forceUpdate(callback)
 * forceUpdate会跳过调用组件的shouldComponentUpdate函数，但是子组件会正常调用SCU；
 * 其余生命周期函数都会被调用
 *  */
/**
 * 测试key的作用
 * 1、数据[1,2,3] 以index为key，        渲染出列表：新建Li1,新建Li2,新建Li3
 * 1-1、修改数据为[4,1,2,3]以index为key，渲染出列表：更新Li1为Li4，更新Li2为Li1，更新Li3为Li2，新建Li3
 * 1-2、修改数据为[1,2,4,3]以index为key，渲染出列表：不变Li1，不变Li2，更新Li3为Li4，新建Li3
 * 1-3、修改数据为[1,2,3,4]以index为key, 渲染处列表：不变Li1，不变Li2，不变Li3，新建Li4
 *
 * 2、数据[{id: 'monkey1',name:'monkey'},{id: 'cat2',name:'cat'}]，以id为key									渲染：新建monkey，新建cat
 * 2-1、修改数据[{id: 'mouse3',name:'mouse'},{id: 'monkey1',name:'monkey'},{id: 'cat2',name:'cat'}]	渲染：新建mouse, 不变monkey，不变cat
 * 2-2、修改数据[{id: 'monkey1',name:'monkey'},{id: 'mouse3',name:'mouse3'},{id: 'cat2',name:'cat'}]	渲染：不变monkey，新建mouse, 不变cat
 * 2-3、修改数据[{id: 'monkey1',name:'monkey'},{id: 'cat2',name:'cat'},{id: 'mouse3',name:'mouse'}]	渲染：不变monkey，不变cat，新建mouse
 */
/**
 * setState是异步的，连续的setState可能造成bug
 * 可以将updater更改为function，规避bug
 *
 * 连续的setState
 * 返回对象，操作会被合并，做batch更新，造成第一次加1和第二次加1合并，只操作了一次加1
 *
 */
```

- `Do Not Modify State Directly`
- `State Updates May Be Asynchronous`
- `State Updates are Merged`
- `类组件特性`
  - `声明周期`
  - `render返回数据类型：`React Elements, Arrays and fragments, Portals, String and numbers, Booleans or null

### 受控组件和非受控组件

### hooks、HOC、render props

### context

### React Apis

### React 生态

#### react-router

#### redux

#### react-redux

#### redux-thunk

#### redux-sago

## 进阶

### JSX：it is a syntax extension to JavaScript

### react-dom

#### render(element, container[, callback])

#### hydrate(element, container[, callback])

#### unmountComponentAtNode(container)

#### findDOMNode(component)

#### createPortal(child, container)

### react-dom-server,react-dom/server

#### renderToString(element)

#### renderToStaticMarkup(element)

#### renderToNodeStream(element)

#### renderToStaticNodeStream(element)

### React SyntheticEvent
