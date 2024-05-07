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
  counter: number = 0;
  counter2: string;

  protected async __init__() {
    this.counter2 = useComputed(() => {
      return `=== ${this.counter} ===`;
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
  counter: number = 0;
  unwatchCounter;

  protected async __init__() {
    this.unwatchCounter = watch(
      () => this.counter,
      () => {
        console.log(this.counter);
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
