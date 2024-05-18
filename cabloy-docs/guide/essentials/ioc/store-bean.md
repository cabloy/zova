# Store Bean

Through store bean, we can define a global state object and use it in any module. Therefore, it is no longer necessary to use `pinia`

## Create Store Bean: userInfo

Let's first create a store bean `userInfo`. The code skeleton for store bean can be created using the cli command:

```bash
$ cabloy front:create:store userInfo --module=a-demo
```

The generated file: `store.userInfo.ts`, with the following content:

```typescript
@Store()
export class StoreUserInfo {}
```

- `Store` is a decorator function. The class decorated with `Store` will automatically be registered in the bean container

## Add reactive codes

We add a reactive property `user` in `userInfo` and perform asynchronous initialization

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

## Use Store Bean

Next, create local bean `testC` using the cli command:

```bash
$ cabloy front:create:local testC --module=a-demo
```

Then inject `userInfo` directly into `testC` and access the properties and methods of `userInfo`

`local.testC.ts`

```typescript{4-10}
import { StoreUserInfo } from './bean/store.userInfo.js';

export class LocalTestC {
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

In Cabloy-Front, a module is a natural bundle boundary, and automatically bundled into an independent asynchronous chunk when building

Therefore, when using store beans cross-module, we do not recommend injecting directly based on `type`, but rather on `identifier`

The system will automatically assign an identifier to each store bean as the following format:

```bash
{moduleName}.store.{beanName}
```

For example, the previously created `userInfo` corresponds to the identifier `a-demo.store.userInfo`, where `a-demo` is the module name which `userInfo` belongs to

### Use Store Bean

Next, create a module `a-demo2` using the cli command, and create a local bean `testD` at the same time:

```bash
$ cabloy front:create:module a-demo2 --template=module --suite=a-demo
$ pnpm install --force
$ cabloy front:create:local testD --module=a-demo2
```

Then inject `userInfo` directly into `testD` and access the properties and methods of `userInfo`

`local.testD.ts`

```typescript{1,4-5}
import type { StoreUserInfo } from 'cabloy-module-front-a-demo';

export class LocalTestD {
  @Use('a-demo.store.userInfo')
  $$userInfo: StoreUserInfo;

  protected async __init__() {
    console.log(this.$$userInfo.user);
    await this.$$userInfo.reloadUser();
  }
}
```

- Import the type of class `StoreUserInfo` from the module of `cabloy-module-front-a-demo`
- Pass the identifier of the store bean to the `Use` decorator function, which in this case is `a-demo.store.userInfo`. The system will automatically look up or create an instance in the app bean container using the bean identifier, and then inject it into `testD`
