# Error Exception

Modules can individually provide their own `Error` exceptions

## Define Error

It takes two steps to define `Error`. Taking the module `demo-basic` as an example:

### 1. Define Error enum

`src/suite/a-demo/modules/a-demo/src/config/errors.ts`

```typescript{2}
export enum Errors {
  'ErrorTest' = 1001,
}
```

- Convention: Error Code > 1000

### 2. Define Error language resources

English: `src/suite/a-demo/modules/a-demo/src/config/locale/en-us.ts`

```typescript{2}
export default {
  ErrorTest: 'This is a error test',
};
```

Chinese: `src/suite/a-demo/modules/a-demo/src/config/locale/zh-cn.ts`

```typescript{2}
export default {
  ErrorTest: '这是一个错误测试',
};
```

## Use Error

You can directly throw the module's `Error` exception through the `Scope` instance

```typescript{3}
export class TestA {
  protected async __init__() {
    this.scope.error.ErrorTest.throw();
  }
}
```

- Gif Demonstration
  ![scope-error](https://cabloy-1258265067.cos.ap-shanghai.myqcloud.com/image/scope-error.gif)

## Use Error cross-module

```typescript{1,4-5,8}
import { ScopeModuleDemoBasic } from 'zova-module-demo-basic';

export class TestA {
  @UseScope()
  $$scopeModuleDemoBasic: ScopeModuleDemoBasic;

  protected async __init__() {
    this.$$scopeModuleDemoBasic.error.ErrorTest.throw();
  }
}
```
