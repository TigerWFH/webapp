# typescript<https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html>

> TypeScript shares syntax and runtime behavior with JavaScript
>
> Each and every value in JavaScript has a set of behaviors you can observe from running different operations.As a principle, TypeScript never changes the runtime behavior of JavaScript code

## 术语

- `callable`
- `property`
- `behaviors`
- `capabilities`
- `primitives: 原始的，基础的`

## TSC：the TypeScript compiler，检测和擦除类型

## TypeScript: A Static Type Checker

> does so based on the kinds of values, it’s a static type checker

## Handbook（学习指南）

A reader who completes the walkthrough should be able to:

- Read and understand commonly-used TypeScript syntax and patterns
- Explain the effects of important compiler options
- Correctly predict type system behavior in most cases

## Types

- `any:可以避免类型检测Error`设置 noImplicitAny，禁止设置 any 类型
- `Object Type`

## 接口 interface

> 接口兼容问题（implements）：

## 类 class

## 泛型

## 类型推论

## 类型兼容

## 高级类型

## 迭代器和生成器

## 命名空间和模块: 都可以包含代码和声明

> TypeScript 1.5 术语名已经发生了变化。内部模块现是命名空间。外部模块现在是模块。与 ES6 术语保持一致
>
> 不应该对模块使用命名空间，使用命名空间是为了提供逻辑分组和避免命名冲突。 模块文件本身已经是一个逻辑分组

- `命名空间namespace：`解决命名冲突问题

```ts
/* no namespace */
interface StringValidator {
  isAcceptable(s: string): boolean;
}
let lettersRegexp = /^[A-Za-z]+$/;
let numberRegexp = /^[0-9]+$/;

class Letter implements StringValidator {
  isAcceptable(s: string) {
    return lettersRegexp.test(s);
  }
}

class ZipCodeValidator implements StringValidator {
  isAcceptable(s: string) {
    return s.length === 5 && numberRegexp.test(s);
  }
}
// 验证器过多，比如出现多易出现命名问题
/* with namespace */
namespace wfh {
  export interface StringValidator {
    isAcceptable(s: string): boolean;
  }
  let lettersRegexp = /^[A-Za-z]+$/;
  let numberRegexp = /^[0-9]+$/;

  export class Letter implements StringValidator {
    isAcceptable(s: string) {
      return lettersRegexp.test(s);
    }
  }

  export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
      return s.length === 5 && numberRegexp.test(s);
    }
  }
}
```

- `命名空间拆分到多个文件中`
  > 因为不同文件之间存在依赖关系，所以我们加入了【引用标签】（三斜线指令）来告诉编译器文件之间的关联

```ts
// Validation.ts
namespace wfh {
  export interface StringValidator {
    isAcceptable(s: string): boolean;
  }
}
// LettersOnlyValidator.ts
/// <reference path="Validation.ts" />
namespace wfh {
  const letter = /\./;
  export class Letter implements StringValidator {
    isAcceptable(s: string) {
      return true;
    }
  }
}
// ZipValidator.ts
/// <reference path="Validation.ts" />
namespace wfh {
  const numberRegexp = /^[0-9]+$/;
  export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
      return s.length === 5 && numberRegexp.test(s);
    }
  }
}

// demo.ts，不用直接import或export？？？
/// <reference path="Validation.ts" />
/// <reference path="LettersOnlyValidator.ts" />
/// <reference path="ZipValidator.ts" />
// Some samples to try
let strings = ['Hello', '98052', '101'];

// Validators to use
let validators: { [s: string]: Validation.StringValidator } = {};
validators['ZIP code'] = new Validation.ZipCodeValidator();
validators['Letters only'] = new Validation.LettersOnlyValidator();

// Show whether each string passed each validator
for (let s of strings) {
  for (let name in validators) {
    console.log(
      `"${s}" - ${
        validators[name].isAcceptable(s) ? 'matches' : 'does not match'
      } ${name}`
    );
  }
}
// 别名
namespace Shapes {
  export namespace Polygons {
    export class Triangle {}
    export class Square {}
  }
}

import polygons = Shapes.Polygons;
let sq = new polygons.Square(); // Same as "new Shapes.Polygons.Square()"
```

- `模块module`

## 模块解析

## 声明合并

## 装饰器

## JSX

## Mixins

## 三斜线指令:三斜线指令是包含单个 XML 标签的单行注释。 注释的内容会做为编译器指令使用

> 三斜线引用告诉编译器在编译过程中要引入的额外的文件
>
> 编译器会对输入文件进行预处理来解析所有三斜线引用指令。 在这个过程中，额外的文件会加到编译过程中。

## Javascript

[JSDoc](https://github.com/Microsoft/TypeScript/wiki/JSDoc-support-in-JavaScript)

> TS 可以推断 JS 文件中类型，无法推断也可以通过 jsdoc 注释实现检测
>
> TypeScript@2.3以后支持通过--checkJS 对.js 文件进行类型检查和错误提示
>
> // @ts-nocheck 忽而略类型检查
>
> // @ts-check 开启局部检测
>
> // @ts-ignore 忽略本行错误

```js
/** @type {number} */
var x;
x = 0; // OK
x = false; // Error
```

## 参考资料

[Understanding TypeScript's Popularity](https://orta.io/notes/js/why-typescript)

[译文](https://mp.weixin.qq.com/s/i1Y9GJAYMcCh1EPsJDWQtw)

[打包声明文件提案](https://github.com/Microsoft/TypeScript/issues/4433)

> TypeScript 分为两部分

- `编译器：处理语法部分`
- `语言工具：处理与编辑器集成的部分`
