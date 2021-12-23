# Hooks

> Hooks 共享业务计算逻辑，而非状态
>
> HOC 共享业务计算逻辑
>
> render props 共享业务状态
>
> 共享状态可以将状态提升（redux 等技术）

## useState<https://www.cnblogs.com/hymenhan/p/14991789.html>

> 页存在异步问题
>
> 在异步回调或闭包中获取最新状态并设置状态，此时第一种方式获取的状态不是实时的，React 官方文档提到：组件内部的任何函数，包括事件处理函数和 Effect，都是从它被创建的那次渲染中被「看到」的，所以引用的值任然是旧的，最后导致 setState 出现异常：

```js
const [state, setState] = useState(0);
Promise.resolve()
  .then(() => {
    setState(state + 1); // state = 0
  })
  .then(() => {
    setState(state + 1); // state = 0
  });
// 解决方案：setState((prevState) => )
```
