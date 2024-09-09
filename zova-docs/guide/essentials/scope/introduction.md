# Module Scope

In Zova, the actual business code development is done in modules. As a relatively independent business unit, the module contains various types of resources: `Config`, `Constant`, `Locale I18n`, `Error exception`, `Component`, `Api Service`, etc. In order to uniformly manage these resources and facilitate the definition and use of resources, Zova provides the `Scope` object

## Why is Zova's IOC container code more concise?

The reason is to prioritize the use of the `dependency lookup` strategy, resulting in fewer decorator functions and fewer type annotations. Accessing module's resources by the `Scope` object is one of the mechanisms for implementing `dependency lookup` strategies

## How to obtain Scope Instance?

All beans inherit from the base class `BeanBase`, and `BeanBase` supports passing in the generic parameter `ScopeModule`. When the generic parameter `ScopeModule` is passed in, the `Scope` instance of the module to which the current bean belongs can be directly obtained

Take `testA.ts` as an example：

```typescript{2,5,7}
import { BeanBase, Local } from 'zova';
import { ScopeModule } from '../.metadata/this.js';

@Local()
export class TestA extends BeanBase<ScopeModule> {
  protected async __init__() {
    console.log(this.scope);
  }
}
```

- The `Scope` instance of the module to which the current bean belongs can be obtained through `this.scope`

## Members of the Scope object

| Name      | Description               |
| --------- | ------------------------- |
| config    | Config of Module          |
| constant  | Constant of Module        |
| locale    | I18n of Module            |
| error     | Error exception of Module |
| component | Vue Component of Module   |
| service   | Api Service of Module     |

## How to obtain Scope Instance cross-module?

So, how to obtain `Scope` instances of other modules?

The `Scope` object itself is also a bean, so you can directly use `dependency injection` to obtain `Scope` instances of other modules

Still taking `testA.ts` as an example, obtain the `Scope` instance of the module `a-home`:

```typescript{1,4-5,8}
import type { ScopeModuleAHome } from 'zova-module-a-home';

export class TestA {
  @UseScope('a-home')
  scopeModuleAHome: ScopeModuleAHome;

  protected async __init__() {
    console.log(this.scopeModuleAHome);
  }
}
```

- Type of `Scope` object imported from module `a-home`
- Use the `UseScope` decorator function and pass in the `module` parameter
- The system will automatically find the `Scope` instance of the module `a-home` and inject it into the variable `scopeModuleAHome`
