import test from 'ava';
import eo from '../eo';

test('clone array whole lib', t => {
  const arr = [];
  t.not(eo.clone(arr), arr);
});

test('clone object whole lib', t => {
  const obj = {};
  t.not(eo.clone(obj), obj);
});

test('clone date whole lib', t => {
  const dat = new Date();
  t.not(eo.clone(dat), dat);
});

test('Object clone', t => {
  const obj = {};
  t.not(eo.cloneDeep(obj), obj);
});

test('Array clone', t => {
  const arr = [];
  t.not(eo.cloneDeep(arr), arr);
});

test('Array in array', t => {
  const arr = [[]];
  t.not(eo.cloneDeep(arr), arr);
});

test('Array in object', t => {
  const obj = { a: [] };
  t.not(eo.cloneDeep(obj), obj);
});

test('Object in object', t => {
  const obj = { a: {} };
  t.not(eo.cloneDeep(obj), obj);
});

test('Object in array', t => {
  const arr = [{}];
  t.not(eo.cloneDeep(arr), arr);
});

test('Object and array in array', t => {
  const arrIn = [1, 2, 3],
    objIn = { a: 1, b: 2 },
    arr = [arrIn, objIn],
    cloned = eo.cloneDeep(arr);
  t.not(arr, cloned);
  t.not(arrIn, cloned[0]);
  t.not(objIn, cloned[1]);
});

test('Object and array in object', t => {
  const arrIn = [1, 2, 3],
    objIn = { a: 1, b: 2 },
    obj = { a: arrIn, b: objIn },
    cloned = eo.cloneDeep(obj);
  t.not(obj, cloned);
  t.not(arrIn, cloned.a);
  t.not(objIn, cloned.b);
});

test('is number a number', t => {
  t.true(eo.is(0, 'Number'));
});

test('is string a string', t => {
  t.true(eo.is('test', 'String'));
});

test('is string a number', t => {
  t.false(eo.is('5', 'Number'));
});

test('is object an object all caps', t => {
  t.true(eo.is({}, 'OBJECT'));
});

test('is array an array all small', t => {
  t.true(eo.is([], 'array'));
});

test('is function a function random size', t => {
  t.true(eo.is(() => {}, 'fUNcTioN'));
});

test('is object an array', t => {
  t.false(eo.is({}, 'array'));
});

test('same numbers', t => {
  t.true(eo.isEqual(5.4, 5.4));
});

test('same numbers 0', t => {
  t.true(eo.isEqual(0, 0));
});

test('different numbers', t => {
  t.false(eo.isEqual(5.4, 5.9));
});

test('same strings', t => {
  t.true(eo.isEqual('test', 'test'));
});

test('same empty strings', t => {
  t.true(eo.isEqual('', ''));
});

test('different strings', t => {
  t.false(eo.isEqual('test', 'test1'));
});

test('same booleans', t => {
  t.true(eo.isEqual(false, false));
});

test('different booleans', t => {
  t.false(eo.isEqual(false, true));
});

test('same arrays', t => {
  const arr1 = [1, 2, 3],
    arr2 = [1, 2, 3];
  t.true(eo.isEqual(arr1, arr2));
});

test('different arrays', t => {
  const arr1 = [1, 3, 3],
    arr2 = [1, 2, 3];
  t.false(eo.isEqual(arr1, arr2));
});

test('same objects', t => {
  const obj1 = { a: 1, b: 2 },
    obj2 = { a: 1, b: 2 };
  t.true(eo.isEqual(obj1, obj2));
});

test('different objects', t => {
  const obj1 = { a: 1, b: 3 },
    obj2 = { a: 1, b: 2 };
  t.false(eo.isEqual(obj1, obj2));
});

test('same JSON', t => {
  const js1 = JSON.stringify({ a: 1, b: 2 }),
    js2 = JSON.stringify({ a: 1, b: 2 });
  t.true(eo.isEqual(js1, js2));
});

test('different JSON', t => {
  const js1 = JSON.stringify({ a: 1, b: 3 }),
    js2 = JSON.stringify({ a: 1, b: 2 });
  t.false(eo.isEqual(js1, js2));
});

test('same dates', t => {
  t.true(eo.isEqual(new Date(), new Date()));
});

test('different dates', t => {
  t.false(eo.isEqual(new Date(1), new Date()));
});

test('functions', t => {
  const error = t.throws(() => {
    eo.isEqual(() => {}, () => {});
  }, TypeError);
  t.is(error.message, 'Wrong argument type passed to isEqual func.');
});

test('no args', t => {
  const error = t.throws(() => {
    eo.isEqual();
  }, SyntaxError);
  t.is(error.message, 'No arg passed to "isEqual" func.');
});

test('number and string', t => {
  const error = t.throws(() => {
    eo.isEqual(5, 'test');
  }, TypeError);
  t.is(error.message, 'Arguments passed to isEqual func are different types.');
});

test('object', t => {
  t.true(eo.isObject({}));
});

test('object with object and array out', t => {
  t.false(eo.isObject({}, 'Object', 'Array'));
});

test('array', t => {
  t.true(eo.isObject([]));
});

test('function', t => {
  t.true(eo.isObject(() => {}));
});

test('function with object and array out', t => {
  t.true(eo.isObject(() => {}, 'Object', 'Array'));
});

test('date', t => {
  t.true(eo.isObject(new Date()));
});

test('date with date out', t => {
  t.false(eo.isObject(new Date(), 'Date'));
});

test('null', t => {
  t.false(eo.isObject(null));
});

test('undefined', t => {
  t.false(eo.isObject(undefined));
});

test('number', t => {
  t.false(eo.isObject(5.2));
});

test('number 0', t => {
  t.false(eo.isObject(0));
});

test('string', t => {
  t.false(eo.isObject('test'));
});

test('empty string', t => {
  t.false(eo.isObject(''));
});

test('true', t => {
  t.false(eo.isObject(true));
});

test('false', t => {
  t.false(eo.isObject(false));
});
