# Rxjs<https://rxjs.dev/guide/overview>

> RxJS is a library for composing asynchronous and event-based programs by using observable sequences. It provides one core type, the Observable, satellite types (Observer, Schedulers, Subjects) and operators inspired by Array#extras (map, filter, reduce, every, etc) to allow handling asynchronous events as collections.

## 术语<https://www.jianshu.com/p/bc4d8ce267d1>

- `创建器(creator)：`用来创建流，返回一个 Observable 类型的对象
  - `of(1,2,3)：`将单值转为流
  - `from([1,2,3])：`将数组转为流
  - `range(1, 10)：`范围转为流
  - `fromPromise()`
  - `defer(factory)`
  - `timer()`
  - `interval()`
  - `fromEventPattern()`
  - `fromEvent()`
- `操作符(operator)：`类似 map、filter 等，用来对条目进行处理，作为 Observable 对象的 pipe 方法的入参传递进去
- `主题对象(Subject)：`和创建器不同，创建器是供直接调用的函数，而 Subject 则是一个实现了 Observable 接口的类。它的典型用法是用来管理事件，比如当用户点击了某个按钮时，你希望发出一个事件，那么就可以调用 subject.next(someValue) 来把事件内容放进流中。当你希望手动控制往这个流中放数据的时机时，这种特性非常有用。事件分发？？？

> 我们不但可以直接创建流，还可以对多个现有的流进行不同形式的合并，创建一个新的流。常见的合并方式有三种：并联、串联、拉链。

## 类型

### Observable

> represents the idea of an invokable collection of future values or events
>
> Observable = Collections + Time

- `pipe：`
- `subscribe()：`该方法表示消费者要订阅这个流，当流中出现数据时，传递给 subscribe 方法的回调函数就会被调用，并且把这个数据传。回调被调用几次，取决于流中有多少条数据

```js
// 创建observable对象
const mouseMoves = Observable.fromEvent('div', 'mouseDown');
// 订阅
const subscription = mouseDown.forEach((e) => console.log(e));
// 取消订阅
subscription.dispose();
/*
    将事件包装成Observable对象，方便的通过forEach、map、filter、takeUntil、concatAll等API进行操作
*/
```

### Observer：观察者，既 Observable 传递数据的消费者

> is a collection of callbacks that knows how to listen to values delivered by the Observable

```js
// 定义：Observers are just objects with three callbacks, one for each type of notification that an Observable may deliver
const observer = {
  next: (x) => console.log(x),
  error: (err) => console.log(err),
  complete: () => console.log('complete')
};
// 使用
observable.subscribe(observer);
```

### Operators

> are pure functions that enable a functional programming style of dealing with collections with operations like map, filter, concat, reduce, etc

### Subscription

> represents the execution of an Observable, is primarily useful for cancelling the execution

### Subjects：是特殊类型的 Observable<https://juejin.cn/post/6844904165181751304>

> is equivalent to an EventEmitter, and the only way of multicasting a value or event to multiple Observers
>
> 订阅者在数据源发射之后创建的，正常无法接收到之前发射的数据的
>
> observable 的每个订阅者之间，是独立的，完整的享受 observable 流动下来的数据的。
>
> subject 的订阅者之间，是共享一个留下来的数据的

- `Subject：`不存储数据、不需要初始值，有新数据就发布
- `ReplaySubject：`存储所有数据、不需要初始值，有数据就发布
- `AsyncSubject：`存储最后一条数据、需要初始值，延时发布，当数据源 complete 时才发布
- `BehaviorSubject：`存储数据、需要初始值，有新数据就发布
  > 特殊的 Subject，他储存着最后发给 observer 的值，订阅者可以立即拿到最后一次发射的数据

```js
const subject = new Rx.BehaviorSubject(0);
subject.subscribe({
  next: (v) => console.log('observerA' + v)
});
subject.next(1);
subject.next(2); // 发出并存储2
subject.subscribe({
    next: (v) => console.log("observerB" + v);
});
subject.next(3);
/*
输出：
observerA: 0
observerA: 1
observerA: 2
observerB: 2
observerA: 3
observerB: 3
*/
```

### Scheduler

> are centralized dispatchers to control concurrency, allowing us to coordinate when computation happens on e.g. setTimeout or requestAnimationFrame or others

## APIs

### fromEvent(target, eventName, options, resultSelector): Observable

- `target：`DOM EventTarget、Node.js EventEmitter、JQuery-like、NodeList、HTMLCollection
- `eventName：`拦截 target 触发的目标事件
- `options：`
- `resultSelector：`
- `return：`Observable

### Subject：特殊的 Observable 类型

> A Subject is a special type of Observable that allows values to be multicasted to many Observers. Subjects are like EventEmitters.

### BehaviorSubject
