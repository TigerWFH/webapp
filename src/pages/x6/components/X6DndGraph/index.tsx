import * as React from 'react';
import X6Canvas from './X6Canvas';
import { keyToNode, keyToReactNode } from './custom';

const MOCKDATA = {
  nodes: [
    {
      id: 'node1',
      x: 40,
      y: 40,
      width: 80,
      height: 40,
      label: 'node1'
    },
    {
      id: 'node2',
      x: 160,
      y: 180,
      width: 80,
      height: 40,
      label: 'node2'
    },
    {
      id: 'node3',
      x: 160,
      y: 180,
      width: 80,
      height: 40,
      label: 'node3'
    },
    {
      id: 'node4',
      x: 160,
      y: 180,
      width: 80,
      height: 40,
      label: 'node4'
    },
    {
      id: 'node5',
      x: 40,
      y: 40,
      width: 80,
      height: 40,
      label: 'node5'
    },
    {
      id: 'node6',
      x: 160,
      y: 180,
      width: 80,
      height: 40,
      label: 'node6'
    },
    {
      id: 'node7',
      x: 160,
      y: 180,
      width: 80,
      height: 40,
      label: 'node7'
    },
    {
      id: 'node8',
      x: 160,
      y: 180,
      width: 80,
      height: 40,
      label: 'node8'
    },
    {
      id: 'node8',
      x: 160,
      y: 180,
      width: 80,
      height: 40,
      label: 'node8'
    },
    {
      id: 'node9',
      x: 160,
      y: 180,
      width: 80,
      height: 40,
      label: 'node9'
    },
    {
      id: 'node10',
      x: 160,
      y: 180,
      width: 80,
      height: 40,
      label: 'node10'
    },
    {
      id: 'node11',
      x: 160,
      y: 180,
      width: 80,
      height: 40,
      label: 'node11'
    },
    {
      id: 'node12',
      x: 160,
      y: 180,
      width: 80,
      height: 40,
      label: 'node12'
    }
  ],
  edges: [
    {
      source: 'node1',
      target: 'node10'
    },
    {
      source: 'node1',
      target: 'node8'
    },
    {
      source: 'node1',
      target: 'node3'
    },
    {
      source: 'node1',
      target: 'node9'
    },
    {
      source: 'node1',
      target: 'node2'
    },
    {
      source: 'node2',
      target: 'node4'
    },
    {
      source: 'node2',
      target: 'node5'
    },
    {
      source: 'node2',
      target: 'node6'
    },
    {
      source: 'node2',
      target: 'node7'
    },
    {
      source: 'node9',
      target: 'node11'
    },
    {
      source: 'node9',
      target: 'node12'
    }
  ]
};
export default class X6DndGraph extends React.Component<any, any> {
  render() {
    return (
      <X6Canvas
        data={MOCKDATA}
        customNode={keyToNode}
        customReactNode={keyToReactNode}
      />
    );
  }
}
