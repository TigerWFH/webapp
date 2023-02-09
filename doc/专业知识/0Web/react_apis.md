# react apis

## react

### Components

> React components let you split the UI into independent, reusable pieces, and think about each piece in isolation

- `Component：`ES6 创建 react 组件的基类

  - `setState()`
  - `forceUpdate()`

  - `constructor(props, context)`
  - `static getDerivedStateFromProps()`
  - `render()`
  - `componentDidMount`

  - `shouldComponentUpdate(nextProps, nextState, nextContext)`
  - `static getSnapshotBeforeUpdate()`
  - `componentDidUpdate()`

  - `componentWillUnmount()`

  - `static getDerivedStateFromError()`
  - `componentDidCatch()`

  - `props`
  - `state`

  - `static defaultProps`
  - `static displayName`

- `PureComponent`
- `memo`

### react elements

- `createElement(type, [props], [...children])`
  - `type：`tag name, react component type or react fragment type
- `cloneElement(element, [config], [...children])`
- `createFactory(type):`legacy
- `isValidElement(object)`
- `React.Children`
  - `React.Children.map(children, function(thisArg))`
  - `React.Children.forEach(children, function(thisArg))`
  - `React.Children.count(children)`
  - `React.Children.only(children)`
  - `React.Children.toArray(children)`
  - `React.Children.`
- `createContext()`

```js
const MyContext = React.createContext(defaultValue);
class MyClass extends React.Component {
  static contextType = MyContext;
  render() {
    let value = this.context;
    /* render something based on the value */
  }
}
<MyContext.Provider value={/* some value */}>
<MyContext.Consumer>
  {value => /* render something based on the context value */}
</MyContext.Consumer>

```

### Fragments

> The React.Fragment component lets you return multiple elements in a render() method without creating an additional DOM element

- `Fragment:`

```js
<Fragment>[]</Fragment>
```

### Refs

- `createRef()`creates a ref that can be attached to React elements via the ref attribute.
- `forwardRef()`

```js
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// You can now get a ref directly to the DOM button:
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```

### Suspence

> lets you define a component that is loaded dynamically. This helps reduce the bundle size to delay loading components that aren’t used during the initial render.

- `lazy()`
- `Suspense`
  - `props.fallback`

```js
// Note that rendering lazy components requires that there’s a <React.Suspense> component higher in the rendering tree. This is how you specify a loading indicator.

// This component is loaded dynamically
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    // Displays <Spinner> until OtherComponent loads
    <React.Suspense fallback={<Spinner />}>
      <div>
        <OtherComponent />
      </div>
    </React.Suspense>
  );
}
```

### Transitions

- `startTransition`
- `useTransition`

### Hooks

- `useState()`
- `useEffect()`
- `useContext()`
- `useReducer()`
- `useCallback()`
- `useMemo()`
- `useRef()`
- `useImperativeHandle()`
- `useLayoutEffect()`
- `useDebugValue()`
- `useDeferredValue()`
- `useTransition()`
- `useId`

### Library Hooks

- `useSyncExternalState`
- `useInsertionEffect`

## react-dom

- `createPortal(child, container)`
- `flushSync(callback)`Force React to flush any updates inside the provided callback synchronously. This ensures that the DOM is updated immediately.
- `render()`legacy
- `hydrate()`legacy
- `findDOMNode()`legacy
- `unmountComponentAtNode()`legacy

### react-dom/client

- `createRoot(container[, options])`
- `hydrateRoot(container, element[, options])`

```js
const root = createRoot(container);
root.render(element);
root.unmount();
```

### react-dom/server

- `renderToPipeableStream()`
- `renderToNodeStream()`
- `renderToStaticNodeStream()`
- `renderToReadableStream()`
- `renderToString()`
- `renderToStaticMarkup()`

## 关于 context apis

### react@18.0.0
- `useId()`
- `startTransition()`
- `useTransition()`
- `useDeferredValue()`
- `useSyncExternalStore()`
- `useInsertionEffect()`
- `createRoot()`
- `hydrateRoot()`
- `renderToPipeableStream()`
- `renderToReadableStream()`
- ``
- ``
### react@17.0.0

> 代理放到 root 节点，而非 document

### react@16.13.0

> 弃用 createFactory()

### react@16.8.6

### react@16.8.0

- `add hooks`

### react16.6.0

- `memo()`
- `lazy()`
- `contextType：`扩展类组件订阅 context 的方法
- `getDerivedStateFromError()`for server-side renderer

### react@16.5.0

> 支持 React DevTools

### react@16.3

- `createContext`
- `createRef()`
- `forwardRef()`

- `getDerivedStateFromProps()`
- `getSnapshotBeforeUpdate()`
- `StrictMode`

### react@16.2.0

- `Fragment`

### react@16.0.0

> 依赖 Map 和 Set，requestAnimationFrame

- `createPortal`
