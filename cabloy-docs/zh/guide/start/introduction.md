# 介绍

## 什么是Cabloy-Front？

Cabloy-Front是一款支持IOC容器的Vue3框架，让响应式开发更加简洁高效，胜任大型业务系统的开发。

## 与UI库的配合

Cabloy-Front可以搭配任何UI库使用，并且内置了几款UI库的项目模版，便于开箱即用，包括：

- antdv
- element-plus
- quasar
- vuetify

## 特性

Cabloy-Front为Vue3引入了以下鲜明特征：

- `不再纠结使用ref还是reactive`：因为在大多数场景下，不需要使用ref和reactive
- `不再书写大量ref.value`：因为在Cabloy-Front中定义响应式变量更加直观，不再需要ref语义
- `不再使用pinia状态管理`：因为Cabloy-Front提供了IOC容器，可以更加灵活的定义和使用全局对象

## 代码风格演示

为了演示Cabloy-Front的代码风格，下面开发一个简单的页面组件：

### 1. 文件结构

由于要演示响应式写法，我们给这个页面组件起名叫`state`。在项目中新建一个目录`state`，在目录中创建三个文件：

- `index.vue`：用于定义组件
- `mother.ts`：用于代码逻辑的local bean
- `render.tsx`：用于渲染逻辑的local bean

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

1. 只需在`index.vue`中引入`mother`bean即可

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

1. 使用`@Local`将`mother`定义为local bean，从而注册在IOC容器中
2. 使用`@Use`注入`render`bean
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

1. 使用`@Local`将`render`定义为local bean，从而注册在IOC容器中
2. 在`render`方法中使用`tsx`语法书写渲染逻辑
3. 直接用原生js代码来获取`counter`和`counter2`的值
