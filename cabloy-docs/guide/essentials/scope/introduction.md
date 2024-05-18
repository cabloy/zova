# Module Scope

In Cabloy-Front, the actual business code development is done in modules. As a relatively independent business unit, the module contains various types of resources: `Config`, `Constant`, `Locale I18n`, `Error exception`, `Component`, etc. In order to uniformly manage these resources and facilitate the definition and use of resources, Cabloy-Front provides the `Scope` object

## How to obtain Scope Instance?

All beans inherit from the base class `BeanBase`, and `BeanBase` supports passing in the generic parameter `ScopeModule`. When the generic parameter `ScopeModule` is passed in, the `Scope` instance of the module to which the current bean belongs can be directly obtained

Take `local.testA.ts` as an example：

```typescript{2,5,7}
import { BeanBase, Local } from '@cabloy/front';
import { ScopeModule } from '../resource/this.js';

@Local()
export class LocalTestA extends BeanBase<ScopeModule> {
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

## How to obtain Scope Instance cross-module?

So, how to obtain `Scope` instances of other modules?

The `Scope` object itself is also a bean, so you can directly use `dependency injection` to obtain `Scope` instances of other modules

Still taking `local.testA.ts` as an example, obtain the `Scope` instance of the module `a-home`:

```typescript{1,4-5,8}
import type { ScopeModuleAHome } from 'cabloy-module-front-a-home';

export class LocalTestA {
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
