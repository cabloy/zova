# 匿名bean（local bean）

使用`@Local`装饰的 class 就是`匿名bean`，因此也称之为`local bean`。此类 bean 仅在模块内部使用，不存在命名冲突的问题，定义和使用都很便捷

在[页面组件](../component/page.md)中，我们创建了一个页面组件`counter`。现在，把其中关于 count 状态的逻辑抽离出来，放入一个 local bean 当中，演示逻辑复用的效果

## 创建Local Bean: counter

::: tip
右键菜单 - [模块路径/src/page/counter]: `Zova Create/Bean: Local`
:::

依据提示输入 local bean 的名称，比如`counter`，VSCode 插件会自动添加 local bean 的代码骨架

`src/suite/a-demo/modules/demo-basic/src/page/counter/counter.ts`

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

  increment() {
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

`controller.ts`

```typescript{1,4-5}
import { Counter } from './counter.js';

export class ControllerPageCounter {
  @Use()
  $$counter: Counter;
}
```

- `Use`是装饰器函数。通过 Use 装饰的 属性，系统会自动在 bean 容器中查找或者创建一个实例，然后注入到页面组件中

`render.tsx`

```typescript{5-7}
export class RenderCounter {
  render() {
    return (
      <div>
        <div>{this.$$counter.count}</div>
        <button onClick={() => this.$$counter.increment()}>Increment</button>
        <button onClick={() => this.$$counter.decrement()}>Decrement</button>
      </div>
    );
  }
}
```

## 为何bean实例变量名使用$$作为前缀

- 参见：[为何bean实例变量名使用$$作为前缀](../../resources/faq.md#faq-$$)
