# Child Component

The difference from `Page Component` is that `Child Component` has three parts: `Props`, `Emits` and `Slots`. So how are the three parts defined and used in Zova?

## Create Child Component

Let's first create a child component `card` using a cli command:

```bash
$ zova :create:component card --module=demo-basic
```

This command will create a directory `src/component/card`. In Zova, a child component will be splited to four files located in that directory:

```
src
└─ component
   └─ card
      ├─ index.vue
      ├─ controller.ts
      ├─ render.tsx
      └─ style.ts
```

| Name          | Description                     |
| ------------- | ------------------------------- |
| index.vue     | define vue component            |
| controller.ts | local bean for business logic   |
| render.tsx    | local bean for component render |
| style.ts      | local bean for component style  |

## Props

Next, in the `card` child component, define three Props: `header`, `content` and `footer`

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

### Define Component Props

Then, define the component Props in `index.vue`:

```typescript{2-3}
<script setup lang="ts">
import { ControllerCard, Props} from './controller.js';
const props = withDefaults(defineProps<Props>(), ControllerCard.$propsDefault);
</script>
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
            <div>Prop: {this.$props.header}</div>
          </div>
          <div style={{ backgroundColor: 'orange' }}>
            <div>Prop: {this.$props.content}</div>
          </div>
          <div style={{ backgroundColor: 'green' }}>
            <div>Prop: {this.$props.footer}</div>
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
import Card from '../../component/card/index.vue';

export class RenderComponent {
  render() {
    return (
      <div>
        <Card
          header="header"
          content="content"
          footer="footer"
        ></Card>
      </div>
    );
  }
}
```

- Import the child component `Card` from `index.vue`, and then directly pass the value to the props of Card

## Emits

Next, in the `card` child component, define an Emit: `reset`

### Define Emits Interface

First, define the Emits interface in `controller.ts`:

```typescript
export type Emits = {
  (e: 'reset', time: Date): void;
};
```

### Define Component Emits

Then, define the component Emits in `index.vue`:

```typescript{2-3}
<script setup lang="ts">
import { Emits } from './controller.js';
const emit = defineEmits<Emits>();
</script>
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
import Card from '../../component/card/index.vue';

export class RenderComponent {
  render() {
    return (
      <div>
        <Card
          onReset={time => {
            console.log(time);
          }}
        ></Card>
      </div>
    );
  }
}
```

- Import the child component `Card` from `index.vue`, and then directly pass the event callback function to `onReset`

## Slots

Next, in the `card` child component, define three Slots: `header`, `default` and `footer`

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
            <div>Slot: {this.$slots.header?.()}</div>
          </div>
          <div style={{ backgroundColor: 'orange' }}>
            <div>Slot: {this.$slots.default?.()}</div>
          </div>
          <div style={{ backgroundColor: 'green' }}>
            <div>Slot: {this.$slots.footer?.()}</div>
          </div>
        </div>
      </div>
    );
  }
}
```

### Use Slots

Next, use the child component inside the parent component:

```typescript{1,6-16,20}
import Card from '../../component/card/index.vue';

export class RenderComponent {
  render() {
    return (
      <div>
        <Card
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
        ></Card>
      </div>
    );
  }
}
```

- Import the child component `Card` from `index.vue`, and then directly pass the value to the `slots` prop of Card
