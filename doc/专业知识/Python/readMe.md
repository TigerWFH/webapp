# python 学习 <https://blog.csdn.net/chengmo123/article/details/89553349>

## lint 工具

- `默认是PyLint`
- `flake8：Python官方发布的一款静态代码检查工具`，需要手动安装 pip install flake8

## 格式化工具

- `默认是autopep8，默认是关闭`
- `ydfp，`手动安装 pip instal yafp

```json
{
  "python.linting.enabled": true,
  "python.linting.flake8Enabled": true,
  "python.formatting.provider": "yapf"
}
```

## shell

> 俗称壳，相对内核而言。接收用户输入的命令，然后调用相应的应用程序。同时它又是一种程序设计语言。作为命令语言，它交互式解释和执行用户输入的命令或者自动地解释和执行预先设定好的一连串的命令；作为程序设计语言，它定义了各种变量和参数，并提供了许多在高级语言中才具有的控制结构，包括循环和分支

- `Bourne shell, sh`
- `Bourne Again shell, bash`
- `Korn shell, ksh`
- `POSIX shell, bash`
- `C shell, csh`
- `chsh -s /usr/bin/bash, /usr/bin/zsh`

> bash 是一种脚本语言，zsh 本身也是一种脚本语言，是与 bash 是不兼容的。zsh 有一个仿真模式，在 bash 的仿真模式下，可以使用与 bash 相同的语法和命令，从而达到近乎安全兼容的目标。

- `zsh显式激活bash仿真模式：`emulate bash, emulate sh。必须手动 emulate sh 或者 emulate ksh，告诉 Zsh 对何种 Shell 进行仿真
- `profile用于login shell；**rc用于交互式shell`
- `zsh配置文件`
  > /etc/zshenv: 是 zsh 实例启动时加载的第一个配置文件
  >
  > /etc/zprofile
  >
  > /etc/zshrc
  >
  > /etc/zlogin
  >
  > /etc/zlogout

## python 安装问题

### 缺少 OpenSSL 头文件<https://github.com/pyenv/pyenv/issues/950>

> Mac OS X 10.13 (High Sierra) uses LibreSSL 2.2.7 but doesnt include the C headers necessary to compile the SSL extension for python.

## web 服务器、web 容器、web 应用服务器<https://www.cnblogs.com/vipyoumay/p/7455431.html>

> 关键字：cgi、fastcgi、servlet
>
> 传统技术中，动态的网页建立和显示都是通过 CGI 来实现的，但是，有了 Servlet,您可以大胆的放弃所有 CGI(perl?php?甚至 asp!)，利用 Servlet 代替 CGI,进行程序编写。<https://www.cnblogs.com/zengweiming/p/3758525.html>

> web 服务器，严格意义讲就是只负责处理 HTTP 协议的基本功能，能够监听端口，并接收请求发出响应的服务系统。例如 apache、nginx 等。不过实际上，很多 web 服务器出于某些考量，会内置针对特定语言的处理体系，例如 IIS 内置了 asp.net，appach 也可以通过拓展支持 php、rails 等，这些内置的模块就可以理解为 web 容器。如果 web 服务器不处理特别请求，可以通过 cgi 等方式转发给应用程序处理，例如 apache、nginx 都可以通过 fastcgi 将请求转发给应用程序，例如 php-form 服务、或 python 服务等等。
>
> 严格意义上讲，Web 服务器只负责处理 HTTP 协议，只能发送静态页面的内容。而 JSP、ASP、PHP 等动态内容需要通过 CGI、FastCGI、ISAPI 等接口交给其它程序处理。这个其它程序就是应用服务器。

- `CGI Common Gateway Interface`
- `web服务器web server, http server`
- `web容器 web container`: 可以部署应用程序（组件），并 RUN 应用程序（组件）的环境。
  > 容器管理组件的生命周期，向应用程序组件分派请求，并提供与上下文数据（如关于当前请求的信息）的接口
  - `Servlet容器：`
    - `Servlet：`属于 JavaEES 重要技术规范，构建了接收请求--调用 servlet 程序处理--返回响应的基本类型
    - `Servlet程序：`Java 提供了开发 Servlet 程序的 API，该 API 可以说是 Servlet 容器的一部分，对接应用程序（组件）与 Servlet 容器
    - `Java EE WEB规范：`包含了 Servlet、JSP、JavaWebSocket 等等技术
      > 完整的 JavaWeb 容器包含 Servlet 容器
  - `ASP容器：`
  - ``
- `应用服务器 application server, app server`

  > IIS web 服务器 web 容器
  >
  > Nginx web 服务器
  >
  > Apache web 服务器
  >
  > Tomcat web 服务器 web 容器
  >
  > Jetty web 服务器 web 容器
  >
  > WebSphere web 服务器 web 容器 web 应用服务器
  >
  > WebLogic web 服务器 web 容器 web 应用服务器

## Python 遇到的问题

### python 版本问题

```js
/*
    node        yarn && npm, lockfile
    php         composer, lockfile
    rust        cargo, lockfile
    ruby        bundler, lockfile

    python      pip && virtualenv/venv, 无lockfile
    python3.3之后，可以直接使用venv
    python      pipenv
 */
```

> Python2 和 3 有很大区别，MacOS 自 Catalina 10.15 Beta 以后，集成了 Python 和 Python3，为了不污染系统 Python 环境，推荐使用 pyenv 维护

- `pyenv`<https://github.com/pyenv/pyenv>
  > pyenv 拦截 python 命令，通过注入到 PATH 中的可执行的 shim，选择应用指定的 python 版本，并传递命令到正确的版本
  >
  > pyenv 在 PATH 前面插入路径：$(pyenv root)/shims:/usr/local/bin:/usr/bin:/bin
  >
  > 通过一个被称为 rehashing 工具，pyenv 在那个目录维护了 shims，用来匹配 python 命令
- `pyenv`识别版本的方式
  > PYENV_VERSION: 指定该环境变量
  >
  > 当前以及父目录下的.python-version 配置文件，可以通过 pyenv local 命令修改
  >
  > $(pyenv root)/version，pyenv global 命令修改
- `pyenv`安装的 python 所在目录
  > $(pyenv root)/versions/versionNo/python
- `pyenv安装`
  - `homebrew安葬`
    > brew update
    >
    > brew install pyenv
  - `github拉取项目安装`
    > 安装到$HOME/.pyenv 目录：git clone https://github.com/pyenv/pyenv.git ~/.pyenv
- `pyenv配置`
  > 定义 PYENV_HOME 环境变量，并加入到 PATH
  - `bash`
    > echo 'export PYENV_ROOT="$HOME/.env"' >> ~/.profile
    >
    > echo 'export PATH="$PYENV_HOME/bin:$PATH"' >> ~/.profile
    >
    > echo 'eval "$(pyenv init --path)"' >> ~/.profile
  - `zsh`加入到~/.zprofile
- `可以访问变量:`$(pyenv root)
- `安装python遇到的问题：部分版本会安装失败`
  - `BUILD FAILED (OS X 10.16 using python-build 20180424)`<https://github.com/pyenv/pyenv/issues/1643#issuecomment-687643468>
    > 配置了一大堆东西：export LDFLAGS="-L/usr/local/opt/zlib/lib"
    > export CPPFLAGS="-I/usr/local/opt/zlib/include"
    > export PKG_CONFIG_PATH="/usr/local/opt/zlib/lib/pkgconfig"
    > Export CFLAGS="-I/usr/local/opt/zlib/include;

### python 包管理工具：pip<https://pypi.org/project/pyenv/>

> 一般安装 python 会自动 pip 管理工具
>
> 安装 Pillow 遇到问题<https://try2explore.com/questions/11200764><https://github.com/python-pillow/Pillow/issues/1763><https://github.com/python-pillow/Pillow/issues/1412><https://pillow.readthedocs.io/en/stable/deprecations.html><https://github.com/python-pillow/Pillow/issues/1457><https://stackoverflow.com/questions/34631806/fail-during-installation-of-pillow-python-module-in-linux/34631976><https://stackoverflow.com/questions/34631806/fail-during-installation-of-pillow-python-module-in-linux/34631976#>

## python 包管理

> 一般包统一安装在/Users/admin/.pyenv/versions/3.6.0/lib/python3.6/site-packages，既 python 目录下的 site-packages 中
>
> xxx.egg-info 一般与 xxx 文件夹同时存在，一起来表示完整模块

## 安装第三方包

### 使用 pip 安装第三方库

> pip install packageName
>
> 安装成功：Successfully installed XXX
>
> 升级 pip：python -m pip
>
> 安装指定版本的依赖包：pip install mysqlclient==1.3.7

### 手动安装第三方库<https://www.lfd.uci.edu/~gohlke/pythonlibs/>

> 需要找对应 python 版本和系统版本的库
>
> 直接放到对应的 sit-packages 文件夹中。也可以通过 pip install 命令本地安装

### python 项目生成以来描述文件 requirements.txt

> 生成依赖描述文件
>
> pip freeze >requirements.txt
>
> 根据以来描述文件安装依赖
>
> pip install -r requirements.txt
>
> pip 查看已经安装的包以及版本:
>
> pip freeze package：在 requirements.txt 中生成版本描述
> pip list package：显示已安装的依赖列表
> pip show package：显示已安装的依赖信息

### python3 可用的 mysql 驱动包<https://stackoverflow.com/questions/4960048/how-can-i-connect-to-mysql-in-python-3-on-windows>

#### pip install mysql-connector-python<https://pypi.org/project/mysql-connector-python/>

> 纯 python，官方版，does not depend on MySQL C client libraries and implements the DB API v2.0

#### pip install PyMySQL<https://pypi.org/project/PyMySQL/>

> MySQL >= 5.6

#### pip install cymysql<https://pypi.org/project/cymysql/>

> It is a fork project from PyMySQL

#### pip install mysqlclient<https://pypi.org/project/mysqlclient/>

> This is a fork of MySQLdb1

#### MySQLdb<https://github.com/farcepest/MySQLdb1>

> 发布版本：https://pypi.org/project/MySQL-python/1.2.5/#history

### MySQLdb、mysqlclient、pymysql、mysql-connector-c

> MySQL-Python（MySQLdb） 只支持 python 2.X
>
> mysqlclient 是 MySQLdb 的一个分支，解决了 python3.x 的兼容问题。C 扩展模块，编译安装容易报错
>
> pymysql 纯 Python 实现，简单好用
>
> pymysql 和 mysqlclient 目前是 python 连接 mysql 的主流方式
>
> mysql-connector-c

#### MySQLdb 是对\_mysql 的封装，\_mysql 实现了 MySQL C API，只支持 Python3.4 以下版本

#### pymysql 是 Python3 以上用于连接 mysql 数据库的驱动

#### mysqlclient 是 MySQL-python 的分支，支持 Python3.3 以上版本

### 安装 mysqlclient 报错，版本不一致造成的问题

#### OSError: mysql_config not found（mysql_config 是 mysql 提供的二进制文件）

> 方案 1：yum install mysql-devel gcc gcc-devel python-devel(未验证)
>
> 方案 2：brew install mysql-connector-c; 在 bash_profile 中导出环境变量（未验证）
>
> export LDFLAGS="-L/usr/local/opt/openssl/lib"
>
> export CPPFLAGS="-I/usr/local/opt/openssl/inlcude"
>
> 进入到 mysql-connector-c/XXX/bin 中，找到 mysql_conf 文件，修改
>
> libs="-L$pkglibdir"
>
> libs="$libs -lmysqlclient -lssl -lcrypto"

#### 解决方案：安装 mysql，并在 PATH 配置 mysql

#### 配置 mysql 后，安装 mysqlclient==1.3.7 报错<https://stackoverflow.com/questions/12218229/my-config-h-file-not-found-when-install-mysql-python-on-osx-10-8>

> \_mysql.c:29:10: fatal error: 'my_config.h' file not found
>
> Description for this answer should read: "The default mysql package does not ship with the mysql header files, but the mysql-connector-c package does. Problem is, they overwrite the mysql command, so we first have to unlink the default package, then add the mysql-connector-c one, and then relink mysql again
>
> mysql-connector-c is not available anymore, it has been replaced with mysql-client.

## django 项目初始化目录结构

```js
/*
    mysite：django不关心这个名字
        manage.py // 命令行工具，用于管理django
        mysite/   //工程目录
            __init__.py // 包声明文件
            settings.py // Django的项目配置文件
            urls.py     // Django的URL声明文件
            wsgi.py     // 运行在WSGI兼容的web服务器上的入口
    启动项目：
        python manage.py runserver 8080

 */
```

### django settings

- `DJANGO_SETTING_MODULE`：环境变量，让 settings 模块被包含到 python 搜索目录内。部署服务器时必须的
- `INSTALLED_APPS`：APP 路径，
- `DATABASES`：数据库配置
- `STATIC_URL, STATICFILES_DIRS`：静态文件目录
- `STATIC_ROOT`：
- `MEDIA_ROOT`
- `MEDIA_URL`
- `AUTH_USER_MODEL`：用户表
- `MIDDLEWARE`：中间件
- `TEMPLATES`：指定模板的路径
- `WSGI_APPLICATION`：
- `ROOT_URLCONF`

### 模板语法

#### 模板变量（将 pyhton 代码计算的业务数据插入到模板 html）

```python
  # python视图代码
  from django.shortcuts import render

  def runoob(request):
    # 定义要注入到模板的数据
    views_dict = {"name": "monkey的小屋", "age": 18}
    return render(request, "runoob.html", views_dict)
```

```template
  {% for i, j in views_dict.items %}
  {{ i }} ---{{ j }}
  {% endfor %}
```

#### 模板继承

> 标签 block...endblock：父模板中的预留区域，用于填充内容。不可重复

```template
  {% block Name %}
  {% endblock Name %}
```

> 子模板使用 extends 继承父模板

```templates
  {% extends "父模板路径" %}

```

### ORM , Object Relation Map 模型，是一种为了解决面向对象和关系数据库不匹配的问题的技术

> ORM 解决的主要问题是对象和关系的映射，它通常讲一个类和一个表一一对应，类的每个实例对应表中的一条记录，属性对应字段
>
> ORM 提供了对数据库的映射，不用直接编写 SQL 代码，只需操作对象就能对数据库操作数据

### django models(就是 django 自带的 ORM), 是对数据库的抽象模型，

> 可以支持 mysql、oracle、postgresql、sqlite 等。 使用该 ORM 的 class 都必须是 models.Model 的子类
>
> python manage.py makemigrations: 该命令根据 models.py 的改动生成 SQL 语句
>
> python manage.py migrate: 该命令则执行生成的 SQL 语句

## Python 服务器

## Python 语法

> 每个 py 文件被称之为模块，具有**init**.py 文件的目录被称为包
>
> 只要包或模块所在的目录在 sys.path 中，就可以直接使用 import 导入包或模块
>
> 导入不同目录模块的办法：加入到搜索目录
>
> sys.path 是 python 的搜索模块的路径集，是一个 list。可以在 python 环境下使用 sys.path.append(path)添加相关的路径，但在退出 python 环境后，自己添加的路径就会自动消失了！

```python
    import sys
    sys.path.append('c:\xxx\b.py')
```

## 关于 homebrew<https://www.zhihu.com/question/22624898>

- `homebrew安装目录：`/opt/homebrew/
  > Homebrew 安装成功后，会自动创建目录 /usr/local/Cellar 或者 /opt/homebrew/Cellar 来存放 Homebrew 安装的程序，并在 /usr/local/bin 或 /opt/homebrew/bin 中创建符号链接，并将其加入 PATH。
  >
  > ln -s 源文件名称 软链接文件名称

> Homebrew 会将软件包安装到独立目录，并将其文件软链接至 /usr/local。Homebrew 不会将文件安装到它本身目录之外

- `brew:`
  > 是从下载源码解压然后 ./configure && make install ，同时会包含相关依存库。并自动配置好各种环境变量，而且易于卸载。
- `brew cask`
  > 是 已经编译好了的应用包 （.dmg/.pkg），仅仅是下载解压，放在统一的目录中（/opt/homebrew-cask/Caskroom），省掉了自己去下载、解压、拖拽（安装）等蛋疼步骤，同样，卸载相当容易与干净。这个对一般用户来说会比较方便，包含很多在 AppStore 里没有的常用软件
- `homebrew源修改`<https://www.jianshu.com/p/066b5d45fde6>

```js
/*
    # 替换brew.git:
 cd "$(brew --repo)"
# 中国科大:
git remote set-url origin https://mirrors.ustc.edu.cn/brew.git
# 清华大学:
git remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git

# 替换homebrew-core.git:
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
# 中国科大:
git remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git
# 清华大学:
git remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git

# 替换homebrew-bottles:
# 中国科大:
echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles' >> ~/.bash_profile
source ~/.bash_profile
# 清华大学:
echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles' >> ~/.bash_profile
source ~/.bash_profile

# 应用生效:
brew update

# 重置brew.git:
cd "$(brew --repo)"
git remote set-url origin https://github.com/Homebrew/brew.git

# 重置homebrew-core.git:
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://github.com/Homebrew/homebrew-core.git
*/
```

## MacOS 版本和名字

```js
/*
macOS Big Sur 11.4 
macOS Catalina 10.15  Beta 版(改版以后，集成了Python2和Python3，为了污染系统python环境，使用pyenv维护)
macOS Mojave 10.14.5
macOS High Sierra 10.13.6
macOS Sierra 10.12.6
OS X El Capitan 10.11.6
OS X Yosemite 10.10.5
OS X Mavericks 10.9.5
OS X Mountain Lion 10.8.5
OS X Lion 10.7.5
Mac OS X Snow Leopard 10.6.8
Mac OS X Leopard 10.5.8
Mac OS X Tiger 10.4.11
Mac OS X Panther 10.3.9
Mac OS X Jaguar 10.2.8
Mac OS X Puma 10.1.5
Mac OS X Cheetah 10.0.4
*/
```

## python web 框架

- `Django`
- `Flask`
- `web.py`

## WSGI(Web Server Gateway Inerface)是一种规范，定义了 python 编写的 web app 和 web server 之间的接口格式

## M1 安装 python 出错

### 解决方案 <https://stackoverflow.com/questions/66482346/problems-installing-python-3-6-with-pyenv-on-mac-os-big-sur>

> Python 3.9 is the first version of Python to have full support for Mac M1<https://stackoverflow.com/questions/66482346/problems-installing-python-3-6-with-pyenv-on-mac-os-big-sur>

#### Makefile 选项

- `CFLAGS：`表示 C 编译器的选项

  > CFLAGS： 指定头文件（.h 文件）的路径，如：CFLAGS=-I/usr/include -I/path/include
  >
  > CXXFLAGS 表示用于 C++ 编译器的选项

- `LDFLAGS：`LDFLAGS：gcc 等编译器会用到的一些优化参数，也可以在里面指定库文件的位置
  > 用法：LDFLAGS=-L/usr/lib -L/path/to/your/lib
- `LIBS：`告诉链接器要链接哪些库文件，如 LIBS = -lpthread -liconv

## M1 安装 pyenv 和 python 遇到问题

> M1 自带 2.7.16,brew 安装了 3.9.7
>
> pyenv 安装了 3.6.0，但是 pyenv global 3.6.0 无效，即 python --version 是 2.7.16
>
> pyenv 安装 3.9.4，pyenv global 3.9.4 有效，即 python --version 是 3.9.4
>
> 不确定是不是 python3.8 以上才完全支持 M1 的原因造成的

### M1 版本的 Python 支持问题

> 总结：M1 不适用 rosetta2 装换，可以无伤安装Python@3.9.1以上版本。可以使用补丁包安装部分低版本
>
> 补丁包地址<https://github.com/Homebrew/formula-patches/tree/master/python>
>
> python 发布了 3.9.1，该版本对 M1 芯片做了原生适配，是第一个 Universal 版<https://www.python.org/downloads/release/python-391/>
>
> 3.9.1 is the first version of Python to support macOS 11 Big Sur. With Xcode 11 and later it is now possible to build “Universal 2” binaries which work on Apple Silicon
>
> Python@3.5.1以前依赖openssl@1.0，Python@3.5.1之后，依赖openssl@1.1

- `hack手段在M1上安装低版本Python`<https://stackoverflow.com/questions/65653464/installation-of-earlier-versions-of-python-prior-to-3-8-fails-on-mac-with-m1-c>

### 缺少 zlib 问题

### The Python ssl extension was not compiled. Missing the OpenSSL lib<https://github.com/pyenv/pyenv/issues/950>

> pyenv 官方解决方案：<https://github.com/pyenv/pyenv/wiki/Common-build-problems#error-the-python-ssl-extension-was-not-compiled-missing-the-openssl-lib>
>
> @uber1geek the problem turned out to be the openssl hadn't actually successfully installed (even though homebrew reported that it had). run brew uninstall openssl && brew install openssl && CFLAGS="-I$(brew --prefix openssl)/include" LDFLAGS="-L$(brew --prefix openssl)/lib" pyenv install 3.6.2
>
> Mac OS X 10.13 (High Sierra) uses LibreSSL 2.2.7 but doesnt include the C headers necessary to compile the SSL extension for python. I know of no Apple-provided method to get them installed (via XCode or whatever else). To get this working without homebrew or any other shenanigans (assuming you have pyenv installed and working properly);

curl -O https://ftp.openbsd.org/pub/OpenBSD/LibreSSL/libressl-2.2.7.tar.gz
tar xvf libressl-2.2.7.tar.gz
CFLAGS="-I./libressl-2.2.7/include" pyenv install 3.6.3 (or whatever other version)
(post edit)
I believe that pyenv is supposed to install openssl as necessary on Mac OS X in order to make the whole pyenv install process work properly. That is probably the real issue here, but the above steps appear to work around the problem for now.

### OpenSSL EOL in homebrew<https://github.com/Homebrew/homebrew-core/issues/46454>

> 2019-12-31, OpenSSL 1.0 will EOL
>
> <https://stackoverflow.com/questions/66482346/problems-installing-python-3-6-with-pyenv-on-mac-os-big-sur>
>
> 安装文章<https://laict.medium.com/install-python-on-macos-11-m1-apple-silicon-using-pyenv-12e0729427a9>
>
> pyenv 官方<https://github.com/pyenv/pyenv>
>
> zlib 找不到，使用 xcode 提供的 zlib。但是特定版本以后，xcode 不再提供 zlib 的源文件<https://github.com/pyenv/pyenv/issues/1219>

### pyenv 安装了 3.6.0，但是 global 无效。global3.9.x 就有效

###
