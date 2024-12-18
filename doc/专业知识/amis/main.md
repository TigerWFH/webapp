# amis

## 渲染器类型

- `Renderer`：常规组件渲染器注册函数
- `FormItem`：标单项渲染器注册函数
- `OptionsControl`：标单项选择器渲染器注册函数

## 源码中的一部分内容

- `scoped`：实例管理器
- `rootStore：RendererStore`：store 管理器
- `store`：组件对应状态

## 关于 amis 中的 store

> amis 中使用了 mobx-state-tree

### HocStoreFactory

```typescript
interface IRendererConfig {
  storeType: string;
  extendsData?: boolean | ((props: any) => boolean);
  shouldSyncSuperStore?: (
    store: any,
    props: any,
    prevProps: any
  ) => boolean | undefined;
}

HocStoreFactory(renderer: IRendererConfig): any // 返回组件StoreFactory
```

### StoreFactory

> extendsData：从 config.extendsData 获取

- RootRenderer 会从 props 获取 data，这个 data 是 env 中的 data，并初始化 topStore.data、context（就是 scopedContext）
- RootRenderer 将 topStore 的 data 作为 props.data 下发
- SchemaRender 会从 schema 中读取 data 数据，并作为 defaultData 下发

### 具备数据域的组件

- App
- Page--->ServiceStore
- Cards
- Chart
- CRUD
- CRUD2
- Dialog
- Drawer
- List
- PaginationWrapper
- Service
- Wizard
- Combo
- InputArray
- Table
- Table2

## amis-formula

### token

> 词

### ASTNode

- type 取值范围=[document, variable, ns-variable, script, getter, raw, document, object, arg-list, expression-list, array, func_call, literal, identifier, template, template_raw, string, unary, conditional, mixed, ]

### lexer

> 分词工具

### parse

> 语法分析工具

### evalutor

> 求值工具
