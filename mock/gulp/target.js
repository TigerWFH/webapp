const keyMirror = require('keymirror')
let tmp = {
    name: null,
    monkey: null
}
let kv_tmp = keyMirror(tmp)
console.log("tmp===>", tmp)
console.log("kv_tmp===>", kv_tmp)