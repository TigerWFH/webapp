console.log('external script1 without async and defer========>');
function getMatchList(content, keyword) {
  const characters = [...'\\[]()?.+*^${}:'].reduce(
    (r, c) => ((r[c] = true), r),
    {}
  );
  keyword = keyword
    .split('')
    .map((s) => (characters[s] ? `\\${s}` : s))
    .join('[\\s\\n]*');
  const reg = new RegExp(keyword, 'gmi');
  console.log('keyword======>', keyword);
  //   return [...content.matchAll(reg)]; // matchAll结果是个迭代器，用扩展符展开得到数组
}

const content =
  '明月几时有，把酒问青天。不知\\天上宫阙，今夕\\是何年。我欲乘风归去，又恐琼楼玉宇，高处不胜寒。转朱阁，低绮户。';
const keyword = '\\何年';
const result = getMatchList(content, keyword);
console.log('result===>', result);
