# UMI

## UMI 运行时配置，跑在浏览器端

## UMI 插件

### @umijs/preset-react

> 针对 react 应用的插件集，包含

- `plugin-access：`权限管理
- `plugin-analytics：`统计管理
- `plugin-antd：`整合 antd UI 组件
- `plugin-crossorigin：`通常用于 JS 出错统计
- `plugin-dva：`整合 DVA
- `plugin-helmet：`整合 react-helmet，管理 HTML 文档标签
- `plugin-initial-state：`初始化数据管理
- `plugin-layout：`配置启用 ant-design-pro 的布局
- `plugin-locale：`国际化能力
- `plugin-model：`基于 hooks 的简易数据流
- `plugin-request：`基于 umi-request 和 umi-hooks 的 http 方案

### @umijs/plugin-model

> 一种基于 hooks 范式的简易数据管理方案（部分场景可以取代 dva），一般用于全局共享数据。
>
> 自定义 hooks 是 stateful logic 的利器，但是不能服用 state。和 react 内置 hooks 一样，每次调用产生的状态都是相互隔离、无关的。此时就可以考虑使用@umijs/plugin-model

- `启用方式：`src/models 目录下有 hooks model 时启用
  > 约定 src/models 目录下的文件为项目定义的 model 文件。每个文件需要默认导出一个 function，该 function 定义了一个 hook。

```js
// src/models/useUser.js
const useUser = () => {
  const [current, setCurrent] = useState({});

  return {
    current,
    setCurrent
  };
};

export default useUser;
```

- `消费model方式：`使用 useModel(namespace, updater)
  - `namespace：`就是 hooks model 文件的文件名，例如 useUser
  - `updater：`可选，部分更新

```js
import { useModel } from 'umi';

export default () => {
  const { user, fetchUser } = useModel('user', (model) => ({
    user: model.user,
    fetchUser: model.fetchUser
  }));

  return <>Hello</>;
};
```

### @umijs/plugin-initial-state

> 约定一个地方，生产和消费初始化数据
>
> 插件需要搭配@umijs/plugin-model 一起使用

- `运行时配置：`

```js
export async function getInitialState() {
  // 返回一个Promise对象
  // 可以通过useModel('@@initialState')获取该返回值的副本
  const result = await getData();
  return data;
}
```

- `启用方式：`有 src/app.ts 且导出 getInitialState
- `消费model方式：`

```js
import { useModel } from 'umi';
const { initialState, loading, error, refresh, setInitialState } =
  useModel('@@initialState');
```

### @umijs/plugin-request

> 基于 umi-request 和 ahooks 提供了一套统一的网络请求和错误处理方案
```typescript
// 统一的接口
interface ErrorInfoStructure {
    
}
```

- `启用方式：`默认启用
- `构建时配置`
- `运行时配置`
- `API:useRequest`
