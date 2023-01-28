# docker

> 镜像是 Docker 生命周期中构建打包阶段，容器是启动执行阶段

## 术语

> Docker 引擎（Docker 的客户端和服务端）
>
> Docker 镜像：是由文件系统叠加而成
>
> Docker 容器：容器是基于镜像启动起来的，容器中可以运行一个或多个进程。容器启动后，可以登录到容器中安装自己需要的软件或服务。
>
> Registry:
>
> 云计算服务

- `LaaS：Infrastructure as a service`基础设施既服务
- `PaaS：Platform as a service`平台即服务
- `SaaS：Software as a Service`软件既服务

> docker 把应用程序及其依赖打包在 image 文件里面。并通过 image 文件生成 docker 容器实例
> docker 启动创建一个容器（沙箱），从仓库获取镜像，并在容器中启动运行镜像

## `镜像(Image)`：只读

- `查看镜像：`docker images [imageName]
- `拉取镜像：`docker pull imageName:tag
- `查找镜像：`docker search imageName
- `创建镜像：`docker commit containerId username/registry
- `使用Dockerfile创建镜像：`
- `删除镜像：`docker rm imageName

- `基于已有镜像创建`
- `基于模板创建`
- `基于Dockerfile创建`：Docker 程序将读取 Dockerfile 中的指令生成指定镜像
  > Dockerfile 大致分为四部分：基础镜像信息，维护者信息，镜像操作指令，容器启动时执行指令
  - `Dockerfile指令`
    - `基础镜像信息：`FROM
    - `维护者信息：`MAINTAINER
    - `镜像操作指令`
    - `容器启动时指令`：CMD

## `容器(Container)`

> 在创建容器时，docker 会构建出一个镜像栈，在栈的最顶端添加一个读写层。这个读写层和下面的镜像层以及一些配置数据，就构成了一个容器

- `查看容器：`docker ps -la
- `重启容器：`docker start name/id
- `附着在容器上：`docker attach name/id

## `仓库(Repository)`，存放镜像的地方

## Dockerfile 指令

- `FROM`：设置基础镜像
- `MAINTAINER`：维护者信息
- `RUN`：构建镜像时运行的 shell 命令
- `ADD`：拷贝文件或目录到镜像中，URL 或压缩包会自动下载或解压
- `COPY`：拷贝文件或目录到镜像中，不支持自动下载和压缩
- `WORKDIR`：为 RUN、CMD、ENTRYPOINT 以及 COPY 和 AND 设置工作目录
- `VOLUME`：指定容器挂载点到宿主机自动生成的目录或其他容器
- `EXPOSE`：声明容器运行的服务端口
- `ENTRYPOINT`：启动容器时执行的 shell 命令，参数不会被覆盖
- `CMD`：启动容器时执行的 shell 命令
- `ENV`：设置环境内环境变量
- `USER`：为 RUN、CMD 和 ENTRYPOINT 执行 Shell 命令指定运行用户

## 参考资料

## dockerfile：文本文件，用来构建 docker 镜像的镜像文件，是由一系列命令和参数构成的脚本

```js
/*
// 克隆仓库
git clone demo-registory
cd demo
// 根目录创建.dockerignore文件，并增加内容
.git
node_modules
npm-debug.log
// 根目录创建DockerFile文件，并增加内容
FROM node:8.4 // 指定引擎
COPY . /app   // 将根目录所有文件拷贝进image文件的/app目录
WORKDIR /app  // 指定工作目录
RUN npm install --registry=https://registry.npm.taobao.org // 在/app目录下运行脚本命令
EXPOSE 3000   // 开放3000端口
*/
```

- `docker image build -t demo：根据DockerFile文件生成image文件`
- `docker container run：生成容器实例`

## image 文件，用来生成 docker 实例，生成的 docker 实例本身也是以文件形式存储，既容器文件

- `docker image pull library/hello-world：抓取image文件的命令。hello-world是image文件名`
- `docker image ls：查看image文件`
- `docker container run hello-world：从image文件生成一个容器实例`

```shell
    # 提供服务的docker
    docker container run -it ubuntu bash
    # 结束
    docker container kill [containerID]
```

## 容器文件

> Dockerfile------》image------》container
