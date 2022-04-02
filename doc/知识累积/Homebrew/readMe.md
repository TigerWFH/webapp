# homebrew

> Mac (Linux)的软件包管理工具

## homebrew 安装

> /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

## homebrew 安装位置

> /usr/local/Homebrew(会在/usr/local/bin/ 建立软连接)
> /opt/homebrew was chosen to allow installations in /opt/homebrew for Apple Silicon and /usr/local for Rosetta 2 to coexist and use bottles.

## homebrew 安装软件包位置(同目录下的 Cellar，/usr/local/Cellar)

> Homebrew 会将软件包安装到独立目录，并将其文件软链接至 /usr/local
> Homebrew 不会将文件安装到它本身目录之外，所以您可将 Homebrew 安装到任意位置
> Homebrew Cask 安装 macOS 应用程序、字体和插件以及其他非开源软件
> 安装的可执行文件会在/usr/local/bin 下建立软连接，所以/usr/local/bin 在 PATH 目录既可以
> brew 本身也会在/usr/local/bin 下建立自己的软连接

```plain
    brew install --cask firefox
    brew create --cask foo
```

## 升级 homebrew

> brew update

## homebrew 行间明林

- `brew install pkg`安装
- `brew uninstall pkg`卸载
- `brew search pkg`查找
- `brew list`查看安装软件
- `brew list`查看安装软件
- `brew outdated`查看过时的软件
- `brew upgrade pkg`更新所有包或特定包
- `brew info pkg`显示包信息
- `brew pin pkg`终止包升级
