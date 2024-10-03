# Constant

Modules can individually provide their own `Constant`

## Initialize code skeleton

::: tip
Context Menu - [Module Path]: `Zova Init/Constant`
:::

## Define Constant

Taking the module `demo-basic` as an example, define the `Constant` of the module:

`src/suite/a-demo/modules/demo-basic/src/config/constants.ts`

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
import { ScopeModuleDemoBasic } from 'zova-module-demo-basic';

export class TestA {
  @UseScope()
  $$scopeModuleDemoBasic: ScopeModuleDemoBasic;

  protected async __init__() {
    const male = this.$$scopeModuleDemoBasic.constant.gender.male;
    const female = this.$$scopeModuleDemoBasic.constant.gender.female;
    console.log(male, female);
  }
}
```
