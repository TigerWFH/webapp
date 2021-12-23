type Param = unknown;
class TypeUtils {
  displayName: string;
  constructor(name?: string) {
    this.displayName = name || "monkey wong's utils";
  }

  isNumber = (param: Param) => {
    return typeof param === 'number';
  };
  isString = (param: Param) => {
    return typeof param === 'string';
  };
  isBoolean = (param: Param) => {
    return typeof param === 'boolean';
  };
  isSymbol = (param: Param) => {
    return typeof param === 'symbol';
  };
  isUndefined = (param: Param) => {
    return typeof param === 'undefined';
  };
  isFunction = (param: Param) => {
    return typeof param === 'function';
  };
  isNull = (param: Param) => {
    return param === null;
  };
  isArray = (param: Param) => {
    return (
      Array.isArray(param) ||
      Object.prototype.toString.call(param) === '[object Array]'
    );
  };
  isArguments = (param: Param) => {
    return Object.prototype.toString.call(param) === '[object Arguments]';
  };
  isPromise = (param: Param) => {
    return Object.prototype.toString.call(param) === '[object Promise]';
  };
  isRegExp = (param: Param) => {
    return Object.prototype.toString.call(param) === '[object RegExp]';
  };
  isMath = (param: Param) => {
    return Object.prototype.toString.call(param) === '[object Math]';
  };
  isDate = (param: Param) => {
    return Object.prototype.toString.call(param) === '[object Date]';
  };
  isObject = (param: Param) => {
    return Object.prototype.toString.call(param) === '[object Object]';
  };
}

export default new TypeUtils();
