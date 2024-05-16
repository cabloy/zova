# Error错误异常

模块可以单独提供自己的 Error 错误异常

## 定义Error

定义 Error 分为两个步骤，以模块`a-demo`为例：

### 1. 定义Error枚举

`src/module/a-demo/src/config/errors.ts`

```typescript{2}
export enum Errors {
  'ErrorTest' = 1001,
}
```

- 约定：错误码 > 1000

### 2. 定义Error语言资源

英文：`src/module/a-demo/src/config/locale/en-us.ts`

```typescript{2}
export default {
  ErrorTest: 'This is a error test',
};
```

中文：`src/module/a-demo/src/config/locale/zh-cn.ts`

```typescript{2}
export default {
  ErrorTest: '这是一个错误测试',
};
```

## 使用Error

可以通过 Scope 实例直接抛出模块的 Error 错误异常

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

- 动图演示
  ![scope-error](https://cabloy-1258265067.cos.ap-shanghai.myqcloud.com/image/scope-error.gif)

## 跨模块使用Error

```typescript{3,7-8,11}
import { BeanBase, Local, UseScope } from '@cabloy/front';
import { ScopeModule } from './resource/this.js';
import type { ScopeModuleADemo } from 'cabloy-module-front-a-demo';

@Local()
export class LocalTestA extends BeanBase<ScopeModule> {
  @UseScope('a-demo')
  scopeModuleADemo: ScopeModuleADemo;

  protected async __init__() {
    this.scopeModuleADemo.error.ErrorTest.throw();
  }
}
```
