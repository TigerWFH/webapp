/*
    DragTarget为Workbench提供统一的数据模型
*/

type Text = string | number;

export interface IAnyObj {
  [name: Text | symbol]: any;
}

export interface setFn<T> {
  (data: T): void;
}

export interface setConfig<T> {
  (name: string, value: T): any;
}

// 展示组件数据
export interface IComponent extends IAnyObj {
  id: Text; // 组件示例绑定的数据id，具有唯一性
  componentType: string; // 组件类型
  displayName: string; // 组件名称
  setDataList: setFn<IComponent[]>; // 处理数据，删除操作
  setCurrent: setFn<IComponent>; // 选中操作组件
  //   [name: string]: any; // 根据DnD存储的Drop状态计算的一些属性，包括实时预览的配置属性
}

// 配置组件
export interface IConfig extends IAnyObj {
  id?: Text; // 组件示例绑定的数据id，具有唯一性，打点考虑
  componentType?: string; // 组件类型，打点考虑
  displayName?: string; // 组件名称，打点考虑
  setConfig: setConfig<IAnyObj>;
}

// Dnd中的Item数据
export interface IMetaData {
  type: Text;
  data: IComponent;
}

// 工作台统一接口
export interface IWorkbench {
  dataList: IComponent[]; // 数据集合
  setDataList: setFn<IComponent[]>;
  current: IComponent; // 当前选中数据
  setCurrent: setFn<IComponent>;
  configs: IAnyObj; // 所有节点对应的配置项数据
  setConfig: setFn<IAnyObj>;
  [name: string]: any; // 根据DnD存储的Drop状态计算的一些属性
}
