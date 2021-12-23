/**
 * react可以直接使用html转译，但是不能添加花括号
 */ 
interface IItem {
  key: string;
  value: string
}
const ICONLIST: IItem[] = [
  {
    key: 'share',
    value: 'e52c'
  },
  {
    key: 'upArrow',
    value: 'e53c'
  },
  {
    key: 'return',
    value: 'e53d'
  },
  {
    key: 'downArrow',
    value: 'e53e'
  },
  {
    key: 'rightArrow',
    value: 'e53f'
  },
  {
    key: 'leftArrow',
    value: 'e540'
  },
  {
    key: 'circle',
    value: 'e542'
  },
  {
    key: 'pull',
    value: '4542'
  },
  {
    key: 'close',
    value: 'e546'
  },
  {
    key: 'edit',
    value: 'e54a'
  },
  {
    key: 'delete',
    value: 'e54e'
  },
  {
    key: 'bgCircleChecked',
    value: 'e54f'
  },
  {
    key: 'directionDown',
    value: 'e55b'
  },
  {
    key: 'topPosition',
    value: 'e55c'
  },
  {
    key: 'directionLeft',
    value: 'e55d'
  },
  {
    key: 'directionRight',
    value: 'e55e'
  },
  {
    key: 'search',
    value: 'e55f'
  },
  {
    key: 'bgSquareChecked',
    value: 'e561'
  },
  {
    key: 'squareCheck',
    value: 'e563'
  },
  {
    key: 'category',
    value: 'e568'
  },
  {
    key: 'index',
    value: 'e56a'
  },
  {
    key: 'mine',
    value: 'e56b'
  },
  {
    key: 'order',
    value: 'e56c'
  },
  {
    key: 'shopCar',
    value: 'e56d'
  },
  {
    key: 'bgCollect',
    value: 'e570'
  },
  {
    key: 'contact',
    value: 'e572'
  },
  {
    key: 'collect',
    value: 'e573'
  },
  {
    key: 'error',
    value: 'e576'
  },
  {
    key: 'calendar',
    value: 'e57c'
  },
  {
    key: 'scan',
    value: 'e58d'
  },
  {
    key: 'ding',
    value: 'e58e'
  },
  {
    key: 'plus',
    value: 'e629'
  },
  {
    key: 'confirm',
    value: 'e62a'
  }
];

const KEY_TO_GLYPH: any = ICONLIST.map((icon: IItem) => {
  return {
    key: icon.key,
    value: String.fromCharCode(parseInt(icon.value, 16))
  };
}).reduce((target: any, curr:IItem) => {
  target[curr.key] = curr.value;
  return target;
}, {});

export default KEY_TO_GLYPH;

  