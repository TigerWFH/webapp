const origin = [1, 2, 3, 4, 3, 76, 23, 989, 34, 23, 43, 6, 1, 4, 5, 7];

function Bubble(ori) {
  const arr = ori.slice();
  for (let i = 1; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
      }
    }
  }

  return arr;
}

function Quick(ori, begin, end) {
  if (begin === end) {
    return ori;
  }
  const index = partion(ori, begin, end);
  Quick(ori, begin, index);
  Quick(ori, index + 1, end);
}

function partion(ori, begin, end) {
  const sentry = ori[begin];
  while (begin < end) {
    while (begin < end && ori[end] >= sentry) {
      end--;
    }
    if (begin < end) {
      ori[begin] = ori[end];
      ori[end] = sentry;
      begin++;
    }
    while (begin < end && ori[begin] < sentry) {
      begin++;
    }
    if (begin < end) {
      ori[end] = ori[begin];
      ori[begin] = sentry;
      end--;
    }
  }

  return begin;
}

function DoQuick(origin) {
  const cloneOri = origin.slice();
  Quick(cloneOri, 0, cloneOri.length - 1);
  return cloneOri;
}

console.log('origin===>', origin);
const result = Bubble(origin);
console.log('bubble result===>', result);
const ret2 = DoQuick(origin);
console.log('quick result===>', ret2);
