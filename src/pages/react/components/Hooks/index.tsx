/**
 * 1、性能优化是有成本的，成本大于收益，是ERROR
 * 2、useMemo和useCallback的成本和收益
 *
 * hooks：最透彻的文章：https://blog.csdn.net/qq_29438877/article/details/104809865?utm_medium=distribute.pc_relevant_t0.none-task-blog-searchFromBaidu-1.control&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-searchFromBaidu-1.control
 * Hooks是React16.8自带功能，Hooks就是javascript function
 * 解决的问题：
 * 一、在组件之间很难复用业务逻辑（与renderProps和higher-order-components相比，在sharing stateful logic方面hooks更primitive）
 * 	Hooks allow you to reuse stateful logic without changing your component hierarchy. This makes it easy to share Hooks
 * 	among many components or with the community.对应技术：Building your own hooks
 * 二、组件变得过于复杂Hooks let you split one component into smaller functions based on what pieces are related
 * 	(such as setting up a subscription or fetching data)，对应Using the Effect Hook
 * 三、Classes confuse both people and machines。Hooks let you use more of React’s features without classes
 *
 * Hooks Rules
 * 一、在函数顶层使用Hooks，不要在loops、conditions、or nested functions中使用Hooks
 * 二、只在ReactFunctionComponents中调用Hooks
 *
 * Build Your Own Hooks(类似render props和HOC的功能)
 *
 * import React, { useState, useEffect } from "react"
 *
 * // My Custom Hooks：a function’s name starts with ”use” and it calls other Hooks, we say it is a custom Hook
 * function useFriendStatus(friendID) {
 * 	const [isOnline, setIsOnline] = useState(null)
 * 	function handleStatusChange(status) {
 * 		setIsOnline(status.isOnline)
 * 	}
 *
 * 	useEffect(() => {
 * 		ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange)
 * 		return () => {
 * 			ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange)
 * 		}
 * 	})
 *
 * 	return isOnline
 * }
 * // Demos using My Custom Hooks
 *
 * function FriendStatus(props) {
 * 	cosnt isOnline = useFriendStatus(props.frined.id)
 * 	if (isOnline === null) {
 * 		return "Loading"
 * 	}
 * 	return isOnline ? "Online" : "Offline"
 * }
 *
 * function FriendListItem(props) {
 * 	cosnt isOnline = useFriendStatus(props.frined.id)
 *
 * 	return (
 * 		<li style={{color: isOnline ? "green" : "black"}}>
 * 			{
 * 				props.friend.name
 * 			}
 * 		</li>
 * 	)
 * }
 *
 * 这里面的state是独立的，hooks共用的是logic而不是state
 *
 * 1、constructor ==> useState()
 * 2、getDerivedStateFromProps ===>
 * 3、shouldComponentUpdate ===> React.memo（类似React.PureComponent），针对组件的渲染是否重复执行
 * 4、render ===> function component
 * 5、componentDidMount、componentDidUpdate、ComponentWillUnmount ===> useEffect()：可以设置依赖
 * 6、getSnapshotBeforeUpdate, componentDidCatch and getDerivedStateFromError ===> no hooks
 *
 * useState：第一次render，返回初始值；uodate返回当前值
 * useEffect：每次render都会调用useEffect，class则需要在didMount和DidUpdate都做逻辑
 * useContext
 * useReducer
 * useCallback：缓存函数
 * useMemo：缓存值
 * useRef
 * useImperativeHandle
 * useLayoutEffect
 * useDebugValue
 * useMemo和useCallback使用场景：https://blog.csdn.net/baidu_39067385/article/details/111412255
 * React.memo
 *
 * cosnt MyComponent = React.memo(function MyComponent(props) {
 * 		.......
 * })
 *
 **/
import * as React from 'react';
import Card from 'Components/Card';
import Text from 'Components/Text';
import Line from 'Components/Line';
interface IProps {
  name: string;
  count: number;
}

export default function Hooks(props: IProps) {
  console.log('Hooks===>', props);
  /*
		useState(initialValue | fn)：返回当前state和对应更新函数setState
	*/
  const [name, setName] = React.useState(props.name); // useState声明了一个state variable
  const [count, setCount] = React.useState(props.count);
  /*
		useEffect(fn, [dependencies])：当依赖发生变化，才会执行fn计算;fn会在return之后执行
	*/
  React.useEffect(() => {
    console.log('useEffect====>');
    setName(props.name);
  }, [props.name]);
  /*
		useMemo(fn, [dependencies])：当依赖发生变化，才会执行fn计算，并返回计算结果；用于优化复杂计算，避免每次render都执行
		cb是在render期间执行，即在return之前执行
	*/
  // const result = React.useMemo(() => {
  // 	console.log("useMemo===>")
  // 	return 'default'
  // }, [name])
  /*
		useCallback(fn, [dependencies])：返回一个callback；

		useCallback(fn, deps) 等价 useMemo(() => fn, deps)
	*/
  // const [mount, dispatch] = React.useReducer((state: any, action: any) => {
  // 	if (action === 'add') {
  // 		return state + 1
  // 	}
  // 	return state
  // }, 0)

  function onChangeCount() {
    const result = count + 1;
    setCount(result);
  }
  function onChangeName() {
    setName('monkey666666');
  }

  function onActionChangeName() {
    // actions.changeName("monkey")
  }
  // function getName() {
  // 	return name
  // }
  return (
    <Card title="hooks">
      <Text>{`count:${count}`}</Text>
      <Text>{`name: ${name}`}</Text>
      <Line />
      <div onClick={onActionChangeName}>action change name</div>
      <div onClick={onChangeCount}>changeStateCount</div>
      <div onClick={onChangeName}>changeStateName</div>
    </Card>
  );
}
