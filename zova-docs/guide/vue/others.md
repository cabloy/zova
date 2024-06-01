# Others

## computed

To keep the type consistent, you need to use `useComputed` to create a computed property. The parameters are consistent with the `computed` method, see: [Computed Properties](https://vuejs.org/guide/essentials/computed.html)

```typescript
import { useComputed } from 'zova';

export class Counter {
  count: number = 0;
  count2: string;

  protected async __init__() {
    this.count2 = useComputed(() => {
      return `=== ${this.count} ===`;
    });
  }
}
```

## watch/watchEffect

Call `watch/watchEffect` in the `__init__` method of the Bean Class. For more detailed usage, see: [Watchers](https://vuejs.org/guide/essentials/watchers.html)

Watchers declared synchronously inside `__init__` are bound to the owner component instance, and will be automatically stopped when the owner component is unmounted. In most cases, you don't need to worry about stopping the watcher yourself

```typescript
import { watch, watchEffect } from 'vue';

export class Counter {
  count: number = 0;

  protected async __init__() {
    watch(
      () => this.count,
      () => {
        console.log('changed: ', this.count);
      },
    );
    watchEffect(() => {
      // do something
    });
  }
}
```

## onMounted/onControllerMounted

Since the Bean container bound to the component is loaded asynchronously, if you want to execute some initialization logic after the Bean container is loaded, you need to listen to the `onControllerMounted` event. If the initialization logic does not depend on the loading status of the Bean container, you can use the `onMounted`

```typescript
import { onControllerMounted } from 'zova';

export class ControllerPageComponent {
  inputRef: HTMLInputElement | null;

  protected async __init__() {
    onControllerMounted(() => {
      this.inputRef?.focus();
    });
  }
}
```

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

## markRaw

You can use the `markRaw` method to mark an object as `non-reactive`

```typescript
import { markRaw } from 'vue';

export class ControllerPageComponent {
  user = markRaw({
    name: 'tom',
    age: 18,
  });
}
```
