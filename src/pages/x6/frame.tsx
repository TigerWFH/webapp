import * as React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Stencil from './components/Stencil';
import DropTarget from './components/DropTarget';
import DragSource from './components/DragSource';
import CMSWorkbench from './components/CmsWorkbench';
import X6Workbench from './components/X6Workbench';
import { Alert } from './components/Alert';
import { Background } from './components/Background';
import { WfhInput } from './components/WfhInput';
import { WfhInputNum } from './components/WfhInputNum';
import { WfhSelect } from './components/WfhSelect';
import { WfhTable } from './components/WfhTable';
import { WfhRect } from './components/WfhRect';
import { WfhTriangle } from './components/WfhTriangle';
import Immutable from 'immutable';
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

/*
  CMS数据：
    警告信息
    背景色
    单行文本
    数值输入
    下拉框
    表格
    
  x6数据：
    触发
      触发对象
        客群
      触发方式
        定时触发
        立即触发
        行为触发
        系统触发
    流程控制
      等待
      条件
      随机网关
      并行网关
      事件网关
      执行子流程
      对照组
      结束
      中间事件
    策略
      调用规则
      调用模型
    动作
      通知渠道
        风险统一调额调价V2
        推送
        短信
        微信
        人工外呼
        邮件
        AI外呼发送
        AI外呼取消
    数据产品
      采集外部资信
      变量整理


*/
const MOCK_TOO_LIST: IDragSourceProps[] = [
  {
    id: WfhRect.title, // 用于搜索
    name: WfhRect.title, // 用于搜索
    type: DND_ITEM_LIST[0],
    data: {
      componentType: WfhRect.componentType,
      config: {}
    }
  },
  {
    id: WfhTriangle.title, // 用于搜索
    name: WfhTriangle.title, // 用于搜索
    type: DND_ITEM_LIST[0],
    data: {
      componentType: WfhTriangle.componentType,
      config: {}
    }
  },
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

class Frame extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      stencilList: Immutable.List([])
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState((prevState: any) => {
        return {
          stencilList: Immutable.List(MOCK_TOO_LIST)
        };
      });
    }, 1000);
  }
  render() {
    const { match = {} } = this.props;
    const type = match.params?.type || 'x6';
    const { stencilList = [] } = this.state;

    return (
      <DndProvider backend={HTML5Backend}>
        <div className={styles.dndframe}>
          <div className={styles.sidebar}>
            <Stencil toolList={stencilList} dragSource={DragSource} />
          </div>
          <div className={styles.content}>
            <DropTarget
              accept={[DND_ITEM_LIST[0]]}
              workbench={type === 'cms' ? CMSWorkbench : X6Workbench}
            />
          </div>
        </div>
      </DndProvider>
    );
  }
}

export default Frame;
