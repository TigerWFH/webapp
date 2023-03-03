/*
    cosnt [state, setState] = useState(initialState)

    undefined useEffec(setup, dependencies?)
*/
import React, { useState, useEffect } from 'react';

export default function UseState(props: any) {
  const [name, setName] = useState('monkey');
  const [age, setAge] = useState(18);
  const [gender, setGender] = useState('boy');

  /*
  使用useState多次渲染问题：
    UseState====render，共打印了5次
    初始渲染打印1次，
    同步的setXXX合并渲染，打印1次
    异步的setXXX不能合并，打印3次
    共计5次
  解决方案：
    1、合并，问题每次setAll()都需要合并原来的值，react是替换，不是合并，
      例如setAll({ name: "fish"})，nameage和gender就没有了。需要手动合并，使用扩展运算符
    const [{name, age, monkey}, setAll] = useState({name: 'monkey', age: 18, gender: 'girl'})
    2、使用useReducer()
    3、写一个自定义的合并功能的hook
  */
  console.log('UseState====render');

  useEffect(() => {
    // 执行一次
    console.log('依赖空数组');
    setName('fish');
    setAge(28);
    setGender('girl');
    setTimeout(() => {
      setName('cat');
      setAge(38);
      setGender('boy');
    }, 1000);
  }, []);
  useEffect(() => {
    // 执行一次
    console.log('数组空字符串');
  }, ['']);
  useEffect(() => {
    // 执行一次
    console.log('[undefined]');
  }, [undefined]);

  useEffect(() => {
    // 执行多次
    console.log('依赖undefiend');
  }, undefined);

  useEffect(() => {
    // 执行多次
    console.log('什么都不依赖');
  });

  return (
    <div>
      <div>{`name:${name}`}</div>
      <div>{`age:${age}`}</div>
      <div>{`gender:${gender}`}</div>
    </div>
  );
}
