import test from 'ava';
import { dataType } from '../eo';

test('array with no opt', t => {
  const arr = [];
  t.is(dataType(arr), 'array');
});

test('array with opt', t => {
  const arr = [];
  t.is(dataType(arr, false), 'Array');
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

test('string', t => {
  const str = 'test';
  t.is(dataType(str), 'string');
});

test('primitive boolean', t => {
  const bool = false;
  t.is(dataType(bool), 'boolean');
});

test('object boolean', t => {
  const bool = new Boolean();
  t.is(dataType(bool), 'boolean');
});

test('error', t => {
  const err = new Error();
  t.is(dataType(err), 'error');
});

test('math', t => {
  const math = Math;
  t.is(dataType(math), 'math');
});

test('JSON', t => {
  const json = JSON;
  t.is(dataType(json), 'json');
});

test('wrong second argument', t => {
  const error = t.throws(() => {
    dataType(() => {}, 'true');
  }, TypeError);
  t.is(
    error.message,
    'Wrong second argument type passed to "dataType" function. Argument must be boolean.'
  );
});

test('regular expression with opt', t => {
  const regex = /a/;
  t.is(dataType(regex, false), 'RegExp');
});
