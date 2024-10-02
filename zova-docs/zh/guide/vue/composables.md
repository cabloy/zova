# Composables

Zova 推荐使用[local bean](../essentials/ioc/anonymous-bean.md)和[store bean](../essentials/ioc/store-bean.md)来封装和复用逻辑。Vue 生态存在大量好用的 composables，比如：[VueUse](https://vueuse.org/)，可以直接在 Zova 中使用

下面以`鼠标跟踪器`为例，演示如何使用 Composables

## 1. 创建Composable

`src/suite/a-demo/modules/demo-basic/src/page/state/mouse.ts`

```typescript
import { ref, onMounted, onUnmounted } from 'vue';

export function useMouse() {
  const x = ref(0);
  const y = ref(0);

  function update(event) {
    x.value = event.pageX;
    y.value = event.pageY;
  }

  onMounted(() => window.addEventListener('mousemove', update));
  onUnmounted(() => window.removeEventListener('mousemove', update));

  return { x, y };
}
```

## 2. 注入并使用Composable

以 demo-basic 模块现有的页面组件为例：

`src/suite/a-demo/modules/demo-basic/src/page/state/controller.ts`

```typescript
import { BeanControllerPageBase, Local, type ReturnTypeComposable, UseComposable } from 'zova';
import { useMouse } from './mouse.js';

@Local()
export class ControllerPageState extends BeanControllerPageBase {
  @UseComposable(useMouse)
  $$mouse: ReturnTypeComposable<typeof useMouse>;
}
```

- line 6: 使用@UseComposable 装饰器函数，传入需要使用的 composable
- line 7: 声明变量$$mouse，并通过类型工具 ReturnTypeComposable 生成 composable 的类型

`src/suite/a-demo/modules/demo-basic/src/page/state/render.tsx`

```typescript
@Local()
export class RenderState extends BeanRenderBase {
  render() {
    return (
      <div>
        Mouse position is at: {this.$$mouse.x}, {this.$$mouse.y}
      </div>
    );
  }
}
```
