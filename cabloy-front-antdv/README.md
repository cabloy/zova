# @cabloy/front-antdv

@cabloy/front-antdv is a vue3 framework with ioc container. No `ref/reactive`, no `ref.value`, no `pinia`

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

Documentation can be found at **[https://front.cabloy.com](https://front.cabloy.com)**.

## Features

@cabloy/front-antdv has introduced the following distinct features for Vue3:

- `No ref/reactive`: Because in most scenarios, there is no need to use ref and reactive
- `No ref.value`: Because defining reactive variables in Cabloy-Front is more intuitive and no longer requires ref semantics
- `No pinia`: Because Cabloy-Front provides an ioc container, which can more flexibly define and use global objects

## Demonstration

![No ref/reactive](../cabloy-docs/assets/img/state-no-ref-reactive.gif)

## Code style demonstration

To demonstrate the coding style of Cabloy-Front, we will develop a simple page component as follows:

### 1. file structure

In Cabloy-Front, a page component will be splited to three files. Now we create a page component named as `counter` through a cli command:

```bash
$ cabloy front:create:page counter
```

The created file structure as follows:

```
src
└─ page
   └─ counter
      ├─ index.vue
      ├─ mother.ts
      └─ render.tsx
```

| Name       | Description                 |
| ---------- | --------------------------- |
| index.vue  | define vue component        |
| mother.ts  | local bean for logic codes  |
| render.tsx | local bean for render codes |

### 2. index.vue

```vue
<template>
  <template></template>
</template>

<script setup lang="ts">
import { useMother } from '@cabloy/front';
import { MotherPageCounter } from './mother.js';
useMother(MotherPageCounter);
</script>
```

1. Just import and use the `mother` bean in `index.vue` as well

### 3. mother.ts

```typescript
import { BeanMotherPageBase, Local, Use } from '@cabloy/front';
import { RenderPageCounter } from './render.jsx';

@Local()
export class MotherPageCounter extends BeanMotherPageBase {
  @Use()
  $$render: RenderPageCounter;

  counter: number = 0;

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
4. Directly modify the value of `counter` by vanilla javascript

### 4. render.tsx

```typescript
import { BeanRenderBase, Local } from '@cabloy/front';
import type { MotherPageCounter } from './mother.js';

export interface RenderPageCounter extends MotherPageCounter { }

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

1. Define `render` as a local bean using `@Local` to register it in the ioc container
2. Write rendering logic using the `tsx` syntax in the `render` method
3. Directly obtain the value of `counter` by vanilla javascript

## Stay In Touch

- [Twitter](https://twitter.com/zhennann2024)
- [Wechat](./cabloy-docs/zh/assets/img/wx-zhennann.jpg)

## License

[MIT](./LICENSE)

Copyright (c) 2016-present, zhennann
