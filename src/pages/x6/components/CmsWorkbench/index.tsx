import * as React from 'react';
import { Form } from 'antd';
import { Background, BackgroundConfig } from '../Background';
import { Alert, AlertConfig } from '../Alert';
import { WfhInput, WfhInputConfig } from '../WfhInput';
import { WfhInputNum, WfhInputNumConfig } from '../WfhInputNum';
import { WfhSelect, WfhSelectConfig } from '../WfhSelect';
import { WfhTable, WfhTableConfig } from '../WfhTable';
import styles from './index.module.scss';

import * as t from '../types';
// 不需要渲染实体的组件
const WITHOUT_RENDER_COMPONENTTYPE_LIST = ['background'];

interface ICmsWorkbench extends t.IWorkbench {}

const MOCK_MAP = new Map<string, React.ComponentClass | React.FC<any>>([
  [Background.componentType, Background],
  [Alert.componentType, Alert],
  [WfhInput.componentType, WfhInput],
  [WfhInputNum.componentType, WfhInputNum],
  [WfhSelect.componentType, WfhSelect],
  [WfhTable.componentType, WfhTable]
]);

const MOCK_MAP_CONRIG = new Map<string, React.ComponentClass | React.FC<any>>([
  [Background.componentType, BackgroundConfig],
  [Alert.componentType, AlertConfig],
  [WfhInput.componentType, WfhInputConfig],
  [WfhInputNum.componentType, WfhInputNumConfig],
  [WfhSelect.componentType, WfhSelectConfig],
  [WfhTable.componentType, WfhTableConfig]
]);

function CmsWorkbench(props: ICmsWorkbench) {
  const {
    dataList = [] as t.IComponent[],
    deleteData,
    current = {} as t.IComponent,
    setCurrent,
    configs = {} as t.IAnyObj,
    setConfigs
  } = props;
  const {
    id: currId,
    componentType: currComponentType,
    displayName: currDisplayName
  } = current;

  console.log('cmsworkbench====>', props);

  const [{ bPreview, bPhone }, dispatch] = React.useReducer(
    (state: any, { type = '', payload = false }) => {
      switch (type) {
        case 'preview': {
          return {
            ...state,
            bPreview: payload
          };
        }
        case 'phone': {
          return {
            ...state,
            bPhone: payload
          };
        }
        default:
          return state;
      }
    },
    {
      bPreview: false,
      bPhone: false
    }
  );

  let Config: any = MOCK_MAP_CONRIG.get(currComponentType);
  const currConfig: any = React.useRef(null);
  const config = configs[currId] || {};
  const bgStyle: any = {};
  if (config.color) {
    bgStyle.backgroundColor = config.color;
  }
  if (config.image) {
    bgStyle.backgroundImage = config.image;
  }

  function setConfig(name: string, value: any) {
    setConfigs({
      id: currId,
      config: {
        [name]: value
      }
    });
  }

  function onDelete() {
    deleteData();
  }

  function onPreview() {
    dispatch({
      type: 'preview',
      payload: true
    });
  }

  function onPhone() {
    dispatch({
      type: 'phone',
      payload: !bPhone
    });
  }

  function onSave() {
    if (currConfig) {
      currConfig.current?.form.validateFields();
      console.log('workbench-config====>', config);
    }
  }

  return (
    <div className={styles.cmsworkbench}>
      <div className={styles.toolbar}>
        <div className={styles.toollist}>
          <div onClick={onPhone} className={bPhone ? styles.active : ''}>
            手机
          </div>
          <div onClick={onPreview}>预览</div>
        </div>
        <div className={styles.business}>
          <div className={styles.save} onClick={onSave}>
            保存
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.workbench} style={bgStyle}>
          <div className={bPhone ? styles.phone : styles.pc}>
            {/* {dataList.map((component: any, index: number) => {
              const { componentType = '', id } = component;
              if (WITHOUT_RENDER_COMPONENTTYPE_LIST.includes(componentType)) {
                return null;
              } else {
                const Component = MOCK_MAP.get(componentType);
                const savedConfig = configs[id];
                return Component ? (
                  <div
                    className={styles.unit}
                    key={`${component.componentType}-${index}`}
                    onClick={() => setCurrent(component)}>
                    {currId === id ? (
                      <div className={styles.delete} onClick={onDelete}>
                        删除
                      </div>
                    ) : null}
                    <div className={styles.component}>
                      <Component {...savedConfig} />
                    </div>
                  </div>
                ) : null;
              }
            })} */}
          </div>
        </div>
        <div className={styles.config}>
          {Config ? (
            <Config
              key={currId}
              ref={currConfig}
              componentType={currComponentType}
              displayName={currDisplayName}
              config={config}
              {...config}
              setConfig={setConfig}
            />
          ) : null}
        </div>
      </div>
      {bPreview ? <div className={styles.preview}>preview</div> : null}
    </div>
  );
}

export default CmsWorkbench;
