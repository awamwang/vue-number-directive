# vue-autonumeric-directive

[![npm Version][npm version badge]][npm page] [![Node.js][node version badge]][node page] [![GitHub License][license badge]][license page] [![Build Status][build badge]][build page]

[example](https://github.com/keepgoingwm/vue-autonumeric-directive/tree/master/examples)

<!--ts-->
<!--te-->

## Introduction

`vue-autonumeric-directive`是一个基于[autoNumeric](https://github.com/autoNumeric/autoNumeric)的 Vue 插件，使用简单的指令方式，对需要的元素添加格式化功能。

## Use Guide

### Installation

```shell
# with `yarn` :
yarn add vue-autonumeric-directive
# or with `npm` :
npm install vue-autonumeric-directive --save
```

### How to use

按照 Vue 插件方式注册插件。

在浏览器中插件的全局名称为`VueNumberFormat`。

```vue
<input name="input1" id="input1" v-model="input1" v-number="config1">
```

```js
new Vue({
  el: '#demo',

  data: {
    input1: '123.00',
    config1: { bind: 'input1' },
    input2: 32
  }
})
```

## On which elements can it be used

[On which elements can it be used](https://github.com/autoNumeric/autoNumeric#on-which-elements-can-it-be-used)

### \<input\>

只支持下列 input 类型

- text,
- tel,
- hidden, or
- no type specified at all

### 支持 contenteditable 元素

### 支持其他元素的一次性格式化

### 支持 Vue 组件

支持 element-ui Input 组件

## Options

### 全局 Options

```typescript
export type PluginsOptions = {
  unsafeSet: boolean // use unsafe method to set value to element and vnode (eval, more powerful)

  pure: boolean // 是否不使用分隔符（例如千分位逗号）
  presion: number // 精确到小数点后几位
}
```

### 指令 Options

```typescript
declare type InputOptions = {
  unsafeSet: boolean

  bind: string
  min: string
  max: string
  presion: string // 精确到小数点后几位

  local: string // autoNumeric本地化配置，
  predifined: string // autoNumeric预定义配置

  numricOptions: AutoNumericOptions
}
```

- local: 参考[autoNumeric language options](https://github.com/autoNumeric/autoNumeric#predefined-language-options)
- predifined: 参考[autoNumeric predifined options](https://github.com/autoNumeric/autoNumeric#predefined-options)

### 指令 modifiers

- int // 整数
- pure // 不使用分隔符（例如千分位逗号）
- ppi // pure positive integer 无分隔符正整数

### numricOptions 选项

参考 numberic
numricOptions [autoNumeric options](https://github.com/autoNumeric/autoNumeric#options)

## Features

1. 保留原事件响应
2. 把 AutoNumeric 挂在了插件下
3. 把 AutoNumeric 的实例挂在了对应的 element 下，方便调用它的方法

[build badge]: https://travis-ci.com/keepgoingwm/vue-autonumeric-directive.svg?branch=master
[build page]: https://travis-ci.com/keepgoingwm/vue-autonumeric-directive
[license badge]: https://img.shields.io/badge/license-MIT%20License-blue.svg?style=flat-square
[license page]: https://github.com/keepgoingwm/node-readme-md/blob/master/LICENSE
[node page]: https://nodejs.org/
[node version badge]: https://img.shields.io/node/v/readme-md.svg?style=flat-square
[npm page]: https://www.npmjs.com/package/vue-autonumeric-directive
[npm version badge]: https://img.shields.io/npm/v/vue-autonumeric-directive.svg?style=flat-square
