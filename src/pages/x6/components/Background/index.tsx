import * as React from 'react';
import styles from './index.module.scss';
import * as t from '../types';

interface IBackground extends t.IComponent {
  color?: string;
  image?: string;
}

export function Background(props: IBackground) {
  const { componentType } = props;
  if (componentType !== Background.componentType) {
    return null;
  }

  const bgStyle = {
    backgroundColor: props.color,
    backgroundImage: props.image
  };
  return <div className={styles.background} style={bgStyle}></div>;
}

Background.thumbnail = '背景色';
Background.componentType = 'background';
Background.title = '背景色';

export function BackgroundConfig(props: t.IConfig) {
  const { color, setConfig } = props;
  const [bgColor, setBgColor] = React.useState(color || '');
  // const [, setBgImage] = React.useState(image);

  function onChange(e: any) {
    setConfig('color', e.target.value);
    setBgColor(e.target.value);
  }

  return (
    <div>
      <span>Background</span>
      <input
        value={bgColor}
        onChange={React.useCallback(onChange, [])}
        placeholder="请输入六位颜色值"
      />
    </div>
  );
}

BackgroundConfig.componentType = 'background';
