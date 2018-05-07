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
    case 'pureObj':
      return (result =
        val === Object(val) &&
        Object.prototype.toString.call(val) !== '[object Array]' &&
        Object.prototype.toString.call(val) !== '[object Function]');
    default:
      throw new Error('Wrong second argument passed');
  }
};

// Zwraca nową instancję zmiennej przesłanej jako argument.
export const copy = val => {
  const copy = val => {
    if (isObject(val)) {
      return Object.assign({}, val);
    } else {
      return val;
    }
  };
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
  copy: copy(val)
};

export default lib;
