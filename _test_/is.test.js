import test from 'ava';
import { is } from '../eo';

test('is number a number', t => {
  t.true(is(0, 'Number'));
});

test('is string a string', t => {
  t.true(is('test', 'String'));
});

test('is string a number', t => {
  t.false(is('5', 'Number'));
});

test('is object an object all caps', t => {
  t.true(is({}, 'OBJECT'));
});

test('is array an array all small', t => {
  t.true(is([], 'array'));
});

test('is function a function random size', t => {
  t.true(is(() => {}, 'fUNcTioN'));
});

test('is object an array', t => {
  t.false(is({}, 'array'));
});
