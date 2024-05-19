# Local Bean

在[页面组件](../component/page.md)中，我们通过一个 cli 命令创建了一个页面组件`counter`。现在，我们把其中关于 count 状态的逻辑抽离出来，放入一个 local bean 当中，演示逻辑复用的效果

## 创建Local Bean: Counter

可以通过 cli 命令创建 local bean 的代码骨架：

```bash
$ cabloy front:create:local page/counter/counter --module=a-demo
```

- local bean 的名称是`counter`，位于目录`page/counter`中，也就是放入页面组件`counter`所在的目录

`src/suite/a-demo/modules/a-demo/src/page/counter/counter.ts`

```typescript
@Local()
export class Counter {}
```

- `Local` 是装饰器函数。通过 Local 装饰的 class 会自动注册到 bean 容器中

## 添加响应式代码

把页面组件`counter`中的代码迁移到 local bean 中

```typescript{2-10}
export class Counter {
  count: number = 0;

  inrement() {
    this.count++;
  }

  decrement() {
    this.count--;
  }
}
```

::: info
这里定义的属性`count`是响应式的，从此告别`ref.value`的书写方式
:::

## 注入并使用Local Bean

在页面组件`counter`中注入 local bean，然后在 render 中调用属性和方法

`mother.ts`

```typescript{1,4-5}
import { Counter } from './counter.js';

export class MotherPageCounter {
  @Use()
  $$counter: Counter;
}
```

- `Use`是装饰器函数。通过 Use 装饰的 属性，系统会自动在 bean 容器中查找或者创建一个实例，然后注入到页面组件中

`render.tsx`

```typescript{5-7}
export class RenderPageCounter {
  render() {
    return (
      <div>
        <div>count(ref): {this.$$counter.count}</div>
        <button onClick={() => this.$$counter.inrement()}>Inrement</button>
        <button onClick={() => this.$$counter.decrement()}>Decrement</button>
      </div>
    );
  }
}
```

## 为何bean实例变量名使用$$作为前缀

- 参见：[为何bean实例变量名使用$$作为前缀](../../resources/faq.md#faq-$$)

```

```
