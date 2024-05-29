# Pinia

Cabloy-Front 推荐使用[store bean](../essentials/ioc/store-bean.md)来创建全局状态对象。当然也可以使用已经存在的`pinia store`

## 基本思路

创建一个 store bean，在 store bean 中嵌入 pinia store。这样，就可以在任何地方注入 store bean 实例，然后直接访问实例中的属性和方法，同时提供 Typescript 类型化支持

## 1. 启用Pinia模块

Pinia 模块默认是禁用的。这样，如果项目中没有使用 pinia store 就不会打包 pinia 代码。因此，如果要使用 pinia store 就需要先启用 Pinia 模块

在项目根目录新建文件`env/.env.mine`:

```txt
PROJECT_DISABLED_MODULES =
```

- 将`PROJECT_DISABLED_MODULES`设置为空，Pinia 模块就自动激活了

## 2. 创建pinia store

为了方便演示，先创建一个 useCounterStore

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

- 在这里是采用 Setup 语法创建 pinia store，也支持 Option 语法

## 3. 创建store bean

使用 cli 命令创建一个 store bean

```bash
$ cabloy front:create:store counter --module=a-demo
```

在生成的文件中嵌入 useCounterStore

`src/suite/a-demo/modules/a-demo/src/bean/store.counter.ts`

```typescript

```
