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
    return ({ dispatch, getState }) => (next) => (action) => {
        console.log("async-action-dispatch===>", dispatch)
        if (typeof action === 'function') {
            return action(dispatch, getState, extraArgument);
        }

        return next(action);
    };
}

const thunk = createThunkMiddleware();

let dispatch = (action, ...args) => {
    console.log("origin")
}

const middlewareAPI = {
    dispatch: (action, ...args) => { return dispatch(action, ...args) }
}

dispatch = thunk(middlewareAPI)(function(action, ...args){console.log("new dispatch")})

dispatch(1, 23)