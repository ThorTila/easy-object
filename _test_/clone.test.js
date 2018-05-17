import test from 'ava';
import { clone } from '../eo';

test('array', t => {
  const arr = [];
  t.not(clone(arr), arr);
});

test('object', t => {
  const obj = {};
  t.not(clone(obj), obj);
});

test('date', t => {
  const dat = new Date();
  t.not(clone(dat), dat);
});
