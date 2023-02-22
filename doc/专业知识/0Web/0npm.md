# npm

## package-lock.json 文件结构

> 和 npm 的版本有关

### 基本字段

- `name`：package-lock.json 所属包名字，match 同目录的 package.name
- `version`：package-lock.json 所属包版本，match 同目录的 package.version
- `lockfileVersion`：lock 文件版本，npm 追踪数据使用
- `packages`：包位置到包信息的映射对象
  - `version`
  - `resolved`
  - `integrity`
  - `link`
  - `dev`
  - `inBundle`
  - `hasInstallScript`
  - `hasShrinkwrap`
  - `bin`
  - `engine`
- `dependencies`：lockfileVersion: 1 使用的数据

## monorepo and multirepo

> 但仓库多包
>
> 多仓库多包

### yarn workspace

### lerna

#### lerna 命令

- `bootstrap：`安装依赖，同时处理依赖项的软连接
  - `--hoist：`公共依赖提升
- `list：`查看本地包列表
- `clean：`删除安装依赖
- `link：`建立软链接
- `publish：`发布安装包
- `changed：`待发布包列表

[lerna]()

### Pants 构建系统(Twitter)

[pants](https://github.com/pantsbuild/pants)
