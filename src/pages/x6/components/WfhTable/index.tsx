import * as React from 'react';
// import styles from './index.module.scss';

interface ITable {
  id: React.ReactText;
  componentType: string;
  text: string;
}

export function WfhTable(props: ITable) {
  const { text } = props;
  return <div>{text}</div>;
}

WfhTable.thumbnail = '表格';
WfhTable.componentType = 'wfhtable';
WfhTable.title = '表格';

export function WfhTableConfig(props: any) {
  const { text, setConfig, componentType } = props;
  if (componentType !== WfhTable.componentType) {
    return null;
  }

  function onChange(e: any) {
    setConfig('text', e.target.value);
  }

  return (
    <div>
      <span>WfhTable</span>
      <input value={text} onChange={onChange} placeholder="请输入警告文档" />
    </div>
  );
}
WfhTableConfig.componentType = 'input';
