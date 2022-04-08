# github actions

## name：可选，github 选项卡中展示的名字

## on：指定当前 workflow 的触发器

```yaml
name: 'XXX' # 可选，展示在github的actions选项卡中
on: [push] # 指有代码push时，触发当前workflow
jobs:
  XXXJobs: # 定义名为XXX的job
    run-on: ubuntu-latest #将作业配置为在最新版本的 Ubuntu Linux 运行器上运行
    steps: # 将 XXX 作业中运行的所有步骤组合在一起。 此部分下嵌套的每项都是一个单独的操作或 shell 脚本。
      - use: actions/checkout@v3 # uses 关键字指定此步骤将运行 actions/checkout 操作
      - use: actions/setup-node@v3 # 安装指定版本的node
        with:
          node-version: 14
      - run: npm install -g bats # run 关键字指示作业在运行器上执行命令
      - run: bats
```

## github pages

> 两种基本类型：项目页面类型、用户与组织页面类型

### 项目页面类型

> 项目页面站点的文档文件（静态资源）和项目是在同一个 github 仓库中，文档文件（静态资源）可以是在以下几个位置
>
> main 分支（根目录）、gh-pages 分支（根目录）、main 分支的 docs 目录中，需要有一个首页文档，可以是 README.md 或 index.html

- `个人项目站点：`https://<usename>.github.io/<projectname>
- `组织项目站点：`https://<orgname>.github.io/<projectname>

### 个人与组织类型

> 用户与组织页面站点的文档文件放在一个独立的项目的 master 分支上，并且项目仓库名称必须遵循以下规则
>
> 如果你创建的是用户页面站点，则 Github 仓库名称为<username>.github.io
>
> 如果你创建的是组织页面站点，则 Github 仓库名称为<orgname>.github.io

- `个人站点：`https://<usename>.github.io
- `组织站点：`https://<orgname>.github.io
