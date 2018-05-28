import test from 'ava';
import { dataType } from '../eo';

test('array', t => {
  const arr = [];
  t.is(dataType(arr), 'array');
});

test('object', t => {
  const obj = {};
  t.is(dataType(obj), 'object');
});

test('date', t => {
  const dat = new Date();
  t.is(dataType(dat), 'date');
});
test('function', t => {
  const func = () => {};
  t.is(dataType(func), 'function');
});
test('number', t => {
  const num = 5;
  t.is(dataType(num), 'number');
});
