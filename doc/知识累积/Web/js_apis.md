# JS APIs

## 转译

> ASCII 编码，有些特殊符号需要转译符和字符标识，例如

- `制表符：\t`
- `换行符：\n`
- `双引号：\"`

> 用作转译符的符号

- `\`

> 用作标识符的符号：例如 js 字符串中的单双引号

- `"`
- `'`

```js
const str = '123123123';
const str = '\t'; // 打印出来是制表符，特殊编码
const str = '\\'; // 打印转译符号本身的意义
const str = "'"; // 打印字符串中的标识符,"\""
const str = '"'; // 打印字符串中的标识符, '\''
```

## RegExp

### 一些常用特殊符号

```js
/*
U+000A 换行符 "\n"
U+000D 回车符 "\r"
U+2028 行分隔符 "line separator"
U+2029 段分隔符 "paragraph seprator"
匹配数字Digits "\d"
匹配whitespace "\s"
匹配Word Characters "\w"
匹配 All except digits "\D"
匹配 All except whitespace "\S"
匹配 All except word characters "\W"
匹配 All except newlines .
匹配 Word boundary positions "\b"
匹配 Not word boundary positions "\B"

Digit: The characters 0-9 only
Whitespace: Tab, line feed, vertical tab, form feed, carriage return, space, no-break space, line separator, paragraph separator, and "any other Unicode 'space separator'".
Word character: The characters A-Z, a-z, 0-9, and _ only
Word boundary: The position between a word character and non-word character
Newline: The line feed, carriage return, line separator, and paragraph separator characters

\u000a Line feed "\n"
\u000d Carriage return "\r"
\u2028 Line separator
\u2029 Paragraph separator
*/
```

## JS 位操作符

> ECMAScript 中的所有数值都以 IEEE-754 64 位格式存储，但`位操作符`并不直接操作 64 位的值。而是将 64 位的值转换成 32 位的`整数`，然后执行操作，最后再将结果转换回 64 位。 ------ 《JavaScript 高级程序设计设计》
>
> 这样`浮点数小数位就没了`
>
> - `按位非(~)`本质，操作数的负值减 1
> - `按位与(&)`本质，本质就是等序号位进行操作
> - `按位或(|)`本质，
> - `按位异或(^)`本质，
> - `左移(<<)`用 0 填充空位，，不影响符号位
> - `有符号右移(>>)`保留符号位，符号位填充空位
> - `无符号右移(>>>)`用 0 填充空位

### 掩码(mask)

> `掩码`是指一些开关设置为开(1)或关(0)的位组合

### UUID 的使用

```js
/*
    格式：xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx
    x：取值范围是[0-F]
    M是版本号，值域是{1,2,3,4,5}
    N表示UUID变体，值域是{8,9,a,b}。变体是为了能兼容过去的UUID，以及应对未来的变化。
    目前已知的变体有以下几种，因为目前正在使用的UUID都是variant1，所以取值只能是8,9,a,b中的一个，
    对应(1000,1001,1010,1011)
    variant0：0xxx，为了向后兼容预留
    variant1：10xx，当前正在使用
    variant2：11xx，为早起微软GUID预留
    variant3：111x，为将来扩展预留，目前暂未使用

    time_low：32位，
    time_mid：16位
    time_hi_version：16位
    clock_seq_hi_variant：8位
    clock_seq_low：8位
    node UUID：48位
    */
function generateUUID() {
  let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function (c) {
      const bit = (Math.random() * 16) | 0;
      const value = c === 'x' ? bit : (bit & 0x3) | 0x8;

      return value.toString(16);
    }
  );

  return uuid;
}
```

### 位的奇技淫巧

|             功能 |   位运算 |             示例 |
| ---------------: | -------: | ---------------: |
| 把最后一位变成 1 |   x \| 1 | 101100 -> 101101 |
| 把最后一位变成 0 |   x\|1-1 |   101101->101100 |
|         判断奇偶 | x&1 == 1 |  除 0 以外的判断 |

## JS 语言中的数值型数据进制标识

|           进制 | 前缀 |    实例 | 对应十进制值 |
| -------------: | ---: | ------: | -----------: |
|  二进制 binary |   0b |  0b0101 |            5 |
|   八进制 octal |    0 |    0101 |           72 |
| 十进制 decimal |   无 |      10 |           10 |
|   十六进制 hex |   0x | 0x10000 |        65536 |

## Symbol

> 2015 年 Symbol 被添加到 JavaScript 的 primitive value 中，是 ES6 规范的一部分
>
> 唯一目的，就是作为`对象属性的唯一标识`

- `Symbol全局注册表`
  > Symbol.for()、Symbol.keyFor()会在 symbol 全局注册表中创建和读取 symbol
- `引入Symbol的动机：`在 JavaScript 中可以使用私有属性

## Proxy And Reflect

- `JS中的对象和非对象（primitive value）`
  - `primitive value：`null, undefined, number, string, boolean, symbol
- `对象语义：`
  - `get/set：`即 o.x 和 o.x=xxx
  - `Apply：`即 o(...args)
  - `Constructor：`即 new o(...args)
  - `delete：`删除属性
  - `Object.defineProperty：`定义属性
    > 有一些看上去是基本语义的，实际是由多个基本语义复合而成。
    ***
    > 例如 o.method(...args)，在 JS 中由 f=Get(o, 'method')和 Apply(f, o, args)复合而成
    ***
    > k in o 对应的基本语义是 Has
    ***
    > for k in o 确是由 OweKeys、GetPrototypeOf、GetOwnPropertyDescriptor 复合而成
- `所有对象基本语义`即构成`对象模型`
  > Proxy 可以完全地实现对象的`所有基本语义`，每个基本语义在 proxy handler 都有对应的 trap，并且在 Reflect 对象上也有对应的方法方便实现默认行为，所以 Reflect 和 Proxy 是对称的。`注意：`Proxy 和 Reflect 覆盖所有基本语义，但不管那些复合语义
  >
  > [参考资料](https://www.zhihu.com/question/426875859)

```javascript
// code 1
let p = new Proxy(x, {
  // 第一种写法：将操作透明的转发给被代理的对象上
  set(...args) {
    console.log('set===>', args);

    return Reflect.set(...args);
  },
  /* 
    第二种写法：当你知道某种操作实现时，手动实现操作
    我们知道get/set的语法，所以可以这样写；
    oweKeys()的语法不知道，该怎么写呢？但是Reflect.oweKeys()可以将操作转发到对应的对象上。
    所以Proxy的trap都在Reflect上有一一对应的实现
    */
  set(target, key, value) {
    console.log('set===>', target, key, value);
    target[key] = value;
  }
  //
});
```

## Proxy

> [Proxy 代理 Map](https://www.zhihu.com/question/426875859)

- `Proxy(targey, handler)：`用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找，赋值，枚举，函数调用等等）。`Proxy设计目标是代理一个对象的所有基本语义，以允许构建membrane(膜)`

  > - `target：`要使用 Proxy 包装的目标对象（可以是任何类型的对象，包括原生数组、函数、代理）
  > - `handler：`以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 p 的行为。handler 对象是一个容纳一批特定属性的占位符对象。它包含有 Proxy 的各个捕获器（trap）
  >   - `handler.getPrototypeOf(target)`
  >   - `handler.setPrototypeOf(target, prototype)`
  >   - `handler.defineProperty(target, property, descriptor)`
  >   - `handler.has(target, props)`in 操作符的捕捉器
  >   - `handler.get(target, property, receiver)`属性读取操作的捕捉器
  >   - `handler.set(target, property, value, receiver)`属性设置操作的捕捉器
  >   - `handler.deleteProperty(target, property)`delete 操作符的捕捉器
  >   - `handler.ownKeys(target)`
  >   - `handler.apply(target, thisArg, argumentsList)`函数调用操作的捕捉器
  >   - `handler.constructor(target, argumentsList, newTarget)`new 操作符的捕捉器

## Reflect

> Reflect 主要是配合 Proxy 配对使用，提供对象语义的默认行为，详情内容见 `code 1` 中的代码和注释
>
> [Reflect 作用](https://www.zhihu.com/question/460133198)

- `Reflect`它提供拦截 JavaScript `操作`的方法。这些方法与 proxy handlers 的方法相同。Reflect 的所有属性和方法都是静态的，就像 Math 对象一样

  > - `Reflect.apply(target, thisArgument, argumentsList)`
  > - `Reflect.constructor(target, argumentsList[,newTarget])`
  > - `Reflect.defineProperty(target, propertyKey, attributes)`
  > - `Reflect.deleteProperty(target, property)`
  > - `Reflect.get(target, propertyKey[,receiver])`
  > - `Reflect.set(target, propertyKey, value[,receiver])`
  > - `Reflect.has(target, propertyKey)`
