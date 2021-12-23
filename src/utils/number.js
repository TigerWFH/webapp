// 处理整数运算
function addSum(a, b) {
    if (Number.isNaN(Number(a)) || Number.isNaN(Number(b))) {
        throw new TypeError(`参数${a}和${b}的类型出错了，请输入数字或数字型字符串`)
    }

    const left = String(a).split("").reverse().join("")
    const right = String(b).split("").reverse().join("")
    const length = Math.max(left.length, right.length)
    let result = ""
    let step = 0
    let  i = 0
    while( i < length) {
        let sum = 0
        if (left[i] !== undefined && right[i] !== undefined) {
            sum = Number(left[i]) + Number(right[i]) + step
        } else if (left[i] !== undefined) {
            sum = Number(left[i]) + step
        }
        else if (right[i] !== undefined) {
            sum = Number(right[i]) + step
        }

        if (sum > 9) {
            step = 1
            sum = sum % 10
        }
        else {
            step = 0
        }
        result = sum + result
        i++
    }
    return result
}
// 处理浮点数运算
function handleDouble(a, b) {
    if (Number.isNaN(Number(a)) || Number.isNaN(Number(b))) {
        throw new TypeError(`参数${a}和${b}的类型出错了，请输入数字或数字型字符串`)
    }

    let left = String(a)
    let right = String(b)
    const length = Math.max(left.split(".")[1].length, right.split(".")[1].length) 
    left = left.replace(".", "")
    right = right.replace(".", "")
    // 直接使用除法，还是会触发上限问题
    const result = addSum(left, right).split("")
    result.splice(result.length - length, 0, ".")
    return result.join("")
}
let a = 0.1
let b = 0.2

const result = handleDouble(a, b)
console.log("result===>", result)
console.log("sum====>", a + b)