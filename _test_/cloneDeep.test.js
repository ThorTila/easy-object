import test from 'ava';
import { cloneDeep } from '../eo';

test('Object clone', t => {
  const obj = {};
  t.not(cloneDeep(obj), obj);
});

test('Array clone', t => {
  const arr = [];
  t.not(cloneDeep(arr), arr);
});

test('Array in array', t => {
  const arr = [[]];
  t.not(cloneDeep(arr), arr);
});

test('Array in object', t => {
  const obj = { a: [] };
  t.not(cloneDeep(obj), obj);
});

test('Object in object', t => {
  const obj = { a: {} };
  t.not(cloneDeep(obj), obj);
});

test('Object in array', t => {
  const arr = [{}];
  t.not(cloneDeep(arr), arr);
});

test('Object and array in array', t => {
  const arrIn = [1, 2, 3],
    objIn = { a: 1, b: 2 },
    arr = [arrIn, objIn],
    cloned = cloneDeep(arr);
  t.not(arr, cloned);
  t.not(arrIn, cloned[0]);
  t.not(objIn, cloned[1]);
});

test('Object and array in object', t => {
  const arrIn = [1, 2, 3],
    objIn = { a: 1, b: 2 },
    obj = { a: arrIn, b: objIn },
    cloned = cloneDeep(obj);
  t.not(obj, cloned);
  t.not(arrIn, cloned.a);
  t.not(objIn, cloned.b);
});
