# Page Component

## Create Page Component

::: tip
Context Menu - [Module Path]: `Zova Create/Page`
:::

Enter the name of the page component according to the prompt, such as `counter`, and the VSCode extension will automatically create a route record and a file directory

### Route

`src/suite/a-demo/modules/a-demo/src/routes.ts`

```typescript{1,5}
import Counter from './page/counter/index.vue';

export const routes: IModuleRoute[] = [
  //
  { path: 'counter', component: Counter },
];
```

- path: `counter` is a relative path, and since the page component belongs to the module `a-demo`, its absolute path is `/demo/basic/counter`

### Directory

In Zova, a page component will be splited to four files:

`src/suite/a-demo/modules/a-demo/src/page/counter`

```
src
└─ page
   └─ counter
      ├─ index.vue
      ├─ controller.ts
      ├─ render.tsx
      └─ style.ts
```

| Name          | Description                   |
| ------------- | ----------------------------- |
| index.vue     | define vue component          |
| controller.ts | local bean for business logic |
| render.tsx    | local bean for page render    |
| style.ts      | local bean for page style     |

## index.vue

```vue
<script setup lang="ts">
import { useControllerPage } from 'zova';
import { ControllerPageCounter } from './controller.js';
import { RenderCounter } from './render.jsx';
import { StyleCounter } from './style.js';
useControllerPage(ControllerPageCounter, RenderCounter, StyleCounter);
</script>
```

1. Just import and use the `controller` bean, `render` bean and `style` bean in `index.vue` as well
2. `useControllerPage` will automatically introduce an IOC container and inject the required bean instances into the container

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

## style.ts

```typescript
@Local()
export class StyleCounter {}
```

1. Define `style` as a local bean using `@Local` to register it in the ioc container
2. Support powerful `css-in-js` capabilities, see: [CSS-in-JS: Style & Theme](../../techniques/css-in-js/introduction.md)

## Progressive development

Zova adheres to the concept of progressive development. If the logic of some Vue components is relatively simple, or if you want to use the old Vue component code, you can directly use SFC development as usual without introducing an IOC container

- See: [Legacy Usage](../../vue/legacy.md)

## Page Parameters

You can pass the parameters to the page through the route. Zova enhances the page parameters and provides Typescript typing support

- See:
  - [Route Query](../../techniques/router/route-query.md)
  - [Route Params](../../techniques/router/route-params.md)
