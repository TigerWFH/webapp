# react apis

## react

### Components

> React components let you split the UI into independent, reusable pieces, and think about each piece in isolation

- `Component：`ES6 创建 react 组件的基类

  - `setState()`
  - `forceUpdate()`

  - `constructor()`
  - `static getDerivedStateFromProps()`
  - `render()`
  - `componentDidMount`

  - `shouldComponentUpdate()`
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

## Library Hooks

- `useSyncExternalState`
- `useInsertionEffect`

## react-dom
