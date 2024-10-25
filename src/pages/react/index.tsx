import * as React from 'react';
// import Tabs, { TabPanel } from 'Components/Tabs';
// import Hooks from './components/Hooks';
// import ImperativeHandle from './components/Hooks/useImperativeHandle';
// import UseState from './components/Hooks/useState';
// import KeyTest from './components/KeyTest';
// import SetStateTest from './components/SetStateTest';

/*
  只要父组件update，子组件无论是否通过props接收了父组件的state，都会被update
    即使通过x.xx.xx修改深层级数据，只要父组件update且rerender，子组件就会rerender
  可以通过memo优化，就会通过props的对比，选择性的rerender
*/
interface IProps {
  name: string;
  age: number;
}
interface IState {
  name: string;
  age: number;
  info: {
    first: number;
    second: number;
  };
}

const Name = React.memo(function Name(props: any) {
  const { name } = props;
  console.log('wfh-Name-render');
  return <div>{name}</div>;
});

const Age = React.memo(function Age(props: any) {
  console.log('wfh-Age---render');
  return <div>12</div>;
});

const Number = React.memo(function Num(props: any) {
  const { info } = props;
  console.log('wfh-info---render');
  return <div>{`Info:${info.first}-${info.second}`}</div>;
});

const NoProps = React.memo(function NoProps(props) {
  console.log('wfh-NoProps----render');

  return <div>no props</div>;
});

class ReactDemo extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      name: 'default',
      age: 12,
      info: {
        first: 1,
        second: 2
      }
    };
  }

  onChangeInfo = () => {
    const newState = { ...this.state };
    newState.info.first = 8;
    newState.info.second = 8;
    this.setState(newState);
  };

  render() {
    const { name, age, info } = this.state;
    console.log('wfh--render====>', this.state);
    return (
      <div>
        <button onClick={() => this.setState({ name: 'monkey', age: 16 })}>
          change all
        </button>
        <button onClick={() => this.setState({ name: 'monkey1' })}>
          change name
        </button>
        <button onClick={() => this.setState({ age: 18 })}>change age</button>
        <button onClick={this.onChangeInfo}>change info</button>
        <div>{name}</div>
        <div>{age}</div>
        <Name name={name} />
        <Age age={age} />
        <Number info={info} />
        <NoProps />
        {/* <Tabs defaultActiveName="hooks">
          <TabPanel key="@@keylist" name="测试react中的key" title="key-test">
            <KeyTest />
          </TabPanel>
          <TabPanel
            key="@@setstate"
            name="测试react class的setState"
            title="setstate">
            <SetStateTest />
          </TabPanel>
          <TabPanel key="@@hooks" name="hooks" title="hooks">
            <Hooks name="monkey" count={123} />
          </TabPanel>
          <TabPanel
            key="@@imperativehandle"
            name="imperativehandle"
            title="useImperativeHandle">
            <ImperativeHandle />
          </TabPanel>
          <TabPanel key="@@useState" name="useState" title="useState">
            <UseState />
          </TabPanel>
        </Tabs> */}
      </div>
    );
  }
}
export default ReactDemo;
