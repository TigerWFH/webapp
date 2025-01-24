import * as React from 'react';
import { Edge } from '@antv/x6';
// import { Progress, Button } from 'antd';
import { BaseNode, IResult, PORTS_CONFIG } from '../register';
import styles from './index.module.scss';
import img from '../../../../../../res/bg3.jpg';

export class ConditionNode extends BaseNode {
  constructor(metaData: any) {
    const tmp = {
      ...metaData,
      component: Condition
    };
    super(tmp);
  }
  validatedOutgoingEdgeConfig(): IResult {
    const { model } = this;
    const edges = model?.getOutgoingEdges(this) || [];
    if (edges.length <= 0) {
      return {
        success: false,
        msg: '条件节点没有出边'
      };
    }

    const results = edges?.filter((edge: any) => {
      const data = edge.getData() || {};
      const { edgeCustomConfigs } = data;

      return !!edgeCustomConfigs;
    });

    const success = results.length === 0;

    return {
      success,
      msg: success ? '' : '条件节点出边缺少配置',
      edges: results
    };
  }

  // 是否包含默认变
  containDefaultEdge(): boolean {
    const { data = {} } = this;
    const { edgeCustomConfigs = [] } = data || {};

    const result = edgeCustomConfigs.some(
      (config: any) => config.defaultEdge === 1
    );

    return result;
  }

  canAddOutgoingEdge(edge: Edge): IResult {
    // 不支持多条默认配置边
    const { edgeCustomConfigs = {} } = edge?.getData() || {};
    const { defaultEdge } = edgeCustomConfigs || ({} as any);
    const { name } = this.getData() || {};
    if (defaultEdge === 1 && this.containDefaultEdge()) {
      return {
        success: false,
        msg: `条件节点(${name})已存在一条默认分支，不允许再次添加`
      };
    }

    return {
      success: true
    };
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
      success: true
    };
  }

  getInPorts() {
    return this.getPortsByGroup('in');
  }

  getOutPorts() {
    return this.getPortsByGroup('out')[0];
  }
}

ConditionNode.config({
  width: 180,
  height: 80,
  attrs: {
    body: {
      magnet: false,
      fill: 'none',
      stroke: 'none',
      refWidth: '100%',
      refHeight: '100%',
      zIndex: 1
    }
  },
  ports: PORTS_CONFIG
});

export const keyToNode = {
  condition: ConditionNode
};

export default function Condition(props: any) {
  console.log('wfh---condition--props', props.node.data);
  const { data = {} } = props.node;
  if (data.template) {
    return (
      <div className={styles.template}>
        <img src={img} />
        <span>condition</span>
      </div>
    );
  }
  return <div className={styles.condition}>condition</div>;
}
