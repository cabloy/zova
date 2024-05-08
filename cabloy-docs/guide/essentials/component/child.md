# Child Component

The difference from `Page Component` is that `Child Component` has three parts: `Props`, `Emits` and `Slots`. So how are the three parts defined and used in Cabloy-Front?

## Create Child Component

Let's first create a child component `card` using a Cli command:

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
export class MotherCard extends BeanMotherBase<Props, Emits, Slots> {
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

### 定义Emits接口

首先，在`mother.ts`中定义 Emits 接口：

```typescript
export type Emits = {
  (e: 'reset', time: Date): void;
};
```

### 定义组件Emits

然后，在`index.vue`中定义组件 Emits:

```typescript{2-3}
<script setup lang="ts">
import { Emits } from './mother.js';
const emit = defineEmits<Emits>();
</script>
```

### 触发Emit

在`render.tsx`中触发 Emit：

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

### 使用Emits

接下来，在父组件中使用子组件：

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

- 从`index.vue`导入子组件`Card`，然后向`onReset`传入事件回调函数即可

## Slots

Next, in the `card` child component, define three Slots: `header`, `default` and `footer`

### 定义Slots接口

首先，在`mother.ts`中定义 Slots 接口：

```typescript
export type Slots = {
  header?(): JSX.Element;
  default?(): JSX.Element;
  footer?(): JSX.Element;
};
```

### 渲染Slots

在`render.tsx`中渲染 Slots：

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

### 使用Slots

接下来，在父组件中使用子组件：

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

- 从`index.vue`导入子组件`Card`
- 从`mother.ts`导入类型命名空间`MotherCard`
- 定义对象`slots`，为 slots 提供对应的渲染函数。可以使用 `MotherCard.Slots`来约束类型，并且提供智能提示
- 将定义好的对象`slots`通过`v-slots`传给子组件`Card`即可

## 如何引用子组件实例

在 Cabloy-Front 中，不使用`Template Ref`引用子组件实例，而是直接引用子组件对应的`mother bean`

### 定义属性

先在父组件的`mother.ts`中定义属性：

```typescript{1,5}
import { MotherCard } from '../../component/card/mother.js';

@Local()
export class MotherPageComponent extends BeanMotherPageBase {
  cardRef: MotherCard;
}
```

然后响应子组件的`onMotherRef`事件获取到`mother bean`的引用值：

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
