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

## Use Store Bean Cross-Module

What we just demonstrated was using store beans within the current module. Now let's take a look at how to use them cross-module

### Bean Identifier

In Cabloy-Front, a module is a natural bundle boundary, and automatically bundled into an independent asynchronous chunk When building

Therefore, when using store beans cross-module, we do not recommend injecting directly based on `type`, but rather on `identifier`

The system will automatically assign an identifier to each store bean as the following format:

```bash
{moduleName}.store.{beanName}
```

For example, the previously created `userInfo` corresponds to the identifier `test-home.store.userInfo`, where `test-home` is the module name which `userInfo` belongs to

### Use Store Bean

Next, create a module `test-home2` using the cli command, and create a local bean `testD` at the same time:

```bash
$ cabloy front:create:module test-home2
$ pnpm install --force
$ cabloy front:create:local testD
```

Then inject `userInfo` directly into `testD` and access the properties and methods of `userInfo`

`local.testD.ts`

```typescript{2,6-7}
import { BeanBase, Local, Use } from '@cabloy/front';
import type { StoreUserInfo } from 'cabloy-module-front-test-home';

@Local()
export class LocalTestD extends BeanBase {
  @Use('test-home.store.userInfo')
  $$userInfo: StoreUserInfo;

  protected async __init__() {
    console.log(this.$$userInfo.user);
    await this.$$userInfo.reloadUser();
  }
}
```

- Import the type of class `StoreUserInfo` from the module of `cabloy-module-front-test-home`
- Pass the identifier of the store bean to the `Use` decorator function, which in this case is `test-home.store.userInfo`. The system will automatically look up or create an instance in the app bean container using the bean identifier, and then inject it into `testD`
