import * as React from 'react';
import Immutable from 'immutable';
import styles from './index.module.scss';

export interface IMetaData {
  id: React.ReactText; // 该拖拽数据的应用内唯一标识，搜索
  name?: React.ReactText; // 拖拽数据friendly name，搜索展示
  type?: string | symbol; // item的Type类型，对应容器的type
  thumbnail?: string; // 工具缩略图，展示
  toolComponent?: React.FC | React.ComponentClass; // 工具自定义展示
  group?: string; // 用于分组
  data?: {
    // 节点附带的业务数据
    componentType: React.ReactText; // 组件类型
    config: { [name: string]: any }; // 组件对应数据项
    [property: string]: any;
  };
}
interface IStencilProps {
  toolList: Immutable.List<IMetaData>;
  dragSource: React.ComponentClass | React.FC<any>;
  bSearch?: boolean; // 是否启用搜索功能
  title?: string; // 工具栏标题
  notFoundText?: string; // 未搜索到展示文案
}
/*
待做：
  还需要增加对异步数据的处理
*/
class Stencil extends React.Component<IStencilProps, any> {
  static defaultProps = {
    toolList: [] as any,
    bSearch: true
  };

  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    const { toolList } = nextProps;
    const { prevToolList } = prevState;
    if (!Immutable.is(prevToolList, toolList)) {
      return {
        toolList: toolList.toJS(),
        allToolList: toolList.toJS(),
        prevToolList: toolList
      };
    }

    return null;
  }

  constructor(props: IStencilProps) {
    super(props);
    this.state = {
      toolList: this.props.toolList.toJS(),
      allToolList: this.props.toolList.toJS(),
      prevToolList: this.props.toolList
    };
  }

  onSearch = (e: any) => {
    const searched = e.target.value;
    const { allToolList } = this.state;
    let newToolList = allToolList;
    if (searched) {
      newToolList = allToolList.filter(
        (tool: any) => tool.name === searched || tool.id === searched
      );
    }

    this.setState({
      toolList: newToolList
    });
  };

  render() {
    const {
      dragSource: DragSource,
      bSearch,
      title = '工具集',
      notFoundText = '没有找到对应的模板'
    } = this.props;
    const { toolList } = this.state;

    return (
      <div className={styles.sidebar}>
        {title ? <div className={styles.title}>{title}</div> : null}
        {bSearch ? (
          <div className={styles.search}>
            <input placeholder="请输入搜索内容" onChange={this.onSearch} />
          </div>
        ) : null}
        {toolList.length > 0 ? (
          <div className={styles.container}>
            <div className={styles.gtitle}>stencils</div>
            <div className={styles.tools}>
              {toolList.map((tool: IMetaData, index: number) => {
                return (
                  <div className={styles.tool} key={`${tool.id}-${index}`}>
                    <DragSource key={`${tool.id}-${index}`} {...tool} />
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className={styles.noresult}>{notFoundText}</div>
        )}
      </div>
    );
  }
}

export default Stencil;
