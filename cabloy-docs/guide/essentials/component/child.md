# Child Component

The difference from `Page Component` is that `Child Component` has three parts: `Props`, `Emits` and `Slots`. So how are the three parts defined and used in Cabloy-Front?

## Create Child Component

Let's first create a child component `card` using a cli command:

```bash
$ cabloy front:create:component card
```

This command will create a directory `src/component/card`. In Cabloy-Front, a child component will be splited to three files located in that directory:

```
src
└─ component
   └─ card
      ├─ index.vue
      ├─ mother.ts
      └─ render.tsx
```

| Name       | Description                 |
| ---------- | --------------------------- |
| index.vue  | define vue component        |
| mother.ts  | local bean for logic codes  |
| render.tsx | local bean for render codes |

## Props

Next, in the `card` child component, define three Props: `header`, `content` and `footer`

### Define Props Interface

First, define the Props interface in `mother.ts`:

```typescript
export interface Props {
  header?: string;
  content?: string;
  footer?: string;
}
```

You can also set default values for Props:

```typescript{3-5}
@Local()
export class MotherCard extends BeanMotherBase<unknown, Props, Emits, Slots> {
  static $propsDefault = {
    header: 'default header',
  };
}
```

### Define Component Props

Then, define the component Props in `index.vue`:

```typescript{2-3}
<script setup lang="ts">
import { MotherCard, Props} from './mother.js';
const props = withDefaults(defineProps<Props>(), MotherCard.$propsDefault);
</script>
```

### Access Props

Access Props in `render.tsx`:

```typescript{8,11,14}
@Local()
export class RenderCard extends BeanRenderBase {
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

```typescript{9-11}
import Card from '../../component/card/index.vue';

@Local()
export class RenderPageComponent extends BeanRenderBase {
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

First, define the Emits interface in `mother.ts`:

```typescript
export type Emits = {
  (e: 'reset', time: Date): void;
};
```

### Define Component Emits

Then, define the component Emits in `index.vue`:

```typescript{2-3}
<script setup lang="ts">
import { Emits } from './mother.js';
const emit = defineEmits<Emits>();
</script>
```

### Raise Emit

Raise Emit in `render.tsx`:

```typescript{7-9}
@Local()
export class RenderCard extends BeanRenderBase {
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

```typescript{9-11}
import Card from '../../component/card/index.vue';

@Local()
export class RenderPageComponent extends BeanRenderBase {
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

First, define the Slots interface in `mother.ts`:

```typescript
export interface Slots {
  header?(): JSX.Element;
  default?(): JSX.Element;
  footer?(): JSX.Element;
}
```

### Render Slots

Render Slots in `render.tsx`:

```typescript{8,11,14}
@Local()
export class RenderCard extends BeanRenderBase {
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

```typescript{2,7-17,21}
import Card from '../../component/card/index.vue';
import * as MotherCard from '../../component/card/mother.js';

@Local()
export class RenderPageComponent extends BeanRenderBase {
  render() {
    const slots = {
      header: () => {
        return <div>this is a header slot from parent</div>;
      },
      default: () => {
        return <div>this is a default slot from parent</div>;
      },
      footer: () => {
        return <div>this is a footer slot from parent</div>;
      },
    } as MotherCard.Slots;
    return (
      <div>
        <Card
          v-slots={slots}
        ></Card>
      </div>
    );
  }
}
```

- Import the child component `Card` from `index.vue`
- Import the type namespace `MotherCard` from `mother.ts`
- Define the object `slots` and provide corresponding rendering functions for slots. You can use `MotherCard.Slots` to constrain types of slots
- Pass the defined object `slots` to the child component `Card` through `v-slots`

## How to refer to child component instance?

In Cabloy-Front, `Template Refs` is not used to refer to child component instances, but directly refers to the `mother bean` corresponding to the child component

### Define Property

First define a property in `mother.ts` of the parent component:

```typescript{1,5}
import { MotherCard } from '../../component/card/mother.js';

@Local()
export class MotherPageComponent extends BeanMotherPageBase {
  cardRef: MotherCard;
}
```

### onMotherRef

Then listen to the `onMotherRef` event of the child component to obtain the ref value of the `mother bean`:

```typescript{7-9}
@Local()
export class RenderPageComponent extends BeanRenderBase {
  render() {
    return (
      <div>
        <Card
          onMotherRef={ref => {
            this.cardRef = ref;
          }}
        ></Card>
      </div>
    );
  }
}
```
