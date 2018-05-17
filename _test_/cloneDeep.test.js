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
  const arr = [[], {}];
  t.not(cloneDeep(arr), arr);
});

test('Object and array in object', t => {
  const obj = { arr: [], ob: {} };
  t.not(cloneDeep(obj), obj);
});
