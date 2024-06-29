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

## 文档

- [快速开始](https://zova.js.org/zh/guide/start/introduction.html)
- [为什么需要Vue3+IOC?](https://zova.js.org/zh/guide/start/why.html)

## 如何做

```bash
$ npm run init
$ cd ./zova-dev
$ npm run dev
```

## 特性

- 构建大型业务系统的基石：[模块化体系](https://zova.js.org/zh/guide/essentials/modularization/module.html)
- 业务抽象与建模的基石：[IOC控制反转](https://zova.js.org/zh/guide/essentials/ioc/introduction.html)
- 基于依赖查找的访问策略：[模块Scope](https://zova.js.org/zh/guide/essentials/scope/introduction.html)
- 带 TS 类型的路由：[路由Query](https://zova.js.org/zh/guide/techniques/router/route-query.html)
- 更加便利的 Mock 机制：[Mock](https://zova.js.org/zh/guide/techniques/mock/introduction.html)
- UI 库无关的图标引擎：[图标](https://zova.js.org/zh/guide/techniques/icon/icon-engine.html)
- 更加灵活的样式引擎：[CSS-in-JS: 样式&主题](https://zova.js.org/zh/guide/techniques/css-in-js/introduction.html)
- 基于 Tanstack Query 的数据管理策略：[Model: 统一数据源](https://zova.js.org/zh/guide/techniques/model/introduction.html)
- 基于多维变量的 Env 文件加载策略：[Env环境变量](https://zova.js.org/zh/guide/techniques/env/introduction.html)

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
