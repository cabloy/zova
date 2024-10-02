# 子组件

相对`页面组件`而言，`子组件`有三类成员：`Props`、`Emits` 和 `Slots`。那么在 Zova 中子组件的三类成员如何定义和使用呢？

## Props

以`card`子组件为例，定义三个 Props：`header`、`content`、和 `footer`

### 初始化代码骨架

::: tip
右键菜单 - [模块路径/src/component/card]: `Zova Refactor/Add Component Props`
:::

### 定义Props接口

首先，在`controller.ts`中定义 Props 接口：

```typescript
export interface Props {
  header?: string;
  content?: string;
  footer?: string;
}
```

还可以为 Props 设置缺省值：

```typescript{2-4}
export class ControllerCard {
  static $propsDefault = {
    header: 'default header',
  };
}
```

### 访问Props

在`render.tsx`中访问 Props：

```typescript{7,10,13}
export class RenderCard {
  render() {
    return (
      <div>
        <div>
          <div style={{ backgroundColor: 'teal' }}>
            <div>{`Prop: ${this.$props.header}`}</div>
          </div>
          <div style={{ backgroundColor: 'orange' }}>
            <div>{`Prop: ${this.$props.content}`}</div>
          </div>
          <div style={{ backgroundColor: 'green' }}>
            <div>{`Prop: ${this.$props.footer}`}</div>
          </div>
        </div>
      </div>
    );
  }
}
```

### 使用Props

接下来，在父组件中使用子组件：

```typescript{8-10}
import { ZCard } from '../../index.js';

export class RenderComponent {
  render() {
    return (
      <div>
        <ZCard
          header="header"
          content="content"
          footer="footer"
        ></ZCard>
      </div>
    );
  }
}
```

## Emits

接下来，在`card`子组件中，定义一个 Emit：`reset`

### 初始化代码骨架

::: tip
右键菜单 - [模块路径/src/component/card]: `Zova Refactor/Add Component Emits`
:::

### 定义Emits接口

首先，在`controller.ts`中定义 Emits 接口：

```typescript
export type Emits = {
  (e: 'reset', time: Date): void;
};
```

### 触发Emit

在`render.tsx`中触发 Emit：

```typescript{6-8}
export class RenderCard {
  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.$emit('reset', new Date());
          }}
        >
          Reset Time
        </button>
      </div>
    );
  }
}
```

### 使用Emits

接下来，在父组件中使用子组件：

```typescript{8-10}
import { ZCard } from '../../index.js';

export class RenderComponent {
  render() {
    return (
      <div>
        <ZCard
          onReset={time => {
            console.log(time);
          }}
        ></ZCard>
      </div>
    );
  }
}
```

## Slots

接下来，在`card`子组件中，定义三个 Slots：`header`、`default`和`footer`

### 初始化代码骨架

::: tip
右键菜单 - [模块路径/src/component/card]: `Zova Refactor/Add Component Slots`
:::

### 定义Slots接口

首先，在`controller.ts`中定义 Slots 接口：

```typescript
export interface Slots {
  header?(): JSX.Element;
  default?(): JSX.Element;
  footer?(): JSX.Element;
}
```

### 渲染Slots

在`render.tsx`中渲染 Slots：

```typescript{7,10,13}
export class RenderCard {
  render() {
    return (
      <div>
        <div>
          <div style={{ backgroundColor: 'teal' }}>
            {this.$slots.header?.()}
          </div>
          <div style={{ backgroundColor: 'orange' }}>
            {this.$slots.default?.()}
          </div>
          <div style={{ backgroundColor: 'green' }}>
            {this.$slots.footer?.()}
          </div>
        </div>
      </div>
    );
  }
}
```

### 使用Slots

接下来，在父组件中使用子组件：

```typescript{8-18}
import { ZCard } from '../../index.js';

export class RenderComponent {
  render() {
    return (
      <div>
        <ZCard
          slots={{
            header: () => {
              return <div>this is a header slot from parent</div>;
            },
            default: () => {
              return <div>this is a default slot from parent</div>;
            },
            footer: () => {
              return <div>this is a footer slot from parent</div>;
            },
          }}
        ></ZCard>
      </div>
    );
  }
}
```
