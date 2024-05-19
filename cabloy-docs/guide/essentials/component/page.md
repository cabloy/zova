# Page Component

## Create Page Component

Let's first create a page component `counter` using a cli command:

```bash
$ cabloy front:create:page counter --module=a-demo
```

- The `module` option indicates that the page component belongs to the module `a-demo`
- This command will create a route and a directory

### Route

`src/suite/a-demo/modules/a-demo/src/routes.ts`

```typescript{1,5}
import Counter from './page/counter/index.vue';

export const routes: IModuleRoute[] = [
  //
  { path: 'counter', component: Counter },
];
```

- path: `counter` is a relative path, and since the page component belongs to the module `a-demo`, its absolute path is `/a/demo/counter`

### Directory

In Cabloy-Front, a page component will be splited to three files:

`src/suite/a-demo/modules/a-demo/src/page/counter`

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
import { useMotherPage } from '@cabloy/front';
import { MotherPageCounter } from './mother.js';
import { RenderPageCounter } from './render.jsx';
useMotherPage(MotherPageCounter, RenderPageCounter);
</script>
```

1. Just import and use the `mother` bean and `render` bean in `index.vue` as well

## mother.ts

```typescript
@Local()
export class MotherPageCounter {
  count: number = 0;

  inrement() {
    this.count++;
  }

  decrement() {
    this.count--;
  }
}
```

1. Define `mother` as a local bean using `@Local` to register it in the ioc container
2. Define a reactive state `count` of type `number`
3. Directly modify the value of `count` by vanilla javascript

## render.tsx

```typescript
@Local()
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

1. Define `render` as a local bean using `@Local` to register it in the ioc container
2. Write rendering logic using the `tsx` syntax in the `render` method
3. Directly obtain the value of `count` by vanilla javascript

## Why do the Vue component bean class names use mother as the prefix

- See: [Why do the Vue component bean class names use mother as the prefix ](../../resources/faq.md#faq-mother)
