# Page Component

## Create Page Component

Let's first create a page component `counter` using a cli command:

```bash
$ zova :create:page counter --module=a-demo
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

In Zova, a page component will be splited to three files:

`src/suite/a-demo/modules/a-demo/src/page/counter`

```
src
└─ page
   └─ counter
      ├─ index.vue
      ├─ controller.ts
      └─ render.tsx
```

| Name          | Description                 |
| ------------- | --------------------------- |
| index.vue     | define vue component        |
| controller.ts | local bean for logic codes  |
| render.tsx    | local bean for render codes |

## index.vue

```vue
<template>
  <template></template>
</template>

<script setup lang="ts">
import { useControllerPage } from 'zova';
import { ControllerPageCounter } from './controller.js';
import { RenderCounter } from './render.jsx';
useControllerPage(ControllerPageCounter, RenderCounter);
</script>
```

1. Just import and use the `controller` bean and `render` bean in `index.vue` as well

## controller.ts

```typescript
@Local()
export class ControllerPageCounter {
  count: number = 0;

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }
}
```

1. Define `controller` as a local bean using `@Local` to register it in the ioc container
2. Define a reactive state `count` of type `number`
3. Directly modify the value of `count` by vanilla javascript

## render.tsx

```typescript
@Local()
export class RenderCounter {
  render() {
    return (
      <div>
        <div>count(ref): {this.count}</div>
        <button onClick={() => this.increment()}>Increment</button>
        <button onClick={() => this.decrement()}>Decrement</button>
      </div>
    );
  }
}
```

1. Define `render` as a local bean using `@Local` to register it in the ioc container
2. Write rendering logic using the `tsx` syntax in the `render` method
3. Directly obtain the value of `count` by vanilla javascript
