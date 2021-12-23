import * as React from 'react';
// import styles from './index.module.scss';

interface IInputNum {
  id: React.ReactText;
  componentType: string;
  text: string;
}

export function WfhInputNum(props: IInputNum) {
  const { text } = props;
  return <div>{text}</div>;
}

WfhInputNum.thumbnail = '数值输入';
WfhInputNum.componentType = 'wfhinputnum';
WfhInputNum.title = '数值输入';

export function WfhInputNumConfig(props: any) {
  const { text, setConfig, componentType } = props;
  if (componentType !== WfhInputNum.componentType) {
    return null;
  }

  function onChange(e: any) {
    setConfig('text', e.target.value);
  }

  return (
    <div>
      <span>WfhInputNum</span>
      <input value={text} onChange={onChange} placeholder="请输入警告文档" />
    </div>
  );
}
WfhInputNumConfig.componentType = 'input';
