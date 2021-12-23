# DropTarget

> 包装拖拽容器，并提供 Drop 操作的状态
> 管理拖拽生成的数据
> 渲染不同的画布

## DnD 的 Item

- `Item.type：`Dnd 中用于 source 和 target 对应的必传参数
- `Item.item：`Ddn 中要传递的数据

```ts
interface IDndItem {
  type: string | symbol;
  item: IComponent;
}
```

## 组件接口数据，既 Dnd 中传递数据的类型

```ts
    interface IComponent {
        id: string | number; // 应用内唯一性
        componentType: string; // 组件类型
        config: {[name: string]: any}: // 组件配置数据
    }
```
