import * as React from 'react';
import * as t from './types';
import Log from '../components/X6ReactLog';
import { DagreLayout } from '@antv/layout';
import '@antv/x6-react-shape';

const layout = new DagreLayout({
  type: 'dagre',
  nodesep: 60,
  ranksep: 60
});
const LOG_NODE_WIDTH = 180;
const LOG_NODE_HEIGHT = 60;
const MOCK_DATA = {
  nodes: [
    {
      id: 'node1',
      shape: 'react-shape',
      width: LOG_NODE_WIDTH,
      height: LOG_NODE_HEIGHT,
      component: (
        <Log
          width={LOG_NODE_WIDTH}
          height={LOG_NODE_HEIGHT}
          name="Log1Log1Log1Log1Log1Log1Log1Log1Log1Log1Log1Log1Log1Log1Log1Log1Log1Log1Log1Log1"
          bActive={true}
          bDecision={true}
        />
      )
    },
    {
      id: 'node2',
      shape: 'react-shape',
      width: LOG_NODE_WIDTH,
      height: LOG_NODE_HEIGHT,
      component: (
        <Log
          width={LOG_NODE_WIDTH}
          height={LOG_NODE_HEIGHT}
          name="Log2"
          bActive={true}
          bDecision={false}
        />
      )
    },
    {
      id: 'node3',
      shape: 'react-shape',
      component: (
        <Log
          width={LOG_NODE_WIDTH}
          height={LOG_NODE_HEIGHT}
          name="Log3"
          bActive={false}
          bDecision={true}
        />
      )
    },
    {
      id: 'node4',
      shape: 'react-shape',
      width: LOG_NODE_WIDTH,
      height: LOG_NODE_HEIGHT,
      component: (
        <Log
          width={LOG_NODE_WIDTH}
          height={LOG_NODE_HEIGHT}
          name="Log4"
          bActive={false}
          bDecision={false}
        />
      )
    },
    {
      id: 'node5',
      shape: 'react-shape',
      width: LOG_NODE_WIDTH,
      height: LOG_NODE_HEIGHT,
      component: (
        <Log
          width={LOG_NODE_WIDTH}
          height={LOG_NODE_HEIGHT}
          name="Log5"
          bActive={true}
          bDecision={false}
        />
      )
    },
    {
      id: 'node6',
      shape: 'react-shape',
      width: LOG_NODE_WIDTH,
      height: LOG_NODE_HEIGHT,
      component: (
        <Log
          width={LOG_NODE_WIDTH}
          height={LOG_NODE_HEIGHT}
          name="Log6"
          bActive={true}
          bDecision={false}
        />
      )
    },
    {
      id: 'node7',
      shape: 'react-shape',
      width: LOG_NODE_WIDTH,
      height: LOG_NODE_HEIGHT,
      component: (
        <Log
          width={LOG_NODE_WIDTH}
          height={LOG_NODE_HEIGHT}
          name="Log7"
          bActive={true}
          bDecision={false}
        />
      )
    },
    {
      id: 'node8',
      shape: 'react-shape',
      width: LOG_NODE_WIDTH,
      height: LOG_NODE_HEIGHT,
      component: (
        <Log
          width={LOG_NODE_WIDTH}
          height={LOG_NODE_HEIGHT}
          name="Log8"
          bActive={true}
          bDecision={false}
        />
      )
    }
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
      attrs: {
        line: {
          stroke: 'blue'
        }
      },
      router: 'orth',
      connector: {
        name: 'rounded',
        args: {}
      }
    },
    {
      source: 'node1',
      target: 'node3',
      attrs: {
        line: {
          stroke: 'blue'
        }
      },
      router: 'orth',
      connector: {
        name: 'rounded',
        args: {}
      }
    },
    {
      source: 'node1',
      target: 'node4',
      attrs: {
        line: {
          stroke: 'blue'
        }
      },
      router: 'orth',
      connector: {
        name: 'rounded',
        args: {}
      }
    },
    {
      source: 'node2',
      target: 'node5',
      attrs: {
        line: {
          stroke: 'blue',
          router: 'orth'
        }
      },
      router: 'orth',
      connector: {
        name: 'rounded',
        args: {}
      }
    },
    {
      source: 'node2',
      target: 'node6',
      attrs: {
        line: {
          stroke: 'blue'
        }
      },
      router: 'orth',
      connector: {
        name: 'rounded',
        args: {}
      }
    },
    {
      source: 'node6',
      target: 'node7',
      router: 'orth',
      connector: {
        name: 'rounded',
        args: {}
      },
      attrs: {
        line: {
          stroke: 'blue'
        }
      }
    },
    {
      source: 'node7',
      target: 'node8',
      attrs: {
        line: {
          stroke: 'blue'
        }
      },
      router: 'orth',
      connector: {
        name: 'rounded',
        args: {}
      }
    }
  ]
};
export const initialState = {
  logs: layout.layout(MOCK_DATA)
};

export default function reducers(state = initialState, action: any) {
  switch (action.type) {
    case t.GET_LOG: {
      return state;
    }
    case t.GET_LOG_SUCCESS: {
      return state;
    }
    default:
      return state;
  }
}
