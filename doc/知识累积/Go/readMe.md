# Go

[Go 指南](https://github.com/unknwon/the-way-to-go_ZH_CN/blob/master/eBook/directory.md)
[入门](https://tour.go-zh.org/list)
[文档](https://go-zh.org/doc/)
[语言规范](https://go-zh.org/ref/spec)
[代码阻止方式](https://go-zh.org/doc/code.html)
[更多特性](https://tour.go-zh.org/concurrency/11)

## go 源码构建（https://www.yuanmomo.net/2019/08/12/v2ray-init-dev-env/）

## 讨论思路:带着问题、分析、方案来讨论(https://www.gitmemory.com/issue/v2ray/v2ray-core/2541/639397815)

1. 当前存在 xx 问题，新的 xx 实现有 xx 特性，可以解决/规避上述问题。
2. 当前缺失 xx 需求，这个需求有 xx 应用场景，增加 xx 功能可以满足该需求。
3. 我认为 xx 提出来的方案 x 中第 x 点，存在 x 问题，可以使用 xx 实现，让 x 方案更完善。
   带着可能的解决方案，哪怕是还存在问题的、不成熟的方案或思路来，都是对讨论有好处的。鉴于每个人的需求不太一样，不可能一个协议就满足所有的场景。
   所以讨论中不要出现用 A 代替 B，用 B 代替 A，C 已经没救了，D 永远不能得到解决，鹦鹉死了这种事情，我想这不是一种解决问题的态度。虽然我们知道永远不可能达到完美，但是仍然要追求完美。像提出 A1, A2 的优化方案代替 A; B1, B2 的方案代替 B，讨论才能有所推进，有所成效。

## Go 项目依赖管理

> 可以用 go get 命令下载第三方包，go get 会将源码下载到 src 目录下，并编译源码生成.a 二进制文件放到 pkg 目录下。如果源码中包含 main 文件，则会生成对应的二进制文件放到 bin 目录中

- `GOPATH：建立多个路径，用来管理GO项目的所有的依赖`
- `vendor目录管理：`
- `go module管理依赖`

```js
/*
   1、GOPATH=/usr/any/deps:/usr/any/project1:/usr/any/project2，依赖都会安装到deps,project1和project2存放项目代码 但是没有版本管理 go get命令下载包
   2、项目目录下维护一个vendor目录，编译时优先使用该目录。vendor目录的嵌套，导致版本冲突问题依然无法解决 go get命令下载包
   3、module:
        依赖下载到GOPATH/pkg/mod目录下，已经指定了依赖的路径
        go mod init name：用于自己引用自己使用，因为项目不在GOPATH/src下，需要有一个标识符
        go.mod：类似package.json
        go.sum: 类似package-lock.json

    4、go mod命令
        go mod init // 初始化模块
        go mod download // 下载依赖到本地缓存#GOPATH/pkg/mod/cache
        go mod edit // 编辑mod文件
        go mod graph // 展示依赖图
        go mod tidy // 增加缺失的包，移除没用的包
        go mod vendor // 把依赖拷贝到vendor目录
        go mod verify // 确认依赖关系
        go mod why // 解释为什么需要包和模块

        ---------------------
        go run main.go
        go build main.go
        go test main.go
        go clean
        go doc
        go env
        go bug
        go fix
        go fmt
        go install
        go tool
        go version
        go get dep
        go list -u -m all

*/
```

```go
    /*
        Go1.1.1版本之前：
            GOPATH和go get
        Go1.1.1版本之后：
            module:Go中包的集合，源代码更替和版本控制的单元。使用go.mod文件描述module
                go.mod文件定义模块路径，并且列出了在项目构建过程中使用的特定版本
                    require:依赖包以及版本
                    exclude：排除版本
                    replace：取代当前项目中的某些依赖包
                    go build -mod [mode] // readonly、release、vendor
                    go get -m [packages] // 下载依赖包并放到GOPATH/pkg/mod目录

                    go mod <command> [arguments]
                    go mod init [module]：初始化并创建go.mod文件
                    go mod tidy：移除不使用的依赖包
                    go mod vendor [-v]：将build阶段需要的所有依赖包放到主模块所在的vendor目录中
                    go mod verify：检查当前模块的依赖是否已经存储在本地下载的源代码缓存中
            提供了方便的包管理工具

    */
```

## Go 语法：程序一般由关键字、常量、变量、运算符、类型和函数组成

```go
    /*
        程序一般由关键字、常量、变量、运算符、类型和函数组成
        程序中的分隔符：(),[],{}
        程序中的标点符号：.、,、;、:和...
        1、Go环境变量：
            $GOROOT：Go在电脑上的安装位置，$HOME/go
            $GOARCH：目标机器的处理器架构，可以是386，amd64，arm
            $GOOS：目标机器的操作系统，可以是dwrwin,freebsd,linux,windows
            $GOBIN：编译器和连接器的安装位置,$GOROOT/bin
        2、Go关键字：
            break、default、func、interface、select
            case、defer、go、map、struct
            chan、else、goto、package、switch
            const、fallthrough、if、range、type
            continue、for、import、return、var
        3、Go预定义标识符（基本类型名称和内置函数名称，共计36个）
            append、cap、close、copy、false、imag、iota、len、panic、nil、new、true、make、recover、real、println、print（17）

            bool、byte、string、（3）
            complex、complex64、complex28、（3）
            int、int8、int16、int32、int64、（5）
            uint、uint8、uint16、uint32、uint64、uintptr（6）
            float32、float64（2）
        4、Go程序的基本结构和要素：
            包：每个程序都有包组成，每一个Go文件都属于且仅属于一个包。
            标准库：在 Go 的安装文件里包含了一些可以直接使用的包，即标准库
            依赖：Go 中的包模型采用了显式依赖关系的机制来达到快速编译的目的，编译器会从后缀名为 .o 的对象文件（需要且只需要这个文件）中提取传递依赖类型的信息。
        5、Go函数：使用关键字func定义
            main函数：go运行程序的入口函数
        6、注释：使用C、C++注释方式
        7、类型：Go只支持显式类型转换T(value)
            变量或常量存储和操作数据的方式
            基本类型：
                byte：数值类型默认值都为0
                int、int8、int16、int32、int64
                uint、uint8、uint16、uint32、uint64、uintptr
                float32、float64
                complex、comple32、comple64、complex128
                bool：默认值fasle
                string：默认值""
            结构化类型：使用nil作为默认值
                struct
                array
                slice
                map
                channel
            描述类型行为：
                interface
        8、Go程序结构
            import导包
            init初始化
            main执行程序
        9、常量：const定义，用于存储不会改变的数据。
            只能存储bool、数值类型和string
            编译时，cosnt值必须是确定的
            数字型的常量是没有大小和符号的，并且可以使用任何精度而不会导致溢出
        10、变量：var定义或:=
        11、值类型和引用类型
            基本类型都是值类型，变量直接指向内存中的值
            其他是引用（指针），存储的是一个地址
        12、init函数：先于main函数执行
        13、基本类型和运算符
            13-1、bool，取值[true, false]， 默认是false，支持逻辑运算&&、||、!
            13-2、数值类型，整型int、浮点型float和复数complex32
            13-3、位运算：只能用于整数类型变量，且需要他们拥有等长位模式
                二元运算符：
                    按位与：&，   1&1 1
                    按位或：|，   1|1 1
                    按位异或：^， 1^1 0
                    位清除：&^：指将指定位置上的值设置为0
                一元运算符：
                    按位补足：^，没明白？？？？？
                    位左移：<<，低位补0
                    位右移：>>，高位补0
            13-4、逻辑运算符：主要用于bool、整数和浮点数
                    逻辑与：&&
                    逻辑或：||
                    逻辑非：!
                    等号：==
                    不等：!=
                    小于：<
                    小于等于：<=
                    大于: >
                    大于等于：>=
            13-5、算术运算符：用于整数和浮点数运算
                    加：+
                    减：-
                    乘：*
                    除：/
                    求余：%
        14、类型别名：
            type Alias int
        15、字符类型：字符只是整数的特殊用例
            byte是uint8的别名，可以存储ascii字符
                var ch byte = 65
                var ch byte = "\x41" \x16进制
            go也支持unicode，即runes，int32的别名，需要使用\u或\U
                var ch int = "\u0041"
                var ch2 int = "\u00101234"
        16、字符串：string，字符串是 UTF-8 字符的一个序列
            解释型字符串：该类字符串使用双引号括起来，其中的相关的转义字符将被替换
            非解释型字符串：该类字符串使用反引号括起来，支持换行
                `This is a raw string \n`
            标准库中的包：strings和strconv包
                strings.HasPrefix
        17、日期和时间：time包
        18、指针：取地址符&和指针引用*
            定义指针：
                var intP *int
                intP = &a
                *intP = XXX
        19、控制结构：
            Go函数经常使用两个返回值表示执行是否成功，value和error
            if-else结构：
            switch结构：
                default默认状态
            select结构：
            for（range）结构：
                for-range是Go的特殊结构，可以迭代任何集合
                break和continue可以改变循环状态
        20、标签与goto
            标签：某一行以:结尾的单词
            goto 标签
            func main() {
	            i:=0
	                HERE:
		                print(i)
		                i++
		                if i==5 {
			                return
		                }
		            goto HERE
            }
        21、函数：函数参数、返回值以及它们的类型被统称为函数签名
            普通带有名字的函数
            匿名函数或lambda函数
            方法：带有接收者的函数
            目前 Go 没有泛型（generic）的概念，也就是说它不支持那种支持多种类型的函数。不过在大部分情况下可以通过接口（interface），特别是空接口与类型选择（type switch，参考 第 11.12 节）与/或者通过使用反射（reflection，参考 第 6.8 节）来实现相似的功能
            函数能够接收参数供自己使用，也可以返回零个或多个值
            按值传递（call by value） 按引用传递（call by reference）
            命名的返回值（named return variables）
            空白符（blank identifier）
            改变外部变量（outside variable）
            传递变长参数
                func my(a, b, arg, ...int){}
            defer 和追踪
            内置函数
                close：关闭管道
                len：返回类型的长度或数量（字符串、切片、数组、map、管道）
                cap：返回类型的最大容量（切片和map）
                new：用于值类型和用户定义的类型，分配内存
                make：用于内建引用类型（切片、map、管道）
                copy：赋值切片
                append：连接切片
                panic：错误处理
                recover：错误处理
                print：底层打印函数（建议用fmt包）
                println：底层打印函数（建议用fmt包）
                complex：创建复数
                real：操作复数
                imag：操作复数
            递归函数：存在栈溢出问题，可以通过懒惰求值的技术解决这个问题
            将函数作为参数
            闭包：
                关键字 defer （详见第 6.4 节）经常配合匿名函数使用，它可以用于改变函数的命名返回值
            应用闭包：将函数作为返回值
            使用闭包调试
            计算函数执行时间
            通过内存缓存来提升性能
            数组与切片：
                数组：
                    数组是具有相同 唯一类型 的一组已编号且长度固定的数据项序列。这种类型可以是任意的原始类型例如整型、字符串或者自定义类型。数组长度也是数组类型的一部分，所以[5]int和[10]int是属于不同类型的
                    声明数组：var arr [lenth]type
                    数组常量：
                        var keys [5]int{1,2,3,4,5}
                        var keys [5]string{1: "m", 3: "l"}
                    多维数组：var arr[length][length]string
                    将数组传递函数：
                        1、传递数组的指针
                        2、传递数组的切片
                切片：切片（slice）是对数组一个连续片段的引用
                    声明切片：var slice[]type
                    初始化：var slice[]type = arr[start:end]
                    用 make() 创建一个切片
                        slice1 := make([]int, len)
                    多为切片
                    bytes包用于处理[]byte切片
                    切片重组reslice：改变切片长度的过程称之为切片重组 reslicing
                    切片的复制与追加：copy和append
                for-range结构：应用于数组和切片，返回索引和值
                从字符串生成字节切片:
            map 是一种特殊的数据结构：一种元素对（pair）的无序集合，pair 的一个元素是 key，对应的另一个元素是 value，所以这个结构也称为关联数组或字典。这是一种快速寻找值的理想结构：给定 key，对应的 value 可以迅速定位
            声明：var map1 map[keytype]valuetype，
            make创建map
        22、标准库
            unsafe：C/C++程序调用使用
            os：平台无关性的操作系统功能接口
            os/exec：提供我们运行外部操作系统命令和程序的方式
            syscall：底层的外部包，提供了操作系统底层调用的基本接口

            archive/tar：压缩文件功能
            zip-compress：解压文件功能

            fmt：格式化输入输出工鞥呢
            io：基本输入输出功能
            bufio：缓冲输入输出功能
            path/filepath：操作当前系统中的目标文件名路径
            flag：命令行参数

            strings：字符串操作
            strconv：字符串转换为基础类型的功能
            unicode：处理unicode字符串
            regexp：正则表达式功能
            bytes：字符串分片功能
            idnex/suffixarray：子字符串快速查询

            math：基本的数学函数
            math/cmath：对复数的操作
            math/rand：伪随机数生成
            sort：为数组排序和自定义集合
            math/big：大数实现和计算

            list：双链表
            ring：环形链表

            time：日期和时间
            log：日志

            encoding/json：处理JSON数据
            encoding/xml：处理xml
            text/template：

            net：网络数据的基本操作
            http：http服务器和基础客户端，解析http请求和回复
            html：HTML5解析器

            runtime：Go程序运行时的交互操作，垃圾回收和协程创建
            reflect：实现通过程序运行时反射，让程序操作任意类型的变量
        23、锁和sync包：map 类型是非线程安全
            sync.Mutex：是一个互斥锁，用于守护在临界区入口确保同一时间只能有一个线程进入临界区
            sync.RWMutex：通过RLock允许同一个时间多个线程对变量进行读操作，但是只能有一个线程进行写操作
        24、自定义包的目录结构
            /home/user/goprograms
	            ucmain.go	(uc包主程序)
	            Makefile (ucmain的makefile)
	            ucmain
	            src/uc	 (包含uc包的go源码)
		            uc.go
	 	            uc_test.go
	 	            Makefile (包的makefile)
	 	            uc.a
	 	            _obj
			            uc.a
		            _test
			            uc.a
	            bin		(包含最终的执行文件)
		            ucmain
	            pkg/linux_amd64
                    uc.a	(包的目标文件)
        25、在 Go 程序中使用外部库
        26、结构（struct）与方法（method）
    */
```

## Go 知识点

```go
    /*
        程序（Program）：是指令、数据及其组织形式的描述，进程是程序的实体。程序本身没有生命周期

        进程（Process）：是系统进行资源分配和调度的基本单位，是操作系统结构的基础，是操作系统提供的抽象概念，具有独立的内存运行空间（每个进程都拥有唯一的地址空间）

        线程（Thread）：操作系统提供的抽象概念。是程序执行中一个单一的顺序控制流程，是程序执行流的最小单元，是 处理器调度和分派 的基本单位。同一进程中的多个线程共享该进程的全部系统资源

        协程（Coroutine，微线程）：是一种比线程更加轻量级的存在，协程和系统无关，完全由程序控制

        并发：是指基于CPU调度算法，多个线程轮流使用CPU时间片来执行任务，由于CPU速度非常快，就像有多个任务在后台执行一样
        并行：通常是指多个线程（任务），在多核处理器上并行执行，真正意义的多任务同时进行

        互斥：是指某一资源同时只允许一个访问者对其进行访问，具有唯一性和排它性。但互斥无法限制访问者对资源的访问顺序，即访问是无序的
        同步：同步是在互斥的基础上（大多数情况），通过其他机制实现访问者对资源的有序访问

        反射：在go中反射围绕三个概念构建：Type、Kind、Value。主要是标准库中的reflect包实现反射的各种功能
            使用反射创建新的实例，需要使用make才能创建类型实例
        继承：go中的继承是通过struct的组合完成的
        多态：go中的多态是基于interface完成的

    */
```

## go 工具：获取、构建、安装 Go 包以及命令的标准方式

```js
/*
    go 工具需要你按照指定的方式来组织代码

    代码组织：Go代码必须放在一个工作空间内（就是一个目录内，该目录包含是三个子目录）
    project
        |
        |-----src：Go源文件，被组织成包（每个目录对应一个包）
        |
        |
        |-----pkg：包含包对象
        |
        |
        |-----bin：包含可执行命令
    go工具用于构建源码包，并将其生成的二进制文件安装到pkg和bin目录中
    src目录通常包含多种版本控制的代码仓库（git或Mercurial），以此跟踪一个或多个源码包的开发

    Demo：
    bin/
        streak #可执行命令
        todo #可执行命令
    pkg/
        linux_amd64/
            code.google.com/p/goauth2/
                oauth2.a #包对象
            github.com/nf/todo/
                task.a #包对象
    src/
        code.google.com/p/goauth2/
            .hg/ #Mercurial代码库元数据
            oauth/
                oauth.go #包源码
                oauth_test.go #测试源码
        github.com/nf/
            streak/
            .git/ #git代码库元数据
                oauth.go # 命令源码
                streak.go #命令源码
            todo/
            .git/ #git代码库元数据
                task/
                    task.go #包源码
                    todo.go #命令源码

*/
```

- `GOPATH环境变量`：指定了工作空间位置，可能是唯一需要设置的环境变量
  > 创建工作空间： mkdir $HOME/work

> 设置 GOPATH 环境变量：export GOPATH=$HOME/work

> 作为约定，设置该工作空间的 bin 子目录：export PATH=$PATH:$GOPATH/bin

- `go install hello`：构建并安装程序
- `$GOPATH/bin/hello`：执行 hello；如果导出了$PATH/bin，就可以直接执行：hello
- `添加git仓库：`
  > cd $GOPATH/src/hello

> git init

> git add hello.go

> git commit -m "XXXXXX"

- `GO 库`
  > mkdir $GOPATH/src/addlib

```go
    package addlib

    func Reverse(s string) string {
        r := []rune(s)
        for i,j :=0, len(r) - 1; i < len(r)/2;i, j=i+1,j-1 {
            r[i],r[j] = r[j],r[i]
        }

        return string(r)
    }
```

> go build $GOPATH/src/addlib,会将包对象放到 pkg 目录

- `Go 包名`
  > 源文件第一个语句必须是 package 包名
- `go test`：go 有一个轻量级的测试框架
  > 创建以\_test.go 结尾的测试文件

## Go 工具（https://go-zh.org/doc/effective_go.html）

- `格式化gofmt`：格式化代码
- `注释godoc`：提取 go 源码中文档内容，出现在顶级声明之前，且与该声明之间没有空行的注释，将与该声明一起被提取出来，作为该条目的说明文档。
  > 每个包都应包含一段包注释，即放置在包子句前的一个块注释
- `接口名`：按照约定，只包含一个方法的接口应当以该方法的名称加上-er 后缀来命名，如 Reader、Writer、 Formatter、CloseNotifier 等
- `驼峰记法：`MixedCaps
- `命名：`大写开头导出
- `包名：`当一个包被导入后，包名就会成了内容的访问器
- `获取器：getter和设置器：setter`：Go 并不对获取器和设置器提供自动支持。
- `分号：`Go 使用分号结束语句。Go 会自动插入分号，大部分情况下用户不需要写分号
  > 通常 Go 程序只在诸如 for 循环子句这样的地方使用分号， 以此来将初始化器、条件及增量元素分开。如果你在一行中写多个语句，也需要用分号隔开

> 警告：无论如何，你都不应将一个控制结构（if、for、switch 或 select）的左大括号放在下一行。如果这样做，就会在大括号前面插入一个分号

- `控制结构：`if
- `重新声明和再次赋值：:=`
- `For、Switch`
- `类型选择：`
- `函数之多值返回`
- `函数之可命名结果形参`
- `函数之推迟执行函数：Defer`
- `new分配：`Go 提供了两种分配原语 new 和 make
  > new(T)用来分配内存的内建函数，但不会初始化内存，只会将内存置为 0

> make(T, args)分配：它只用于创建切片、映射和信道，并返回类型为 T（而非\*T）的一个已初始化（非内置 0）的值。

- `数组[length]T：`
- `切片[]T：`
- `二维数组[length][length]T`
- `二维切片：[][]T`
- `映射map：`
- `打印：`类似 C，格式化打印
- `追加append：`
- `初始化：`
- `常量const：`
- `变量var：`
- `init函数：`每个源文件都可以通过定义自己的无参数 init 函数来设置一些必要的状态
- `方法：指针和值：`
- `接口：`
- `类型转换：`
- `接口转换与类型断言：`
- `通用性：`
- `接口和方法：`
- `空白标识符：`空白标识符可被赋予或声明为任何类型的任何值，而其值会被无害地丢弃

## Go 并发

> 并发编程中，实现共享变量的正确访问需要精确的控制。Go 中将共享的值通过信道传递。实际上，多个独立执行的线程从不会主动共享。在任意给定的时间点，只有一个 Go 程能够访问该值，数据竞争从设计上就被杜绝了。简而言之：不要通过共享内存来通信，而应通过通信来共享内存

## Go 程：是因为现有的进程、线程、协程都无法精确描述它

> Go 程模型：Go 程是与其它 Go 程并发运行在同一地址空间的函数，它是轻量级的。

> Go 程的设计隐藏了线程创建和管理的复杂性

> Go 程在多线程操作系统上可实现多路复用，因此一个线程阻塞，比如说等待 I/O，那么其它的形成就会执行

> 在函数或方法前添加 go 关键字能够在新的 Go 程中调用它。调用完成，Go 程会自动退出

> 函数字面量在 Go 程调用非常有用

```go
    func Announce(message string, delay time.Duration) {
        go func() {
            time.Sleep(delay)
            fmt.Println(message)
        }
    }
    // 这些函数没什么实用性，因为它们没有实现完成时的信号处理。因此，我们需要信道
```

> 在 Go 中，函数字面都是闭包：其实现在保证了函数内引用变量的生命周期与函数的活动时间相同

## 信道：信道与映射一样，也需要 make 来分配内存。其结果只充当了对底层数据结构的引用

```go
/*
    创建信道：
        无缓冲信道在通信时会同步交换数据，它能确保（两个Go程的）计算处于确定状态
*/
    ci := make(chan int) // 整数类型的无缓冲信道
    cj := make(chan int, 0) // 整数类型的无缓冲信道
    cs := make(chan *os.File, 100) // 指向文件指针的带缓冲信道
/*
    信道用法：
*/
    c := make(chan int) // 分配一个无缓冲信道
    // 在Go程中启动排序。当它完成后，在信道上发送信号
    go func() {
        list.sort()
        c <- 1 // 发送信号
    }()

    doSomethingForAWhile()
    <-c // 等待排序结束，丢弃发来的值
```

> 接收者在收到数据前会一直被阻塞。

> 若信道是不带缓冲的，那么接收者收到值前，发送者会一直阻塞

> 若信道是带缓冲的，则发送者仅在值被复制到缓冲区前阻塞；若缓冲区已满，发送者会一直等待直到某个接收者取出一个值为止

> 带缓冲的信道可被用作信号量

## 锁(sync.Mutex 和 sync.RWMutex)

```go
    var l sync.Mutex
    var a string
    func f() {
        a = "hello world!"
        l.Unlock()
    }
    func main() {
        l.Lock()
        go f()
        l.Lock()
        print(a)
    }
```

## Once 类型

```go
    var a string
    var once sync.Once

    func setuo() {
        a = "hello world!"
    }
    func doprint() {
        once.Do(setup)
        print(a)
    }
    func twoprint() {
        go doprint()
        go doprint()
    }
```

## Go 运算

### 逻辑运算：!,&&,||

### 位运算：位运算只能用于整数类型的变量，且需要当他们拥有等长位模式时，%b 是格式化标识符

#### 二元运算符

> 按位与：&

```go
    /*
        1&1 1
        1&0 0
        0&1 0
        0&0 0
    */
```

> 按位或：|

```go
    /*
        1|1 1
        1|0 1
        0|1 1
        0|0 0
    */
```

> 按位异或：^

```go
    /*
        1^1 0
        1^0 1
        0^1 1
        0^0 0
    */
```

> 未清除：&^，将指定位置上的值设置为 0

#### 一元运算符

> 按位补足：^该运算符与异或运算符一起使用，即 m^x，对于无符号 x 使用全部位置设为 1；有符号 x 时，使 m=-1

```go
    // 没明白
```

> 位左移<<：左移，低位补 0

> 位右移>>：右移，高位补 0

### 逻辑运算：==, !=, <, <=, >, >=

### 算术运算符：+, -, \*, /, %

### 运算符优先级：

```go
/*
    7      ^ !
    6      * / % << >> & &^
    5      + - | ^
    4      == != < <= > >=
    3      <-
    2      &&
    1      ||
*/
```

### 随机数：random.go()
