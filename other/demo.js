'use strict';

function _typeof(obj) {
  '@babel/helpers - typeof';
  return (
    (_typeof =
      'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
        ? function (obj) {
            return typeof obj;
          }
        : function (obj) {
            return obj &&
              'function' == typeof Symbol &&
              obj.constructor === Symbol &&
              obj !== Symbol.prototype
              ? 'symbol'
              : typeof obj;
          }),
    _typeof(obj)
  );
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function');
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true }
  });
  Object.defineProperty(subClass, 'prototype', { writable: false });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
  return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError(
      'Derived constructors may only return object or undefined'
    );
  }
  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return self;
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === 'function') return true;
  try {
    Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {})
    );
    return true;
  } catch (e) {
    return false;
  }
}

function _get() {
  if (typeof Reflect !== 'undefined' && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);
      if (desc.get) {
        return desc.get.call(arguments.length < 3 ? target : receiver);
      }
      return desc.value;
    };
  }
  return _get.apply(this, arguments);
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }
  return object;
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, 'prototype', { writable: false });
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var Animal = /*#__PURE__*/ (function () {
  function Animal(name, age) {
    var _this = this;

    _classCallCheck(this, Animal);

    _defineProperty(this, 'getAge', function () {
      console.log('animal-age');
      return _this.age;
    });

    this.name = name || 'Animal';
    this.age = age || 0;
  }

  _createClass(Animal, [
    {
      key: 'getName',
      value: function getName() {
        console.log('animal-name');
        return this.name;
      }
    }
  ]);

  return Animal;
})();

var Monkey = /*#__PURE__*/ (function (_Animal) {
  // 改写子类原型
  _inherits(Monkey, _Animal);

  var _super = _createSuper(Monkey);

  function Monkey(name, age, desc) {
    console.log('getAge_in_Monkey======>', Monkey.prototype.getAge);
    var _thisSuper, _this2;
    /*
        结论1：
            class中，箭头函数是挂载在实例上的；非箭头函数是挂载在原型上的
        结论2：
            基类Animal中的箭头函数挂载到基类实例上的；
            子类Monkey中的箭头函数是挂载到子类实例上的；
        结论3：
            编译后代码逻辑：
                改写子类的原型指向父类原型，并改写constructor
                创建基类实例，并将子类的实例属性挂到基类实例，返回该实例即可
                原型上存在getAge（Monkey子类原型自带），实例上也存在getAge（Animal基类实例上的getAge）
    */
    _classCallCheck(this, Monkey);

    _this2 = _super.call(this, name, age);

    _defineProperty(_assertThisInitialized(_this2), 'getName', function () {
      _get(
        ((_thisSuper = _assertThisInitialized(_this2)),
        _getPrototypeOf(Monkey.prototype)),
        'getName',
        _thisSuper
      ).call(_thisSuper);

      console.log('monkey_name');
      return _this2.name;
    });

    _this2.desc = desc;
    return _this2;
  }
  // 为子类原型添加原型函数（class Monkey中的非箭头函数）
  _createClass(Monkey, [
    {
      key: 'getAge',
      value: function getAge() {
        console.log('monkey_age');
      }
    }
  ]);

  return Monkey;
})(Animal);

var monkey = new Monkey('monkey', 12, 'I am a monkey');
console.log('******************');
monkey.getAge();
monkey.__proto__.getAge();
// let target = [1,2,3,2,34,3,4,523,23,45,768,34,34,1,23,345];

// function selectSort(arr) {
//     if (!Array.isArray(arr)) {
//         throw TypeError('请输入数组');
//     }

//     if (arr.length <= 1) {
//         return arr;
//     }

//     const target = arr.slice();
//     // 比较轮次
//     for (let i = 0; i < target.length - 1; i++) {
//         let selected = target[i];
//         let index = i;
//         for (let j = i + 1; j < target.length; j++) {
//             if (target[j] < selected) {
//                 selected = target[j];
//                 index = j;
//             }
//         }
//         if (index !== i) {
//             target[index] = target[i];
//             target[i] = selected;
//         }
//     }

//     console.log("selectSort-origin===>", arr);
//     console.log("selectSort-sort===>", target);

//     return target;
// }

// selectSort(target);

// function heapSort(arr) {
//     if (!Array.isArray(arr)) {
//         throw TypeError('请输入数组');
//     }

//     if (arr.length <= 1) {
//         return arr;
//     }

//     const target = arr.slice();
//     let length = target.length;
//     while(length > 1) {
//         const result = adjustHeap(target, length);
//         target[0] = target[length - 1];
//         target[length - 1] = result;
//         length--;
//     }
//     console.log("heapSort--origin===>", arr);
//     console.log("heapSort--sort===>", target);

//     return target;
// }

// function adjustHeap(arr, length) {
//     if (typeof length !== 'number') {
//         throw new TypeError('length is not a number');
//     }
//     // 索引从0开始
//     let max = Math.floor(length / 2) - 1;
//     while(max >= 0) {
//         if ((2 * max + 2) < length && arr[2 * max + 2] > arr[max]) {
//             const tmp = arr[2 * max + 2];
//             arr[2 * max + 2] = arr[max];
//             arr[max] = tmp;
//         }
//         if ((2 * max + 1) < length && arr[2 * max + 1] > arr[max]) {
//             const tmp = arr[2 * max + 1];
//             arr[2 * max + 1] = arr[max];
//             arr[max] = tmp;
//         }

//         max--;
//     }

//     return arr[0];
// }

// heapSort(target);

// function insertSort(arr) {
//     if (!Array.isArray(arr)) {
//         throw new TypeError('请输入数组');
//     }

//     if (arr.length <= 1) {
//         return arr;
//     }

//     const target  = arr.slice();
//     // 从第二个元素开始比较插入
//     for (let i = 1; i < target.length; i++) {
//         // 进行比较，直到找到合适位置
//         for (let j = i - 1; j >= 0; j--) {
//             if (target[j] > target[j + 1]) {
//                 const tmp = target[j];
//                 target[j] = target[j + 1];
//                 target[j + 1] = tmp;
//             }
//         }
//     }

//     console.log('insertSort-origin===>', arr);
//     console.log('insertSort-sort===>', target);
// }

// insertSort(target);

// function shellSort(arr) {
//     // 推荐距离d=2^length
// }

function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) =>
    (next) =>
    (action) => {
      console.log('async-action-dispatch===>', dispatch);
      if (typeof action === 'function') {
        return action(dispatch, getState, extraArgument);
      }

      return next(action);
    };
}

const thunk = createThunkMiddleware();

let dispatch = (action, ...args) => {
  console.log('origin');
};

const middlewareAPI = {
  dispatch: (action, ...args) => {
    return dispatch(action, ...args);
  }
};

dispatch = thunk(middlewareAPI)(function (action, ...args) {
  console.log('new dispatch');
});

dispatch(1, 23);
