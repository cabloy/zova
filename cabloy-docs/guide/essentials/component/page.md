# Page Component

## Create Page Component

Let's first create a page component `counter` using a cli command, which will create a route and a directory:

```bash
$ cabloy front:create:page counter --module=a-demo
```

### Route

`src/module/test-home/src/routes.ts`

```typescript{1,6}
import Counter from './page/counter/index.vue';
import { IModuleRoute } from 'cabloy-module-front-a-router';

export const routes: IModuleRoute[] = [
  //
  { path: 'counter', component: Counter },
];
```

- path: `counter` is a relative path, and since the page component belongs to the module `test-home`, its absolute path is `/test/home/counter`

### Directory

In Cabloy-Front, a page component will be splited to three files located in the directory `src/page/counter` that was just created:

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

## index.vue

```vue
<template>
  <template></template>
</template>

<script setup lang="ts">
import { useMother } from '@cabloy/front';
import { MotherPageCounter } from './mother.js';
import { RenderPageCounter } from './render.jsx';
useMother(MotherPageCounter, RenderPageCounter);
</script>
```

1. Just import and use the `mother` bean in `index.vue` as well

## mother.ts

```typescript
import { BeanMotherPageBase, Local } from '@cabloy/front';

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

1. Define `mother` as a local bean using `@Local` to register it in the ioc container
2. Define a reactive state: `counter` of type `number`
3. Directly modify the value of `counter` by vanilla javascript

## render.tsx

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

## Why is mother?

`index.vue` is just a facade used to define Vue component. After invoking the `useMother` function, the work is transferred to `mother.ts`. If necessary, the definitions of `props`, `emits` and `slots` are all in `mother.ts`, and most business logics will also be placed in `mother.ts`

This is just like the behavior of lions: the male lions are the facade, and the female lions do the work. Therefore, if you think of `index.vue` as `father`, then `mother.ts` is the one who actually does the work
