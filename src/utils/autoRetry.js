/*
    失败重试
    1、重试次数
    2、delay
*/

function autoRetry(retryMax, delay, fn, ...params) {
    const data = {
        code: 0,
        msg: '成功',
        data: null
    }
    return new Promise((resolve, reject) => {
        if (retryMax <= 0) {
            data.code = 50001
            data.msg = '超出请求次数'
            return reject(data)
        }
        else {
            retryMax--;
            return fn( ...params)
                .then(res => {
                    data.data = res
                    return resolve(data)
                })
                .catch(err => {
                    setTimeout(() => {
                        return resolve(autoRetry(retryMax, delay, fn))
                    }, delay)
                })
        }
    })
}

let count = 1
const fn = function () {
    return new Promise((resolve, reject) => {
        console.log("cout===>", count++)
        if (count > 3) {
            return resolve(count)
        }
        else {
            return reject(count)
        }
    })
}

autoRetry(3, 1000, fn)
    .then((res) => {
        console.log("=====>", res)
    })
    .catch(err => {
        console.log("===>", err)
    })

