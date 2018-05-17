const objectType = '[object Object]',
  arrayType = '[object Array]',
  dateType = '[object Date]',
  functionType = '[object Function]';

// Zwraca typ danych wysłanych do funkcji w formacie '[object typ]'.
export const dataType = val => {
  return Object.prototype.toString.call(val);
};

// Sprawdza czy wartoć jest obiektem, jeli jest wypluwa true. Drugi argument pozwala wykluczyć wybrane obiekty.
export const isObject = (val, ...config) => {
  if (config.length > 0) {
    if (val !== Object(val)) return false;
    for (let i = 0; i < config.length; i++) {
      if (is(val, config[i])) return false;
    }
    return true;
  } else {
    return val === Object(val);
  }
};

//Sprawdza czy wartosc podana jako pierwszy argument jest typu podanego w drugim argumencie.
export const is = (val, type) => {
  if (type === undefined || val === undefined)
    throw 'No arg passed to "is" function.';
  type = type[0].toUpperCase() + type.slice(1).toLowerCase();
  const optList = [
    'Object',
    'Array',
    'Function',
    'Date',
    'RegExp',
    'String',
    'Number',
    'Boolean',
    'Error',
    'Math',
    'JSON',
    'Arguments'
  ];
  if (!optList.includes(type))
    throw `Wrong argument "${type}" passed to "is" function. Available arguments: "${optList}"`;
  return dataType(val) === `[object ${type}]`;
};

// Zwraca nową instancję zmiennej przesłanej jako argument.
export const clone = val => {
  if (val === undefined) throw 'No arg passed to "clone" func.';
  switch (dataType(val)) {
    case objectType:
      return Object.assign({}, val);
    case arrayType:
      return [...val];
    case dateType:
      return new Date(val.valueOf());
    default:
      return val;
  }
};

// Wykonuje głębokie klonowanie zmiennej przesłanej jako argument.
export const cloneDeep = val => {
  if (val === undefined) throw 'No arg passed to "cloneDeep" func.';
  let newVal = clone(val);
  switch (dataType(newVal)) {
    case objectType:
      for (const prop in newVal) {
        if (
          dataType(newVal[prop]) === objectType ||
          dataType(newVal[prop]) === arrayType
        ) {
          newVal[prop] = cloneDeep(newVal[prop]);
        }
      }
      return newVal;
    case arrayType:
      newVal.forEach((el, id) => {
        if (dataType(el) === objectType || dataType(el) === arrayType) {
          newVal[id] = cloneDeep(el);
        }
      });
      return newVal;
    default:
      return newVal;
  }
};

// Porównuje dwie wartosci wysłane w argumentach i jesli są równe wypluwa true. Radzi sobie z prymitywami, tablicami, obiektami i datami.
export const isEqual = (val1, val2) => {
  if (val1 === undefined || val2 === undefined)
    throw new SyntaxError('No arg passed to "isEqual" func.');
  if (dataType(val1) !== dataType(val2))
    throw new TypeError(
      'Arguments passed to isEqual func are different types.'
    );
  if (val1 === val2) {
    return true;
  }
  switch (dataType(val1)) {
    case objectType:
      if (Object.keys(val1).length !== Object.keys(val2).length) return false;
      for (const prop in val1) {
        if (!val2.hasOwnProperty(prop)) return false;
        if (
          dataType(val1[prop]) === objectType ||
          dataType(val1[prop]) === arrayType
        ) {
          if (isEqual(val1[prop], val2[prop])) {
            continue;
          } else {
            return false;
          }
        }
        if (val1[prop] !== val2[prop]) return false;
      }
      return true;
    case arrayType:
      if (val1.length !== val2.length) return false;
      for (let i = 0; i < val1.length; i++) {
        if (
          dataType(val1[i]) === objectType ||
          dataType(val1[i]) === arrayType
        ) {
          if (isEqual(val1[i], val2[i])) {
            continue;
          } else {
            return false;
          }
        }
        if (val1[i] !== val2[i]) return false;
      }
      return true;
    case dateType:
      if (val1.getTime() === val2.getTime()) return true;
      else return false;
    case functionType:
      throw new TypeError('Wrong argument type passed to isEqual func.');
    default:
      return false;
  }
};

/* export const findAndChange = (arr, find, changeTo) => {
  const newArr = arr.map(el => {
    let newEl;
    isObject(el) ? (newEl = Object.assign({}, el)) : (newEl = el);
  });
}; */

const lib = {
  dataType: val => dataType(val),
  isObject: (val, config = []) => isObject(val, ...config),
  is: (val, type) => is(val, type),
  clone: val => clone(val),
  cloneDeep: val => cloneDeep(val),
  isEqual: (val1, val2) => isEqual(val1, val2)
};

export default lib;
