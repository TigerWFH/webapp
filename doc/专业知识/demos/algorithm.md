# 数据结构预备知识

## 术语

- `内部排序：`待排序的记录全部放到内存中进行排序，时间复杂度等于比较的次数
- `外部排序：`数据量很大，内存无法容纳，需要对外存进行访问再排序，时间复杂度大约等于 IO（外存）的次数
- `算法稳定性：`一个稳定的算法是一个能够保留元素的相对顺序的算法；如果键是相同的，我们可以保证这些元素在列表中的顺序与它们被排序前的顺序相同。另一方面，一个 unstable 的算法是，如果发现两个项目有相同的排序键，则不能保证它们的相对顺序会被保留。

- `算法时间复杂度：`时间度量算法
- `算法空间复杂度：`空间度量算法

## 时间复杂度定义（大 O 符号表示法）

> 如果一个问题的规模是 n，解这一问题的某一算法所需要的时间为 T(n)，它是 n 的某一函数 T(n)称为这一算法的时间复杂度，即 T(n) = O(f(n))
>
> nlogn 时间复杂度的计算：https://www.jianshu.com/p/bad0ac6c3368?ivk_sa=1024320u

```js
/*
  T(n) = 2*T(n/2) + n
        = 2*(2*t(n/4) + n/2) + n
        = 2^2T(n/2^2)+2n
        = 2^kT(n/2^k)+kn
  令T(n/2^k) = T(1) = C时，n/2^k = 1，得到k = log2n；带入公式：T(n) = Cn + nlog2n
  大O标记为：O(n+log2n)
*/
```

## 分治策略

```plain
    1、分解（Divide）：将问题划分成一些子问题，子问题的形式和原问题一样，只是规模更小
    2、解决（Conquer）：递归的求解子问题，如果子问题规模足够小，则停止递归，直接求解
    3、合并（Combine）：将子问题的解，组合成原问题的解

    递归情况（recursive case）：子问题规模较大，需要继续递归求解
    基本情况（base case）：子问题规模足够小，直接求解

    递归式（recurrence）：等式或不等式
    求解递归式的方法：
    1、代入法：猜测一个界，用数学归纳法证明
    2、递归树法：
    3、主方法：递推公式
```

## 排序算法（十种排序算法）

- 内部排序（纯内存）

```plain
    稳定：排序前后，相同元素位置不变；否者就是不稳定
    in-place：占用常量内存，不占用额外内存，即与规模n无关
    out-place：占用额外内存，与规模n有关
    原地算法（in-place algorithm）基本上不需要额外辅助的数据结构,然而,允许少量额外的辅助变量来转换数据的算法。

    1、交换排序(冒泡排序_稳定 和 快速排序_不稳定), in-place
    2、插入排序(简单插入排序_稳定 和 希尔排序_不稳定), in-place
    3、选择排序(简单选择排序_不稳定 和 堆排序_不稳定), in-place
    4、归并排序,稳定, out-place
    5、基数排序, out-place
    6、桶排序, out-place
```

- 外部排序（内存+disk）

```plain

```

- 算法选用

```plain
    归并排序：内存够，读取次数少，稳定，O(nlogn)
    快速排序：内存够，元素基本有序，不稳定，O(nlogn)，容易内存溢出（递归）
    堆排序：内存够，元素无序，不稳定，O(nlogn)
    希尔排序：内存够，元素无序，不稳定，O(nlogn)
```

### 交换排序

- 冒泡排序（稳定, O(n^2), in-place, O(1)）
  > 冒泡排序：从`待排序列`中的第一个元素开始，`依次`对`相邻`的两个元素进行比较，如果前一个元素`大于`后一个元素则交换他们的位置。如果前一个元素`小于或等于`后一个元素则`不交换`他们的位置。这一比较和交换的操作一直持续到最后一个还未排好序的元素为止。

```js
let arr = [1, 2, 3, 8, 5, 2, 1];
let begin = new Date().valueOf();
function bubleSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let hasSwap = false;
    for (let j = 0; j < arr.length - i; j++) {
      if (arr[j] > arr[j + 1]) {
        hasSwap = true;
        let tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
      }
    }
    if (!hasSwap) {
      break;
    }
  }
}
bubleSort(arr);
let end = new Date().valueOf();
console.log('sorted array===>', arr);
console.log('time===>', end - begin);
```

- 快速排序（不稳定, O(nlogn), in-place, O(logn)
  > 快速排序：从`待排序列`中选择一个基准数，通过一趟排序将待排序的数据进行分割：其中`一部分`的所有数据都比`另一部分`的所有数据都要`小`。然后，再按此方法分别对这两部分数据进行快速排序，整个排序过程可以递归进行，以此达到整个序列变成有序序列。

```js
// first
function quickSort(arr, left, right) {
  if (left >= right) {
    return arr;
  }
  let index = partion(arr, left, right);
  quickSort(arr, left, index);
  quickSort(arr, index + 1, right);
}

function partion(arr, left, right) {
  let start = left;
  let end = right;
  let pivot = arr[start];
  while (start < end) {
    while (start < end && arr[end] > pivot) {
      end--;
    }
    if (start < end) {
      arr[start] = arr[end];
      arr[end] = pivot;
      start++;
    }
    while (start < end && arr[start] < pivot) {
      start++;
    }
    if (start < end) {
      arr[end] = arr[start];
      arr[start] = pivot;
      end--;
    }
  }

  return start;
}

let arr = new Array(10).fill(0).map((item) => Math.floor(Math.random() * 100));
let begin = new Date().valueOf();
quickSort(arr, 0, arr.length - 1);
let end = new Date().valueOf();
console.log('===>', arr);
console.log('time===>', end - begin);
// second
function quickSort(arr) {
  const partition = (start, end) => {
    if (start >= end) {
      return;
    }
    const pivot = arr[end];
    let left = start;
    let right = end;

    while (left < right) {
      while (left < right && arr[left] < pivot) {
        left++;
      }
      while (right > left && arr[right] >= pivot) {
        right--;
      }
      if (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
      }
    }
    // 关键点，不调整pivot，永远无法排序
    arr[end] = arr[left];
    arr[left] = pivot;
    partition(start, left - 1);
    partition(right, end);
  };
  partition(0, arr.length - 1);
}

const unorderList = new Array(10)
  .fill(0)
  .map((item) => Math.floor(Math.random() * 100));
console.log('before===>', unorderList);
quickSort(unorderList);
console.log('quickSort', unorderList);
```

### 插入排序

- 直接插入排序（稳定, O(n^2), in-place, O(1), 适合小规模、基本有序数据集合）
  > 直接插入排序：从`待排序列`中选择元素，并插入到已经排序好的`有序表`中，直到`待排序列`中所有元素全部插入完毕。
  >
  > 从`待排序列`的`第二个`元素开始往前比较，即一开始用第二个数据和第二个数据前面的所有数据进行比较，如果符合`比较规则`则让他们交换位置，直接

```js
let arr = [];
for (let i = 1; i < 10000; i++) {
  arr.push(i);
}
// 插入排序
let begin = new Date().valueOf();
function insertSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    for (let j = i; j > 0; j--) {
      if (arr[j] < arr[j - 1]) {
        let tmp = arr[j - 1];
        arr[j - 1] = arr[j];
        arr[j] = tmp;
      }
    }
  }
}
insertSort(arr);
let end = new Date().valueOf();
console.log('===>', arr);
console.log('time===>', end - begin);
```

- 希尔排序（不稳定, O(nlogn), in-place, O(1)），`递减量`排序算法，是插入排序的一种更高效的改进版本
  >

```js
    // 增量方式：1、gap = length / 2; gap /= 2
    //
    // 1、确定距离gap
    // 2、确定虚拟数组个数
    // 3、对当前虚拟组进行排序
    // let arr = [1, 2, 3, 8, 5, 2, 1, 90, 23892, 1, 334, 4, 4, 4, 2,34, 34, 2, 78];
    let arr = [];
    for (let i = 1; i < 10000; i++) {
        arr.push(i);
    }
    // 插入排序
    let begin = new Date().valueOf();
    let length = arr.length;
    let maxK = Math.floor(Math.log2(length + 1));
    // 确定gap
    for (let i = maxK; i > 0; i--) {
        let gap = Math.pow(2, i) - 1;
        // 确定比较组数（不细致）
        for (let j = gap; j < length; j++) {
            // 对当前组数据进行排序
            for (let k = gap; k < length; k += gap) {
                if (arr[k] < arr[k - gap]) {
                    let tmp = arr[k];
                    arr[k] = arr[k - gap];
                    arr[k - gap] = tmp;
                }
            }
        }
    }
    let end = new Date().valueOf();
    console.log("===>", arr);
    console.log("time===>", end - begin);

    <!-- 改进算法 -->
    let arr = [1, 2, 3, 8, 5, 2, 1, 90, 23892, 1, 334, 4,1, 2, 3, 8, 5, 2, 1, 90, 23892, 1, 334, 4, 4, 4, 4, 2,34, 34, 2, 78];
    // let arr = [];
    // for (let i = 1; i < 10000; i++) {
    //     arr.push(i);
    // }
    // 插入排序
    let begin = new Date().valueOf();
    function shellSort(arr) {
        let length = arr.length;
        let maxK = Math.floor(Math.log2(length + 1));
        // 确定gap
        for (let i = maxK; i > 0; i--) {
            let gap = Math.pow(2, i) - 1;
            // 确定组数length/gap
            for (let j = 0; j < length / gap; j++) {
                // 对当前组进行排序
                for (let k = gap + j; k < length; k += gap) {
                    if (arr[k] < arr[k - gap]) {
                        let tmp = arr[k];
                        arr[k] = arr[k - gap];
                        arr[k - gap] = tmp;
                    }
                }
            }
        }
    }
    shellSort(arr);
    let end = new Date().valueOf();
    console.log("===>", arr);
    console.log("time===>", end - begin);
```

### 选择排序

- 简单选择排序（不稳定, O(n^2), in-place, O(1)）

```js
let arr = [
  1, 2, 3, 8, 5, 2, 1, 90, 23892, 1, 334, 4, 1, 2, 3, 8, 5, 2, 1, 90, 23892, 1,
  334, 4, 4, 4, 4, 2, 34, 34, 2, 78
];
// let arr = [];
// for (let i = 1; i < 10000; i++) {
//     arr.push(i);
// }
let begin = new Date().valueOf();
// 选择排序
function selectSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let pivot = arr[0];
    let point = 0;
    for (let j = 0; j <= arr.length - i; j++) {
      if (pivot < arr[j]) {
        pivot = arr[j];
        point = j;
      }
    }
    arr[point] = arr[arr.length - i];
    arr[arr.length - i] = pivot;
  }
}

selectSort(arr);
let end = new Date().valueOf();
console.log('===>', arr);
console.log('time===>', end - begin);
```

- 堆排序（不稳定, O(nlogn), in-place, O(1)）

```js
思想：每建一次堆，选出一个已排序元素；将剩余元素建堆，选出第二个元素；依次类推，直到将所有选出并排序
let arr = [1, 2, 3, 8, 5, 2, 1, 90, 23892, 1, 334, 4,1, 2, 3, 8, 5, 2, 1, 90, 23892, 1, 334, 4, 4, 4, 4, 2,34, 34, 2, 78];
// let arr = [1, 2, 3, 8, 5];
// let arr = [];
// for (let i = 1; i < 10000; i++) {
//     arr.push(i);
// }
let begin = new Date().valueOf();
function  deapSort(arr) {
    let length = arr.length;
    while(length >= 1) {
        adjustDeap(arr, length);
        let tmp = arr[0];
        arr[0] = arr[length - 1];
        arr[length - 1] = tmp;
        length--;
    }
}
// 1、建堆（建堆的过程，就是选择的过程）
function adjustDeap(arr, num) {
    // 序号从0开始
    let begin = Math.floor(num / 2) - 1;
    while(begin >= 0) {
        let tmp = arr[begin];
        if ((2 * begin + 1) < num && arr[2 * begin + 1] > arr[begin]) {
            arr[begin] = arr[2 * begin + 1];
            arr[2 * begin + 1] = tmp;
            tmp = arr[begin];
        }
        if ((2 * begin + 2) < num && arr[2 * begin + 2] > arr[begin]) {
            arr[begin] = arr[2 * begin + 2];
            arr[2 * begin + 2] = tmp;
            tmp = arr[begin];
        }
        begin--;
    }
}

deapSort(arr, arr.length);
let end = new Date().valueOf();
console.log("===>", arr);
console.log("time===>", end - begin);
```

### 归并排序(稳定, O(nlogn), out-place, O(n))

```js
let arr = [
  1, 2, 3, 8, 5, 2, 1, 90, 23892, 1, 334, 4, 1, 2, 3, 8, 5, 2, 1, 90, 23892, 1,
  334, 4, 4, 4, 4, 2, 34, 34, 2, 78
];
// let arr = [1, 2, 3, 8, 5, 1, 2, 3, 8, 5];
// let arr = [];
// for (let i = 1; i < 9000; i++) {
//     arr.push(i);
// }
let begin = new Date().valueOf();
/*************************归并排序*********************************/
function mergeSort(arr, left, right, tmp) {
  if (left >= right) {
    return;
  }
  let middle = Math.floor((left + right) / 2);
  mergeSort(arr, left, middle, tmp);
  mergeSort(arr, middle + 1, right, tmp);
  merge(arr, left, middle, right, tmp);
}
function merge(arr, left, middle, right, tmp) {
  let start = left;
  let end = right;
  let begin = middle + 1;
  let point = left;
  while (left <= middle && begin <= right) {
    if (arr[left] <= arr[begin]) {
      tmp[point++] = arr[left++];
    } else {
      tmp[point++] = arr[begin++];
    }
  }
  while (left <= middle) {
    tmp[point++] = arr[left++];
  }
  while (begin <= right) {
    tmp[point++] = arr[begin++];
  }

  while (start <= end) {
    point = start;
    arr[start++] = tmp[point++];
  }
}
let tmp = [];
mergeSort(arr, 0, arr.length - 1, tmp);
let end = new Date().valueOf();
console.log('arr===>', arr);
console.log('time===>', end - begin);
```

### 桶排序（非比较型排序算法，看概念有点像针对特定数据使用）

```js
    1、桶排序：桶排序是将待排序集合中处于同一个值域的元素存入同一个桶中，也就是根据元素值特性将集合拆分为多个区域，则拆分后形成的多个桶，从值域上看是处于有序状态的。对每个桶中元素进行排序，则所有桶中元素构成的集合是已排序的。
```

### 计数排序（特殊的桶排序，利用数组下标确定元素容器，针对自然数集的排序）

### 基数排序（计数指数的位，例如十进制的个位、十位等等，特殊的桶排序）

## 数据结构

### 集合

- 数学定义

```plain
    朴素集合论的定义：集合是确定的一堆东西，集合里的东西称为元素。
    现代集合论的定义：由一个或多个元素组成的整体。

    集合的性质：确定性、互异性、无序性
    数学中的集合是不变的

    集合A和集合B上的二元关系R是笛卡尔积AXB的子集。（a,b）属于R，有时候写作aRb。
    称R是集合A上的一个二元关系，意味着R是AXA的子集。

```

- 计算机科学定义

```plain
    计算机科学中集合也是一堆元素，不过在整个算法过程中，集合是可以增大、缩小或发生其它变化的。这样的集合被称为动态集合。
    不同的算法对集合可能需要执行不同的操作，例如
    字典（dictionary）：能在该集合上进行插入和删除元素，以及测试元素是否属于集合。
    动态集合的元素：在动态集合的典型实现中，每个元素都有一个对象来表示，如果有一个指向对象的指针，就能对其各个属性进行检查和操作。
    动态集合上的操作：1、查询操作；2、修改操作
    查询操作：给定一个集合S和关键字k，返回指向S中某个元素的指针x，使x.key = key；如果集合中没有这样的元素，返回NULL

    个人理解：集合就是一堆元素和基于这堆元素的操作，就是编程语言中的类型（内置类型），也是class（class就是自定义的外部类型），不同的集合（类型）有着不同的逻辑。
    每种集合都会支持查询操作和修改操作，但是效率却不一样。
```

### 栈（Stack）：实现的是一种后进先出（LIFO）的策略

```plain
    栈拥有的属性栈顶s.top，指向最新插入的元素
    压栈（push）：插入操作，常量操作
    出栈（pop）：删除操作，常量操作
    判空（empty）：判断栈是否为空，常量操作

    栈下溢（underflow）：空栈弹出元素
    栈上溢（overflow）：超出栈长增加元素
```

### 队列（Queue）：实现的是一种先进先出（FIFO）的策略

```plain
    对头（head）：
    对尾（tail）：
    入队（enqueue）：操作tail
    出队（dequeue）：操作head
    判空（empty）：head=tail

    队列下溢：
    队列上溢：
```

### 双端队列（deque）：队列的插入和删除操作可以在两端进行

### 链表（linked list）：各对象按照线性顺序排列

```plain
    后继元素：
    前驱元素：
    没有前驱元素的元素就是头head，head=null空链表
    没有后继元素的元素就是尾tail
    和数据区别：数据的线性顺序是由数组下标决定的，链表的线性顺序是由各个对象中的指针决定的
    双向链表（doubly linked list）：{key，prev，next}
    哨兵（sentinel）：是一个哑对象，作用是简化边界条件的处理。
```

### 树

```plain
    树是一个包含n（n>=0）个元素的有穷集合，其中
    1、每个元素称为结点(node)
    2、有一个特定的结点称为根节点或树根(root)
    3、除根结点之外的其余数据元素被分为m(m>=0)个互不相交的集合T1、T2，……，Tm，其中每一个集合T也是一棵树，称为原树的子树(subtree)
```

- 二叉树：每个结点最多有两个子树的树
- 完全二叉树：若设二叉树的深度为 h，除第 h 层外，其它各层 (1 ～ h-1) 的结点数都达到最大个数，第 h 层所有的结点都连续集中在最左边，这就是完全二叉树
- 满二叉树：如果一个二叉树的每一层的节点数都达到最大值，则这个二叉树就是满二叉树（满二叉树是一个三角形）
- 处理大规模数据算法选择

```plain
    1、内存够用
    2、内存不够用
```

```plain
    结构1：{key，child1， childn，parent}，容易浪费空间
    结构2：{key，left（孩子），right（兄弟），parent}

    树的两种搜索方式：
    1、深度优先遍历（Depth-First-Search）：孩子结点早于兄弟结点访问，栈（又分为先序、中序、后序）
    2、广度优先遍历（Breadth-First-Search）：兄弟结点早于孩子结点访问，队列

```
