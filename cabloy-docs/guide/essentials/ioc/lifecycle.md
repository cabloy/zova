# Lifecycle

All beans can provide two lifecycle methods

| Name          | Description                                                                               |
| ------------- | ----------------------------------------------------------------------------------------- |
| `__init__`    | The initialization method executed when creating a bean instance, and supports asynchrony |
| `__dispose__` | The dispose method executed during bean instance destruction                              |

## For Example: computed

```typescript
import { useComputed } from '@cabloy/front';
...
  count: number = 0;
  counter2: string;

  protected async __init__() {
    this.count2 = useComputed(() => {
      return `=== ${this.count} ===`;
    });
  }
...
```

- `counter` is a reactive property
- `counter2` is a computed property, initialized by the `useComputed` function

## For Example: watch

```typescript
import { watch } from 'vue';
...
  count: number = 0;
  unwatchCounter;

  protected async __init__() {
    this.unwatchCounter = watch(
      () => this.count,
      () => {
        console.log(this.count);
      },
    );
  }

  protected __dispose__() {
    if (this.unwatchCounter) {
      this.unwatchCounter();
    }
  }
...
```
