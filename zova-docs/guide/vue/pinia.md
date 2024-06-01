# Pinia

Zova recommends using [store bean](../essentials/ioc/store-bean.md) to create global state objects. Of course, you can also use the existing `pinia store`

## Basic idea

Create a `store bean` and embed the `pinia store` in the store bean. In this way, you can inject the `store bean` anywhere and directly access the properties and methods of the bean instance, while providing Typescript typing support

## 1. Enable the Pinia module

The Pinia module is disabled by default. In this way, if the pinia store is not used in the project, the pinia code will not be bundled. Therefore, if you want to use the pinia store, you need to enable the Pinia module first

Create a new file `env/.env.mine` in the project root directory:

```txt
PROJECT_DISABLED_MODULES =
```

- 将`PROJECT_DISABLED_MODULES`设置为空，Pinia 模块就自动激活了
- Set `PROJECT_DISABLED_MODULES` to empty, and the Pinia module will be automatically enabled

## 2. Create a pinia store

For the convenience of demonstration, first create a pinia store: `useCounterStore`

`src/suite/a-demo/modules/a-demo/src/bean/counterStore.ts`

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

Use the cli command to create a store bean

```bash
$ zova :create:store counter --module=a-demo
```

Use `useCounterStore` in the generated file

`src/suite/a-demo/modules/a-demo/src/bean/store.counter.ts`

```typescript
import { Store } from 'zova';
import { PiniaStoreLike, BeanPiniaStoreBase } from 'zova-module-a-pinia';
import { useCounterStore } from './counterStore.js';

export type StoreCounterLike = PiniaStoreLike<StoreCounter, typeof useCounterStore>;

@Store()
export class StoreCounter extends BeanPiniaStoreBase {
  protected async __init__() {
    await super.__init__(useCounterStore);
  }
}
```

- line 5: Define a type `StoreCounterLike`, through which you can directly access the properties and methods of pinia store
- line 8: Inherited from the base class `BeanPiniaStoreBase`
- line 10: Call the `__init__` method of the base class to create an instance of pinia store

## 4. Use store bean

You can use store bean in any module. Here we take the existing page component of module `a-demo` as an example:

`src/suite/a-demo/modules/a-demo/src/page/state/controller.ts`

```typescript
import { Local, Use } from 'zova';
import type { StoreCounterLike } from '../../bean/store.counter.js';

@Local()
export class ControllerPageState {
  @Use('a-demo.store.counter')
  $$counter: StoreCounterLike;

  protected async __init__() {
    const count = this.$$counter.count;
    const doubleCount = this.$$counter.doubleCount;
    const name = this.$$counter.name;
    this.$$counter.increment();
  }
}
```

- line 6: Use the `@Use` decorator function to pass in the store bean's identifier
- line 7: Declare a variable of type `StoreCounterLike`
- Then you can directly access the properties and methods of `$$counter`
