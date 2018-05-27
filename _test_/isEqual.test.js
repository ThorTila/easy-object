import test from 'ava';
import { isEqual } from '../eo';

test('same numbers', t => {
  t.true(isEqual(5.4, 5.4));
});

test('same numbers 0', t => {
  t.true(isEqual(0, 0));
});

test('different numbers', t => {
  t.false(isEqual(5.4, 5.9));
});

test('same strings', t => {
  t.true(isEqual('test', 'test'));
});

test('same empty strings', t => {
  t.true(isEqual('', ''));
});

test('different strings', t => {
  t.false(isEqual('test', 'test1'));
});

test('same booleans', t => {
  t.true(isEqual(false, false));
});

test('different booleans', t => {
  t.false(isEqual(false, true));
});

test('same arrays', t => {
  const arr1 = [1, 2, 3],
    arr2 = [1, 2, 3];
  t.true(isEqual(arr1, arr2));
});

test('different arrays', t => {
  const arr1 = [1, 3, 3],
    arr2 = [1, 2, 3];
  t.false(isEqual(arr1, arr2));
});

test('same objects', t => {
  const obj1 = { a: 1, b: 2 },
    obj2 = { a: 1, b: 2 };
  t.true(isEqual(obj1, obj2));
});

test('different objects', t => {
  const obj1 = { a: 1, b: 3 },
    obj2 = { a: 1, b: 2 };
  t.false(isEqual(obj1, obj2));
});

test('same JSON', t => {
  const js1 = JSON.stringify({ a: 1, b: 2 }),
    js2 = JSON.stringify({ a: 1, b: 2 });
  t.true(isEqual(js1, js2));
});

test('different JSON', t => {
  const js1 = JSON.stringify({ a: 1, b: 3 }),
    js2 = JSON.stringify({ a: 1, b: 2 });
  t.false(isEqual(js1, js2));
});

test('same dates', t => {
  t.true(isEqual(new Date(), new Date()));
});

test('different dates', t => {
  t.false(isEqual(new Date(1), new Date()));
});

test('functions', t => {
  const error = t.throws(() => {
    isEqual(() => {}, () => {});
  }, TypeError);
  t.is(error.message, 'Wrong argument type passed to isEqual func.');
});

test('no args', t => {
  const error = t.throws(() => {
    isEqual();
  }, SyntaxError);
  t.is(error.message, 'No arg passed to "isEqual" func.');
});

test('number and string', t => {
  const error = t.throws(() => {
    isEqual(5, 'test');
  }, TypeError);
  t.is(error.message, 'Arguments passed to isEqual func are different types.');
});
