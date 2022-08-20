# MYSQL

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
