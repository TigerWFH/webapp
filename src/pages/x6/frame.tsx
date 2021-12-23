import * as React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Stencil from './components/Stencil';
import DropTarget from './components/DropTarget';
import DragSource from './components/DragSource';
import CMSWorkbench from './components/CmsWorkbench';
import { Alert } from './components/Alert';
import { Background } from './components/Background';
import { WfhInput } from './components/WfhInput';
import { WfhInputNum } from './components/WfhInputNum';
import { WfhSelect } from './components/WfhSelect';
import { WfhTable } from './components/WfhTable';
import styles from './index.module.scss';

interface IProps {}

const DND_ITEM_LIST = ['CMS_DND_ITEM_TYPE', 'X6_DND_ITEM_TYPE'];
/*
  DragSource的Props
*/

interface IAnyObj {
  [name: string]: any;
}

// 组件接口
interface IComponent {
  componentType: React.ReactText; // 组件类型
  config: IAnyObj; // 组件对应数据项
  [name: string]: any;
}
interface IDragSourceProps {
  id: React.ReactText;
  name?: React.ReactText;
  type: string | symbol;
  thumbnail?: string;
  toolComponent?: React.ComponentClass | React.FC;
  data: IComponent;
}

const MOCK_TOO_LIST: IDragSourceProps[] = [
  {
    id: Alert.title, // 用于搜索
    name: Alert.title, // 用于搜索
    type: DND_ITEM_LIST[0],
    data: {
      componentType: Alert.componentType,
      config: {}
    }
  },
  {
    id: Background.title,
    name: Background.title,
    type: DND_ITEM_LIST[0],
    data: {
      componentType: Background.componentType,
      config: {}
    }
  },
  {
    id: WfhInput.title,
    name: WfhInput.title,
    type: DND_ITEM_LIST[0],
    data: {
      componentType: WfhInput.componentType,
      config: {}
    }
  },
  {
    id: WfhInputNum.title,
    name: WfhInputNum.title,
    type: DND_ITEM_LIST[0],
    data: {
      componentType: WfhInputNum.componentType,
      config: {}
    }
  },
  {
    id: WfhSelect.title,
    name: WfhSelect.title,
    type: DND_ITEM_LIST[0],
    data: {
      componentType: WfhSelect.componentType,
      config: {}
    }
  },
  {
    id: WfhTable.title,
    name: WfhTable.title,
    type: DND_ITEM_LIST[0],
    data: {
      componentType: WfhTable.componentType,
      config: {}
    }
  }
];

class Frame extends React.Component {
  render() {
    return (
      <DndProvider backend={HTML5Backend}>
        <div className={styles.dndframe}>
          <div className={styles.sidebar}>
            <Stencil toolList={MOCK_TOO_LIST} dragSource={DragSource} />
          </div>
          <div className={styles.content}>
            <DropTarget accept={[DND_ITEM_LIST[0]]} workbench={CMSWorkbench} />
          </div>
        </div>
      </DndProvider>
    );
  }
}

export default Frame;
