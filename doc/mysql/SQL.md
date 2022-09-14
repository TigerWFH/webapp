# MYSQL

```plantuml
@startuml 明天
class A {}
@enduml
```

## SQL（Structured Query Language）

> 标准 SQL 由 ANSI 标准委员会管理，从而称为 ANSI SQL。各个 DBMS 都有自己的实现，如 PL/SQL、Transact-SQL 等
>
> SQL 语句不区分大小写
> [参考资料](https://juejin.cn/post/6844903790571700231#heading-14)

### 数据定义语言(DDL)

> 数据定义语言（Data Definition Language，DDL）是 SQL 语言集中负责数据结构定义与数据库对象定义的语言。DDL 的主要功能是定义数据库对象

- `CREATE`
- `ALTER`
- `DROP`

### 数据操纵语言（DML）

> 数据操纵语言（Data Manipulation Language, DML）是用于数据库操作，对数据库其中的对象和数据运行访问工作的编程语句，DML 的主要功能是 访问数据，因此其语法都是以读写数据库为主

- `INSERT`

```SQL
INSERT INTO student(sname, sid, ssex)
VALUES ('monkey', 1, '男');

INSERT INTO student
VALUES ('monkey', 1, 12, '男')
```

- `UPDATE`
- `DELETE`
- `SELECT`

### 事务控制语言（TCL）

> 事务控制语言 (Transaction Control Language, TCL) 用于管理数据库中的事务。这些用于管理由 DML 语句所做的更改。它还允许将语句分组为逻辑事务

- `COMMIT`
- `ROLLBACK`

### 数据控制语言（DCL）

> 数据控制语言 (Data Control Language, DCL) 是一种可对数据访问权进行控制的指令，它可以控制特定用户账户对数据表、查看表、预存程序、用户自定义函数等数据库对象的控制权

- `GRANT`
- `REVOKE`
- `CONNECT`
- `EXECUTE`
- `USAGE`
- `REFERENCES`

## MYSQL 数据类型

> 在 mysql 服务器，操作系统以及客户端连接都有时区的设置

- `整数类型`

  - `TINYINT`1 字节，-128-127，0-255
  - `SMALLINT`2 字节，-32768-32767，0-65535
  - `MEDIUMINT`3 字节，-8388608-8388607,0-16777215
  - `INT/INTEGER`4 字节，
  - `BIGINT`8 字节

> 整数可选属性有三种
>
> `M` 属于(0,255)，表示显示宽度。INT(5)，表示显示宽度是 5
>
> `UNSIGNED`非负整数
>
> `ZEROFILL`0 填充，表示宽度不够，使用 0 填充

- `浮点类型`
  - `FLOAT`
  - `DOUBLE`
- `定点数类型`
  - `DECIMAL`：DECIMAL(M,D)表示高精度小数，M={0,65}为精度：整数位+小数位，D 为标度：小数位数
- `位类型`
  - `BIT`
- `日期时间类型`
  - `YEAR`
  - `TIME`
  - `DATETIME`：
    > v5.6.5 之后，支持到毫秒，
    > 固定占用 8 字节，
    > 时间范围：1000-01-01 00:00:00 - 9999:12:31 23:59:59.999999，
    > 存储：写入什么，存储什么。比如写入"2020-03-10 08:09:30", 存储的是"2020-03-10 08:09:30"，
    > 表现形式："YYYY-MM-DD HH:MM:SS"，
    > 时区：与时区无关，直接展示存储时时区时间
  - `TIMESTAMP`：
    > v5.6.5 之后，支持到毫秒（7 字节），
    > 固定占用 4 字节，
    > 时间范围：1970-01-01 00:00:01.000000 - 2038-01-19 03:14:07.999999，
    > 存储：时间戳，比如写入"2020-03-10 08:09:30", 存储的是 UNIX_TIMESTAMP("2020-03-10 08:09:30")，
    > 表现形式："1970-01-01 00:00:00"，即用户从数据库获取到的数据都是 yyyy-mm-dd hh:mm:ss 类型的，不会因为 timestamp 本质存储的是时间戳，而用户获取的就是时间戳，他俩的表现形式是一样的
    > 写入形式：datetime 和 timestamp 的写入形式都是一样的，都必须是时间格式的，不能因为 timestamp 本质存储的是时间戳，然后我们就可以直接写入时间戳
    > 时区：时间戳是相对值，与时区有关
- `文字字符串类型`
  - `CHAR：`
    > CHAR(length): v4.0 及其一下版本，length 是指字节数；v5.0 及其以上，length 指的是字符个数
  - `VARCHAR`
    > VARCHAR(length): v4.0 及其一下版本，length 是指字节数；v5.0 及其以上，length 指的是字符个数
  - `TINYTEXT：`0-255 字节
  - `TEXT：`0-65535 字节
  - `MEDIUMTEXT：`0-16772150 字节
  - `LONGTEXT：`0-4294967295 字节
- `枚举类型`
  - `ENUM`
- `集合类型`
  - `SET`
- `二进制字符串类型`
  - `BINARY`
  - `VARBINARY`
  - `TINYBLOB：`0-255 字节，短文本`二进制`字符串
  - `BLOB：`0-65KB，`二进制`字符串
  - `MEDIUMBLOB：`0-16MB
  - `LONGBLOB：`0-4GB
- `JSON类型`
  - `JSON对象`
  - `JSON数组`
- `空间数据类型`
  - `单值类型`
    - `GEOMETRY`
    - `POINT`
    - `LINKSTRING`
    - `POLYGON`
  - `集合类型`
    - `MULTIPOINT`
    - `MULTILINKSTRING`
    - `MULTIPOLYGON`
    - `GEOMETRYCOLLECTION`

## MYSQL 数据类型属性

- `NULL`数据列可包含 null 值
- `NOT NULL`数据列不允许包含 null 值
- `DEFAULT`默认值
- `PRIMARY KEY`主键
- `AUTO_INCREMENT`自动递增，适用于整数类型
- `UNSIGNED`无符号
- `CHARACTR SET name`指定字符集
