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
  - `DATETIME`
  - `TIMESTAMP`
- `文字字符串类型`
  - `CHAR`
  - `VARCHAR`
  - `TINYTEXT`
  - `TEXT`
  - `MEDIUMTEXT`
  - `LONGTEXT`
- `枚举类型`
  - `ENUM`
- `集合类型`
  - `SET`
- `二进制字符串类型`
  - `BINARY`
  - `VARBINARY`
  - `TINYBLOB`
  - `BLOB`
  - `MEDIUMBLOB`
  - `LONGBLOB`
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
