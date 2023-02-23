import * as React from 'react';
import Tabs, { TabPanel } from 'Components/Tabs';
import Hooks from './components/Hooks';
import ImperativeHandle from './components/Hooks/useImperativeHandle';
import KeyTest from './components/KeyTest';
import SetStateTest from './components/SetStateTest';

interface IProps {}
interface IState {}

class ReactDemo extends React.Component<IProps, IState> {
  render() {
    return (
      <div>
        <Tabs defaultActiveName="hooks">
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
        </Tabs>
      </div>
    );
  }
}
export default ReactDemo;
