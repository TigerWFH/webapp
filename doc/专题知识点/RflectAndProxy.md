```
// Proxy(target, handler)
// handler是一个占位符
/*
handler = {
    getPrototypeOf: function,访问代理对象的原型时触发该操作, 执行 Object.getPrototypeOf(proxy)
    setPrototypeOf: function,设置代理对象的原型时触发该操作, 执行 Object.setPrototypeOf(proxy, null)
    isExtensible: function,判断一个代理对象是否是可扩展时触发该操作, 执行 Object.isExtensible(proxy)
    preventExtensions: function,让一个代理对象不可扩展时触发该操作, 执行 Object.preventExtensions(proxy)
    getOwnPropertyDescriptor: function,获取代理对象某个属性的属性描述时触发该操作, 执行 Object.getOwnPropertyDescriptor(proxy, "foo")
    defineProperty: function,定义代理对象某个属性时的属性描述时触发该操作, 执行 Object.defineProperty(proxy, "foo", {}) 
    has: function, 判断代理对象是否拥有某个属性时触发该操作, 执行 "foo" in proxy
    get: function, 读取代理对象的某个属性时触发该操作, 执行 proxy.foo
    set: function, 给代理对象的某个属性赋值时触发该操作, 执行 proxy.foo = 1 
    deleteProperty: function, 删除代理对象的某个属性时触发该操作, 即使用 delete 运算符
    ownKeys: function,Object.getOwnPropertyNames 和Object.getOwnPropertySymbols 的陷阱
    apply: 函数调用操作的陷阱,
    constructor: new 运算符的陷阱
}
 */
// Reflect,类似Math，是一个全局内置对象
/* 
    Reflect.getPrototype(等同于Object.getPrototype),
    Reflect.setPrototype(等同于Object.setPrototype),
    Reflect.isExtensible(等同于Object.isExtensible),
    Reflect.preventExtensions(等同于Object.preventExtensions),返回boolean
    Reflect.getOwnPropertyDescriptor(等同于Object.getOwnPropertyDescriptor),
    Reflect.defineProperty(等同于Object.defineProperty),
    Reflect.has(等同于in运算符),
    Reflect.get,
    Reflect.set,返回boolean
    Reflect.deleteProperty(相当于delete),
    Reflect.ownKeys(类似Object.keys,但不受enumerable影响),返回数组
    Reflect.apply,
    Reflect.constructor,

 */
function watch(obj) {
    // todo: 返回一个新对象，对象属性与obj.data相同
    // 当data下的属性改变时，调用watch下的同名函数，不存在不调用
    let target = new Proxy(obj.data, {
        set: function(target, property, value, reciever) {
            let propertyList = Reflect.ownKeys(target);
            let func = obj.watch[property];
            propertyList.forEach((key) => {
                if (typeof func === 'function') {
                    func(obj.data[key], obj.data[key]);
                }
                if (typeof target[key] === 'object') {
                    new Proxy(target[key], {
                        set: function(target, property, value, receiver) {
                            Reflect.set(target, property, value, receiver);
                        }
                    });
                }
                else {
                    Reflect.set(target, property, value, reciever);
                }
            })
        }
    })

    return target;
}

const obj = {
    data: {
        a: 1,
        b: {
            c: 1
        }
    },
    watch: {
        a(val, oldVal) {
            console.log(val, oldVal)
        },
        b(val, oldVal) {
            console.log(val, oldVal)
        }
    }
}

const instance = watch(obj);
instance.a = 2; // log==>2 1
instance.b.c = 2; // log ==>{c: 2}{c:1}
instance.x = 'x';
```