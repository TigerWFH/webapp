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
