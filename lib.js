// Sprawdza czy wartoć jest obiektem, jeli jest wypluwa true. Drugi argument pozwala wykluczyć tablice, funkcje, lub oba typy.
export const isObject = (val, config = '_ALL') => {
  switch (config) {
    case '_ALL':
      return (result = val === Object(val));
    case 'noArr':
      return (result =
        val === Object(val) &&
        Object.prototype.toString.call(val) !== '[object Array]');
    case 'noFunc':
      return (result =
        val === Object(val) &&
        Object.prototype.toString.call(val) !== '[object Function]');
    case 'noDate':
      return (result =
        val === Object(val) &&
        Object.prototype.toString.call(val) !== '[object Date]');
    case 'pureObj':
      return (result =
        val === Object(val) &&
        Object.prototype.toString.call(val) !== '[object Array]' &&
        Object.prototype.toString.call(val) !== '[object Function]' &&
        Object.prototype.toString.call(val) !== '[object Date]');
    default:
      throw new Error('Wrong second argument passed');
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
  isObject: isObject(val, config),
  clone: clone(val)
};

export default lib;
