# Config

Modules can individually provide their own `Config` configuration

## Define Config

Taking the module `test-demo` as an example, define the `Config` configuration of the module:

`src/module/test-demo/src/config/config.ts`

```typescript{5}
import { CabloyApplication } from '@cabloy/front';

export const config = (_app: CabloyApplication) => {
  return {
    prompt: 'Hello World',
  };
};
```

- Just define the required configuration fields directly, and the system will automatically extract the type information of config

## Use Config

The `Config` configuration of the module can be obtained through the `Scope` instance

```typescript{7}
import { BeanBase, Local } from '@cabloy/front';
import { ScopeModule } from './resource/this.js';

@Local()
export class LocalTestA extends BeanBase<ScopeModule> {
  protected async __init__() {
    console.log(this.scope.config.prompt);
  }
}
```

- Gif Demonstration
  ![scope-config](https://cabloy-1258265067.cos.ap-shanghai.myqcloud.com/image/scope-config.gif)

## Use Config cross-module

```typescript{3,7-8,11}
import { BeanBase, Local, UseScope } from '@cabloy/front';
import { ScopeModule } from './resource/this.js';
import type { ScopeModuleTestDemo } from 'cabloy-module-front-test-demo';

@Local()
export class LocalTestA extends BeanBase<ScopeModule> {
  @UseScope({ module: 'test-demo' })
  scopeModuleTestDemo: ScopeModuleTestDemo;

  protected async __init__() {
    console.log(this.scopeModuleTestDemo.config.prompt);
  }
}
```
