# Bean标识

系统会为每一个 具名 bean 自动分配一个标识，格式如下：

```bash
{moduleName}.{sceneName}.{beanName}
```

比如，前面创建的 store bean `userInfo`，对应的标识为：`demo-basic.store.userInfo`，其中`demo-basic`是`userInfo`所归属的模块名称

## 基于Bean标识注入的优点

在跨模块使用 具名 bean 时，我们不建议直接`基于Class类型`注入，而是`基于Bean标识`注入。基于 Bean 标识注入有以下优点：

1. `实现模块之间松耦合`：在 Zova 中，一个模块就是一个天然的拆包边界，在 build 构建时，自动打包成一个独立的异步 Chunk。因此模块之间是松耦合关系
2. `实现按需异步加载`：只有在需要时才会异步加载模块，并进行具名 Bean 的注入
3. `避免出现循环引用出错的问题`：在复杂的业务场景中，经常会出现多个具名 Bean 之间相互引用的情况。基于 Bean 标识注入可以非常直观的支持循环引用的场景，不会出现错误提示，没有任何心智负担

## 基于Bean标识注入：完整风格

假设在模块`demo-basic`中定义了一个 store bean `userInfo`，然后在模块`demo-basic2`的页面组件`counter2`中使用，那么代码的完整风格如下：

`src/suite/a-demo/modules/demo-basic2/src/page/counter2/controller.ts`

```typescript{1,5-6,9-10}
import type { StoreUserInfo } from 'zova-module-demo-basic';

@Local()
export class ControllerPageCounter {
  @Use('demo-basic.store.userInfo')
  $$userInfo: StoreUserInfo;

  protected async __init__() {
    console.log(this.$$userInfo.user);
    await this.$$userInfo.reloadUser();
  }
}
```

## 基于Bean标识注入：优化风格

为了简化代码，我们仍然可以采用`基于Class类型`的写法，基于编译器的加持，该写法会自动转为`基于Bean标识`的写法。那么优化后的代码风格如下：

`src/suite/a-demo/modules/demo-basic2/src/page/counter2/controller.ts`

```typescript{1,5-6,9-10}
import { StoreUserInfo } from 'zova-module-demo-basic';

@Local()
export class ControllerPageCounter {
  @Use()
  $$userInfo: StoreUserInfo;

  protected async __init__() {
    console.log(this.$$userInfo.user);
    await this.$$userInfo.reloadUser();
  }
}
```
