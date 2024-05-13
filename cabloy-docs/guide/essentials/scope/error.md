# Error Exception

Modules can individually provide their own `Error` exceptions

## Define Error

It takes two steps to define `Error`. Taking the module `test-demo` as an example:

### 1. Define Error enum

`src/module/test-demo/src/config/errors.ts`

```typescript{2}
export enum Errors {
  'ErrorTest' = 1001,
}
```

- Convention: Error Code > 1000

### 2. Define Error language resources

English: `src/module/test-demo/src/config/locale/en-us.ts`

```typescript{2}
export default {
  ErrorTest: 'This is a error test',
};
```

Chinese: `src/module/test-demo/src/config/locale/zh-cn.ts`

```typescript{2}
export default {
  ErrorTest: '这是一个错误测试',
};
```

## Use Error

You can directly throw the module's `Error` exception through the `Scope` instance

```typescript{7}
import { BeanBase, Local } from '@cabloy/front';
import { ScopeModule } from './resource/this.js';

@Local()
export class LocalTestA extends BeanBase<ScopeModule> {
  protected async __init__() {
    this.scope.error.ErrorTest.throw();
  }
}
```

- Gif Demonstration
  ![scope-error](https://cabloy-1258265067.cos.ap-shanghai.myqcloud.com/image/scope-error.gif)

## Use Error cross-module

```typescript{3,7-8,11}
import { BeanBase, Local, UseScope } from '@cabloy/front';
import { ScopeModule } from './resource/this.js';
import type { ScopeModuleTestDemo } from 'cabloy-module-front-test-demo';

@Local()
export class LocalTestA extends BeanBase<ScopeModule> {
  @UseScope('test-demo')
  scopeModuleTestDemo: ScopeModuleTestDemo;

  protected async __init__() {
    this.scopeModuleTestDemo.error.ErrorTest.throw();
  }
}
```
