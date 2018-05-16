import test from 'ava';
import lib, { cloneDeep } from './../eo';

test('object', t => {
  t.true(lib.isObject({}));
});

test('function', t => {
  t.true(lib.isObject(() => {}));
});

test('null', t => {
  t.false(lib.isObject(null));
});
