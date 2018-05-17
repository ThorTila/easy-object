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

test('Object in object clone', t => {
  const obj = { a: {} };
  t.not(cloneDeep(obj), obj);
});

test('Object in array clone', t => {
  const arr = [{}];
  t.not(cloneDeep(arr), arr);
});

test('Array in object clone', t => {
  const obj = { a: [] };
  t.not(cloneDeep(obj), obj);
});
