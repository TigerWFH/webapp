# 用来测试 redux 数据流

## redux 的 dispatch

> redux 的 dispatch 只会返回 plain object，对于异步的返回则是通过中间件处理的

## redux-thunk

> 此处的 dispatch 和 getState 都是 redux-thunk 注入进来的，还有第三个参数 extraArgument，目前是 undefined
>
> redux-thunk 会返回函数返回的内容，既经过 redux-thunk 包装过的 dispatch 会返回函数返回的内容

```js
// 函数式action
// 此处的dispatch和getState都是redux-thunk注入进来的，还有第三个参数extraArgument，目前是undefined
function getDetail() {
  return (dispatch, getState) => {
    const result = Promise.resolve(123);

    dispatch({
      type: 123
    });
  };
}
```

## redux-saga

```js

```

## react-redux 的 connect

> 如果提供了 mapDispatchToProps，connect 不会向 react 组件注入 dispatch，如果没有提供 mapDispatchToProps，connect 会注入 dispatch，通过 connenct 的组件可以通过 this.props.dispatch 访问到 store 的 dispatch

```js
// detail没有dispatch
function mapStateToProps(state: any, ownProps: IProps) {
const { detail } = state
return { detail }
}
function mapDispatchToProps(dispatch: any) {
return {}
}
export default connect(mapDispatchToProps, mapStateToProps)(Detail);

// detail有dispatch
function mapStateToProps(state: any, ownProps: IProps) {
const { detail } = state

return { detail }
}

export default connect(mapStateToProps, null)(Detail);

```
