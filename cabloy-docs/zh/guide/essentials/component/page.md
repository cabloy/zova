# 页面组件

## 创建页面组件

我们先通过一个 cli 命令来创建一个页面组件`counter`，该命令会创建一个路由和一个目录:

```bash
$ cabloy front:create:page counter --module=a-demo
```

### 路由

`src/suite/a-demo/modules/a-demo/src/routes.ts`

```typescript{1,6}
import Counter from './page/counter/index.vue';
import { IModuleRoute } from 'cabloy-module-front-a-router';

export const routes: IModuleRoute[] = [
  //
  { path: 'counter', component: Counter },
];
```

- path: `counter`是相对路径，由于该页面组件属于模块`a-demo`，因此其绝对路径是`/a/demo/counter`

### 目录

在 Cabloy-Front 中，一个页面组件被切分为三个文件，位于刚才创建的目录`src/page/counter`中：

```
src
└─ page
   └─ counter
      ├─ index.vue
      ├─ mother.ts
      └─ render.tsx
```

| 名称       | 说明                      |
| ---------- | ------------------------- |
| index.vue  | 用于定义vue组件           |
| mother.ts  | 用于代码逻辑的 local bean |
| render.tsx | 用于渲染逻辑的 local bean |

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

1. 只需在`index.vue`中引入`mother`bean 即可

## mother.ts

```typescript
import { BeanMotherPageBase, Local } from '@cabloy/front';

@Local()
export class MotherPageCounter extends BeanMotherPageBase {
  count: number = 0;

  inrement() {
    this.count++;
  }

  decrement() {
    this.count--;
  }
}
```

1. 使用`@Local`将`mother`定义为 local bean，从而注册在 IOC 容器中
2. 定义一个响应式属性：`counter`，类型为`number`
3. 直接用原生 js 代码来修改`counter`的值

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
        <div>count(ref): {this.count}</div>
        <button onClick={() => this.inrement()}>Inrement</button>
        <button onClick={() => this.decrement()}>Decrement</button>
      </div>
    );
  }
}
```

1. 使用`@Local`将`render`定义为 local bean，从而注册在 IOC 容器中
2. 在`render`方法中使用`tsx`语法书写渲染逻辑
3. 直接用原生 js 代码来获取`counter`的值

## mother名称的来历

`index.vue`仅仅是用于定义 Vue 组件的壳，调用`useMother`函数之后，就把工作让渡给`mother.ts`了。如果需要的话，`props`、`emits`和`slots`的定义都在`mother.ts`中，而且大多数业务逻辑也会放入`mother.ts`中

这就好比狮子的行为：雄狮子是门面，干活的都是母狮子。因此，如果把`index.vue`看作是`father`的话，那么具体干活的就是`mother.ts`了
