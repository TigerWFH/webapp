import * as React from 'react';
import { setCookie, getCookie } from 'Utils/helper';
import { Card } from 'antd';
import Editor from './components/Editor';
import BraftEditor from 'braft-editor';

const PAGE_TITLE = 'ANTD_UI';

class Antd extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    setCookie('home', 'antd');
    let domain = getCookie('home');
    let dot = getCookie('home');
    console.log('domain===>', domain);
    console.log('dot===>', dot);

    console.log('antd');
    this.state = {
      value: BraftEditor.createEditorState('')
    };
  }

  componentDidMount() {}

  onToHome = () => {};

  onEditor = (value: any) => {
    this.setState({
      value
    });
  };

  render() {
    return (
      <Card title={PAGE_TITLE}>
        <button onClick={this.onToHome}>toHome</button>
        <div>{this.state.value.toHTML()}</div>
        <Editor onEditor={this.onEditor} value={this.state.value} />
      </Card>
    );
  }
}

export default Antd;
