---
id: 259
title: JavaScript Abstract or loose Equality Comparisons
date: 2019-04-11T07:34:15+00:00
author: Vishal Dodiya
layout: post
guid: https://devforest.com/?p=259
permalink: /2019/04/11/js-abstract-or-loose-equality-comparisons/
has_gist: false
categories:
  - Tech
tags:
  - JavaScript
---
As per [ECMA](http://www.ecma-international.org/ecma-262/5.1/#sec-11.9.3) the comparison x == y, where x and y are values which produce true or false. And, such comparison is performed as follow.


| Type(x) is same as Type(y), Then     |                              |                  |
|--------------------------------------|------------------------------|------------------|
| If Type(x) is **Undefined**          | Return **True**              |                  |
| If Type(x) is **Null**               | Return **True**              |                  |
| If Type(x) is **Number**             | If x is **NaN**              | Return **False** |
|                                      | If y is **NaN**              | Return **False** |
|                                      | If x is same number as y     | Return **True**  |
|                                      | If x is +0 & y is -0         | Return **True**  |
|                                      | If x is -0 & y is +0         | Return **True**  |
|                                      | Else Return **False**        |                  |
| If Type(x) is **String**             | If x & y are exactly same, <br/>– same sequence of character <br/>– same length <br/>– same character in <br/>corresponding positions                 | Return **True**  |
|                                      | Else Return **False**        |                  |
| If Type(x) is **Boolean**            | If x & y are both **True** or both **False** | Return **True** |
|                                      | Else Return **False**        |                  |
| If x & y refers to the same object <br/>( for more detail check description below ) | Return **True** ||
|                                      | Else Return **False**        |                  |

<br/>

| In the case of Type of x & y is different     |                                               |                 |
|-----------------------------------------------|-----------------------------------------------|-----------------|
| If x is **Null**                              | y is **Undefined**                            | Return **True** |
| If x is **Undefined**                         | y is **Null**                                 | Return **True** |
| If Type(x) is **Number**                      | Type(y) is **String**                         | Return the Result of comparison x == **ToNumber**(y) |
| If Type(x) is **String**                      | Type(y) is **Number**                         | Return the Result of comparison **ToNumber**(x) == y |
| If Type(x) is **Boolean**                     | Type(y) is any                                | Return the Result of comparison **ToNumber**(x) == y |
| If Type(x) is any                             | Type(y) is **Boolean**                        | Return the Result of comparison x == **ToNumber**(y) |
| If Type(x) is either **String** or **Number** | Type(y) is **Object**                         | Return the Result of comparison x == **ToPrimitive**(y) |
| Type(x) is **Object**                         | If Type(y) is either **String** or **Number** | Return the Result of comparison **ToPrimitive**(x) == y |


  * **For all other cases, it will Return False**

Here some things to keep in note that **ToNumber** stands for coercing/typecasting value to a number. So in the case of Type(x) is boolean and y is any value, the JS will perform implicit coercion on value of y to make it comparable with x.

**ToPrimitive** stands for typecasting non-primitive value ( eg. Object including function and array ) to a primitive value ( eg. string, number, etc ). 

In the case of x & y refers to the same object only returns true else return false means lets suppose,

```
var a = [1,2,3];
var b = [1,2,3];
var c = '1,2,3';

a == c // true.
b == c // true.
a == b // false.
```

In the case of a == c, a is coerced to string as c is a string and both values are same (because while coercing array to string it return a comma separated values) so returns true. and same for b == c. 

While comparing a == b, coercing won&#8217;t happen as the type on both side is same. The reason it will return false is, JS now don&#8217;t check the value of the object instead it will check its reference. Even though the value of a and b is the same, but because of different reference, it will return false.

It can be true in the case of, 

```
var a = [1,2,3];
var b = a;

a == b // true.
```
