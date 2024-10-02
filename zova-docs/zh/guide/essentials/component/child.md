# 子组件

## 创建子组件

::: tip
右键菜单 - [模块路径]: `Zova Create/Component`
:::

依据提示输入子组件的名称，比如`card`，VSCode 插件会自动创建一个文件目录`src/component/card`。在 Zova 中，一个子组件被拆分为四个文件，位于刚才创建的目录中：

```
src
└─ component
   └─ card
      ├─ index.vue
      ├─ controller.ts
      ├─ render.tsx
      └─ style.ts
```

| 名称          | 说明                      |
| ------------- | ------------------------- |
| index.vue     | 用于定义vue组件           |
| controller.ts | 用于业务逻辑的 local bean |
| render.tsx    | 用于组件渲染的 local bean |
| style.ts      | 用于组件样式的 local bean |

## 使用子组件

### 常规用法

在父组件中可以直接按常规用法使用子组件：

```typescript
import Card from '../../component/card/index.vue';

export class RenderComponent {
  render() {
    return (
      <Card></Card>
    );
  }
}
```

### 推荐用法

在模块中创建的子组件，自然是属于模块的资源。Zova 自动为每个子组件分配了一个唯一的名称（添加前缀`Z`），用于在模块内部以及跨模块使用

比如，子组件`card`属于模块`demo-basic`，那么，分配的唯一名称就是`ZCard`，那么可以采用如下方式使用子组件

```typescript
import { ZCard } from '../../index.js';

export class RenderComponent {
  render() {
    return (
      <ZCard></ZCard>
    );
  }
}
```

- 这种方式可以更好的支持组件的自动导入

## 跨模块使用子组件

在其他模块使用模块`demo-basic`的子组件`card`，可以采用如下方式：

```typescript
import { ZCard } from 'zova-module-demo-basic';

export class RenderComponent {
  render() {
    return (
      <ZCard></ZCard>
    );
  }
}
```

::: info
基于编译器的加持， ZCard 会自动转为异步加载模式，具体而言就是：系统会异步加载模块`demo-basic`，然后取得子组件`card`，再进行组件渲染
:::
