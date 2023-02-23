/*
    Hooks: useImperativeHandle
     imperative：重要紧急的、迫切的、急需处理的
     handle：处理、应付、控制、操纵；把手、手柄
    useImperativeHandle is a React Hook that lets you customize the handle exposed as a ref
    * Exposing a custom ref handle to the parent component
    * Exposing your own imperative methods
    * 
    * createRef()
    * forwardRef()
    
    useImperativeHandle(ref, createHandle, dependencies)
        * ref
        * createHandler:A function that takes no arguments and returns the ref handle you want to expose
        * [dependencies] The list of all reactive values referenced inside of the createHandle code
*/

import React from 'react';

function Fn(props: any, ref: any) {
  const [name, setName] = React.useState('MyFn');
  const inputRef: any = React.createRef();
  //   模拟class 接口，暴露当前组件状态给父组件
  React.useImperativeHandle(ref, () => ({
    name,
    focus: () => {
      inputRef.current.focus();
    }
  }));

  function onChange(e: any) {
    setName(e.target.value);
  }

  return (
    <div>
      <input
        ref={inputRef}
        value={name}
        onChange={React.useCallback(onChange, [])}
      />
    </div>
  );
}

const MyFn = React.forwardRef(Fn);

class MyName extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: 'MyName'
    };
  }
  getData = () => {
    return this.state.name;
  };
  onChange = (e: any) => {
    this.setState({
      name: e.target.value
    });
  };
  render() {
    return (
      <div>
        <input value={this.state.name} onChange={this.onChange} />
      </div>
    );
  }
}

export default class ImperativeHandle extends React.Component<any, any> {
  fnRef: any = null;
  nameRef: any = null;
  constructor(props: any) {
    super(props);
    this.fnRef = React.createRef();
    this.nameRef = React.createRef();
  }

  onFn = () => {
    if (this.fnRef && this.fnRef.current) {
      console.log('fnRef======>', this.fnRef.current.name);
      this.fnRef.current.focus();
    }
    if (this.nameRef && this.nameRef.current) {
      // 可以不用提供数据接口，直接把state都能给拿到
      console.log('nameRef======>', this.nameRef.current.getData());
      console.log('nameRef======>', this.nameRef.current.state);
    }
  };

  render() {
    return (
      <div>
        <button onClick={this.onFn}>获取数据</button>
        <MyFn ref={this.fnRef} />
        <MyName ref={this.nameRef} />
      </div>
    );
  }
}
