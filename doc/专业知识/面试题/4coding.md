# coding 以及前端涉及的业务常识

## coding 部分

### 1、实现一个 call（apply）函数

```js
/*
        函数作用域自带两个参数：this和arguments，
            arguments有一个属性callee指向对应函数
            this指向的是函数据以执行的 环境 对象（VO 和 AO？）
            环境（执行环境，规定了变量或函数能够访问的其它数据，并决定了他们各自的行为）
            作用域（AO或VO链）则规定了对数据的有权和有序访问
        每个函数都包含两个非继承而来的方法：apply(target, arrayparam)和call(target, ...rest)
            用途：在特定的作用域中调用函数，实际就是改变函数体内this对象的值(扩大函数赖以运行的作用域)
    */
// demo1
Function.prototype.myCall = function (target) {
  var context = Object(target) || window;
  context.fn = this;
  var param = '';
  for (var i = 1; i < arguments.length; i++) {
    param += arguments[i] + ',';
  }
  var result = eval('context.fn(' + param + ')');
  delete context.fn;
  return result;
};
Function.prototype.myApply = function (target) {
  var context = Object(target) || window;
  context.fn = this;
  var paramList = arguments.slice(1); // 数组参数
  var param = '';
  for (var i = 0; i < paramList.length; i++) {
    param += arguments[i] + ',';
  }
  var result = eval('context.fn(' + param + ')');
  delete context.fn;
  return result;
};
function add(a, b) {
  return a + b + this.c;
}
var tar = {
  c: 1
};
var result = add.myCall(tar, 1, 2);
console.log('result===>', result); // 4
```

### 2、实现一个 bind 函数

```js
// Ecmascript5 顶一个bind方法：创建一个函数实例，其this值会被绑定到传给bind函数的值
Function.prototype.myBind = function (target) {
  var context = Object(target) || window;
  context.fn = this;
  var param = '';
  for (var i = 1; i < arguments.length; i++) {
    param += arguments[i] + ',';
  }

  return function () {
    var result = eval('context.fn(' + param + ')');
    delete context.fn;

    return result;
  };
};

Function.prototype.myBind = function (target) {
  var param = [];
  for (var i = 1; i < arguments.length; i++) {
    param.push(arguments[i]);
  }
  return function () {
    return Function.prototype.myApply(target, param);
  };
};
// 新思路2
Function.prototype.myBind = function (fn, target) {
  var fnStr = fn.toString().replace(/\n/g, ''); // 去掉换行
  var argsStr = fnStr.slice(fnStr.indexOf('(' + 1, fnStr.indexOf(')')));
  var fnBody = fnStr.slice(fnStr.indexOf('{') + 1, fnStr.indexOf('}'));
  var newFn = new Function(argsStr, fnBody);
  return function () {
    newFn.apply(target, arguments);
  };
};
```

### 3、instanceof 的实现

```js
/*
        instanceof的本质是：检测右操作数的原型是否在左操作数的原型链上
    */

function myInstanceof(left, right) {
  let proto = left.__proto__;
  let result = false;
  while (proto !== null) {
    if (proto !== right.prototype) {
      proto = proto.__proto__;
      continue;
    } else {
      result = true;
    }
  }

  return result;
}
function myInstanceof(left, right) {
  let left = left.__proto__;
  while (1) {
    if (left === right.prototype) {
      return true;
    }
    if (left === null) {
      return false;
    }
    left = left.__proto__;
  }
}
```

### 4、Object.create()函数的实现

### 5、new 本质

```js
/*
        new的作用（Javascript高级程序设计第六章145页）：
        1、新建一个对象
        2、将构造函数作用域赋给新对象，即this指向新对象
        3、执行构造函数中的代码
        4、返回对象
    */
// 检测函数是否使用了new的原理：
//  1、新对象（即this）的this.__proto__和构造函数的prototyoe相同，即this.__proto__ === arguments.callee.prototype
//  2、新对象的 constructor和构造函数相同：即this.constructor === arguments.callee或函数名
//  3、判断当前对象是否是实例，即this instanceof arguments.callee

function Person() {
  if (this instanceof Person) {
    console.log('instanceof ===> using new');
  }
  if (this.constructor === arguments.callee) {
    console.log('constructor ===> using new');
  }
  if (this.__proto__ === arguments.callee.prototype) {
    console.log('prototype ===> using new');
  }
}
```

### 6、实现一个简易的 Promise

### 7、实现深拷贝(深比较和浅比较)，学习 immutablejs 思路

```js
/*
        redux：
            1、combineReducers：有改动，就会返回一个新引用state = {}，对象字面量形式；但是内部引用对象是reducer的返回对象（根据实现而定，可能是新引用也可能是旧引用）
        react-redux：
            1、Provider：监听store变化，并写入context
            2、connect：将mapStateToProps等注入到connectAdvanced中
            3、connectAdvanced：根据map***函数从context获取对应state注入到组件当中
        redux-thunk：声明一个函数代替表达式，将执行求值操作（evaluation）延迟到所需要的时刻，延迟dispatch的触发
            demo：
                let x = 1 + 2   ======>  let foo = () => 1 + 2
        redux-saga： 

        栈内存（stack）：系统分配和释放内存。用来存放函数的参数值、局部变量
        堆内存（heap）：系统分配内存，用户释放内存。内存大小动态，主要用于存储引用类型的值。
        基本数据类型：存放在栈内存，数据大小固定，内存空间大小固定。
        引用数据类型：存放在堆内存，数据大小不固定，内存空间大小不固定。但是堆的变量名（指针）存储在栈内存中，内存空间大小固定。

        浅拷贝：存在A对象，复制A对象得到B，两者属性指向同一块堆内存空间，则A与B有关联，就是浅拷贝。（修改A，B也随着改变）
        深拷贝：拷贝对象各个级的属性，没有关联，独享堆内存

        浅比较：
        深比较：也称原值相等，深比较是指检查两个对象的所有属性是否相等，深比较需要以递归方式遍历对象的所有属性，操作比较耗时，深比较不比较引用值是否相等

        比较：
            1、浅比较，只比较引用
            2、深比较，只比较属性
    */
let currentState = {};
function reducer(state = currentState) {
  return { ...currentState };
}
```

### 8、使用 setTimeout 模拟 setInterval

### 9、实现一个双向数据绑定

### 10、实现一个简单路由

### 11、实现一个懒加载

### 12、实现防抖（debounce）和节流（throttle）函数

```js
/*
    防抖（延迟执行）：以行为产生为起始时间begin，在规定的时间time内，如果某种行为不再产生，则执行该行为；否者，重新计算起始时间，在规定的时间time内不再产生新行为，则执行该行为
        思路：
            1、在事件触发时，不立即执行code，而是等待一个给定的时间delay，
            2、如果在delay内事件没有被触发，就执行code；
            3、如果在delay内事件再次被触发，重复1，2，3步骤
        效果：延迟执行（一直触发、一直不执行）
        缺陷：如果事件在给定的delay内持续被触发，意味着code永远不会被执行了
        改进：增加一个overtime，在超过overtime时，一定要执行一次code，这就是节流
    节流：在规定的时间time之内只执行一次触发，后续触发在规定时间内会被抛弃
        思路：在debounce基础上，克服debounce的缺陷，需要有一个超时执行机制
        效果：如果短时间内大量触发同一事件，那么执行一次后，该函数在指定的时间期限内不再工作
*/
// debounce防抖
function debounce(fn, delay) {
  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(fn, delay);
  };
}
// throttle节流
function throttle(fn, delay) {
  let valid = true;
  return function () {
    if (valid) {
      valid = false;
      setTimeout(() => {
        fn();
        valid = true;
      }, delay);
    }
  };
}
```

### 12、实现请求重试函数

## 常识与标准部分

### 时间概念：UTC（Coordinated Universal Time 国际协调时间，世界统一时间，世界标准时间）和 GMT（Greenwich Mean Time 格林泥治平均时）<https://www.jianshu.com/p/447dc86526d0?utm_campaign=maleskine&utm_content=note&utm_medium=seo_notes&utm_source=recommendation>

```js
/*
        正常情况，日期和时间都是基于本地时区创建。
        UTC：世界协调时间以原子时秒长为基础，在时刻上尽量接近世界时的一种时间计量系统
        GMT：

        计算机以1970年1月1日零时开始，经过的毫秒数保存日期，能够精确到锚点前后的285616年间隔
        Date.parse()
        Date.UTC()
        UTC和GMT一样，都和英国伦敦的本地时相同。UTC和GMT含义完全相同，但是GMT需要手动调时，以保证和UTC一致
        世界上每个地区都有自己的本地时间，整个地球划分24个时区，每个时区都有自己的本地时间
        北京时区是东八区，领先UTC8个小时

        UTC + 时区差 = 本地时间
        时区差东为正，西为负
    */
```
