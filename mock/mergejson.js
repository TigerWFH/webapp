// 合并JSON对象
function isObject(json) {
    return Object.prototype.toString.apply(json) === "[object Object]"
}

function mergeJSON(json1, json2) {
    if (isObject(json1) && isObject(json2)) {
        const target = JSON.parse(JSON.stringify(json1))
        Object.keys(json2).forEach((key) => {
            if (target[key] === undefined) {
                target[key] = json2[key]
            } else if (isObject(json1[key]) && isObject(json2[key])) {
                target[key] = mergeJSON(json1[key], json2[key])
            }
        })

        return target
    } 
    if (!Boolean(json1) && Boolean(json2)) {
        return json2
    }

    return json1
}

let json1 = {
    name: "monkey",
    age: null,
    id: {
        info: 1
    }
}
let json2 = {
    name: "fish",
    age: 456,
    id: {
        info: 2,
        age: 3
    },
    in: 1
}

const result = mergeJSON(null, null)
console.log("result===>", result)
const result2 = mergeJSON(json1, json2)
console.log("json1===>", json1)
console.log("result2===>", result2)
const result3 = mergeJSON(undefined, undefined)
console.log("result3===>", result3)
const result4 = mergeJSON(()=>{}, ()=>{})
console.log("result4===>", result4)