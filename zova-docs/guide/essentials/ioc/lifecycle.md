# Lifecycle

All beans can provide two lifecycle methods

| Name          | Description                                                                               |
| ------------- | ----------------------------------------------------------------------------------------- |
| `__init__`    | The initialization method executed when creating a bean instance, and supports asynchrony |
| `__dispose__` | The dispose method executed during bean instance destruction                              |

- Zova provides two code snippets, you can quickly add corresponding lifecycle methods by entering `init` or `dispose`

## For Example: computed

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

- `count` is a reactive property
- `count2` is a computed property, initialized by the `useComputed` function

## For Example: watch

```typescript
import { watch } from 'vue';

export class Counter {
  count: number = 0;

  protected async __init__() {
    watch(
      () => this.count,
      () => {
        console.log('changed: ', this.count);
      },
    );
  }
}
```
