# Composables

Zova recommends using [local bean](../essentials/ioc/anonymous-bean.md) and [store bean](../essentials/ioc/store-bean.md) to encapsulate and reuse logic. There are a lot of useful composables in the Vue ecosystem, such as [VueUse](https://vueuse.org/), which can be used directly in Zova

The following takes `mouse tracker` as an example to demonstrate how to use Composables

## 1. Create Composable

`src/suite/a-demo/modules/a-demo/src/page/state/mouse.ts`

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

## 2. Inject and use Composable

Take the existing page component of module `demo-basic` as an example:

`src/suite/a-demo/modules/a-demo/src/page/state/controller.ts`

```typescript
import { BeanControllerPageBase, Local, type ReturnTypeComposable, UseComposable } from 'zova';
import { useMouse } from './mouse.js';

@Local()
export class ControllerPageState extends BeanControllerPageBase {
  @UseComposable(useMouse)
  $$mouse: ReturnTypeComposable<typeof useMouse>;
}
```

- line 6: Use the `@UseComposable` decorator function to pass in the composable to be used
- line 7: Declare the variable `$$mouse` and generate its type through the type tool `ReturnTypeComposable`

`src/suite/a-demo/modules/a-demo/src/page/state/render.tsx`

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
