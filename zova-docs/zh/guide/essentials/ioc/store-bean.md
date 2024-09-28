# 具名bean: Store

除了`@Local`之外，其他装饰器函数装饰的 class 都是`具名bean`。Zova 为此类 bean 提供了命名规范，既可以避免命名冲突，也有利于跨模块使用

`Store bean`就是一种具名 bean，我们先通过`store bean`来了解具名 bean 的定义和使用方式

通过 store bean 我们可以定义一个全局的状态对象，然后在任何一个模块中使用。因此，不再需要使用`pinia`。如果要使用已经存在的`pinia store`，参见：[Pinia](../../vue/pinia.md)

## 创建Store Bean: userInfo

我们先来创建一个 store bean `userInfo`。可以通过 cli 命令创建 store bean 的代码骨架：

```bash
$ zova :create:store userInfo --module=a-demo
```

`src/suite/a-demo/modules/a-demo/src/bean/store.userInfo.ts`

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

接下来通过 cli 命令创建一个 local bean `testC`：

```bash
$ zova :create:local testC --module=a-demo
```

然后直接在`testC`中注入`userInfo`，并访问其中的属性和方法

`src/suite/a-demo/modules/a-demo/src/testC.ts`

```typescript{1,4-5,8-9}
import { StoreUserInfo } from './bean/store.userInfo.js';

export class TestC {
  @Use()
  $$userInfo: StoreUserInfo;

  protected async __init__() {
    console.log(this.$$userInfo.user);
    await this.$$userInfo.reloadUser();
  }
}
```

- 通过`Use`装饰器函数会自动在 app bean 容器中查找或者创建一个 store 实例，然后注入到`testC`中
- 将`$$userInfo`的类型设置为`StoreUserInfo`，app bean 容器将根据此类型找到 class 并创建一个实例

## 跨模块使用

刚才演示的是在当前模块中使用 store bean，现在我们看看如何跨模块使用

### Bean标识

在 Zova 中，一个模块就是一个天然的拆包边界，在 build 构建时，自动打包成一个独立的异步 Chunk

因此，在跨模块使用 store bean 时，我们不建议直接`基于类型`注入，而是`基于标识`注入

系统会为每一个 store bean 自动分配一个标识，格式如下：

```bash
{moduleName}.store.{beanName}
```

比如，前面创建的 `userInfo`，对应的标识为：`a-demo.store.userInfo`，其中`a-demo`是`userInfo`所归属的模块名称

### 跨模块使用Store Bean

接下来通过 cli 命令创建一个模块`a-demo2`，同时创建一个 local bean `testD`：

```bash
$ zova :create:module a-demo2 --template=basic --suite=a-demo
$ pnpm install --force
$ zova :create:local testD --module=a-demo2
```

然后直接在`testD`中注入`userInfo`，并访问其中的属性和方法

`src/suite/a-demo/modules/a-demo2/src/testD.ts`

```typescript{1,4-5,8-9}
import { StoreUserInfo } from 'zova-module-a-demo';

export class TestD {
  @Use()
  $$userInfo: StoreUserInfo;

  protected async __init__() {
    console.log(this.$$userInfo.user);
    await this.$$userInfo.reloadUser();
  }
}
```

- 从`zova-module-a-demo`模块导入 class `StoreUserInfo`的类型
- 系统会自动在 app bean 容器中查找或者创建一个 store 实例，然后注入到`testD`中
