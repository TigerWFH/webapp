import * as React from 'react';
import { useDrop } from 'react-dnd';
import styles from './index.module.scss';
import { v1 as uuid } from 'uuid';
import * as t from '../types';
enum ITEM_TYPE {
  X6_DROP_TARGET = 'X6_DROP_TARGET'
}

interface IDropTargetProps {
  accept: string[]; // 可以接收的ITEM
  workbench?: React.ComponentClass<any, any> | React.FC<any> | any;
}

const initialState = {
  dataList: [] as t.IComponent[],
  current: {} as t.IComponent,
  configs: {} as t.IAnyObj
};

function reducers(state: any, action: any) {
  console.log('action=====>', state, action);
  const { type, payload } = action;
  const { dataList, current, configs } = state;

  switch (type) {
    case 'drop': {
      return {
        dataList: [...dataList, payload],
        current: payload,
        configs: {
          ...configs
        }
      };
    }
    case 'delete': {
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
    case 'current': {
      return {
        ...state,
        current: payload
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
  const [{ dataList, current, configs }, dispatch] = React.useReducer(
    reducers,
    initialState
  );
  // 改变dataList
  const deleteData = React.useCallback(() => {
    dispatch({
      type: 'delete'
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
        dataList={dataList}
        deleteData={deleteData}
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
