# 生命周期

所有 Bean 都可以提供两个生命周期方法

| 名称          | 说明                                           |
| ------------- | ---------------------------------------------- |
| `__init__`    | 在创建bean实例时执行的初始化方法，并且支持异步 |
| `__dispose__` | 在bean实例销毁时执行的销毁方法                 |

- Zova 提供了两个代码片段，你可以通过输入`init`和`dispose`快速添加相应的生命周期方法

## 举例：computed计算属性

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

- `count`是响应式属性
- `count2`是计算属性，使用`useComputed`函数进行初始化

## 举例：watch

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
