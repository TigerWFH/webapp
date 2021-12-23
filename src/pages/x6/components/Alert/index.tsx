import * as React from 'react';
import styles from './index.module.scss';

interface IAlert {
  id: React.ReactText;
  componentType: string;
  text: string;
}

export function Alert(props: IAlert) {
  const { text } = props;
  return <div className={styles.alert}>{text}</div>;
}

Alert.thumbnail = '警告信息';
Alert.componentType = 'alert';
Alert.title = '警告信息';

export function AlertConfig(props: any) {
  const { text, setConfig, componentType } = props;
  if (componentType !== Alert.componentType) {
    return null;
  }

  function onChange(e: any) {
    setConfig('text', e.target.value);
  }

  return (
    <div>
      <span>Alert</span>
      <input value={text} onChange={onChange} placeholder="请输入警告文档" />
    </div>
  );
}
AlertConfig.componentType = 'alert';
