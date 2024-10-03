# 具名bean: Store

除了`@Local`之外，其他装饰器函数装饰的 class 都是`具名bean`。Zova 为此类 bean 提供了命名规范，既可以避免命名冲突，也有利于跨模块使用

`Store bean`就是一种具名 bean，我们先通过`store bean`来了解具名 bean 的定义和使用方式

通过 store bean 我们可以定义一个全局的状态对象，然后在任何一个模块中使用。因此，不再需要使用`pinia`。如果要使用已经存在的`pinia store`，参见：[Pinia](../../vue/pinia.md)

## 创建Store Bean: userInfo

::: tip
右键菜单 - [模块路径/src]: `Zova Create/Bean: Store`
:::

依据提示输入 store bean 的名称，比如`userInfo`，VSCode 插件会自动添加 store bean 的代码骨架

`src/suite/a-demo/modules/demo-basic/src/bean/store.userInfo.ts`

```typescript
@Store()
export class StoreUserInfo {}
```

- `Store` 是装饰器函数。通过 Store 装饰的 class 会自动注册到 bean 容器中

## 添加响应式代码

我们在`userInfo`中添加一个响应式属性`user`，并且进行异步初始化

```typescript{1-4,8-24}
interface User {
  name: string;
  age: number;
}

@Store()
export class StoreUserInfo {
  user: User;

  protected async __init__() {
    this.user = await this.loadUser();
  }

  private async loadUser(): Promise<User> {
    return new Promise(resolve => {
      window.setTimeout(() => {
        resolve({ name: 'tom', age: 18 });
      }, 500);
    });
  }

  public async reloadUser() {
    this.user = await this.loadUser();
  }
}
```

## 使用Store Bean

接下来，在页面组件`counter`中注入`userInfo`，并访问其中的属性和方法

`src/suite/a-demo/modules/demo-basic/src/page/counter/controller.ts`

```typescript{1,5-6,9-10}
import { StoreUserInfo } from '../../bean/store.userInfo.js';

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

- 通过`Use`装饰器函数会自动在 app bean 容器中查找或者创建一个 store 实例，然后注入到页面组件中
- 将`$$userInfo`的类型设置为`StoreUserInfo`，app bean 容器将根据此类型找到 class 并创建一个实例

## 跨模块使用Store Bean

刚才演示的是在当前模块中使用 store bean，现在我们看看如何跨模块使用

假设我们又创建了一个模块`demo-basic2`，在模块中创建了一个页面组件`counter2`，那么使用 Store Bean 的代码如下：

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

- 从`zova-module-demo-basic`模块导入 class `StoreUserInfo`
- 系统会自动在 app bean 容器中查找或者创建一个 store 实例，然后注入到页面组件中

::: info
基于编译器的加持，Store Bean 会自动转为异步加载模式，具体而言就是：系统会异步加载模块`demo-basic`，然后取得 class `StoreUserInfo`，完成实例的查找、创建与注入

参见：[Bean标识](./bean-identifier.md)
:::
