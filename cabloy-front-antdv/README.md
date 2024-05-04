# @cabloy/front-antdv

@cabloy/front-antdv is a vue3 antdv framework with ioc container, making reactive development more concise and efficient, and capable of developing large-scale business systems.

[![LICENSE MIT][license-image]][license-url]
[![NPM version][npm-image]][npm-url]
[![NPM download][download-image]][download-url]

[license-image]: https://img.shields.io/badge/license-MIT-blue.svg
[license-url]: https://github.com/cabloy/cabloy-front/blob/master/LICENSE
[npm-image]: https://img.shields.io/npm/v/@cabloy/front-antdv.svg?style=flat-square
[npm-url]: https://npmjs.com/package/@cabloy/front-antdv
[download-image]: https://img.shields.io/npm/dm/@cabloy/front-antdv?color=orange&label=npm%20downloads
[download-url]: https://npmjs.com/package/@cabloy/front-antdv

## Documentation

Documentation can be found at **[https://cabloy.github.io/cabloy-front/](https://cabloy.github.io/cabloy-front/)**.

## Features

@cabloy/front-antdv has introduced the following distinct features for Vue3:

- `Stop worrying about using ref or reactive`: Because in most scenarios, there is no need to use ref and reactive
- `No longer write a large number of ref.value`: Because defining reactive variables in Cabloy-Front is more intuitive and no longer requires ref semantics
- `No longer using pinia`: Because Cabloy-Front provides an ioc container, which can more flexibly define and use global objects

## Code style demonstration

To demonstrate the coding style of Cabloy-Front, we will develop a simple page component as follows:

### 1. file structure

Due to the need to demonstrate reactive codes, we named this page component `state`. Create a new directory `state` in the project and create three files in it:

- `index.vue`: define component
- `mother.ts`：local bean for logic codes
- `render.tsx`: local bean for render codes

### 2. index.vue

```vue
<template>
  <template></template>
</template>

<script setup lang="ts">
import { useMother } from '@cabloy/front-core';
import { MotherPageState } from './mother.js';
useMother(MotherPageState);
</script>
```

1. Just import and use the `mother` bean in `index.vue` as well

### 3. mother.ts

```typescript
import { BeanMotherPageBase, Local, Use, useComputed } from '@cabloy/front-core';
import { RenderPageState } from './render.jsx';

@Local()
export class MotherPageState extends BeanMotherPageBase {
  @Use()
  $$render: RenderPageState;

  counter: number = 0;
  counter2: string;

  protected async __init__() {
    this.counter2 = useComputed(() => {
      return `=== ${this.counter} ===`;
    });
  }

  inrement() {
    this.counter++;
  }

  decrement() {
    this.counter--;
  }
}
```

1. Define `mother` as a local bean using `@Local` to register it in the ioc container
2. Inject the `render` bean using `@Use`
3. Define a reactive state: `counter` of type `number`
4. Define a computed state: `counter2` of type `string`
5. Use `useComputed` to establish a connection between `counter2` and `counter`
6. Directly modify the value of `counter` by vanilla javaScript

### 4. render.tsx

```typescript
import { BeanRenderBase, Local } from '@cabloy/front-core';
import type { MotherPageState } from './mother.js';

export interface RenderPageState extends MotherPageState { }

@Local()
export class RenderPageState extends BeanRenderBase {
  render() {
    return (
      <div>
        <div>counter(ref): {this.counter}</div>
        <div>counter(computed): {this.counter2}</div>
        <button onClick={() => this.inrement()}>Inrement</button>
        <button onClick={() => this.decrement()}>Decrement</button>
      </div>
    );
  }
}
```

1. Define `render` as a local bean using `@Local` to register it in the ioc container
2. Write rendering logic using the `tsx` syntax in the `render` method
3. Directly obtain the values of `counter` and `counter2` by vanilla javaScript

## Stay In Touch

- [Twitter](https://twitter.com/zhennann2024)
- [Wechat](./cabloy-docs/zh/assets/img/wx-zhennann.jpg)

## License

[MIT](./LICENSE)

Copyright (c) 2016-present, zhennann
