import test from 'ava';
import { isObject } from './../eo';

test('object', t => {
  t.true(isObject({}));
});

test('object with object and array out', t => {
  t.false(isObject({}, 'Object', 'Array'));
});

test('array', t => {
  t.true(isObject([]));
});

test('function', t => {
  t.true(isObject(() => {}));
});

test('function with object and array out', t => {
  t.true(isObject(() => {}, 'Object', 'Array'));
});

test('date', t => {
  t.true(isObject(new Date()));
});

test('date with date out', t => {
  t.false(isObject(new Date(), 'Date'));
});

test('null', t => {
  t.false(isObject(null));
});

test('undefined', t => {
  t.false(isObject(undefined));
});

test('number', t => {
  t.false(isObject(5.2));
});

test('number 0', t => {
  t.false(isObject(0));
});

test('string', t => {
  t.false(isObject('test'));
});

test('empty string', t => {
  t.false(isObject(''));
});

test('true', t => {
  t.false(isObject(true));
});

test('false', t => {
  t.false(isObject(false));
});
