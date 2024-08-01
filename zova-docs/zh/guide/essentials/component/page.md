# 页面组件

## 创建页面组件

我们先通过一个 cli 命令来创建一个页面组件`counter`:

```bash
$ zova :create:page counter --module=a-demo
```

- module 选项指示该页面组件归属于模块`a-demo`。也可以不指定选项，在命令行提示中再指定
- 该命令会创建一个路由和一个目录

### 路由

`src/suite/a-demo/modules/a-demo/src/routes.ts`

```typescript{1,5}
import Counter from './page/counter/index.vue';

export const routes: IModuleRoute[] = [
  //
  { path: 'counter', component: Counter },
];
```

- path: `counter`是相对路径，由于该页面组件属于模块`a-demo`，因此其绝对路径是`/a/demo/counter`

### 目录

在 Zova 中，一个页面组件被切分为四个文件:

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

| 名称          | 说明                      |
| ------------- | ------------------------- |
| index.vue     | 用于定义vue组件           |
| controller.ts | 用于业务逻辑的 local bean |
| render.tsx    | 用于页面渲染的 local bean |
| style.ts      | 用于页面样式的 local bean |

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

1. 只需在`index.vue`中引入`controller`bean、`render`bean 和`style`bean 即可

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

1. 使用`@Local`将`controller`定义为 local bean，从而注册在 IOC 容器中
2. 定义一个响应式属性：`count`，类型为`number`
3. 直接用原生 js 代码来修改`count`的值

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

1. 使用`@Local`将`render`定义为 local bean，从而注册在 IOC 容器中
2. 在`render`方法中使用`tsx`语法书写渲染逻辑
3. 直接用原生 js 代码来获取`count`的值

## style.ts

```typescript
@Local()
export class StyleCounter {}
```

1. 使用`@Local`将`style`定义为 local bean，从而注册在 IOC 容器中
2. 支持强大的 css-in-js 能力，参见：[CSS-in-JS: Style & Theme](../../techniques/css-in-js/introduction.md)
