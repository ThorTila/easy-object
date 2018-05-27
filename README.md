# easy-object (eo)

## Description

Small library which goal is to make object operations in JavaScript easy and faultless. Currently in active development. You can check the newest version at develop branch.

Written in vanilla JavaScript using ES6 syntax.

Now working (I hope):

* returning type of data passed
* checking if sth is an object,
* checking if sth is of a given type,
* shallow cloning,
* deep cloning arrays and objects,
* checking if two variables have equal values.

### And will be more

## Installation

Just download the file eo.js and import it to your project. This library has no dependencies needed to work. There are two ways to import:

* by default

```
import eo from './eo';
```

* by name

```
// for example if you want to import only function "isEqual"
import { isEqual } from './eo'
```

Of course you need babel or sth like this because of import and ES6 syntax.

it`s not available via npm at this moment, but will be ;)

## Tests

There are available tests in this projects. They use "ava" package. After you clone this repo first you must install required dependencies and then you can run tests.

For example:

```
// in bash
npm i
// after it finish
npm t
```

## Documentation

## Objects

<dl>
<dt><a href="#eo">eo</a> : <code>object</code></dt>
<dd><p>Main library object which share all available functions</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#dataType">dataType</a> ⇒ <code>string</code></dt>
<dd><p>Return type of data passed to this function in format: [object Type].</p>
</dd>
<dt><a href="#isObject">isObject</a> ⇒ <code>boolean</code></dt>
<dd><p>Check if passed value is an object and returns true if is. Use <a href="#is">is</a> function.</p>
</dd>
<dt><a href="#is">is</a> ⇒ <code>boolean</code></dt>
<dd><p>Check if passed value is of selected type and returns true if is.</p>
</dd>
<dt><a href="#clone">clone</a> ⇒ <code>*</code></dt>
<dd><p>Returns new instance of data passed. Only shallow copy. Clone only objects, arrays and dates.</p>
</dd>
<dt><a href="#cloneDeep">cloneDeep</a> ⇒ <code>*</code></dt>
<dd><p>Returns new instance of data passed. Do deep cloninng. Use <a href="#clone">clone</a> function. Deep clone only objects and arrays.</p>
</dd>
<dt><a href="#isEqual">isEqual</a> ⇒ <code>boolean</code></dt>
<dd><p>Check if two variables have equal values. It can compare primitives, arrays, objects and dates. Don`t compare functions.</p>
</dd>
</dl>

<a name="eo"></a>

## eo : <code>object</code>

Main library object which share all available functions

**Kind**: global namespace

* [eo](#eo) : <code>object</code>
  * [.dataType(data)](#eo.dataType) ⇒ <code>string</code>
  * [.isObject(val, [...config])](#eo.isObject) ⇒ <code>boolean</code>
  * [.is(val, type)](#eo.is) ⇒ <code>boolean</code>
  * [.clone(val)](#eo.clone) ⇒ <code>\*</code>
  * [.cloneDeep(val)](#eo.cloneDeep) ⇒ <code>\*</code>
  * [.isEqual(val1, val2)](#eo.isEqual) ⇒ <code>boolean</code>

<a name="eo.dataType"></a>

### eo.dataType(data) ⇒ <code>string</code>

Return type of data passed to this function in format: [object Type].

**Kind**: static method of [<code>eo</code>](#eo)  
**Returns**: <code>string</code> - Data type  
**Todo**

* [ ] Return data type name

| Param | Type            | Description             |
| ----- | --------------- | ----------------------- |
| data  | <code>\*</code> | Data passed to function |

**Example**

```js
Example usage
// '[object Array]'
eo.dataType([1,2,3]);
```

<a name="eo.isObject"></a>

### eo.isObject(val, [...config]) ⇒ <code>boolean</code>

Check if passed value is an object and returns true if is. Use [is](#is) function.

**Kind**: static method of [<code>eo</code>](#eo)  
**Returns**: <code>boolean</code> - Is value an object

| Param       | Type                | Description                                              |
| ----------- | ------------------- | -------------------------------------------------------- |
| val         | <code>\*</code>     | Value passed to a function                               |
| [...config] | <code>string</code> | Argument(s) which allow to exclude selected object types |

**Example**

```js
Example usage with no config
// true
let func = () => {};
eo.isObject(func);
```

**Example**

```js
Example usage with config
// false
let func = () => {};
eo.isObject(func, 'function');
```

<a name="eo.is"></a>

### eo.is(val, type) ⇒ <code>boolean</code>

Check if passed value is of selected type and returns true if is.

**Kind**: static method of [<code>eo</code>](#eo)  
**Returns**: <code>boolean</code> - Is value a selected type  
**Throws**:

* <code>Error</code> When you didn`t passed second argument or you passed wrong second argument.

| Param | Type                | Description                |
| ----- | ------------------- | -------------------------- |
| val   | <code>\*</code>     | Value passed to a function |
| type  | <code>string</code> | Type you want to check     |

**Example**

```js
Example usage
// true
let obj = {a:1,b:2};
eo.is(obj, 'object');
```

<a name="eo.clone"></a>

### eo.clone(val) ⇒ <code>\*</code>

Returns new instance of data passed. Only shallow copy. Clone only objects, arrays and dates.

**Kind**: static method of [<code>eo</code>](#eo)  
**Returns**: <code>\*</code> - New instance of data.  
**Throws**:

* <code>Error</code> When no value is passed to function.

**Todo**

* [ ] Add option to clone functions and other objects.

| Param | Type            | Description    |
| ----- | --------------- | -------------- |
| val   | <code>\*</code> | Value to copy. |

**Example**

```js
Example usage
let foo = {a:1,b:2},
 bar = eo.clone(foo);
console.log(foo === bar); //false
```

<a name="eo.cloneDeep"></a>

### eo.cloneDeep(val) ⇒ <code>\*</code>

Returns new instance of data passed. Do deep cloninng. Use [clone](#clone) function. Deep clone only objects and arrays.

**Kind**: static method of [<code>eo</code>](#eo)  
**Returns**: <code>\*</code> - Deeply cloned new instance of data.  
**Throws**:

* <code>Error</code> When no value is passed to function.

| Param | Type            | Description    |
| ----- | --------------- | -------------- |
| val   | <code>\*</code> | Data to clone. |

**Example**

```js
Example usage
let foo = {a:[1,2,3], b:2},
 bar = eo.cloneDeep(foo);
console.log(foo === bar) //false
```

<a name="eo.isEqual"></a>

### eo.isEqual(val1, val2) ⇒ <code>boolean</code>

Check if two variables have equal values. It can compare primitives, arrays, objects and dates. Don`t compare functions.

**Kind**: static method of [<code>eo</code>](#eo)  
**Returns**: <code>boolean</code> - Do variables have equal values.  
**Throws**:

* <code>SyntaxError</code> When passed less than two arguments.
* <code>TypeError</code> When variables passed are different types.
* <code>TypeError</code> When passed a function.

| Param | Type            | Description                 |
| ----- | --------------- | --------------------------- |
| val1  | <code>\*</code> | First variable to compare.  |
| val2  | <code>\*</code> | Second variable to compare. |

**Example**

```js
Example usage
let foo = [1,2,3],
 bar = [1,2,3];
eo.isEqual(foo, bar); //true
```

<a name="dataType"></a>

## dataType ⇒ <code>string</code>

Return type of data passed to this function in format: [object Type].

**Kind**: global constant  
**Returns**: <code>string</code> - Data type  
**Todo**

* [ ] Return data type name

| Param | Type            | Description             |
| ----- | --------------- | ----------------------- |
| data  | <code>\*</code> | Data passed to function |

**Example**

```js
Example usage
// '[object Object];
dataType({a:1,b:2})
```

<a name="isObject"></a>

## isObject ⇒ <code>boolean</code>

Check if passed value is an object and returns true if is. Use [is](#is) function.

**Kind**: global constant  
**Returns**: <code>boolean</code> - Is value an object

| Param       | Type                | Description                                              |
| ----------- | ------------------- | -------------------------------------------------------- |
| val         | <code>\*</code>     | Value passed to a function                               |
| [...config] | <code>string</code> | Argument(s) which allow to exclude selected object types |

**Example**

```js
Example usage with no config
// true
let func = () => {};
isObject(func);
```

**Example**

```js
Example usage with config
// false
let func = () => {};
isObject(func, 'function');
```

<a name="is"></a>

## is ⇒ <code>boolean</code>

Check if passed value is of selected type and returns true if is.

**Kind**: global constant  
**Returns**: <code>boolean</code> - Is value a selected type  
**Throws**:

* <code>Error</code> When you didn`t passed second argument or you passed wrong second argument.

| Param | Type                | Description                |
| ----- | ------------------- | -------------------------- |
| val   | <code>\*</code>     | Value passed to a function |
| type  | <code>string</code> | Type you want to check     |

**Example**

```js
Example usage
//false
let obj = {a:1.b:2};
is(obj, 'array');
```

<a name="is..optList"></a>

### is~optList : <code>Array.&lt;string&gt;</code>

List of all available types to check by function [is](#is)

**Kind**: inner constant of [<code>is</code>](#is)  
<a name="clone"></a>

## clone ⇒ <code>\*</code>

Returns new instance of data passed. Only shallow copy. Clone only objects, arrays and dates.

**Kind**: global constant  
**Returns**: <code>\*</code> - New instance of data.  
**Throws**:

* <code>Error</code> When no value is passed to function.

**Todo**

* [ ] Add option to clone functions and other objects.

| Param | Type            | Description    |
| ----- | --------------- | -------------- |
| val   | <code>\*</code> | Value to copy. |

**Example**

```js
Example usage
let foo = [1,2,3],
 bar = clone(foo);
console.log(foo === bar); //false
```

<a name="cloneDeep"></a>

## cloneDeep ⇒ <code>\*</code>

Returns new instance of data passed. Do deep cloninng. Use [clone](#clone) function. Deep clone only objects and arrays.

**Kind**: global constant  
**Returns**: <code>\*</code> - Deeply cloned new instance of data.  
**Throws**:

* <code>Error</code> When no value is passed to function.

| Param | Type            | Description    |
| ----- | --------------- | -------------- |
| val   | <code>\*</code> | Data to clone. |

**Example**

```js
Example usage
let foo = [1,2,{a:1,b:2}],
 bar = cloneDeep(foo);
console.log(foo === bar) //false
```

<a name="isEqual"></a>

## isEqual ⇒ <code>boolean</code>

Check if two variables have equal values. It can compare primitives, arrays, objects and dates. Don`t compare functions.

**Kind**: global constant  
**Returns**: <code>boolean</code> - Do variables have equal values.  
**Throws**:

* <code>SyntaxError</code> When passed less than two arguments.
* <code>TypeError</code> When variables passed are different types.
* <code>TypeError</code> When passed a function.

| Param | Type            | Description                 |
| ----- | --------------- | --------------------------- |
| val1  | <code>\*</code> | First variable to compare.  |
| val2  | <code>\*</code> | Second variable to compare. |

**Example**

```js
Example usage
let foo = {a:1,b:2},
 bar = {a:1,b:2,c:3};
isEqual(foo, bar); //false
```
