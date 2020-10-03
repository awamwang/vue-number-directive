vue-number-directive

[![npm Version][npm version badge]][npm page] [![Node.js][node version badge]][node page] [![GitHub License][license badge]][license page] [![Build Status][build badge]][build page]

[examples & docs](https://awamwang.github.io/vue-number-directive/)

<!--ts-->
<!--te-->

## Introduction

`vue-number-directive`是一个Vue插件，用来让输入内容保持为数字。

## Use Guide

### Installation

```shell
# with `yarn` :
yarn add vue-number-directive
# or with `npm` :
npm install vue-number-directive --save
```

### How to use

按照 Vue 插件方式注册插件。

```js
import Vue from 'vue'
import NumberDirective from 'vue-number-directive'
// 如果想用未打包的src
// import NumberDirective from 'vue-number-directive/src/index'

Vue.use(NumberDirective)
```

浏览器中

```html

```

在浏览器中插件的全局名称为`VueNumber`。

```vue
<input name="input1" id="input1" v-model="input1" v-number.int="{model: input1, positive: true}">
```

## On which elements can it be used

### \<input\>

只支持下列 input 类型

- text,
- tel,
- password
- Search
- hidden, or
- no type specified at all

### \<textarea\>

### 支持 contenteditable 元素

### 支持一次性格式化

### 支持 Vue 组件

支持 element-ui Input/NumberInput/组件

理论支持其他UI库的Input

## Options

### 全局 Options

```typescript

```

### 指令 Options

```typescript

```

### 指令 modifiers

- int // 整数
- pos // 正数



[build badge]: https://travis-ci.com/awamwang/vue-number-directive.svg?branch=master
[build page]: https://travis-ci.com/awamwang/vue-number-directive
[license badge]: https://img.shields.io/badge/license-MIT%20License-blue.svg?style=flat-square
[license page]: https://github.com/awamwang/node-readme-md/blob/master/LICENSE
[node page]: https://nodejs.org/
[node version badge]: https://img.shields.io/node/v/readme-md.svg?style=flat-square
[npm page]: https://www.npmjs.com/package/vue-number-directive
[npm version badge]: https://img.shields.io/npm/v/vue-number-directive.svg?style=flat-square
