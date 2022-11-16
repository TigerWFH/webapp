# history

[history github](https://github.com/remix-run/history)

## 术语（Definitions）

- `history stack：`历史记录栈
- `navigate：`
- `state：`state between sessions
- `browser history`
- `hash history`
- `memory history`
- `HTML5 history API：`是一组通过脚本操作浏览器历史栈的接口
  - `pushState(state, title, url)`
  - `replaceState(state, title, url)`
  - `popstate`
  - `popstate`

## window.history

- `history.go()`
- `history.back()`
- `history.forward()`
- `history.length`
- `window.hashchange`
  > 页面的 hash 值发生变化时触发，常用语构建单页应用。window.location.hash = xxx 触发 hashchange
- `HTML5新增`
  - `history.pushState(state, title, url)`，修改地址栏 url 不会触发 hashchange 和 popState
  - `history.replaceState(state, title, url)`，修改地址栏 url 不会触发 hashchange 和 popState
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

### browser history

### hash history

### memory history
