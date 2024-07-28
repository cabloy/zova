简体中文 | [English](./README.md)

# Zova

Zova 是一款支持 IOC 容器的 Vue3 框架。有了 IOC 容器的加持，定义响应式状态不再需要`ref/reactive`，也不再需要`ref.value`

[![LICENSE MIT][license-image]][license-url]
[![NPM version][npm-image]][npm-url]
[![NPM download][download-image]][download-url]

[license-image]: https://img.shields.io/badge/license-MIT-blue.svg
[license-url]: https://github.com/cabloy/zova/blob/master/LICENSE
[npm-image]: https://img.shields.io/npm/v/zova.svg?style=flat-square
[npm-url]: https://npmjs.com/package/zova
[download-image]: https://img.shields.io/npm/dm/zova?color=orange&label=npm%20downloads
[download-url]: https://npmjs.com/package/zova

## 与UI库的配合

Zova 可以搭配任何 UI 库使用，并且内置了几款 UI 库的项目模版，便于开箱即用，包括：

- antdv
- element-plus
- quasar
- vuetify
- empty：可以在此基础上使用其他 UI 库

## 在线预览

- [vue3 + ts + tsx + tailwindcss + daisyui](https://zova.js.org/zova-demo/)

## 文档

- [快速开始](https://zova.js.org/zh/guide/start/introduction.html)
- [为什么需要Vue3+IOC?](https://zova.js.org/zh/guide/start/why.html)

## 特性

- [模块化体系](https://zova.js.org/zh/guide/essentials/modularization/module.html)：构建大型业务系统的基石
- [IOC控制反转](https://zova.js.org/zh/guide/essentials/ioc/introduction.html)：业务抽象与建模的基石
- [模块Scope](https://zova.js.org/zh/guide/essentials/scope/introduction.html)：基于依赖查找的访问策略
- [路由Query](https://zova.js.org/zh/guide/techniques/router/route-query.html)：带 TS 类型的路由
- [Mock](https://zova.js.org/zh/guide/techniques/mock/introduction.html)：更加便利的 Mock 机制
- [图标](https://zova.js.org/zh/guide/techniques/icon/icon-engine.html)：UI 库无关的图标引擎
- [CSS-in-JS: 样式&主题](https://zova.js.org/zh/guide/techniques/css-in-js/introduction.html)：基于[TypeStyle](https://github.com/typestyle/typestyle)的更加灵活的样式引擎
- [Model: 统一数据源](https://zova.js.org/zh/guide/techniques/model/introduction.html)：基于[Tanstack Query](https://tanstack.com/query/latest/docs/framework/vue/overview)的数据管理策略
- [Env环境变量](https://zova.js.org/zh/guide/techniques/env/introduction.html)：基于多维变量的 Env 文件加载策略

## 如何做

```bash
$ npm run init
$ cd ./zova-dev
$ npm run dev
```

## 如何做: ui-antdv

```bash
$ cd zova-ui-antdv
$ pnpm install
$ npm run dev
```

## 如何做: ui-element

```bash
$ cd zova-ui-element
$ pnpm install
$ npm run dev
```

## 如何做: ui-quasar

```bash
$ cd zova-ui-quasar
$ pnpm install
$ npm run dev
```

## 如何做: ui-vuetify

```bash
$ cd zova-ui-vuetify
$ pnpm install
$ npm run dev
```

## 如何做: ui-empty

```bash
$ cd zova-ui-empty
$ pnpm install
$ npm run dev
```

## 联系方式

- [Twitter](https://twitter.com/zhennann2024)
- [微信](./zova-docs/zh/assets/img/wx-zhennann.jpg)

![微信](./zova-docs/zh/assets/img/wx-zhennann.jpg)

## 致谢

- 向 Angular 表达感谢，Angular 激发了在 Vue 中实现 ioc 容器的灵感
- 向 Vue 表达感谢，Vue 提供了非常强大的响应式系统和生态。如果没有这些生态的支持，Zova 的实现将非常困难

## License

[MIT](./LICENSE)

Copyright (c) 2016-present, Zova
