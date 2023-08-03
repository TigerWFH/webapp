import * as React from 'react';
import { useDrag } from 'react-dnd';
import styles from './index.module.scss';
enum ITEM_TYPE {
  X6_DROP_TARGET = 'X6_DROP_TARGET'
}

interface IBusinessData {
  componentType: string; // 对应组件类型
  config: { [name: string]: any };
  [property: string]: any;
}
interface IDragSourceProps {
  type?: ITEM_TYPE;
  name: React.ReactText;
  toolComponent?: React.ReactChild; // 工具展示成自定义组件形式
  className?: string;
  style?: { [property: string]: any };
  data?: IBusinessData; // 传递给工作台的数据
}

function DefaultStencil(props: any) {
  return (
    <div className={styles.default}>
      <div className={styles.icon} />
      <div className={styles.name}>{props.name}</div>
    </div>
  );
}

function DragSource(props: IDragSourceProps) {
  const {
    type = ITEM_TYPE.X6_DROP_TARGET,
    name,
    toolComponent, // 当前组件使用
    data = {} // 要传递的数据
  } = props;
  const [, drag, dragPreview] = useDrag(() => {
    console.log('useDrag-----data=======>', data);

    return {
      type,
      item: {
        // 被传递的数据
        ...data
      },
      end: () => {},
      collect: (monitor) => {
        return {
          demo: 'demo'
        };
      }
    };
  });
  let element: any = <DefaultStencil name={name} />;
  if (toolComponent) {
    element = toolComponent;
  }
  return (
    <div className={styles.dragsource} ref={drag}>
      <div ref={dragPreview}> "preview"</div>
      {element}
    </div>
  );
}

export default DragSource;
