# python

> 是一门计算机编程语言，Python 提供了高效的高级数据结构
>
> Python 解释器易于扩展，可以通过 C 语言或 C++扩展新的功能和数据类型
>
> 由于 Python 语言的简洁性、易读性及可扩展性，在国外使用 Python 做科学计算的研究机构日益增多，众多开源的科学计算软件包都提供了 Python 的调用接口，例如计算机视觉库 OpenCV、三维可视化库 VTK、医学图像处理库 ITK 等
>
> Python 语言及其众多的扩展库所构成的开发环境十分适合工程技术、科研人员处理实验数据、制作图表，甚至开发科学计算应用程序
>
> Python 应用领域：Web 开发、科学计算和统计、人工智能、桌面界面开发、后端开发、网络接口
>
> 图形处理：有 PIL、Tkinter 等图形库；数学处理有 NumPy 扩展库；文本处理有 re 模块、SGML、XML 模块；数据库编程通过遵循 Python DB-API 规范的模块与众多数据库通信，Python 自带的 Gadfly 模块，提供了完整的 SQL 环境；网络编程提供了丰富的模块支持 sockets 编程；多媒体应用则有封装了 OpenGL 的 P 有 OpenGL 模块；PyGame 用于游戏开发；

## Python 版本分水岭

> Python2 于 2000 年 10 月 16 日发布，稳定版本时 2.7，且在 2020 年 1 月 1 日终止对 2.7 的支持
>
> Python3 于 2008 年 12 月 3 日发布，不完全兼容 Python2

## 环境配置

## Python 语法

### Python 数据结构

> 数字（整数int、浮点数float、布尔值boolean、复数complex）
>
> 组（序列、集合set、字典dict），序列（列表list、元组tuple、字符串str）

#### 序列（列表、元组、字符串、Unicode 字符串、buffer 对象、xrange 对象）

- `列表（list）：`列表是可变的，可以修改

```python
    # 字面量创建
    list1 = [1,2,3,4]
    print list1 # [1,2,3,4]
    # 构造函数创建
    list2 = list("hellow")
    print(list2) # ['h','e','l','l','o','w']
```

- `元组（tuple）：也是一种序列`，但不可修改

```python
    # 字面量
    t1 = 1,2,3 # 逗号分隔，元组自动创建
    t2 = "hello", "world"
    t3=(1,2,3,4)
    t4=() # 元组是圆括号括起来的，此处是一个空元祖
    t5=(1,) # 只有一个值的元组必须加个逗号
    print t1, t2,t3,t4,t5
    # 构造函数：以一个序列作为参数并转换成元组
    t1=tuple([1,2,3,4])
    t2=tuple("hello")
    t3=tuple((1,2,3))

```

- `字符创（string）：`标准库 string, from string import Template

```python
    # 字面量
    str1 = 'Hello World'

```

#### 映射（字典、散列表、dict），字典（散列表）是 Python 中唯一内置的映射类型

> 字典的键可以是数字、字符串或者元组，但必须唯一。Python 中数字、字符串、元组都是不可变类型

```python
    list1 = ["hello,world"] # 列表
    set1 = set([123]) # 集合
    d = {} # 字典(散列表)
    d[1] = 1 # {1: 1}
    print d
    d[list1] = "hellow world" # 报错


```

#### 集合（set,frozenset）：Python@2.3引入该类型，集合就是由序列（或其它可迭代对象）构建的

> 不可重复性;
> 无序性;
> 集合不能包含集合，只能包含不可变值;
> 可以使用 frozenset 类型用于代表不可变的集合

```python
    strs = set(['jeff', 'jinm', 'xxx'])
    nums = set(range(10))

```

### 运算符

#### 算术运算符

- `+：`加法和取正
- `-：`减法和取负
- `*：`乘法
- `/：`除法
- `//：`整除
- `**：`乘方
- `~：`取补
- `%：`取余

#### 逻辑运算符

- `and：`
- `or：`
- `not：`
- `is：`
- `is not：`
- `in：`
- `not in：`

### 语句

#### if(else,elif) 语句：条件语句

#### for 语句：遍历列表、字符串、字典、集合等迭代器

#### while 语句：循环执行语句块

#### try,except,finally 语句：处理异常

#### class 语取正

#### def 语句：定义函数或类型的方法

#### pass 语句：不运行任何操作

#### assert 语句：调试阶段测试运行条件是否满足

#### with 语句：在一个场景中运行语句块

#### yield 语句：在迭代器函数内使用，返回一个元素，python@2.5以后，变成了运算符

#### raise 语句：制造一个错误

#### import 语句：导入模块或对象

#### in 语句：判断一个对象是否在一个字符串、列表、元组中

## Django

## Wagtail
