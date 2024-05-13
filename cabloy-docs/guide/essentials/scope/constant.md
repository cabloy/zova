# Constant

Modules can individually provide their own `Constant`

## Define Constant

Taking the module `test-demo` as an example, define the `Constant` of the module:

`src/module/test-demo/src/config/constants.ts`

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

```typescript{7-9}
import { BeanBase, Local } from '@cabloy/front';
import { ScopeModule } from './resource/this.js';

@Local()
export class LocalTestA extends BeanBase<ScopeModule> {
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

```typescript{3,7-8,11-13}
import { BeanBase, Local, UseScope } from '@cabloy/front';
import { ScopeModule } from './resource/this.js';
import type { ScopeModuleTestDemo } from 'cabloy-module-front-test-demo';

@Local()
export class LocalTestA extends BeanBase<ScopeModule> {
  @UseScope('test-demo')
  scopeModuleTestDemo: ScopeModuleTestDemo;

  protected async __init__() {
    const male = this.scopeModuleTestDemo.constant.gender.male;
    const female = this.scopeModuleTestDemo.constant.gender.female;
    console.log(male, female);
  }
}
```
