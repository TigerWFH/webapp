import * as React from 'react';
import { Edge } from '@antv/x6';
import { BaseNode, IResult, PORTS_CONFIG } from '../register';
import styles from './index.module.scss';

// 扩展节点操作
export class EndNode extends BaseNode {
  getInPorts() {
    return this.getPortsByGroup('in');
  }

  getOutPorts() {
    return this.getPortsByGroup('out');
  }

  canAddIncomingEdge(edge: Edge): IResult {
    const beginWithEvent = super.beginWithEventNode(edge);
    if (beginWithEvent) {
      return {
        success: false,
        msg: '事件网关后面仅限等待事件和中间事件'
      };
    }
    return {
      success: true,
      msg: '结束节点，支持多入边'
    };
  }

  canAddOutgoingEdge(): IResult {
    return {
      success: false,
      msg: '结束节点，不支持出边'
    };
  }
}
// 定制节点样式
EndNode.config({
  width: 80,
  height: 80
});
// 定制节点UI组件
export default function EndComponent(props: any) {
  const { node = {} } = props;
  if (node.template) {
    return (
      <div className={styles.template}>
        <image />
        <span>end</span>
      </div>
    );
  }
  return <div className={styles.end}>end</div>;
}
