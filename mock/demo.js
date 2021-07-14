let arr = [1, 2, 3, 8, 5, 2, 1, 90, 23892, 1, 334, 4,1, 2, 3, 8, 5, 2, 1, 90, 23892, 1, 334, 4, 4, 4, 4, 2,34, 34, 2, 78];
// let arr = [1, 2, 3, 8, 5, 1, 2, 3, 8, 5];
// let arr = [];
// for (let i = 1; i < 9000; i++) {
//     arr.push(i);
// }
let begin = new Date().valueOf();
/*************************插入排序*********************************/
// function insertSort(arr) {
//     for (let i = 1; i < arr.length; i++) {
//         for (let j = i; j > 0; j--) {
//             if (arr[j] < arr[j - 1]) {
//                 let tmp = arr[j - 1];
//                 arr[j - 1] = arr[j];
//                 arr[j] = tmp;
//             }
//         }
//     }
// }

// insertSort(arr);
/*************************归并排序*********************************/
// function mergeSort(arr, left, right, tmp) {
//     if (left >= right) {
//         return;
//     }
//     let middle = Math.floor((left + right) / 2);
//     mergeSort(arr, left, middle, tmp);
//     mergeSort(arr, middle + 1, right, tmp);
//     merge(arr, left, middle, right, tmp);
// }
// function merge(arr, left, middle, right, tmp) {
//     let start = left;
//     let end = right;
//     let begin = middle + 1;
//     let point = left;
//     while (left <= middle && begin  <= right) {
//         if (arr[left] <= arr[begin]) {
//             tmp[point++] = arr[left++];
//         }
//         else {
//             tmp[point++] = arr[begin++];
//         }
//     }
//     while (left <= middle) {
//         tmp[point++] = arr[left++];
//     }
//     while (begin <= right) {
//         tmp[point++] = arr[begin++];
//     }

//     while (start <= end) {
//         point = start;
//         arr[start++] = tmp[point++];
//     }
// }
// let tmp = [];
// mergeSort(arr, 0, arr.length - 1, tmp);
/*************************快速排序*********************************/
// function quickSort(arr, left, right) {
//     if (left >= right) {
//         return arr;
//     }
//     let index = partion(arr, left, right);
//     quickSort(arr, left, index - 1);
//     quickSort(arr, index + 1, right);
// }
// quickSort(arr, 0, arr.length - 1);
// function partion(arr, left, right) {
//     let pivot = arr[left];
//     while (left < right) {
//         while (left < right && arr[right] >= pivot) {
//             right--;
//         }
//         if (left < right) {
//             arr[left] = arr[right];
//             arr[right] = pivot;
//             left++;
//         }
//         while(left < right && arr[left] <= pivot) {
//             left++;
//         }
//         if (left < right) {
//             arr[right] = arr[left];
//             arr[left] = pivot;
//             right--;
//         }
//     }

//     return left;
// }
/*************************堆排序*********************************/
// function  deapSort(arr) {
//     let length = arr.length;
//     while(length >= 1) {
//         adjustDeap(arr, length);
//         let tmp = arr[0];
//         arr[0] = arr[length - 1];
//         arr[length - 1] = tmp;
//         length--;
//     }
// }
// function adjustDeap(arr, num) {
//     // 序号从0开始
//     let begin = Math.floor(num / 2) - 1;
//     while(begin >= 0) {
//         let tmp = arr[begin];
//         if ((2 * begin + 1) < num && arr[2 * begin + 1] > arr[begin]) {
//             arr[begin] = arr[2 * begin + 1];
//             arr[2 * begin + 1] = tmp;
//             tmp = arr[begin];
//         }
//         if ((2 * begin + 2) < num && arr[2 * begin + 2] > arr[begin]) {
//             arr[begin] = arr[2 * begin + 2];
//             arr[2 * begin + 2] = tmp;
//             tmp = arr[begin];
//         }
//         begin--;
//     }
// }

// deapSort(arr, arr.length);
/**********************************************************/
let end = new Date().valueOf();
console.log("arr===>", arr);
console.log("time===>", end - begin);

let ta = {
    name: 'monkey',
    age: 12
}
/**
 * 终止条件：data === undefined | typeof data === (string, boolean, number)
 * 
 * */
function hold(data) {
    if (!data || typeof data !== 'object') {
        return
    }
    if (Array.isArray(data)) {
    }
    else {
        Object.keys(data).forEach((key) => {
            
        })
    }
}
hold(ta)
ta.name = '123'
console.log('------>', ta.name)




