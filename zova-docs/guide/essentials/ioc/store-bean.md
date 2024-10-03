# Named Bean: Store

Except for `@Local`, the classes decorated by the other decorator functions are `named beans`. Zova provides a naming convention for such beans, which can avoid naming conflicts and facilitate cross-module usage

`Store bean` is a named bean. Let's first understand the definition and usage of named beans through `store bean`

Through store bean, we can define a global state object and use it in any module. Therefore, it is no longer necessary to use `pinia`. If you want to use the existing `pinia store`, see: [Pinia](../../vue/pinia.md)

## Create Store Bean: userInfo

::: tip
Context Menu - [Module Path/src]: `Zova Create/Bean: Store`
:::

Enter the name of store bean according to the prompt, such as `userInfo`. The VSCode extension will automatically add the code skeleton of `store bean`

`src/suite/a-demo/modules/demo-basic/src/bean/store.userInfo.ts`

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

Then inject `userInfo` directly into the page component `counter`, and access the properties and methods of `userInfo`

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

- By the property decorated with `Use`, the system will automatically look up or create an instance in the app bean container, and then inject it into the page component
- Set the type of `$$userInfo` to `StoreUserInfo`, the app bean container will find the class and create an instance based on this type

## Use Store Bean Cross-Module

What we just demonstrated was using store beans within the current module. Now let's take a look at how to use them cross-module

Assume that we create another module `demo-basic2` and create a page component `counter2` in the module, then the code using Store Bean is as follows:

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

- Import class `StoreUserInfo` from the module of `zova-module-demo-basic`
- The system will automatically look up or create an instance in the app bean container, and then inject it into the page component

::: info
Based on the support of the compiler, Store Bean will automatically switch to asynchronous loading mode. Specifically, the system will asynchronously load the module `demo-basic`, then obtain class `StoreUserInfo`, and then look up or create an instance which will be injected into the page component

See: [Bean Identifier](./bean-identifier.md)
:::
