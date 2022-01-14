# Rxjs<https://rxjs.dev/guide/overview>

> RxJS is a library for composing asynchronous and event-based programs by using observable sequences. It provides one core type, the Observable, satellite types (Observer, Schedulers, Subjects) and operators inspired by Array#extras (map, filter, reduce, every, etc) to allow handling asynchronous events as collections.

## 类型

### Observable

> represents the idea of an invokable collection of future values or events

### Observer：观察者，既 Observable 传递数据的消费者

> is a collection of callbacks that knows how to listen to values delivered by the Observable

### Operators

> are pure functions that enable a functional programming style of dealing with collections with operations like map, filter, concat, reduce, etc

### Subscription

> represents the execution of an Observable, is primarily useful for cancelling the execution

### Subjects

> is equivalent to an EventEmitter, and the only way of multicasting a value or event to multiple Observers

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
