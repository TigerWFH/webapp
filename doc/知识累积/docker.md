# docker

> docker 把应用程序及其依赖打包在 image 文件里面。并通过 image 文件生成 docker 容器实例

## 参考资料

## dockerfile：文本文件，用来设定 image 文件

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
