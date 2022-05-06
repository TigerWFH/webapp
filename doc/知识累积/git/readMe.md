# git 版本控制系统（SVN、CVS）

## git、github、gitlab

> github 和 gitlab 都是基于 web 的 git 仓库

> github 是开源代码仓库，但也提供私有仓库服务

> gitlab 可以自建私人仓库，开源的 git 仓库管理软件。可以搭建本地服务器

## git

### git commadns

- `git merge：`将一个分支的更改集成到另一个分支上
  > git merge 是一种非破坏性操作
  >
  > git merge 会产生一个 merge commit 记录，并且保留所有分支的 commit 记录
  >
  > fast forward：fast forward 模式，快速合并，看不出做过合并。 不会显示 feature，只保留单条分支记录
  >
  > --no-ff 模式，普通合并，可以保存之前的分支历史。能够更好的查看 merge 历史，以及 branch 状态。会生成一个新的 commit-id
  >
  > git 默认操作：如果从当前分支 master 和目标分支 feature 没有分叉，那么 git 会使用 fast forward 的方式来完成 merge 操作。
- `git rebase`
- `git log`
- `git reflog`

### git submodule

### git 配置

> git 使用 git config 命令管理配置文件

- `全局配置文件: /etc/gitconfig`，git config --system
- `用户配置文件: ~/.gitconfig或者~/.config/git/config`，git config --global
- `仓库配置文件: .git/config`，git config --local

### git：是一个内容寻址文件系统，核心就是一个简单的键值对数据库（key-value data store）。可以插入任意类型的内容，会返回一个 40 位字符串键，通过该 40 字符串可以在任意时刻再次检索该内容

> Git 保存是一系列不同时刻的快照

> Git 对文件版本的管理概念确实以每次提交作为一次快照，提交时对所有文件做一次 <a>全量快照</a>，然后存储快照引用

- `文件系统：`就是一个树状结构，存储目录或文件
- `文件描述符：`一个描述文件的结构体或格式化数据（系统的抽象概念，用来组织管理数据）

```js
/*
        文件存储涉及知识点：

            数据块描述结构序列（数据块描述结构体的集合）: [描述结构1, 描述结构2, 描述结构3,...]

            数据块描述结构体: {数据块指针, 数据块长度, 数据修改时间, ...}

            磁盘存储的数据块（数据实际物理存储）: [数据1, 数据2, 数据3, ...]
    --------------------------
    每个文件都存储自己的 数据块描述结构体序列，这个序列中的每一个结构体都有一系列信息描述了该文件的某一个数据块，并提供了指向该数据块地址的指针以至于你能找到并使用这个数据块
    */
```

- `文件备份（Duplicate）:`文件数据级别的赋值存储，即数据块会被复制一遍
- `文件快照（Snapchat）:`备份文件的数据描述结构序列，而不是文件本身。所谓快照，就是读取文件的数据块描述结构序列，然后 copy 一份在内存中，然后把内存中的序列 copy 变成文件放到磁盘上，这个文件就是所谓的“快照文件”了，下一次想要恢复文件数据的时候，把这个序列替换那个文件的数据块描述结构序列就行了！真是对文件“定格”的优雅实现啊！
  [快照理解](https://blog.csdn.net/weixin_40085040/article/details/109061495)
- `对比：备份是复制了所有的文件数据块，而快照则是复制了文件的数据块描述结构序列`

### git 存储模型

```js
/*
        Svn：以文件为维度，记录每个文件在每个版本下的delta改变
        Git：以每次提交为一次快照，提交时对所有文件做一次全量快照，然后存储快照引用
        Git存储层，如果文件数据没有改变，Git只是存储指向源文件的一个引用，并不会多次存储文件
    */
```

### 内容寻址：根据内容唯一标识检索内容的操作，就是内容寻址

### 工作流 workflow

```js
/*
        一些命令：
            git init [projectName]：新建Git代码仓库
            git clone：克隆一个Git代码仓库
            git config --list：显示Git仓库配置
            git config -e [--global]：编辑Git配置文件
            git config [--global] user.name ""：配置信息
            git config [--global] user.emal ""：配置信息
            git branch：列出所有本地分支
            git branch -r：所有远程分支
            git branch -a：所有本地和远程分支
            git branch [branchName]：新建分支
            git branch -b [branchName]：新建并切换到分支
            git branch --track [branch] [remote-branch]：新建一个分支，与指定的远程分支建立追踪关系
            git branch -d [branch]：删除分支
            git push origin --delete [branch]：删除远程分支
            git checkout [branchName]：切换到指定分支，并更新工作区
            git checkout -：切换到最近切换过的分支
            git cherry-pick [commit]：选择一个commit合并进当前分支
            git status：显示有变更的文件
            git log：显示当前分支的版本历史
            git blame：显示指定文件时什么人什么时间修改过
            git diff：显示暂存区和工作区的差异
            git diff --shortstat "@{0 day ago}"：显示今天写了多少行代码
            git show：显示某次提交的元数据和内容变化
            git reflog：显示当前分支的最近几次提交
        一、工作区(workspace)：当前工作空间，本地文件夹下可见的文件结构
            // 增
            git add [file] [file]...：添加指定文件到暂存区
            git add [dir]：添加指定目录到暂存区
            git add .：添加当前目录的所有文件到暂存区
            // 删
            git rm [file1] [file2]...：删除工作区文件(删文件操作，非撤销修改操作)，并且将本次删除放入缓存区
            git rm --cached [file]：停止追踪指定文件，该文件会保存在工作区
            // 改
            git mv [file-origin] [file-renamed]：修改文件名，并加入暂存区
            // 撤销操作
            git checkout --（注意--）：
        二、暂存区(index)：文件暂时存放的地方。暂存区的文件将随着一个commit一起提交到local repository
            git reset HEAD(HEAD表示最新版本)：将暂存区的修改撤销，重新放回工作区
            git reset --hard commit_id(git reset --hard HEAD^)：回退版本
            git revert：
            
            git commit -m [message]：提交暂存区到仓库
            git commit [file1] [file2]... -m [message]：提交暂存区指定文件到仓库
            git commit -a：提交工作区自上次commit之后的变化直接到仓库
            git commit -v：提交时显示所有diff信息

        三、本地仓库(local repository)：分布式仓库
            git fetch:下载远程仓库的所有变动
            git pull:取回远程仓库的变化，并与本地分支合并
            git merge [branch]:合并指定分支到当前分支
            git rebase:
            git push:
        四、远程仓库(remote repository)：中心仓库

            git revert：
            git stash：
            git stash pop：
            git archive：
    */
```

### .git 目录结构：git 是分布式，在本地有一个完整的 git 仓库，即.git 文件目录<https://git-scm.com/book/en/v2/Git-Internals-Plumbing-and-Porcelain#ch10-git-internals>

- `创建git仓库的方法`
  - `git init：创建一个git仓库，`会生成.git 目录，存放了 git 仓库所需信息。此时，还没有 track 任何文件
  - `git clone：克隆一个git仓库，`也会 initializes a .git directory, 并拉取所有的数据

> HEAD, config, description, hooks/, index, info/, logs/, objects/, packed-refs, refs/

#### git init 生成的.git 目录

```js
/*
.git(git版本不同，还会有其它内容，但是以下内容是基础)
    config: 指定项目特殊配置
    description: 仅用于getweb program
    info/保存了.gitignore内容，不希望被git管理的文件
    -----git core----------
    HEAD: 当前分支的commit SHA1值
    index: 存放暂存区内容
    hooks/
    objects/：存储所有的跟踪文件内容
    refs/：存储 git 本地以及远程仓库分支的引用，以及标签应用
    -----others-----
    COMMIT_EDITMSG：租后一次commit message
    FETCH_HEAD：记录每个分支fetch的commit SHA1值
    ORG_HEAD: 远程分支最后一个Commit SHA1值
    branches：
    logs/：分支日志
    packed-refs: 将refs目录下文件打包到一个文件，一般是每个分支最后一个修改集
*/
```

### Git 中的对象

#### blob：用于存储单个文件的内容，一般是二进制数据文件

#### tree：对应文件系统化的目录结构，里面主要有子目录(tree)，文件列表(blob)

```js
/*
        tree对象，对应文件系统化的目录结构
        -----------------------------
        目录
            文件
            目录
                文件
                目录
                    ...
        -----------------------------
        文件类型：
            1000   regular file
            1010   symbolic link
            1110   gitlink
            040    dir
        -----------------------------
        文件权限：
            000
            755
            644
        -----------------------------
        文件类型 权限     对象类型       SHA1      对象名
        100     644      blob
    */
```

#### commit：一次修改的集合，当前所有修改的文件的一个集合。是修改过的文件集的一个快照

```js
/*
        commit对象包含内容：
            tree：本次commit包含的tree的SHA
            parent：本次commit的父节点，多个之间用空格隔开
            author：作者
            committer：本次commit的人
               commit message
    */
```

#### tag：是一个固化的分支，不可以变更，但可以删除。tag 只会关联当时版本库中最后一个 commit 对象。

```js
/*
        tag对象包含内容：
            object：指向commit对象的SHA-1值
            type：commit
            tag：tagName
            tagger：本次打标签的人
                tag message
    */
```

```js
/*
        了解git对象需要使用如下命令
        git cat-file -p 对象 hash值：查看对象的内容
        git cat-file -t 对象 hash值：查看对象的类型
        git ls-files --state查看index文件的内容
        git hash-object查看文件的hash值
    */
```

[git 详解](http://shafiul.github.io/gitbook/7_the_packfile.html)

## gitlab

### 本地建立 gitlab 服务

### gitlab 权限

> role permission：根据用户在特定组或项目中的访问级别，具有不同的能力。如果用户既在组中又在项目中，则使用两者中较高的那个权限级别

> 个人理解：管理员登录 gitlab 系统。添加用户，添加工作组。将用户添加到对应的工作组并赋予权限。拥有组权限，拥有项目权限（待实践验证？？？？？？）

- `VisibilityLevel`
  - `Private：私有，只有属于该项目成员才能查看`
  - `Internal：内部，用gitlab账号都可以clone`
  - `Public：公开，任何人可以clone`
- `gitlab角色权限`
  - `Guest：创建issue（事务）、评论`
  - `Reporter：克隆代码`
  - `Developer：提交代码、push仓库`
  - `Master(Maintainer)：创建项目、添加tag、保护分支、添加项目成员`
  - `Owner：设置项目访问权限（VisibilityLevel）、删除项目、迁移项目`
- `组成员权限`
  - `浏览组：Guest、Reporter、Developer、Maintainer（Master）、Owner`
  - `编辑组：Owner`
  - `创建项目：Maintainer、Owner`
  - `管理组成员：Owner`
  - `移除组：Owner`
