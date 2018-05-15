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
  if (!type || !val) throw 'No arg passed to "is" function.';
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
  return Object.prototype.toString.call(val) === `[object ${type}]`;
};

// Zwraca nową instancję zmiennej przesłanej jako argument.
export const clone = val => {
  if (!val) throw 'No arg passed to "clone" func.';
  switch (Object.prototype.toString.call(val)) {
    case '[object Object]':
      return Object.assign({}, val);
    case '[object Array]':
      return [...val];
    case '[object Date]':
      return new Date(val.valueOf());
    default:
      return val;
  }
};

// Wykonuje głębokie klonowanie zmiennej przesłanej jako argument.
export const cloneDeep = val => {
  if (!val) throw 'No arg passed to "cloneDeep" func.';
  let newVal = clone(val);
  switch (Object.prototype.toString.call(newVal)) {
    case '[object Object]':
      for (const prop in newVal) {
        if (
          Object.prototype.toString.call(newVal[prop]) === '[object Object]' ||
          Object.prototype.toString.call(newVal[prop]) === '[object Array]'
        ) {
          newVal[prop] = cloneDeep(newVal[prop]);
        }
      }
      return newVal;
    case '[object Array]':
      newVal.forEach((el, id) => {
        if (
          Object.prototype.toString.call(el) === '[object Object]' ||
          Object.prototype.toString.call(el) === '[object Array]'
        ) {
          newVal[id] = cloneDeep(el);
        }
      });
      return newVal;
    default:
      return newVal;
  }
};

/* export const isObjectPropertiesEqual = (
  object1,
  object2,
  property = '_ALL'
) => {
  switch (property) {
    case '_ALL':
      return true;
    case typeof property === 'array':
      return true;
    default:
      return true;
  }
};

export const findAndChange = (arr, find, changeTo) => {
  const newArr = arr.map(el => {
    let newEl;
    isObject(el) ? (newEl = Object.assign({}, el)) : (newEl = el);
  });
};
 */
const lib = {
  isObject: isObject(val, ...config),
  is: is(val, type),
  clone: clone(val),
  cloneDeep: cloneDeep(val)
};

export default lib;
