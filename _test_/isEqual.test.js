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

test('functions', t => {
  const error = t.throws(() => {
    isEqual(() => {}, () => {});
  }, TypeError);
  t.is(error.message, 'Wrong argument type passed to isEqual func.');
});

test('same dates', t => {
  t.true(isEqual(new Date(), new Date()));
});
