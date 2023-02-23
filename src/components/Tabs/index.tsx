import * as React from 'react';
import styles from './index.module.scss';

interface ITabPanel {
  children: React.ReactNode;
  key: string;
  name: string; // unique, to code
  title: string; // friendly, to user
  className?: string;
}

export function TabPanel(props: ITabPanel) {
  console.log('TabPanel render');
  const { children, ...rest } = props;
  return <div {...rest}>{children}</div>;
}
interface IProps {
  defaultActiveName: string;
  children: React.ReactNode;
  className?: string;
  onChange?: (name: string) => void;
}
interface IState {
  activeName: string;
}
function Tabs(props: IProps) {
  const { children, className } = props;
  const childList = React.Children.toArray(children);
  const [activeName, setActiveName] = React.useState('');
  React.useEffect(() => {
    setActiveName(props.defaultActiveName);
  }, [props.defaultActiveName]);
  const currChild: React.ReactNode = React.useMemo(() => {
    return childList.find((child: any) => {
      return child.props.name === activeName;
    });
  }, [activeName, childList]);
  if (childList.length <= 0) {
    return null;
  }
  const onTitleChange = (child: React.ReactElement) => {
    setActiveName(child.props.name);
    if (typeof props.onChange === 'function') {
      props.onChange(child.props.name);
    }
  };

  return (
    <div className={`${styles.tabs} ${className}`}>
      <span className={`flex ${styles.scroll}`}>
        {childList.map((child: any) => {
          return (
            <span
              className={`flex-no-shrink flex flex-column ${styles.titlewrapper}`}
              onClick={onTitleChange.bind(null, child)}>
              <span
                className={`${styles.title} ${
                  activeName === child.props.name ? styles.activetitle : ''
                }`}>
                {child.props.title}
              </span>
              <span
                className={
                  activeName === child.props.name ? styles.activebar : ''
                }
              />
            </span>
          );
        })}
      </span>
      {currChild}
    </div>
  );
}

export default Tabs;
