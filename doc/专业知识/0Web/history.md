# history

[history github](https://github.com/remix-run/history)

## 术语（Definitions）

- `history stack：`历史记录栈
- `navigate：`go,back,forward 等等
- `state：`state between sessions
- `browser history：`用于支持 HTML5 history API（pushState、replaceState、popState）的 modern browser
- `hash history：`用于使用 url hash 存储 location 的的场景，避免 locaiton 被发送给服务端
- `memory history：`用于非浏览器场景
- `HTML5 history API：`是一组通过脚本操作浏览器历史栈的接口
  - `pushState(state, title, url)`
  - `replaceState(state, title, url)`
  - `popstate`
  - `popstate`
- `location：`实现了 window.location 接口的 subset
  - `location.pathname：`path
  - `location.search：`URL query string
  - `location.hash：`URL hash segment
  - `location.state：`location 不包含在 url 上的额外状态
  - `location.key：`唯一识别符
  - `Push：`新增一条历史栈记录
  - `Replace：`替换
  - `Pop：` we went to some other location already in the stack

## window APIs

### window.location

> 链接到的对象的`位置`信息

- `protocol`协议
- `hostname`域名
- `port`端口
- `host`=hostname+port，域名+端口
- `origin`=protocol+hostname+port
- `pathname`路径
- `search`查询字符串
- `hash`
- `href`=protocol+hostname+port+path+hash，包含完整 URL
- `username`域名前的用户名
- `password`域名前的密码
- `ancestorOrigins`对象所属文档先前所有浏览上下文的来源
- `assign(url)`触发窗口重新加载指定 URL 的内容，只能加载`同域URL，执行操作的脚本非URL`
- `reload()`同刷新按钮，重新加载当前页面，只能`同域刷新，执行操作的脚本非URL`
- `replace(url)`替换加载页面，`同域替换，执行操作的脚本非URL`
- `toString()`返回一个 DOMString，包含整个 URL

### window.history

- `history.length`历史会话中元素数目
- `history.scrollRestoration`允许 Web 应用程序在历史导航上显式地设置默认滚动恢复行为
- `history.state`返回一个表示历史堆栈顶部的状态的任意值，默认值是 null，只有 pushState 和 replaceState 可以修改
- `history.go()`
- `history.back()`
- `history.forward()`
- `history.pushState()`
- `history.replaceState()`

### hashchange 和 popstate

- `window.hashchange`
  > - window.location.hash = xxx，触发 hashchange
  > - address bar 修改 hash 片段，会触发 hashchange
  > - window.location.href = xxx，只修改 hash 部分，不会加载，但会触发 hashchange
  ***
  > - history@4 使用了 window.location.hash = path， 实现 push，触发 hashchange
  > - history@4 使用了 window.location.replace()，实现 replace，触发 hashchange
- `window.popstate`
  > 历史记录发生变化时触发

---

> window.location.href = XXX 会刷新页面；只有 hash 变化时不会刷新页面，但会触发 hashchange
> pushState(replaceState)：会修改地址栏；但不会刷新页面，也不会触发 popstate 和 hashchange

## 版本

[发布记录](https://github.com/remix-run/history/releases/tag/v5.0.0)

---

[版本 4](https://github.com/remix-run/history/blob/845d690c5576c7f55ecbe14babe0092e8e5bc2bb/CHANGES.md)

> ReactRouter@6 使用 history@5

---

> ReactRouter@4 和 ReactRouter@5 使用了 history@4

## APIs

```typescript
// 代表操作的类型
enum Action {
  Pop = 'go，back，forward等操作是该类型',
  Push = 'pushState操作',
  Replace = 'replaceState操作'
}
// history接口
interface History {
  readonly action: Action;
  readonly location: Location;
  createHref(to: To): string;
  push(to: To, state?: any): void;
  replace(to: To, state?: any): void;
  go(delta: number): void;
  back(): void;
  forward(): void;
  listen(listener: Listener): () => void;
  block(blocker: Blocker): () => void;
}
```

### createBrowserHistory

### createHashHistory

### createMemoryHistory

### history 实例

- `history/browser`
