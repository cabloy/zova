# @cabloy/front-element

@cabloy/front-element is a vue3 framework with ioc container. No `ref/reactive`, no `ref.value`, no `pinia`

[![LICENSE MIT][license-image]][license-url]
[![NPM version][npm-image]][npm-url]
[![NPM download][download-image]][download-url]

[license-image]: https://img.shields.io/badge/license-MIT-blue.svg
[license-url]: https://github.com/cabloy/cabloy-front/blob/master/LICENSE
[npm-image]: https://img.shields.io/npm/v/@cabloy/front-element.svg?style=flat-square
[npm-url]: https://npmjs.com/package/@cabloy/front-element
[download-image]: https://img.shields.io/npm/dm/@cabloy/front-element?color=orange&label=npm%20downloads
[download-url]: https://npmjs.com/package/@cabloy/front-element

## Documentation

Documentation can be found at **[https://front.cabloy.com](https://front.cabloy.com)**.

## Features

@cabloy/front-element has introduced the following distinct features for Vue3:

- `No ref/reactive`: Because in most scenarios, there is no need to use ref and reactive
- `No ref.value`: Because defining reactive variables in Cabloy-Front is more intuitive and no longer requires ref semantics
- `No pinia`: Because Cabloy-Front provides an ioc container, which can more flexibly define and use global objects

## Gif demonstration

![No ref/reactive](../cabloy-docs/assets/img/state-no-ref-reactive.gif)

## Code style demonstration

### 1. Define reactive state

```typescript
@Local()
export class MotherPageCounter extends BeanMotherPageBase {
  counter: number = 0;

  inrement() {
    this.counter++;
  }

  decrement() {
    this.counter--;
  }
}
```

### 2. Use reactive state

```typescript
@Local()
export class RenderPageCounter extends BeanRenderBase {
  render() {
    return (
      <div>
        <div>counter(ref): {this.counter}</div>
        <button onClick={() => this.inrement()}>Inrement</button>
        <button onClick={() => this.decrement()}>Decrement</button>
      </div>
    );
  }
}
```

## Stay In Touch

- [Twitter](https://twitter.com/zhennann2024)
- [Wechat](./cabloy-docs/zh/assets/img/wx-zhennann.jpg)

## License

[MIT](./LICENSE)

Copyright (c) 2016-present, zhennann
