# 子组件

相对`页面组件`而言，`子组件`有三件套：`Props`、`Emits` 和 `Slots`。那么在 Zova 中子组件的三件套如何定义和使用呢？

## 创建子组件

我们先通过一个 cli 命令来创建一个子组件`card`:

```bash
$ zova :create:component card --module=a-demo
```

该命令会创建一个目录`src/component/card`。在 Zova 中，一个子组件被切分为三个文件，位于刚才创建的目录中：

```
src
└─ component
   └─ card
      ├─ index.vue
      ├─ controller.ts
      └─ render.tsx
```

| 名称          | 说明                      |
| ------------- | ------------------------- |
| index.vue     | 用于定义vue组件           |
| controller.ts | 用于代码逻辑的 local bean |
| render.tsx    | 用于渲染逻辑的 local bean |

## Props

接下来，在`card`子组件中，定义三个 Props：`header`、`content`、和 `footer`

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

### 定义组件Props

然后，在`index.vue`中定义组件 Props:

```typescript{2-3}
<script setup lang="ts">
import { ControllerCard, Props} from './controller.js';
const props = withDefaults(defineProps<Props>(), ControllerCard.$propsDefault);
</script>
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

### 使用Props

接下来，在父组件中使用子组件：

```typescript{8-10}
import Card from '../../component/card/index.vue';

export class RenderPageComponent {
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

- 从`index.vue`导入子组件`Card`，然后直接给 Card 的 props 传值即可

## Emits

接下来，在`card`子组件中，定义一个 Emit：`reset`

### 定义Emits接口

首先，在`controller.ts`中定义 Emits 接口：

```typescript
export type Emits = {
  (e: 'reset', time: Date): void;
};
```

### 定义组件Emits

然后，在`index.vue`中定义组件 Emits:

```typescript{2-3}
<script setup lang="ts">
import { Emits } from './controller.js';
const emit = defineEmits<Emits>();
</script>
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
import Card from '../../component/card/index.vue';

export class RenderPageComponent {
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

接下来，在`card`子组件中，定义三个 Slots：`header`、`default`和`footer`

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

```typescript{2,6-16,20}
import Card from '../../component/card/index.vue';
import * as ControllerCard from '../../component/card/controller.js';

export class RenderPageComponent {
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
    } as ControllerCard.Slots;
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
- 从`controller.ts`导入类型命名空间`ControllerCard`
- 定义对象`slots`，为 slots 提供对应的渲染函数。可以使用 `ControllerCard.Slots`来约束类型，并且提供智能提示
- 将定义好的对象`slots`通过`v-slots`传给子组件`Card`即可

## 如何引用子组件实例

在 Zova 中，不使用`Template Ref`引用子组件实例，而是直接引用子组件对应的`controller bean`，参见：[Controller Ref](../../vue/refs.md#controller-ref)
