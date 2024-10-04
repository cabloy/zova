# Pinia

Zova recommends using [store bean](../essentials/ioc/store-bean.md) to create global state objects. Of course, you can also use the existing `pinia store`

## Basic idea

Create a `store bean` and embed the `pinia store` in the store bean. In this way, you can inject the `store bean` anywhere and directly access the properties and methods of the bean instance, while providing Typescript typing support

## 1. Enable the Pinia module

The Pinia module is disabled by default. In this way, if the pinia store is not used in the project, the pinia code will not be bundled. Therefore, if you want to use the pinia store, you need to enable the Pinia module first

Create a new file `env/.env.mine` in the project root directory:

```txt
PINIA_ENABLED = true
```

- Set `PINIA_ENABLED` to true, and the Pinia module will be automatically enabled

## 2. Create a pinia store

For the convenience of demonstration, first create a pinia store: `useCounterStore`

`src/suite/a-demo/modules/demo-basic/src/bean/counterStore.ts`

```typescript
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0);
  const name = ref('apple');
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }
  return { count, name, doubleCount, increment };
});
```

- Here, the `Setup` syntax is used to create the pinia store, and the `Option` syntax is also supported

## 3. Create a store bean

::: tip
Context Menu - [Module Path]: `Zova Create/Bean: Store`
:::

Enter the name of store bean according to the prompt, such as `counter`. The VSCode extension will automatically create the code skeleton of `store bean`

Use `useCounterStore` in the generated file

`src/suite/a-demo/modules/demo-basic/src/bean/store.counter.ts`

```typescript
import { Store } from 'zova';
import { BeanPiniaStoreBase, PiniaStore } from 'zova-module-a-pinia';
import { useCounterStore } from './counterStore.js';

export interface StoreCounter extends PiniaStore<typeof useCounterStore> {}

@Store()
export class StoreCounter extends BeanPiniaStoreBase {
  protected async __init__() {
    await super.__init__(useCounterStore);
  }
}
```

- line 5: Define a type `StoreCounter`, through which you can directly access the properties and methods of pinia store
- line 8: Inherited from the base class `BeanPiniaStoreBase`
- line 10: Call the `__init__` method of the base class to create an instance of pinia store

## 4. Use store bean

You can use store bean in any module. Here we take the existing page component of module `demo-basic` as an example:

`src/suite/a-demo/modules/demo-basic/src/page/pinia/controller.ts`

```typescript
import { Local, Use } from 'zova';
import { StoreCounter } from '../../bean/store.counter.js';

@Local()
export class ControllerPagePinia {
  @Use()
  $$counter: StoreCounter;

  protected async __init__() {
    const count = this.$$counter.count;
    const doubleCount = this.$$counter.doubleCount;
    const name = this.$$counter.name;
    this.$$counter.increment();
  }
}
```

- line 6: Use the `@Use` decorator function
- line 7: Declare a variable of type `StoreCounter`
- Then you can directly access the properties and methods of `$$counter`
