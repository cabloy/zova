# Pinia

Zova 推荐使用[store bean](../essentials/ioc/store-bean.md)来创建全局状态对象。当然也可以使用已经存在的`pinia store`

## 基本思路

创建一个 store bean，在 store bean 中嵌入 pinia store。这样，就可以在任何地方注入 store bean 实例，然后直接访问实例中的属性和方法，同时提供 Typescript 类型化支持

## 1. 启用Pinia模块

Pinia 模块默认是禁用的。这样，如果项目中没有使用 pinia store 就不会打包 pinia 代码。因此，如果要使用 pinia store 就需要先启用 Pinia 模块

在项目根目录新建文件`env/.env.mine`:

```txt
PINIA_ENABLED = true
```

- 将`PINIA_ENABLED`设置为 true，Pinia 模块就自动启用了

## 2. 创建pinia store

为了方便演示，先创建一个 useCounterStore

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

- 在这里是采用 Setup 语法创建 pinia store，也支持 Option 语法

## 3. 创建store bean

::: tip
右键菜单 - [模块路径]: `Zova Create/Bean: Store`
:::

依据提示输入 store bean 的名称，比如`counter`，VSCode 插件会自动添加 store bean 的代码骨架

在生成的文件中嵌入 useCounterStore

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

- line 5: 定义一个类型`StoreCounter`，通过此类型可以直接访问 pinia store 的属性和方法
- line 8: 继承自基类`BeanPiniaStoreBase`
- line 10: 调用基类的`__init__`方法创建 pinia store 的实例

## 4. 使用store bean

可以在任何模块使用 store bean。这里以 demo-basic 模块现有的页面组件为例：

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

- line 6: 使用@Use 装饰器函数
- line 7: 声明一个变量，类型为 StoreCounter
- 接下来就可以直接访问$$counter 的属性和方法，有完整的 Typescript 类型提示
