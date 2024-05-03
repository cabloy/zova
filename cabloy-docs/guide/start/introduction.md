# Introduction

## What is Cabloy-Front?

Cabloy-Front is a vue3 framework with ioc container, making reactive development more concise and efficient, and capable of developing large-scale business systems.

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

### 1. 文件结构

由于要演示响应式写法，我们给这个页面组件起名叫`state`。在项目中新建一个目录`state`，在目录中创建三个文件：

- `index.vue`：用于定义组件
- `mother.ts`：用于代码逻辑
- `render.tsx`：用于渲染逻辑

### 2. index.vue

```vue
<template>
  <template></template>
</template>

<script setup lang="ts">
import { useMother } from '@cabloy/front-core';
import { MotherPageState } from './mother.js';
useMother(MotherPageState);
</script>
```

1. 只需在`index.vue`中引入`mother`组件即可

### 3. mother.ts

```typescript
import { BeanMotherPageBase, Local, Use, useComputed } from '@cabloy/front-core';
import { RenderPageState } from './render.jsx';

@Local()
export class MotherPageState extends BeanMotherPageBase {
  @Use()
  $$render: RenderPageState;

  counter: number = 0;
  counter2: string;

  protected async __init__() {
    this.counter2 = useComputed(() => {
      return `=== ${this.counter} ===`;
    });
  }

  inrement() {
    this.counter++;
  }

  decrement() {
    this.counter--;
  }
}
```

1. 使用`@Local`将`mother`定义为本地组件，从而注册在IOC容器中
2. 使用`@Use`注入`render`组件
3. 定义一个响应式属性：`counter`，类型为`number`
4. 定义一个计算属性：`counter2`，类型为`string`
5. 使用`useComputed`建立`counter2`和`counter`的联系
6. 直接用原生js代码来修改`counter`的值

### 4. render.tsx

```typescript
import { BeanRenderBase, Local } from '@cabloy/front-core';
import type { MotherPageState } from './mother.js';

export interface RenderPageState extends MotherPageState { }

@Local()
export class RenderPageState extends BeanRenderBase {
  render() {
    return (
      <div>
        <div>counter(ref): {this.counter}</div>
        <div>counter(computed): {this.counter2}</div>
        <button onClick={() => this.inrement()}>Inrement</button>
        <button onClick={() => this.decrement()}>Decrement</button>
      </div>
    );
  }
}
```

1. 使用`@Local`将`render`定义为本地组件，从而注册在IOC容器中
2. 在`render`方法中使用`tsx`语法书写渲染逻辑
3. 直接用原生js代码来获取`counter`和`counter2`的值
