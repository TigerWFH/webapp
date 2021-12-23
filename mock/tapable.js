const {
	SyncHook,
	SyncBailHook,
	SyncWaterfallHook,
    SyncLoopHook,
    
	AsyncParallelHook,
    AsyncParallelBailHook,
    
	AsyncSeriesHook,
	AsyncSeriesBailHook,
    AsyncSeriesWaterfallHook,
    // AsyncSeriesLoopHook
 } = require("tapable");

 class Car {
     constructor() {
         this.hooks = {
             syncHook: new SyncHook(['arg1', 'arg2', 'arg3']),/* yes 监听器的参数列表 触发器无cb 无返回值*/
             syncBailHook: new SyncBailHook(['arg1']),/* yes 监听器的参数列表 触发器无cb 有返回值 */
             syncWaterfallHook: new SyncWaterfallHook(['SyncWaterfallHook']),/* yes 监听器的参数列表 触发器无cb 有返回值 */
             syncLoopHook: new SyncLoopHook(['syncLoopHook']),/* no 监听器的参数列表 触发器无cb 无返回值*/

             asyncParallelHook: new AsyncParallelHook(['arg1']),/* yes 监听器的参数列表 async触发器有cb 无返回值*/
             asyncParallelBailHook: new AsyncParallelBailHook(['arg1']),/* no 监听器的参数列表 async触发器有cb 无返回值 */

             asyncSeriesHook: new AsyncSeriesHook(['arg1', 'arg2']),/* yes 监听器的参数列表 async触发器有cb 无返回值 */
             asyncSeriesBailHook: new AsyncSeriesBailHook(['arg1']),/* no 监听器参数列表，且需要一个callback：function cb(err, result): any async触发器有cb 无返回值 */
             asyncSeriesWaterfallHook: new AsyncSeriesWaterfallHook(['arg1', 'arg2'])/* yes 监听器参数列表，且需要一个callback：function cb(err, result): any async触发器有cb 无返回值 */
            //  asyncSeriesLoopHook: new AsyncSeriesLoopHook(['arg1', 'arg2'])
         }
     }

     init() {
        /*
        SyncHook、SyncBailHook、
        SyncWaterfallHook、SyncLoopHook---》支持tap；call、callAsync、promise

        AsyncSeriesHook、AsyncSeriesBailHook、
        AsyncSeriesWaterfallHook      ---》支持tap、tapAsync、tapPromise；callAsync、promise

        AsyncParallelHook、AsyncParallelBailHook---》支持tap、tapAsync、tapPromise；callAsync、promise
        */  
        // Sync
        this.hooks.syncHook.tap('SyncHook1', function(arg1, arg2, arg3) {
            console.log('arguments===>', arg1)
            console.log('arguments===>', arg2)
            console.log('arguments===>', arg3)
        })
        this.hooks.syncHook.tap('SyncHook2', (...args) => {
            console.log('args===>', args)
        })
        this.hooks.syncBailHook.tap('SyncBailHook', function(arg1) {
            console.log('SyncBailHook=======>', arg1)
            // return 123 // 终止后续监听器执行，且触发器返回该结果
            return undefined//继续执行后续监听器
        })
        this.hooks.syncBailHook.tap('SyncBailHook', function(arg1) {
            console.log('SyncBailHook2=======>', arg1)
            return 456
        })
        // this.hooks.syncWaterfallHook.tap('SyncWaterfallHook', function(arg1) {
        //     console.log('SyncWaterfallHook===>', arg1)
        //     return 111
        // })
        // this.hooks.syncWaterfallHook.tap('SyncWaterfallHook', function(arg1) {
        //     console.log('SyncWaterfallHook2===>', arg1)
        // })
        this.hooks.syncLoopHook.tap('syncLoopHook', (arg1) => {
            console.log('syncLoopHook===>', arg1)
            // return 1 // 一直执行当前监听器
            return undefined // 执行下一个监听器
        })
        this.hooks.syncLoopHook.tap('syncLoopHook', (arg1) => {
            console.log('syncLoopHook2===>', arg1)
        })
        // Async
        this.hooks.asyncSeriesHook.tap('AsyncSeriesHook-Sync', function(arg1, arg2){
            console.log('AsyncSeriesHook-Sync===>', arg1)
        })
        this.hooks.asyncSeriesHook.tap('AsyncSeriesHook-Sync', function(arg1, arg2){
            console.log('AsyncSeriesHook-Sync2===>', arg1)
        })
        /*
            支持tapAsync模式：
                AsyncSeriesHook、AsyncSeriesBailHook、AsyncSeriesWaterfallHook
                AsyncParallelHook、AsyncParallelBailHook
        */ 
        /* AsyncSeriesHook */
        this.hooks.asyncSeriesHook.tapAsync('AsyncSeriesHook', (params, params2, callback) => {
            console.log('AsyncSeriesHook===>', params)
            console.log('AsyncSeriesHook===>', params2)
            return callback()/* 执行下一个监听器  */
        })
        this.hooks.asyncSeriesHook.tapAsync('AsyncSeriesHook1', (params, params2, callback) => {
            console.log('AsyncSeriesHook1===>', params)
            console.log('AsyncSeriesHook1===>', params2)
            return callback()/* 最后一个监听器会执行callAsync中的callback  */
        })
        /* AsyncSeriesBailHook */ 
        this.hooks.asyncSeriesBailHook.tapAsync('asyncSeriesBailHook', (params, cb) => {
            /*
                cb签名：cb(err, result):void
                    出错直接执行callAsync中的callback(err)
                    result !== undefined，直接执行callAsync中的callback(null, result)
                    result === undefined，则执行下一个监听器
             */ 
            console.log('asyncSeriesBailHook===>', params)
            cb(null)// 执行下一个监听器
            // cb(null, 1)// 直接执行callback
        })
        this.hooks.asyncSeriesBailHook.tapAsync('asyncSeriesBailHook1', (params, cb) => {
            console.log('asyncSeriesBailHook1===>', params)
            cb(null)
        })
        this.hooks.asyncSeriesBailHook.tapAsync('asyncSeriesBailHook2', (params, cb) => {
            console.log('asyncSeriesBailHook2===>', params)
            cb(null)
        })
        /* AsyncSeriesWaterfallHook */ 
        this.hooks.asyncSeriesWaterfallHook.tapAsync('asyncSeriesWaterfallHook', (params, params2, cb) => {
            console.log('syncSeriesWaterfallHook===>', params)
            console.log('syncSeriesWaterfallHook===>', params2)
            cb(null, 1)
        })
        this.hooks.asyncSeriesWaterfallHook.tapAsync('asyncSeriesWaterfallHook2', (params,params2, cb) => {
            console.log('syncSeriesWaterfallHook2===>', params)
            console.log('syncSeriesWaterfallHook2===>', params2)
            cb(null)
        })
        /* AsyncParallelHook */ 
        this.hooks.asyncParallelHook.tapAsync('asyncParallelHook', (arg1, cb) => {
            console.log('asyncParallelHook===>', arg1)
            cb()
        })
        this.hooks.asyncParallelHook.tapAsync('asyncParallelHook2', (arg1, cb) => {
            console.log('asyncParallelHook2===>', arg1)
            cb()
        })
        /* AsyncParallelBailHook */ 
        this.hooks.asyncParallelBailHook.tapAsync('asyncParallelBailHook', (arg1, cb) => {
            console.log('asyncParallelBailHook===>', arg1)
            // cb(null, 1)//终止执行
            // cb({})//终止执行
            cb(null)//继续执行
        })
        this.hooks.asyncParallelBailHook.tapAsync('asyncParallelBailHook', (arg1, cb) => {
            console.log('asyncParallelBailHook2===>', arg1)
            cb(null)
        })

        /*
            tapPromise模式：
                AsyncSeriesHook、AsyncSeriesBailHook、AsyncSeriesWaterfallHook
                AsyncParallelHook、AsyncParallelBailHook
        */
        this.hooks.asyncSeriesHook.tapPromise('asyncSeriesHook-Promise', (arg1, arg2) => {
            console.log('promise====>', arg1)
            console.log('promise====>', arg2)
            return new Promise((resolve, reject) => {
                resolve()//继续执行后续监听器
                // reject()//终止后续监听器执行
            })
        })
        this.hooks.asyncSeriesHook.tapPromise('asyncSeriesHook-Promise', (arg1, arg2) => {
            console.log('promise2====>', arg1)
            console.log('promise2====>', arg2)
            return new Promise((resolve, reject) => {
                resolve()
            })
        })
     }
 }

 let car = new Car();
 car.init()
 car.hooks.syncWaterfallHook.callAsync("123", (err, result) => {
     console.log("result===>", result)
 })
//  car.hooks.syncHook.call(1,2,3)
//  car.hooks.syncHook.callAsync(1,2,3, (err) => {
//      console.log('callback=======')
//  })
//  car.hooks.syncHook.promise(4,5,6).then((result) => {
//      console.log('then')
//  }).catch((err) => {
//      console.log('catch')
//  })
//  let result = car.hooks.syncBailHook.call(1)
//  console.log('result===>', result)
// let result = car.hooks.syncWaterfallHook.call(22)
// console.log('result===>', result)
// car.hooks.syncLoopHook.call('666')
// car.hooks.asyncSeriesHook.call(1,2)
//  car.hooks.asyncSeriesHook.callAsync(1, 2, (err) => {
//      console.log('callback------->', err)
//  })
// car.hooks.asyncSeriesBailHook.callAsync(1, (error, result)=>{
//     console.log('asyncSeriesBailHook========>callback==>', result)
// })
// car.hooks.asyncSeriesWaterfallHook.callAsync(12, 21, (err, result) => {
//     console.log('asyncserieswaterfallhook====>', result)
// })
// car.hooks.asyncParallelHook.callAsync('doudou', (err) => {
//     console.log('callback===>', err)
// })
// car.hooks.asyncParallelBailHook.callAsync('doudou', (err, result) => {
//     console.log('callback--->', err)
//     console.log('callback--->', result)
// })
// car.hooks.asyncSeriesHook.promise('doudou', 'mingming').then((result) => {
//     console.log('then')
// }).catch((err) => {
//     console.log('err')
// })
