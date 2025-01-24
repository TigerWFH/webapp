import * as React from 'react';
import EndComponent, { EndNode } from './X6Canvas/EndNode';
import ConditionComponent, {
  ConditionNode
} from './X6Canvas/ConditionNode.tsx';

function BaseComponent() {
  return <div>base</div>;
}

// 待注册的扩展操作的x6节点
// 如果不需要扩展操作，直接使用内置的shape: base-node
// 待注册的react组件
export const keyToNode = {
  condition: ConditionNode,
  end: EndNode
};
export const keyToReactNode = [
  {
    shape: 'react-basenode',
    inherit: 'base-node',
    component: BaseComponent
  },
  {
    shape: 'react-condition',
    inherit: 'condition',
    component: ConditionComponent
  },
  {
    shape: 'react-end',
    inherit: 'end',
    component: EndComponent
  }
];
