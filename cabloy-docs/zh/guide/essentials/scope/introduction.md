# 模块Scope

在 Cabloy-Front 中，实际的业务代码开发都是在模块中进行。模块作为一个相对独立的业务单元，包含各种类型的资源：`Config配置`、`Constant常量`、`Locale国际化`、`Error错误异常`、`Component组件`，等等。为了统一管理这些资源，方便资源的定义和使用，Cabloy-Front 提供了`Scope`对象

## 如何获取Scope实例

所有 bean 都继承自基类`BeanBase`，`BeanBase`支持传入范型参数`ScopeModule`。当传入范型参数`ScopeModule`之后就可以直接获取到当前 bean 所属模块的`Scope`实例

以`local.testA.ts`为例：

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

- 通过`this.scope`即可访问到当前 bean 所属模块的`Scope`实例

## Scope对象的成员

| 名称      | 说明             |
| --------- | ---------------- |
| config    | 模块的Config配置 |
| constant  | 模块的常量定义   |
| locale    | 模块的I18n国际化 |
| error     | 模块的错误异常   |
| component | 模块的Vue组件    |

## 跨模块访问Scope实例

那么，如何访问其他模块的`Scope`实例呢？

`Scope`对象本身也是一个 bean，因此可以直接采用`依赖注入`的方式获取到其他模块的`Scope`实例

仍以`local.testA.ts`为例，获取模块`a-home`的`Scope`实例：

```typescript{3,7-8,11}
import { BeanBase, Local, UseScope } from '@cabloy/front';
import { ScopeModule } from './resource/this.js';
import type { ScopeModuleAHome } from 'cabloy-module-front-a-home';

@Local()
export class LocalTestA extends BeanBase<ScopeModule> {
  @UseScope({ module: 'a-home' })
  scopeModuleAHome: ScopeModuleAHome;

  protected async __init__() {
    console.log(this.scopeModuleAHome);
  }
}
```

- 导入模块`a-home`的`Scope`对象的类型
- 使用`UseScope`装饰器函数，并且传入`module`参数
- 系统会自动找到模块`a-home`的`Scope`实例，并且注入给变量`scopeModuleAHome`
