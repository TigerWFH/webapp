import * as React from 'react';

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

export const MyFn = React.forwardRef(Fn);

export class MyName extends React.Component<any, any> {
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
