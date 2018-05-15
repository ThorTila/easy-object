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
  return isObject(val, 'pureObj')
    ? Object.assign({}, val)
    : Object.prototype.toString.call(val) === '[object Date]' // TODO deep cloning
      ? new Date(val.getTime())
      : val;
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
  clone: clone(val)
};

export default lib;
