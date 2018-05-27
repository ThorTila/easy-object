'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var objectType = '[object Object]',
    arrayType = '[object Array]',
    dateType = '[object Date]';

// Zwraca typ danych wysłanych do funkcji w formacie '[object typ]'.
var dataType = exports.dataType = function dataType(val) {
  return Object.prototype.toString.call(val);
};

// Sprawdza czy wartoć jest obiektem, jeli jest wypluwa true. Drugi argument pozwala wykluczyć wybrane obiekty.
var isObject = exports.isObject = function isObject(val) {
  for (var _len = arguments.length, config = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    config[_key - 1] = arguments[_key];
  }

  if (!val) throw 'No arg passed to "isObject" func.';
  if (config.length > 0) {
    if (val !== Object(val)) return false;
    for (var i = 0; i < config.length; i++) {
      if (is(val, config[i])) return false;
    }
    return true;
  } else {
    return val === Object(val);
  }
};

//Sprawdza czy wartosc podana jako pierwszy argument jest typu podanego w drugim argumencie.
var is = exports.is = function is(val, type) {
  if (!type || !val) throw 'No arg passed to "is" function.';
  type = type[0].toUpperCase() + type.slice(1).toLowerCase();
  var optList = ['Object', 'Array', 'Function', 'Date', 'RegExp', 'String', 'Number', 'Boolean', 'Error', 'Math', 'JSON', 'Arguments'];
  if (!optList.includes(type)) throw 'Wrong argument "' + type + '" passed to "is" function. Available arguments: "' + optList + '"';
  return dataType(val) === '[object ' + type + ']';
};

// Zwraca nową instancję zmiennej przesłanej jako argument.
var clone = exports.clone = function clone(val) {
  if (!val) throw 'No arg passed to "clone" func.';
  switch (dataType(val)) {
    case objectType:
      return Object.assign({}, val);
    case arrayType:
      return [].concat(_toConsumableArray(val));
    case dateType:
      return new Date(val.valueOf());
    default:
      return val;
  }
};

// Wykonuje głębokie klonowanie zmiennej przesłanej jako argument.
var cloneDeep = exports.cloneDeep = function cloneDeep(val) {
  if (!val) throw 'No arg passed to "cloneDeep" func.';
  var newVal = clone(val);
  switch (dataType(newVal)) {
    case objectType:
      for (var prop in newVal) {
        if (dataType(newVal[prop]) === objectType || dataType(newVal[prop]) === arrayType) {
          newVal[prop] = cloneDeep(newVal[prop]);
        }
      }
      return newVal;
    case arrayType:
      newVal.forEach(function (el, id) {
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
var isEqual = exports.isEqual = function isEqual(val1, val2) {
  if (!val1 || !val2) throw 'No arg passed to "isEqual" func.';
  if (dataType(val1) !== dataType(val2)) throw 'Arguments passed to isEqual func are different types.';
  if (val1 === val2) {
    return true;
  }
  switch (dataType(val1)) {
    case objectType:
      if (Object.keys(val1).length !== Object.keys(val2).length) return false;
      for (var prop in val1) {
        if (!val2.hasOwnProperty(prop)) return false;
        if (dataType(val1[prop]) === objectType || dataType(val1[prop]) === arrayType) {
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
      for (var i = 0; i < val1.length; i++) {
        if (dataType(val1[i]) === objectType || dataType(val1[i]) === arrayType) {
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
      if (val1.getTime() === val2.getTime()) return true;else return false;
    default:
      throw 'Wrong argument type passed to isEqual Func';
  }
};

/* export const findAndChange = (arr, find, changeTo) => {
  const newArr = arr.map(el => {
    let newEl;
    isObject(el) ? (newEl = Object.assign({}, el)) : (newEl = el);
  });
}; */

var lib = {
  isObject: isObject.apply(undefined, [val].concat(_toConsumableArray(config))),
  is: is(val, type),
  dataType: dataType(val),
  clone: clone(val),
  cloneDeep: cloneDeep(val),
  isEqual: isEqual(val1, val2)
};

exports.default = lib;

//# sourceMappingURL=eo-babelled.js.map