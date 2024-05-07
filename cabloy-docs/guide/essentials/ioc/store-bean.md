# Store Bean

Through store bean, we can define a global state object and use it in any module. Therefore, it is no longer necessary to use `pinia`

## Create Store Bean: userInfo

Let's first create a store bean `userInfo`. The code skeleton for store bean can be created using the cli command:

```bash
$ cabloy front:create:store userInfo
```

The generated file: `store.userInfo.ts`, with the following content:

```typescript
import { BeanBase, Store } from '@cabloy/front';

@Store()
export class StoreUserInfo extends BeanBase {
  protected async __init__() {}

  protected __dispose__() {}
}
```

- `Store` is a decorator function. The class decorated with `Store` will automatically be registered in the bean container

## Add reactive codes

We add a reactive property `user` in `userInfo` and perform asynchronous initialization

```typescript{3-6,10-26}
import { BeanBase, Store } from '@cabloy/front';

interface User {
  name: string;
  age: number;
}

@Store()
export class StoreUserInfo extends BeanBase {
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

## Use Store Bean

Next, create local bean `testC` using the cli command:

```bash
$ cabloy front:create:local testC
```

Then inject `userInfo` directly into `testC` and access the properties and methods of `userInfo`

`local.testC.ts`

```typescript{6-12}
import { BeanBase, Local, Use } from '@cabloy/front';
import { StoreUserInfo } from './bean/store.userInfo.js';

@Local()
export class LocalTestC extends BeanBase {
  @Use()
  $$userInfo: StoreUserInfo;

  protected async __init__() {
    console.log(this.$$userInfo.user);
    await this.$$userInfo.reloadUser();
  }
}
```

- By the property decorated with `Use`, the system will automatically look up or create an instance in the app bean container, and then inject it into `testC`
- Set the type of `$$userInfo` to `StoreUserInfo`, the app bean container will find the class and create an instance based on this type

## Cross module access

What we just demonstrated was using store beans within the current module. Now let's take a look at how to access them across modules

刚才演示的是在当前模块中访问 store bean，现在我们看看如何跨模块访问

### Bean标识

在 Cabloy-Front 中，一个模块就是一个天然的拆包边界，在 build 构建时，自动打包成一个独立的异步 Bundle

因此，在跨模块访问 store bean 时，我们不建议直接`基于类型`注入，而是`基于标识`注入

系统会为每一个 store bean 自动分配一个标识，格式如下：

```bash
{moduleName}.store.{beanName}
```

比如，前面创建的 `userInfo`，对应的标识为：`test-home.store.userInfo`，其中`test-home`是`userInfo`所归属的模块名称

### 跨模块使用Store Bean

接下来通过 cli 命令创建一个模块`test-home2`，同时创建一个 local bean `testD`：

```bash
$ cabloy front:create:module test-home2
$ pnpm install --force
$ cabloy front:create:local testD
```

然后直接在`testD`中注入`userInfo`，并访问其中的属性和方法

`local.testD.ts`

```typescript{2,6-7}
import { BeanBase, Local, Use } from '@cabloy/front';
import type { StoreUserInfo } from 'cabloy-module-front-test-home';

@Local()
export class LocalTestD extends BeanBase {
  @Use({ beanFullName: 'test-home.store.userInfo' })
  $$userInfo: StoreUserInfo;

  protected async __init__() {
    console.log(this.$$userInfo.user);
    await this.$$userInfo.reloadUser();
  }
}
```

- 从`cabloy-module-front-test-home`模块导入 class `StoreUserInfo`的类型
- 向`Use`装饰器函数传入 store bean 的标识，在这里就是`test-home.store.userInfo`。系统会自动在 app bean 容器中通过 bean 标识来查找或者创建一个 store 实例，然后注入到`testD`中
