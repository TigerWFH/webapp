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
