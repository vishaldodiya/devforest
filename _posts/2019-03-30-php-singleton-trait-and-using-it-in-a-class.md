---
id: 216
title: Php Singleton Trait and using it in a Class
date: 2019-03-30T14:47:53+00:00
author: Vishal Dodiya
layout: post
guid: https://devforest.com/?p=216
permalink: /2019/03/30/php-singleton-trait-and-using-it-in-a-class/
amp_status:
  - enabled
categories:
  - Tech
tags:
  - OOP
  - PHP
  - WordPress
---
Singleton is an OOP concept which is used to support instantiating class only once. So basically it just uses already created instance of the class which is stored in a static variable.

Traits are one of the ways of inheritance in PHP for more detail check [Traits.](https://www.php.net/manual/en/language.oop5.traits.php)

[Code Snippet:](https://gist.github.com/vishaldodiya/825cbc55aaef661f4250d4a11a7fc9ec#file-singleton-trait-php)

<script src="https://gist.github.com/vishaldodiya/825cbc55aaef661f4250d4a11a7fc9ec.js"></script>

This is how you can create a Trait and use it in a class.

Some points to keep in a note. In Trait, the constructor is protected so one can&#8217;t create an instance of the class by just <g class="gr_ gr\_211 gr-alert gr\_gramm gr\_inline\_cards gr\_run\_anim Style multiReplace" id="211" data-gr-id="211">calling </g>`new SingletonClass()`<g class="gr_ gr\_211 gr-alert gr\_gramm gr\_inline\_cards gr\_disable\_anim_appear Style multiReplace" id="211" data-gr-id="211">.</g> It will give a fatal error.

<pre class="wp-block-preformatted">PHP Fatal error:  Uncaught Error: Call to protected SingletonClass::__construct() from invalid context<br /></pre>