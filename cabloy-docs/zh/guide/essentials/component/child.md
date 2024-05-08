# 子组件

相对`页面组件`而言，`子组件`有三大件：`Props`、`Emits` 和 `Slots`。那么在 Cabloy-Front 中子组件的三大件如何定义和使用呢？

## 创建子组件

我们先通过一个 Cli 命令来创建一个子组件`card`:

```bash
$ cabloy front:create:component card
```

该命令会创建一个目录`src/component/card`。在 Cabloy-Front 中，一个子组件被切分为三个文件，位于刚才创建的目录中：

```
src
└─ component
   └─ card
      ├─ index.vue
      ├─ mother.ts
      └─ render.tsx
```

| 名称       | 说明                      |
| ---------- | ------------------------- |
| index.vue  | 用于定义vue组件           |
| mother.ts  | 用于代码逻辑的 local bean |
| render.tsx | 用于渲染逻辑的 local bean |

## Props

接下来，在`card`子组件中，定义三个 Props：`header`、`content`、和 `footer`

### 定义Props接口

首先，在`mother.ts`中定义 Props 接口：

```typescript
export interface Props {
  header?: string;
  content?: string;
  footer?: string;
}
```

还可以为 Props 设置缺省值：

```typescript{3-5}
@Local()
export class MotherCard extends BeanMotherBase<Props, Emits, Slots> {
  static $propsDefault = {
    header: 'default header',
  };
}
```

### 定义组件Props

然后，在`index.vue`中定义组件 Props:

```typescript{2-3}
<script setup lang="ts">
import { MotherCard, Props} from './mother.js';
const props = withDefaults(defineProps<Props>(), MotherCard.$propsDefault);
</script>
```

### 使用Props

接下来，在页面组件中使用子组件：

```typescript
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

- 从`index.vue`导入子组件`Card`，然后直接给 Card 的 props 传值即可

## Emits

接下来，在`card`子组件中，定义一个 Emit：`reset`

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

### 使用Emits

接下来，在页面组件中使用子组件：

```typescript
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
