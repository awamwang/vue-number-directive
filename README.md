# vue-number-directive

[![npm Version][npm version badge]][npm page] [![Node.js][node version badge]][node page] [![GitHub License][license badge]][license page] [![Build Status][build badge]][build page] [![Coverage Status][cover badge]][cover page]

> 一个 Vue 插件，用来让输入内容保持为符合要求的数字

[examples & docs](https://awamwang.github.io/vue-number-directive/)

## Table of Contents

<!-- ts -->
- [vue-number-directive](#vue-number-directive)
  - [Table of Contents](#table-of-contents)
  - [Install](#install)
    - [Node(作为依赖引入打包系统)](#node作为依赖引入打包系统)
    - [浏览器中](#浏览器中)
  - [Usage](#usage)
    - [全局插件方式](#全局插件方式)
    - [指令方式](#指令方式)
  - [API](#api)
    - [Options](#options)
    - [指令 modifiers](#指令-modifiers)
      - [int 是否整数](#int-是否整数)
      - [pos 是否正数](#pos-是否正数)
  - [Features](#features)
    - [支持的元素](#支持的元素)
      - [\<input\>](#input)
      - [\<textarea\>](#textarea)
      - [contenteditable 的元素](#contenteditable-的元素)
      - [包含上述元素的 Vue 组件](#包含上述元素的-vue-组件)
  - [Maintainers](#maintainers)
  - [Contributing](#contributing)
  - [ChangeLog](#changelog)
  - [License](#license)
<!-- te -->

## Install

### Node(作为依赖引入打包系统)

```sh
# with `yarn` :
yarn add vue-number-directive
# or with `npm` :
npm install vue-number-directive --save
```

### 浏览器中

引用 umd.js 包，参考[UMD example](examples/umd/index.html)

```html
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script>
<script src="../../dist/index.umd.js"></script>
在浏览器中插件的全局名称为`VueNumber`。
<script>
  Vue.use(VueNumber)
</script>
```

## Usage

### 全局插件方式

```js
import Vue from 'vue'
import NumberDirective from 'vue-number-directive'
// 如果想用未打包的src，适合项目有esm打包能力时
// import NumberDirective from 'vue-number-directive/src/index'

Vue.use(NumberDirective)
```

### 指令方式

```js
import Vue from 'vue'
import NumberDirective from 'vue-number-directive/src/number'

Vue.directive('{{name}}', NumberDirective)
// 或者局部指令方式
export default {
  directives: {
    number: NumberDirective
  }
}
```

## API

### Options

```js
mergeOptions(
  {
    el,
    vnode,
    debug: config.debug,
    modelPropPath,
    scope: config.scope,

    integer,
    positive,
    sientific: config.sientific,
    fixed: config.fixed !== void 0 ? config.fixed : 2,
    flag: config.flag,
    minimum,
    maximum,
    // exclusiveMinimum,
    // exclusiveMaximum,
    sep: config.sep
  },
  parseSchema(config.schema),
  globalOptions
)
```

### 指令 modifiers

#### int 是否整数

#### pos 是否正数

## Features

### 支持的元素

#### \<input\>

只支持下列 input 类型

- text,
- tel,
- password
- Search
- hidden, or
- no type specified at al

#### \<textarea\>

#### contenteditable 的元素

#### 包含上述元素的 Vue 组件

- 例如 Element 的 Input 和 NumberInput

## Maintainers

[@Awam M Wang](https://github.com/awamwang)

## Contributing

See [the CONTRIBUTING file](CONTRIBUTING.md)

PRs accepted.

## ChangeLog

see [the CHANGELOG file](./CHANGELOG.md)

## License

MIT © 2020 Awam M Wang

[build badge]: https://travis-ci.com/awamwang/vue-number-directive.svg?branch=master
[build page]: https://travis-ci.com/awamwang/vue-number-directive
[license badge]: https://img.shields.io/badge/license-MIT%20License-blue.svg?style=flat-square
[license page]: https://github.com/awamwang/vue-number-directive/blob/master/LICENSE
[node page]: https://nodejs.org/
[node version badge]: https://img.shields.io/node/v/readme-md.svg?style=flat-square
[npm page]: https://www.npmjs.com/package/vue-number-directive
[npm version badge]: https://img.shields.io/npm/v/vue-number-directive.svg?style=flat-square
[cover page]: https://coveralls.io/github/awamwang/vue-number-directive?branch=master
[cover badge]: https://coveralls.io/repos/github/awamwang/vue-number-directive/badge.svg?branch=master
