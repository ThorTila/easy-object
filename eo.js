/**
 * @fileOverview Small library which makes handling JavaScript`s object easier.
 * @author Łukasz Rasiński
 * @version 0.1.2
 */

/**
 *  Return type of data passed to function.
 * @param {*} data Data passed to function.
 * @param {boolean} [lowerCase = true] Option to configure if function return lower cased string or not.
 * @returns {string}  Data type.
 * @throws {TypeError} When you passed other than boolean value as a second argument.
 * @example
 * //without options
 * dataType({a:1,b:2}); //'object'
 *
 * //with option
 * dataType({a:1,b:2}, false); //'Object'
 */
export const dataType = (data, lowerCase = true) => {
  if (lowerCase !== true && lowerCase !== false)
    throw TypeError(
      'Wrong second argument type passed to "dataType" function. Argument must be boolean.'
    );
  const type = Object.prototype.toString
    .call(data)
    .split(/\W/)
    .filter(Boolean)[1];
  if (lowerCase) return type.toLowerCase();
  else return type;
};

/**
 *  Check if passed value is of selected type and returns true if is.
 * @param {*} val Value passed to a function
 * @param {string} type Type you want to check
 * @returns {boolean} Is value a selected type
 * @throws {Error} When you didn`t pass second argument or you passed wrong second argument.
 * @example Example usage
 * //false
 * let obj = {a:1.b:2};
 * is(obj, 'array');
 */
export const is = (val, type) => {
  if (type === undefined) throw Error('No arg passed to "is" function.');
  type = type.toLowerCase();
  /**
   * List of all available types to check by function {@link is}
   * @type {string[]}
   */
  const optList = [
    'object',
    'array',
    'function',
    'date',
    'regexp',
    'string',
    'number',
    'boolean',
    'error',
    'math',
    'json',
    'arguments'
  ];
  if (!optList.includes(type))
    throw Error(
      `Wrong argument "${type}" passed to "is" function. Available arguments: "${optList}"`
    );
  return dataType(val) === `${type}`;
};

/**
 *  Check if passed value is an object and returns true if is. Use {@link is} function.
 * @param {*} val Value passed to a function
 * @param {...string} [config] Argument(s) which allow to exclude selected object types
 * @returns {boolean} Is value an object
 * @example Example usage with no config
 * // true
 * let func = () => {};
 * isObject(func);
 * @example Example usage with config
 * // false
 * let func = () => {};
 * isObject(func, 'function');
 */
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

/**
 * Returns new instance of data passed. Only shallow copy. Clone only objects, arrays and dates.
 * @param {*} val Value to copy.
 * @returns {*} New instance of data.
 * @throws {Error} When no value is passed to function.
 * @example Example usage
 * let foo = [1,2,3],
 *  bar = clone(foo);
 * console.log(foo === bar); //false
 * @todo Add option to clone functions and other objects.
 */
export const clone = val => {
  if (val === undefined) throw 'No arg passed to "clone" func.';
  switch (dataType(val)) {
    case 'object':
      return Object.assign({}, val);
    case 'array':
      return [...val];
    case 'date':
      return new Date(val.valueOf());
    default:
      return val;
  }
};

/**
 * Returns new instance of data passed. Do deep cloninng. Use {@link clone} function. Deep clone only objects and arrays.
 * @param {*} val Data to clone.
 * @returns {*} Deeply cloned new instance of data.
 * @throws {Error} When no value is passed to function.
 * @example Example usage
 * let foo = [1,2,{a:1,b:2}],
 *  bar = cloneDeep(foo);
 * console.log(foo === bar) //false
 */
export const cloneDeep = val => {
  if (val === undefined) throw Error('No arg passed to "cloneDeep" func.');
  let newVal = clone(val);
  switch (dataType(newVal)) {
    case 'object':
      for (const prop in newVal) {
        if (
          dataType(newVal[prop]) === 'object' ||
          dataType(newVal[prop]) === 'array'
        ) {
          newVal[prop] = cloneDeep(newVal[prop]);
        }
      }
      return newVal;
    case 'array':
      newVal.forEach((el, id) => {
        if (dataType(el) === 'object' || dataType(el) === 'array') {
          newVal[id] = cloneDeep(el);
        }
      });
      return newVal;
    default:
      return newVal;
  }
};

/**
 * Check if two variables have equal values. It can compare primitives, arrays, objects and dates. Don`t compare functions.
 * @param {*} val1 First variable to compare.
 * @param {*} val2 Second variable to compare.
 * @returns {boolean} Do variables have equal values.
 * @throws {SyntaxError} When passed less than two arguments.
 * @throws {TypeError} When variables passed are different types.
 * @throws {TypeError} When passed a function.
 * @example Example usage
 * let foo = {a:1,b:2},
 *  bar = {a:1,b:2,c:3};
 * isEqual(foo, bar); //false
 */
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
    case 'object':
      if (Object.keys(val1).length !== Object.keys(val2).length) return false;
      for (const prop in val1) {
        if (!val2.hasOwnProperty(prop)) return false;
        if (
          dataType(val1[prop]) === 'object' ||
          dataType(val1[prop]) === 'array'
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
    case 'array':
      if (val1.length !== val2.length) return false;
      for (let i = 0; i < val1.length; i++) {
        if (dataType(val1[i]) === 'object' || dataType(val1[i]) === 'array') {
          if (isEqual(val1[i], val2[i])) {
            continue;
          } else {
            return false;
          }
        }
        if (val1[i] !== val2[i]) return false;
      }
      return true;
    case 'date':
      if (val1.getTime() === val2.getTime()) return true;
      else return false;
    case 'function':
      throw new TypeError('Wrong argument type passed to isEqual func.');
    default:
      return false;
  }
};

/**
 * Main library object which share all available functions
 * @namespace eo
 */
const eo = {
  /**
   *  Return type of data passed to function.
   * @param {*} data Data passed to function.
   * @param {boolean} [lowerCase = true] Option to configure if function return lower cased string or not.
   * @returns {string}  Data type.
   * @throws {TypeError} When you passed other than boolean value as a second argument.
   * @example
   * //without options
   * eo.dataType([1,2,3]); //'array'
   *
   * //with option
   * eo.dataType([1,2,3], false); //'Array'
   */
  dataType: (data, lowerCase = true) => dataType(data, lowerCase),
  /**
   *  Check if passed value is an object and returns true if is. Use {@link is} function.
   * @param {*} val Value passed to a function
   * @param {...string} [config] Argument(s) which allow to exclude selected object types
   * @returns {boolean} Is value an object
   * @example Example usage with no config
   * // true
   * let func = () => {};
   * eo.isObject(func);
   * @example Example usage with config
   * // false
   * let func = () => {};
   * eo.isObject(func, 'function');
   */
  isObject: (val, ...config) => isObject(val, ...config),
  /**
   *  Check if passed value is of selected type and returns true if is.
   * @param {*} val Value passed to a function
   * @param {string} type Type you want to check
   * @returns {boolean} Is value a selected type
   * @throws {Error} When you didn`t passed second argument or you passed wrong second argument.
   * @example Example usage
   * // true
   * let obj = {a:1,b:2};
   * eo.is(obj, 'object');
   */
  is: (val, type) => is(val, type),
  /**
   * Returns new instance of data passed. Only shallow copy. Clone only objects, arrays and dates.
   * @param {*} val Value to copy.
   * @returns {*} New instance of data.
   * @throws {Error} When no value is passed to function.
   * @example Example usage
   * let foo = {a:1,b:2},
   *  bar = eo.clone(foo);
   * console.log(foo === bar); //false
   * @todo Add option to clone functions and other objects.
   */
  clone: val => clone(val),
  /**
   * Returns new instance of data passed. Do deep cloninng. Use {@link clone} function. Deep clone only objects and arrays.
   * @param {*} val Data to clone.
   * @returns {*} Deeply cloned new instance of data.
   * @throws {Error} When no value is passed to function.
   * @example Example usage
   * let foo = {a:[1,2,3], b:2},
   *  bar = eo.cloneDeep(foo);
   * console.log(foo === bar) //false
   */
  cloneDeep: val => cloneDeep(val),
  /**
   * Check if two variables have equal values. It can compare primitives, arrays, objects and dates. Don`t compare functions.
   * @param {*} val1 First variable to compare.
   * @param {*} val2 Second variable to compare.
   * @returns {boolean} Do variables have equal values.
   * @throws {SyntaxError} When passed less than two arguments.
   * @throws {TypeError} When variables passed are different types.
   * @throws {TypeError} When passed a function.
   * @example Example usage
   * let foo = [1,2,3],
   *  bar = [1,2,3];
   * eo.isEqual(foo, bar); //true
   */
  isEqual: (val1, val2) => isEqual(val1, val2)
};

export default eo;
