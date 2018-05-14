// Sprawdza czy wartoć jest obiektem, jeli jest wypluwa true. Drugi argument pozwala wykluczyć wybrane obiekty.
export const isObject = (val, ...config) => {
  if (config.length > 0) {
    //TOD: check args
    if (val !== Object(val)) return false;
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
    for (let i = 0; i < config.length; i++) {
      const conf =
        config[i][0].toUpperCase() + config[i].slice(1).toLowerCase();
      if (!optList.includes(conf))
        throw `Wrong argument "${
          config[i]
        }" passed to isObject function. Available arguments: "${optList}"`;
      if (Object.prototype.toString.call(val) === `[object ${conf}]`) {
        return false;
      }
    }
    return true;
  } else {
    return val === Object(val);
  }
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
  clone: clone(val)
};

export default lib;
