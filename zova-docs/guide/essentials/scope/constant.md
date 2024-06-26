# Constant

Modules can individually provide their own `Constant`

## Define Constant

Taking the module `a-demo` as an example, define the `Constant` of the module:

`src/suite/a-demo/modules/a-demo/src/config/constants.ts`

```typescript{2-5}
export const constants = {
  gender: {
    male: 1,
    female: 2,
  },
};
```

- Just define the required constants directly, and the system will automatically extract the type information of constants

## Use Constant

The `Constant` of the module can be obtained through the `Scope` instance

```typescript{3-5}
export class TestA {
  protected async __init__() {
    const male = this.scope.constant.gender.male;
    const female = this.scope.constant.gender.female;
    console.log(male, female);
  }
}
```

- Gif Demonstration
  ![scope-constant](https://cabloy-1258265067.cos.ap-shanghai.myqcloud.com/image/scope-constant.gif)

## Use Constant cross-module

```typescript{1,4-5,8-10}
import type { ScopeModuleADemo } from 'zova-module-a-demo';

export class TestA {
  @UseScope('a-demo')
  scopeModuleADemo: ScopeModuleADemo;

  protected async __init__() {
    const male = this.scopeModuleADemo.constant.gender.male;
    const female = this.scopeModuleADemo.constant.gender.female;
    console.log(male, female);
  }
}
```
