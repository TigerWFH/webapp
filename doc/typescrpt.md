# 基础概念

## TypeScript 的核心原则之一是对值所具有的结构进行类型检查

- 接口：接口的作用就是`为类型命名`，`为代码定义契约`

```typescript
// 1、定义变量
interface LabelledValue {
  label: string; // 必选属性
  name?: string; // 可选属性, 称为options bag模式
  readonly x: number; // 只读属性, typescript有ReadonlyArray<T>类似Array<T>, 类型断言重写：a = ro as number[]
}

function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}
// 2、函数类型，可忽略参数名
interface SearchFunc {
  (source: string, substring: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function (source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
};
// 3、可索引类型，用于描述可以通过索引得到的类型比如a[10]或ageMap['XXX']，可索引类型觉有一个 索引签名，描述了对象索引的类型，还有索引返回值得类型
// TypeScript支持两种索引签名：字符串和数字,可以同时使用两种类型的索引，但是数字索引的返回值必须是字符串索引返回值类型的子类型
interface StringArray {
  [index: number]: string;
  readonly [index: number]: string; // 防止给索引赋值
}
let myArray: StringArray;
myArray = ["Monkey", "Cat"];
let myStr: string = myArray[0];
// 4、类类型，实现接口,与C#或Java里接口的基本作用一样，TypeScript也能够用它来明确的强制一个类去符合某种契约
// 接口描述了类的公共部分，而不是公共和私有两部分。 它不会帮你检查类是否具有某些私有成员
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date);
}

class Clock implements ClockInterface {
  currentTime: Date;
  setTime(d: Date) {
    this.currentTime = d;
  }
  constructor(h: number, m: number) {}
}
// 5、类静态部分与实例部分的区别
```

- `类型断言：` as

```typescript
interface SquareConfig {
  color?: string;
  width?: number;
}
function createSquare(config: SquareConfig): { color: string; area: number } {
  // ...
}
let mySquare = createSquare({ colour: "red", width: 100 }); // ts报错,可以是会用类型断言绕开报错
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig); // 最佳的方式是能够添加一个字符串索引签名
// 索引签名
interface SquareConfig {
  color?: string;
  width?: number;
  [propName: string]: any; // 索引签名，任意数量的其它属性
}
```

- `readonly 和 const:`属性使用 readonly，变量使用 const
-
