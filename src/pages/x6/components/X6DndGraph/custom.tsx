import * as React from 'react';
import { Edge } from '@antv/x6';
import { Progress, Button } from 'antd';
import { BaseNode, IResult, PORTS_CONFIG } from './X6Canvas/register';

class ConditionNode extends BaseNode {
  constructor(metaData: any) {
    const tmp = {
      ...metaData,
      component: function () {}
    };
    super(metaData);
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

const ProgressContext = React.createContext(30);

const ConditionComponent = () => {
  const progress = React.useContext(ProgressContext);
  return (
    <div className="react-node">
      Condition
      <Progress type="circle" percent={progress} width={80} />
    </div>
  );
};

export const keyToNode = {
  condition: ConditionNode
};

export const keyToReactNode = [
  {
    shape: 'react-condition',
    inherit: 'condition',
    width: 100,
    height: 100,
    component: ConditionComponent
  }
];
