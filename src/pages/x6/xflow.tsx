import React from 'react';
import {
  XFlow,
  XFlowCanvas,
  CanvasSnapline,
  CanvasNodePortTooltip,
  // NodeCollapsePanel,
  // CanvasScaleToolbar,
  // CanvasContextMenu,
  DagGraphExtension
} from '@antv/xflow';

/** app 组件配置  */
/** 配置画布 */
// import { useGraphHookConfig } from './xflow/config-graph';
/** 配置Command */
// import { useCmdConfig } from './xflow/config-cmd';
/** 配置Model */
// import { useModelServiceConfig } from './xflow/config-model-service';
/** 配置Menu */
// import { useMenuConfig } from './xflow/config-menu';
/** 配置Toolbar */
// import { useToolbarConfig } from './xflow/config-toolbar';
/** 配置快捷键 */
// import { useKeybindingConfig } from './xflow/config-keybinding';
/** 配置Dnd组件面板 */
// import * as dndPanelConfig from './xflow/config-dnd-panel';
/** 配置JsonConfigForm */
/*
graphHooksConfig: 
modelServiceConfig:
commandConfig:
*/

interface IXflowDemo {
  graphData: any;
}
function XflowDemo(props: IXflowDemo) {
  const appRef = React.useRef(null);
  // const { meta } = props;
  // const graphHooksConfig = useGraphHookConfig(props);
  // const toolbarConfig = useToolbarConfig();
  // const menuConfig = useMenuConfig();
  // const cmdConfig = useCmdConfig();
  // const modelServiceConfig = useModelServiceConfig();
  // const keybindingConfig = useKeybindingConfig();

  const onLoad = async (app: any) => {
    appRef.current = app;
    console.log('onLoad===>', app);
  };
  return (
    <div>
      <XFlow
        className="dag-user-custom-clz"
        // hookConfig={graphHooksConfig}
        // modelServiceConfig={modelServiceConfig}
        // commandConfig={cmdConfig}
        onLoad={onLoad}>
        <DagGraphExtension />
        <XFlowCanvas position={{ top: 40, left: 230, right: 290, bottom: 0 }}>
          {/* <CanvasScaleToolbar position={{ top: 12, right: 12 }} /> */}
          {/* <CanvasContextMenu config={menuConfig} /> */}
          <CanvasSnapline color="#faad14" />
          <CanvasNodePortTooltip />
        </XFlowCanvas>
      </XFlow>
    </div>
  );
}

export default XflowDemo;
