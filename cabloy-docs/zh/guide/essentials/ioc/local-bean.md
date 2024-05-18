# Local Bean

我们来创建一个 local bean `testA`，然后在 local bean `testB` 中注入使用

## 创建Local Bean: testA

可以通过 cli 命令创建 local bean 的代码骨架：

```bash
$ cabloy front:create:local testA --module=a-demo
```

生成的文件：`local.testA.ts`，内容如下：

```typescript
@Local()
export class LocalTestA {}
```

- `Local` 是装饰器函数。通过 Local 装饰的 class 会自动注册到 bean 容器中

## 添加响应式代码

我们在`testA`中添加一个响应式属性`count`，并且添加两个方法修改它

```typescript{2-10}
export class LocalTestA {
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

`local.testB.ts`

```typescript{1,4-11}
import { LocalTestA } from './local.testA.js';

export class LocalTestB {
  @Use()
  $$testA: LocalTestA;

  protected async __init__() {
    console.log(this.$$testA.count);
    this.$$testA.inrement();
    this.$$testA.decrement();
  }
}
```

- `Use`是装饰器函数。通过 Use 装饰的 属性，系统会自动在 bean 容器中查找或者创建一个实例，然后注入到`testB`中

::: info
`命名约定`：通过 Use 注入的属性，建议添加前缀`$$`。这样，当一个 class 的成员过多时，也方便快速找到所需要的 bean 实例
:::
