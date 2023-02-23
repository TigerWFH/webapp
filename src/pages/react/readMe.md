# REACT

## Hooks

> Hooks 共享业务计算逻辑，而非状态
>
> HOC 共享业务计算逻辑
>
> render props 共享业务计算逻辑
>
> 共享状态可以将状态提升（redux 等技术）

### useState<https://www.cnblogs.com/hymenhan/p/14991789.html>

#### 访问到旧状态问题

> 页存在异步问题
>
> 在异步回调或闭包中获取最新状态并设置状态，此时第一种方式获取的状态不是实时的，React 官方文档提到：组件内部的任何函数，包括事件处理函数和 Effect，都是从它被创建的那次渲染中被「看到」的，所以引用的值任然是旧的，最后导致 setState 出现异常：
> setState 访问的是你闭包内的状态，非最新状态

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

#### 多个 setXXX 是否合并 render 问题

```js
/*
 */
```

## setState

```js
/**
 * setState(updater, callback)
 * 1、updater可以是对象，也可以是function(state, props) => state
 * 2、如果updater是null或者返回null，组件不会rerender
 * 3、updater函数中的state是对组件state的引用，props是对组件props的引用，但是返回该引用同样会触发rerender
 * 4、setState() will always lead to a re-render unless shouldComponentUpdate() returns false 摘自官网
 * 5、PureComponent使用了浅比较优化react rerender
 * 6、Object.is逻辑, ==, ===
 *      Object.is判断变量两个值是否为同一个值（指向内容是否相同，应用对象指向的是地址），判断逻辑（没有类型转换）
 *      都是undefined，
 *          let a, let b; Object.is(a, b);// 返回true,a存储是undefiend、b存储也是undefined
 *              a = 1; Object.is(1, b); // 返回false，a存储是1，b存储是undefined
 *      都是null
 *      都是true或false
 *      相同字符相同长度相同顺序排列的字符串
 *      都是数字且都是
 *          +0
 *          -0
 *          NaN
 *          或非零非NaN为同一个值
 *      同一个对象，既引用相同
 * --------------------------------
 * === 不做类型转换，将-0和+0视为相同；将NaN与Number.NaN视为不同
 * == 会做类型转换
 *
 * 结论：除非setState设置null，否者只要调用setState一定会引起组件的rerender
 * forceUpdate(callback)
 * forceUpdate会跳过调用组件的shouldComponentUpdate函数，但是子组件会正常调用SCU；
 * 其余生命周期函数都会被调用
 *  */
/**
 * setState是看起来是异步的（本质是同步），连续的setState可能造成bug（任务调度问题）
 * 可以将updater更改为function，规避bug
 *
 * 连续的setState
 * 返回对象，操作会被合并，做batch更新，造成第一次加1和第二次加1合并，只操作了一次加1
 *
 */
```

## key

```js
/**
 * 测试key的作用
 * 1、数据[1,2,3] 以index为key，        渲染出列表：新建Li1,新建Li2,新建Li3
 * 1-1、修改数据为[4,1,2,3]以index为key，渲染出列表：更新Li1为Li4，更新Li2为Li1，更新Li3为Li2，新建Li3
 * 1-2、修改数据为[1,2,4,3]以index为key，渲染出列表：不变Li1，不变Li2，更新Li3为Li4，新建Li3
 * 1-3、修改数据为[1,2,3,4]以index为key, 渲染处列表：不变Li1，不变Li2，不变Li3，新建Li4
 *
 * 2、数据[{id: 'monkey1',name:'monkey'},{id: 'cat2',name:'cat'}]，以id为key,                         渲染：新建monkey，新建cat
 * 2-1、修改数据[{id: 'mouse3',name:'mouse'},{id: 'monkey1',name:'monkey'},{id: 'cat2',name:'cat'}]   渲染：新建mouse, 不变monkey，不变cat
 * 2-2、修改数据[{id: 'monkey1',name:'monkey'},{id: 'mouse3',name:'mouse3'},{id: 'cat2',name:'cat'}]  渲染：不变monkey，新建mouse, 不变cat
 * 2-3、修改数据[{id: 'monkey1',name:'monkey'},{id: 'cat2',name:'cat'},{id: 'mouse3',name:'mouse'}]   渲染：不变monkey，不变cat，新建mouse
 */
```
