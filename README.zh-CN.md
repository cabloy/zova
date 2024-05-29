简体中文 | [English](./README.md)

# Cabloy-Front

Cabloy-Front 是一款支持 IOC 容器的 Vue3 框架。有了 IOC 容器的加持，定义响应式状态不再需要`ref/reactive`，也不再需要`ref.value`

[![LICENSE MIT][license-image]][license-url]
[![NPM version][npm-image]][npm-url]
[![NPM download][download-image]][download-url]

[license-image]: https://img.shields.io/badge/license-MIT-blue.svg
[license-url]: https://github.com/cabloy/cabloy-front/blob/master/LICENSE
[npm-image]: https://img.shields.io/npm/v/@cabloy/front.svg?style=flat-square
[npm-url]: https://npmjs.com/package/@cabloy/front
[download-image]: https://img.shields.io/npm/dm/@cabloy/front?color=orange&label=npm%20downloads
[download-url]: https://npmjs.com/package/@cabloy/front

## 文档

- [快速开始](https://front.cabloy.com/zh/guide/start/introduction.html)
- [为什么需要Vue3+IOC?](https://front.cabloy.com/zh/guide/start/why.html)

## 与UI库的配合

Cabloy-Front 可以搭配任何 UI 库使用，并且内置了几款 UI 库的项目模版，便于开箱即用，包括：

- antdv
- element-plus
- quasar
- vuetify

## 特性

Cabloy-Front 为 Vue3 引入了以下鲜明特征：

1. `不用ref/reactive`：有了 IOC 容器的加持，定义响应式状态不再需要`ref/reactive`
2. `不用ref.value`：因为不用`ref`，自然也就不用再写大量的`ref.value`
3. `模块化体系`：在一个大型的 Web 业务系统当中，随着业务的增长和变更，为了避免代码失控，有必要将系统拆分为一个个相对独立的模块，这就是 Cabloy-Front 采用模块化体系的缘由。因此，在 Cabloy-Front 中，实际的业务代码开发都是在模块中进行

## 动图演示

![No ref/reactive](./cabloy-docs/assets/img/state-no-ref-reactive.gif)

## 演示：不用`ref/reactive`，不用`ref.value`

### 1. 定义响应式状态

在组件中定义一个响应式变量`count`，并且添加两个方法修改变量的值

```typescript
export class ControllerPageCounter {
  count: number = 0;

  inrement() {
    this.count++;
  }

  decrement() {
    this.count--;
  }
}
```

### 2. 使用响应式状态

采用 tsx 语法使用`count`

```typescript
export class RenderPageCounter {
  render() {
    return (
      <div>
        <div>count(ref): {this.count}</div>
        <button onClick={() => this.inrement()}>Inrement</button>
        <button onClick={() => this.decrement()}>Decrement</button>
      </div>
    );
  }
}
```

## 演示：依赖注入

### 1. 逻辑抽离

将`count`逻辑抽离出来，创建一个`Counter`Bean

```typescript
@Local()
export class Counter {
  count: number = 0;

  inrement() {
    this.count++;
  }

  decrement() {
    this.count--;
  }
}
```

### 2. 在组件中注入并使用

```typescript
export class ControllerPageCounter {
  @Use()
  $$counter: Counter;
}
```

```typescript
export class RenderPageCounter {
  render() {
    return (
      <div>
        <div>count(ref): {this.$$counter.count}</div>
        <button onClick={() => this.$$counter.inrement()}>Inrement</button>
        <button onClick={() => this.$$counter.decrement()}>Decrement</button>
      </div>
    );
  }
}
```

## 联系方式

- [Twitter](https://twitter.com/zhennann2024)
- [微信](./cabloy-docs/zh/assets/img/wx-zhennann.jpg)

![微信](./cabloy-docs/zh/assets/img/wx-zhennann.jpg)

## 致谢

- 向 Angular 表达感谢，Angular 激发了在 Vue 中实现 ioc 容器的灵感
- 向 Vue 表达感谢，Vue 提供了非常强大的响应式系统和生态。如果没有这些生态的支持，Cabloy-Front 的实现将非常困难

## License

[MIT](./LICENSE)

Copyright (c) 2016-present, CabloyJS
