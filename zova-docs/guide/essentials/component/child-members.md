# Child Component

The difference from `Page Component` is that `Child Component` has three members: `Props`, `Emits` and `Slots`. So how are the three members defined and used in Zova?

## Props

Taking the `card` child component as an example, define three Props: `header`, `content` and `footer`

### Initialize code skeleton

::: tip
Context Menu - [Module Path/src/component/card]: `Zova Refactor/Add Component Props`
:::

### Define Props Interface

First, define the Props interface in `controller.ts`:

```typescript
export interface Props {
  header?: string;
  content?: string;
  footer?: string;
}
```

You can also set default values for Props:

```typescript{2-4}
export class ControllerCard {
  static $propsDefault = {
    header: 'default header',
  };
}
```

### Access Props

Access Props in `render.tsx`:

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

### Use Props

Next, use the child component inside the parent component:

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

Next, in the `card` child component, define an Emit: `reset`

### Initialize code skeleton

::: tip
Context Menu - [Module Path/src/component/card]: `Zova Refactor/Add Component Emits`
:::

### Define Emits Interface

First, define the Emits interface in `controller.ts`:

```typescript
export type Emits = {
  (e: 'reset', time: Date): void;
};
```

### Raise Emit

Raise Emit in `render.tsx`:

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

### Use Emits

Next, use the child component inside the parent component:

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

Next, in the `card` child component, define three Slots: `header`, `default` and `footer`

### Initialize code skeleton

::: tip
Context Menu - [Module Path/src/component/card]: `Zova Refactor/Add Component Slots`
:::

### Define Slots Interface

First, define the Slots interface in `controller.ts`:

```typescript
export interface Slots {
  header?(): JSX.Element;
  default?(): JSX.Element;
  footer?(): JSX.Element;
}
```

### Render Slots

Render Slots in `render.tsx`:

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

### Use Slots

Next, use the child component inside the parent component:

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
