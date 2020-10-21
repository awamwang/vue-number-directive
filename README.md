# vue-number-directive

[![npm Version][npm version badge]][npm page] [![GitHub License][license badge]][license page] [![Build Status][build badge]][build page] [![Coverage Status][cover badge]][cover page]

> A Vue plug-in to keep the input content as Number string

[English Doc](README.md)|[中文文档](README.zh_CN.md)

[examples & docs](https://awamwang.github.io/vue-number-directive/)

[TOC]

## Install

### Node (use as a dependency in packaging system)

```sh
# with `yarn`:
yarn add vue-number-directive
# or with `npm`:
npm install vue-number-directive --save
```

### browser

Use the umd.js file in the `dist/`, refer to [UMD example](examples/umd/index.html)

```html
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script>
<script src="https://cdn.jsdelivr.net/npm/vue-number-directive/dist/index.umd.js"></script>

<script>
  // The global name of the plugin is `VueNumber`.
  Vue.use(VueNumber)
</script>
```

## Usage

### Global plug-in

```js
import Vue from 'vue'
import NumberDirective from 'vue-number-directive'
// If you want to use source code for projects with esm packaging system, import src
// import NumberDirective from 'vue-number-directive/src/index'

Vue.use(NumberDirective, globalOptions)
```

### Directive only

```js
import Vue from 'vue'
import NumberDirective from 'vue-number-directive'

Vue.directive('{{name}}', NumberDirective)
// or use as a local directive
export default {
  directives: {
    number: NumberDirective
  }
}
```

## API

### Options

```js
optimizeOptions(
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
      fixed: config.fixed,
      flag: config.flag,
      min: config.min,
      max: config.max,
      minimum: config.minimum,
      maximum: config.maximum,
      // exclusiveMinimum,
      // exclusiveMaximum,
      sep: config.sep
    },
    parseSchema(config.schema),
    globalOptions
  )
)
```

### Directive modifiers

#### int 

Whether is a integer

#### pos

Whether is a positive number

## Features

### supported element

#### \<input>

only supports the following input types：

- text,
- tel,
- password
- Search
- hidden, or
- no type specified at al

#### <textarea\>

#### contenteditable element

Element with a true `contenteditable` attribute

#### Vue component

Vue component that contain the above elements

- such as ElementUI’s Input and NumberInput

## Maintainers

[@Awam M Wang](https://github.com/awamwang)

## Contributing

See [the CONTRIBUTING file](CONTRIBUTING.md)

PRs accepted.

## ChangeLog

see [the CHANGELOG file](./CHANGELOG.md)

## License

[MIT © 2020 Awam M Wang](./LICENSE)



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


