English | [简体中文](./README.zh-CN.md)

# Zova

Zova is a vue3 framework with ioc container. With the support of ioc container, defining reactive states no longer needs `ref/reactive`, nor `ref.value`

[![LICENSE MIT][license-image]][license-url]
[![NPM version][npm-image]][npm-url]
[![NPM download][download-image]][download-url]

[license-image]: https://img.shields.io/badge/license-MIT-blue.svg
[license-url]: https://github.com/cabloy/zova/blob/master/LICENSE
[npm-image]: https://img.shields.io/npm/v/zova.svg?style=flat-square
[npm-url]: https://npmjs.com/package/zova
[download-image]: https://img.shields.io/npm/dm/zova?color=orange&label=npm%20downloads
[download-url]: https://npmjs.com/package/zova

## With UI libraries

Zova can be used with any UI library and comes with built-in project templates for several UI libraries, making it easy to use out of the box, including:

- antdv
- element-plus
- quasar
- vuetify
- empty： Other UI libraries can be used based on this empty template

## Demo online

- [vue3 + ts + tsx + tailwindcss + daisyui](https://zova.js.org/zova-demo/)

## Documentation

- [Get Started](https://zova.js.org/guide/start/introduction.html)
- [Why Vue3+IOC?](https://zova.js.org/guide/start/why.html)

## Features

- [Modularization](https://zova.js.org/guide/essentials/modularization/module.html): The basis for building large business systems
- [IOC](https://zova.js.org/guide/essentials/ioc/introduction.html): The basis for business abstraction and modeling
- [Module Scope](https://zova.js.org/guide/essentials/scope/introduction.html): Access strategy based on dependency lookup
- [Route Query](https://zova.js.org/guide/techniques/router/route-query.html): Routes with TS types
- [Mock](https://zova.js.org/guide/techniques/mock/introduction.html): More convenient Mock Mechanism
- [Icon](https://zova.js.org/guide/techniques/icon/icon-engine.html): UI library-independent icon engine
- [CSS-in-JS: Style & Theme](https://zova.js.org/guide/techniques/css-in-js/introduction.html): More flexible style engine based on [TypeStyle](https://github.com/typestyle/typestyle)
- [Model: Unified Data Source](https://zova.js.org/guide/techniques/model/introduction.html): Data management strategy based on [Tanstack Query](https://tanstack.com/query/latest/docs/framework/vue/overview)
- [Env](https://zova.js.org/guide/techniques/env/introduction.html): Env file loading strategy based on multi-dimensional variables

## How to do

```bash
$ npm run init
$ cd ./zova-dev
$ npm run dev
```

## How to do: ui-antdv

```bash
$ cd zova-ui-antdv
$ pnpm install
$ npm run dev
```

## How to do: ui-element

```bash
$ cd zova-ui-element
$ pnpm install
$ npm run dev
```

## How to do: ui-quasar

```bash
$ cd zova-ui-quasar
$ pnpm install
$ npm run dev
```

## How to do: ui-vuetify

```bash
$ cd zova-ui-vuetify
$ pnpm install
$ npm run dev
```

## How to do: ui-empty

```bash
$ cd zova-ui-empty
$ pnpm install
$ npm run dev
```

## Stay In Touch

- [Twitter](https://twitter.com/zhennann2024)
- [Wechat](./zova-docs/zh/assets/img/wx-zhennann.jpg)

## Thanks

- Thanks to Angular that ioc container of Zova was in part inspired by Angular
- Thanks to Vue that Vue provides a very powerful reactive system and ecosystem. Without the support of these ecosystems, Zova would be difficult to implement

## License

[MIT](./LICENSE)

Copyright (c) 2016-present, Zova
