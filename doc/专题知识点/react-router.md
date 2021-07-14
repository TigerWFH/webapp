# react-router

## router

- `BrowserRouter：`
- `HashRouter：`
- `MemoryRouter：`
- `NativeRouter：`
- `StaticRouter：`A <Router> that never changes location

## Route

```
    会向Component、render、children注入三个参数：history、location、match
```

- `history`

```js
const history = {
  action,
  block,
  createHref,
  go,
  goBack,
  goForward,
  length,
  listen,
  location,
  push,
  replace,
};
```

- `location`

```js
// http://localhost:3000/#/blog?123=123#123
const location = {
  hash: "#123",
  pathname: "/blog",
  search: "?123=123",
};
```

- `match`

```js
    const match = {
        isExact,
        params: {} // dynamic segments of path,
        path: '/blog', // Router中的值
        url: '/blog'
    }
```

- `component：`

```js
<Route path="/user/:username" component={User} />
```

- `render：`

```js
<Route path="/home" render={(routeProps) => <div>Home</div>} />
```

- `children：`

```js
<Route
  path={to}
  children={({ match }) => (
    <li className={match ? "active" : ""}>
      <Link to={to} {...rest} />
    </li>
  )}
/>
```

- `path：`有效的 URL path 或者 array of paths

```js
    <Route path="/users/:id">
        <User />
    </Route>
    <Route path={["/users/:id", "/profile/:id"]}>
        <User />
    </Route>
```

- `exact：`path 和 location.pathname`完全匹配`，而`不是部分匹配`

```
    path	location.pathname	exact	matches?
    /one	    /one/two	    true	    no
    /one	    /one/two	    false	    yes
```

- `strict：`严格匹配，带后缀的 path 只能匹配带后缀的 location.pathname，不带的只能匹配不带的，`可以部分匹配`

```
    path	location.pathname	matches?
    /one/	    /one	        no
    /one/	    /one/	        yes
    /one/	    /one/two	    yes
```

- `strict + exact`

```
    path	location.pathname	matches?
    /one	    /one	            yes
    /one	    /one/	            no
    /one	    /one/two	        no
```

- `sensitive：`大小写敏感

## Link

## NavLink：特殊的 Link

## Redirect：导航到 new location，new location 会覆盖路由栈中的 current location，自动添加样式

- `to：`目标地址即 new location

```js
/*
    to: string
    to: object = {
        pathname: '/login',
        search: '?app=PPP',
        state: {
            referrer: currentLocation
        }
    }
*/
    <Route path="/">
        {
            loggedIn ? <Redirect to="/home"> : <PublickHomePage>
        }
    </Route>
```

- `push：`路由栈中新增一个 entry，而不是替换
- `from：`制定要重定向的地址（符合https://github.com/pillarjs/path-to-regexp/tree/v1.7.0）

```js
    // from模式只能用在Switch中
    <Switch>
        <Redirect from='/old-path' to='/new-path' />
         <Route path='/new-path'>
            <Place />
        </Route>
    </Switch>

    // Redirect with matched parameters
    <Switch>
        <Redirect from='/users/:id' to='/users/profile/:id'/>
        <Route path='/users/profile/:id'>
            <Profile />
        </Route>
    </Switch>
```

- `exact：`严格匹配 from，类似 Route.exacrt
- `strict：`类似 Route.strict
- `sensitive：`大小写敏感，类似 Route.sensitive

## Prompt：离开页面前提示

```js

```

- `when：`
- `message：`

## Switch

```

```

## withRouter
