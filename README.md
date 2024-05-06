# Cabloy-Front

Cabloy-Front is a vue3 framework with ioc container, making reactive development more concise and efficient, and capable of developing large-scale business systems.

[![LICENSE MIT][license-image]][license-url]
[![NPM version][npm-image]][npm-url]
[![NPM download][download-image]][download-url]

[license-image]: https://img.shields.io/badge/license-MIT-blue.svg
[license-url]: https://github.com/cabloy/cabloy-front/blob/master/LICENSE
[npm-image]: https://img.shields.io/npm/v/@cabloy/front.svg?style=flat-square
[npm-url]: https://npmjs.com/package/@cabloy/front
[download-image]: https://img.shields.io/npm/dm/@cabloy/front?color=orange&label=npm%20downloads
[download-url]: https://npmjs.com/package/@cabloy/front

## Documentation

Documentation can be found at **[https://cabloy.github.io/cabloy-front/](https://cabloy.github.io/cabloy-front/)**.

## With UI libraries

Cabloy-Front can be used with any UI library and comes with built-in project templates for several UI libraries, making it easy to use out of the box, including:

- antdv
- element-plus
- quasar
- vuetify

## Features

Cabloy-Front has introduced the following distinct features for Vue3:

- `Stop worrying about using ref or reactive`: Because in most scenarios, there is no need to use ref and reactive
- `No longer write a large number of ref.value`: Because defining reactive variables in Cabloy-Front is more intuitive and no longer requires ref semantics
- `No longer using pinia`: Because Cabloy-Front provides an ioc container, which can more flexibly define and use global objects

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
