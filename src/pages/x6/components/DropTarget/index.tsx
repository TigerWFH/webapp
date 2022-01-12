import * as React from 'react';
import { useDrop } from 'react-dnd';
import styles from './index.module.scss';
import { v1 as uuid } from 'uuid';
import Immutable from 'immutable';
import * as t from '../types';
enum ITEM_TYPE {
  X6_DROP_TARGET = 'X6_DROP_TARGET'
}

interface IDropTargetProps {
  accept: string[]; // 可以接收的ITEM
  workbench?: React.ComponentClass<any, any> | React.FC<any> | any;
}

interface IInitialState {
  dataList: Immutable.List<t.IComponent>;
  edgeList: Immutable.List<any>;
  current: Immutable.Map<string, any>;
  configs: Immutable.Map<string, any>;
}

const initialState: IInitialState = {
  dataList: Immutable.List([]),
  edgeList: Immutable.List([]),
  current: Immutable.Map({}),
  configs: Immutable.Map({})
};

function reducers(state: any, action: any) {
  console.log('action=====>', state, action);
  const { type, payload } = action;
  const { dataList, current, configs } = state;

  switch (type) {
    case 'init': {
      // 回填数据
      const {
        dataList = [],
        edgeList = [],
        current = {},
        configs = {}
      } = payload;

      return {
        dataList: Immutable.List.isList(dataList)
          ? dataList
          : Immutable.List(dataList),
        edgeList: Immutable.List.isList(edgeList)
          ? edgeList
          : Immutable.List(edgeList),
        current: Immutable.Map.isMap(current)
          ? current
          : Immutable.Map(current),
        configs: Immutable.Map.isMap(configs) ? configs : Immutable.Map(configs)
      };
    }
    case 'drop': {
      return {
        dataList: dataList.push(payload),
        current: Immutable.Map(payload),
        configs
      };
    }
    case 'data': {
      return state;
    }
    case 'deleteData': {
      const { current, configs, dataList } = state;
      const { id: currId } = current;
      const newDataList = dataList.filter((data: any) => data.id !== currId);
      delete configs[currId];
      const newCurrent = newDataList[0];

      return {
        ...state,
        dataList: newDataList,
        current: newCurrent,
        configs: {
          ...configs
        }
      };
    }
    case 'edge': {
      return state;
    }
    case 'deleteEdge': {
      return state;
    }
    case 'current': {
      return {
        ...state,
        current: Immutable.Map(payload)
      };
    }
    case 'configs': {
      const { id, config } = payload;
      const prevConfig = configs[id] || {};
      return {
        ...state,
        configs: {
          ...configs,
          [id]: {
            ...prevConfig,
            ...config
          }
        }
      };
    }
    default:
      return state;
  }
}

function DropTarget(props: IDropTargetProps) {
  const [{ dataList, edgeList, current, configs }, dispatch] = React.useReducer(
    reducers,
    initialState
  );
  const initData = React.useCallback((payload) => {
    dispatch({
      type: 'init',
      payload
    });
  }, []);
  const setData = React.useCallback((payload) => {
    dispatch({
      type: 'data',
      payload
    });
  }, []);
  const deleteData = React.useCallback(() => {
    dispatch({
      type: 'deleteData'
    });
  }, []);
  const setEdge = React.useCallback((payload) => {
    dispatch({
      type: 'edge',
      payload
    });
  }, []);
  const deleteEdge = React.useCallback((payload) => {
    dispatch({
      type: 'deleteEdge',
      payload
    });
  }, []);

  const setCurrent = React.useCallback((payload) => {
    dispatch({
      type: 'current',
      payload
    });
  }, []);
  const setConfigs = React.useCallback((payload) => {
    dispatch({
      type: 'configs',
      payload
    });
  }, []);
  console.log('dropTarget=====configs====>', configs);

  const { workbench: Workbench, accept = [ITEM_TYPE.X6_DROP_TARGET] } = props;
  const [collectedProps, drop] = useDrop(() => {
    return {
      accept,
      drop: (item: t.IAnyObj, monitor: any) => {
        const id = uuid({
          node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
          clockseq: 0x1234,
          msecs: new Date().getTime(),
          nsecs: 5678
        });
        dispatch({
          type: 'drop',
          payload: {
            id,
            ...item
          }
        });
        return {};
      },
      collect: (monitor) => {
        return {
          demo: 'dropDemo'
        };
      }
    };
  });

  return (
    <div ref={drop} className={styles.droptarget}>
      <Workbench
        init={initData}
        dataList={dataList}
        setData={setData}
        deleteData={deleteData}
        edgeList={edgeList}
        setEdge={setEdge}
        deleteEdge={deleteEdge}
        current={current}
        setCurrent={setCurrent}
        configs={configs}
        setConfigs={setConfigs}
        {...collectedProps}
      />
    </div>
  );
}

export default DropTarget;
