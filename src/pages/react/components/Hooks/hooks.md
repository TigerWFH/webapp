# hooks

> 各种 hooksDemo

## useEffect 一些使用场景

```js
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

function Counter() {
  const [count, setCount] = useState(0);
  // bug场景
  // useEffect(() => {
  //   const id = setInterval(() => {
  //     // 实际一直在setCount，一直在rerender，一直读取到的值就是1
  //     setCount(count + 1); // 恒等价0+1
  //   }, 1000);
  //   return () => clearInterval(id);
  // }, []);
  // 方案1：增加依赖count
  // 本质是每次re-render都会销毁循环定时器并重建循环定时器，内耗
  // useEffect(() => {
  //   const id = setInterval(() => {
  //     // 实际一直在setCount，一直在rerender，一直读取到的值就是1
  //     setCount(count + 1);
  //   }, 1000);
  //   return () => clearInterval(id);
  // }, [count]);
  // 方案2：使用函数updator，避免直接依赖props或state
  useEffect(() => {
    const id = setInterval(() => {
      // 实际一直在setCount，一直在rerender，一直读取到的值就是1
      setCount((count) => count + 1);
    }, 1000);
    return () => clearInterval(id);
  }, [count]);
  // 方案3：使用useRef存储可变量
  // const ref = React.useRef();
  // ref.current = count;
  // console.log("render");
  // useEffect(() => {
  //   const id = setInterval(() => {
  //     console.log("continuing===>", count, ref.current);
  //     setCount(ref.current + 1);
  //   }, 1000);
  //   return () => clearInterval(id);
  // }, []);

  return <h1>{count}</h1>;
}

const rootElement = document.getElementById('root');
ReactDOM.render(<Counter />, rootElement);
```

## useMemo 和 useCallback

```js
/*
    case 1：使用useCallback优化，useCallback将memoization函数
        原代码：
            const dispense = candy => {setCandies(allCandies => allCandies.filter(c => c != candy))}
        优化代码：
            const dispense = React.useCallback(candy => {setCandies(allCandies => allCandies.filter(c => c != candy))}, [])
        比较：
            1、两者每次render都要重新建内联函数（函数定义分配内存）
            2、优化代码会比较，并使用缓存函数，原代码直接使用新函数
            3、优化代码会如何处理新建函数，垃圾回收（有博文说不会被回收，消耗更多内存；如果有其它依赖，会被挂起）？原代码旧函数引用为0，垃圾回收机制起作用
            4、优化代码中的useCallback更所消耗，但是原代码没有额外消耗
    case 2：使用useMemo，useMemo将memoization应用于任何类型（不仅仅是函数）
        原代码：
            function CandyDispenser() {
                const initialCandies = ["", ""]
                const [candies, setCandies] = React.useState(initialCandies)
            }
        优化1：
            function CandyDispenser() {
                const initialCandies = React.useMemo(["", ""], [])
                const [candies, setCandies] = React.useState(initialCandies)
            }
        优化2：
            const initialCandies = ["", ""]
            function CandyDispenser() {
                const [candies, setCandies] = React.useState(initialCandies)
            }
        比较：优化不足为道，但是
            1、优化2好于原代码，原代码好于优化1
            2、优化1增加了useMemo成本，同时使代码变得复杂难解
    重点：
        性能优化不是免费的，是有成本的。成本和收益需要做对比
    问题：什么时间使用useMemo和useCallback？主要用于复杂的图标交互和动画
        1、引用相等（useMemo和useCallback存在的共同原因
            primitive type：
            true === true // true
            1 === 1 // true
            "a" === "a" // true
            false === false // true

            reference type：
            {} === {} // false
            [] === [] // false
            () => {} === () => {} // false

            const z = {}
            z === z // true
            React actually use Object.is, but it is very similar to ===
            在React中，有两种情况下 引用相等 很重要
                function Foo({bar, baz}) {
                    const options = {
                        bar,
                        baz
                    }

                    React.useEffect(() => {
                        buzz(options)
                    }, [options]) // we want this re-run if bar or baz change

                    return <div>foobar</div>
                }
                useEffect每次渲染都会对optinos进行 引用相等 检查，每次render中options都是新建的，每次 引用相等 检查都返回false，所以每次render，useEffect都会被重新调用
            改进1：
                function Foo({bar, baz}) {
                    React.useEffect(() => {
                        const options = { bar, baz}
                        buzz(options)
                    }, [bar, baz]) // we want this re-run if bar or baz change

                    return <div>foobar</div>
                }
                如果bar或baz是引用类型，非primitive type，该方案无效
            改进2：使用useCallback和useMemo共同作用，也是他们存在的原因
                function Foo({bar, baz}) {
                    React.useEffect(() => {
                        const options = { bar, baz}
                        buzz(options)
                    }, [bar, baz]) // we want this re-run if bar or baz change

                    return <div>foobar</div>
                }
                function Blub() {
                    const bar = React.useCallback(() => {}, [])
                    const baz = React.useMemo(() => [1,2,3], [])

                    return <Foo bar={bar} baz={baz} />
                }

                同样的case可以适用于useEffect、useLayoutEffect，useCallback和useMemo的依赖数组

            React.memo
                function CountButton({onClick, count}) {
                    return <button onClick={onClick}>{count}</button>
                }

                function DualCounter() {
                    const [count1, setCount1] = React.useState(0)
                    const increment1 = () => setCount1(c = c + 1)

                    const [count2, setCount2] = React.useState(0)
                    const increment2 = () => setCount1(c = c + 1)

                    return (
                        <>
                            <CountButton count={count1} onClick={increment1} />
                            <CountButton count={count2} onClick={increment2} />
                        </>
                    )
                }
                点击任何一个Button，两个Button都会re-render
            优化1
                const CountButton = React.memo(function({onClick, count}){
                    return <button onClick={onClick}>{count}</button>
                })
                注解：
                现在，当DualCounter父组件re-render，但是CountButton的props没有变化时，CountButton不会re-render，这是React.memo的作用


                const CountButton = React.memo(function({onClick, count}){
                    return <button onClick={onClick}>{count}</button>
                })
                function DualCounter() {
                    const [count1, setCount1] = React.useState(0)
                    // const increment1 = () => setCount1(c = c + 1)
                    const increment1 = React.useCallback(() => setCount1(c => c + 1), [])


                    const [count2, setCount2] = React.useState(0)
                    // const increment2 = () => setCount1(c = c + 1)
                    const increment2 = React.useCallback(() => setCount2(c => c + 1), [])

                    return (
                        <>
                            <CountButton count={count1} onClick={increment1} />
                            <CountButton count={count2} onClick={increment2} />
                        </>
                    )
                }
                注解：
                    当点击一个按钮时，另一个按钮不会re-render，useCallback对increment*函数固化了，相当于props不会发生变化

        2、昂贵的计算(useMemo存在的另一个原因)：比如大素数的计算
        function RenderPrimes({iterations, multiplier}) {
            const primes = calculatePrimes(iterations, multiplier)
            return <div>Primes! {primes}</div>
        }

        function RenderPrimes({iterations, multiplier}) {
            const primes = React.useMemo(() => calculatePrimes(iterations, multiplier), [
                iterations,
                multiplier,
            ])
            return <div>Primes! {primes}</div>
        }

    总结：
        useCallback就会固化value，创造出不变得props
        每个抽象(和性能优化)都是有代价的。应用 AHA 编程原则，直到确实需要抽象或优化时才去做，这样可以避免承担成本而不会获得收益的情况。

        具体来说，useCallback 和 useMemo的成本是：对于你的同事来说，你使代码更复杂了；你可能在依赖项数组中犯了一个错误，并且你可能通过调用内置的 hook、并防止依赖项和 memoized 值被垃圾收集，而使性能变差。如果你获得了必要的性能收益，那么这些成本都是值得承担的，但最好先评估一下
*/
    function CandyDispenser() {
        const initialCandies = ["snickers", "skittles", "twix", "milk way"]
        const [candies, setCandies] = React.useState(initialCandies)
        const dispense = candy => {
            setCandies(allCandies => allCandies.filter(c => c != candy))
        }

        return (
            <div>
                <h1> Candy Dispenser</h1>
                <div>
                    <div>Available Candy</div>
                    {
                        candies.length === 0 ?
                        (<button onClick={() => setCandies(initialCandies)}>refill</button>)
                        : (
                            <ul>
                                <li key={candy}>
                                    <button onClick={()=>dispense(candy)}>
                                        {
                                            candy
                                        }
                                    </button>
                                <li>
                            </ul>
                        )
                    }
                </div>
            </div>
        )
    }
```
