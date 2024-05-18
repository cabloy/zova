# Local Bean

我们来创建一个 local bean `testA`，然后在 local bean `testB` 中注入使用

## 创建Local Bean: testA

可以通过 cli 命令创建 local bean 的代码骨架：

```bash
$ cabloy front:create:local testA --module=a-demo
```

生成的文件：`testA.ts`，内容如下：

```typescript
@Local()
export class TestA {}
```

- `Local` 是装饰器函数。通过 Local 装饰的 class 会自动注册到 bean 容器中

## 添加响应式代码

我们在`testA`中添加一个响应式属性`count`，并且添加两个方法修改它

```typescript{2-10}
export class TestA {
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

## 创建Local Bean: testB

接下来通过 cli 命令创建 `testB` 的代码骨架：

```bash
$ cabloy front:create:local testB --module=a-demo
```

然后直接在`testB`中注入`testA`，并调用`testA`的属性和方法

`testB.ts`

```typescript{1,4-11}
import { TestA } from './testA.js';

export class TestB {
  @Use()
  $$testA: TestA;

  protected async __init__() {
    console.log(this.$$testA.count);
    this.$$testA.inrement();
    this.$$testA.decrement();
  }
}
```

- `Use`是装饰器函数。通过 Use 装饰的 属性，系统会自动在 bean 容器中查找或者创建一个实例，然后注入到`testB`中

## 为何bean实例变量名使用$$作为前缀

- 参见：[为何bean实例变量名使用$$作为前缀](../../resources/faq.md#faq-$$)
