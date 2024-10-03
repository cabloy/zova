# Bean Identifier

The system will automatically assign an identifier to each named bean as the following format:

```bash
{moduleName}.{sceneName}.{beanName}
```

For example, the previously created store bean `userInfo` corresponds to the identifier `demo-basic.store.userInfo`, where `demo-basic` is the module name which `userInfo` belongs to

## Advantages of Bean-identifier-based injection

When using named beans cross-module, we do not recommend injecting directly based on `class type`, but rather on `bean identifier`. `Bean-identifier-based` injection has the following advantages:

1. `Loose coupling between modules`: In Zova, a module is a natural bundle boundary, and automatically bundled into an independent asynchronous chunk when building. Therefore, there is a loose coupling relationship between modules
2. `Achieve asynchronous loading on demand`: Modules are asynchronously loaded only when needed, and then named beans are injected
3. `Avoid circular reference errors`: In complex business scenarios, multiple named beans often reference each other. `Bean-identifier-based` injection can intuitively support circular reference scenarios without error prompts and without any mental burden

## Bean-identifier-based injection: Complete style

Assume that a store bean `userInfo` is defined in the module `demo-basic` and then used in the page component `counter2` of the module `demo-basic2`, the complete style of the code is as follows:

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

## Bean-identifier-based injection: Optimized style

In order to simplify the code, we can still use the `Class-type-based` code style. Based on the support of the compiler, this `Class-type-based` code style will automatically be converted to the `Bean-identifier-based` code style. Then the optimized code style is as follows:

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
