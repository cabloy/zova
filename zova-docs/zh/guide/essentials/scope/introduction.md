# 模块Scope

在 Zova 中，实际的业务代码开发都是在模块中进行。模块作为一个相对独立的业务单元，包含各种类型的资源：`Config配置`、`Constant常量`、`Locale国际化`、`Error错误异常`、`Api服务`，等等。为了统一管理这些资源，方便资源的定义和使用，Zova 提供了`Scope`对象

## Zova 的 IOC 容器为何代码更简洁？

原因就是优先使用`依赖查找`策略，从而使用更少的装饰器函数，使用更少的类型标注。通过`Scope`对象访问模块提供的资源，就是践行`依赖查找策略`的机制之一

## 如何获取Scope实例

所有 bean 都继承自基类`BeanBase`，`BeanBase`支持传入范型参数`ScopeModule`。当传入范型参数`ScopeModule`之后就可以直接获取到当前 bean 所属模块的`Scope`实例

以`testA.ts`为例：

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

- 通过`this.scope`即可访问到当前 bean 所属模块的`Scope`实例

## Scope对象的成员

| 名称     | 说明             |
| -------- | ---------------- |
| config   | 模块的Config配置 |
| constant | 模块的常量定义   |
| locale   | 模块的I18n国际化 |
| error    | 模块的错误异常   |
| service  | 模块的Api服务    |

## 跨模块访问Scope实例

那么，如何访问其他模块的`Scope`实例呢？

`Scope`对象本身也是一个 bean，因此可以直接采用`依赖注入`的方式获取到其他模块的`Scope`实例

仍以`testA.ts`为例，获取模块`home-base`的`Scope`实例：

```typescript{1,4-5,8}
import { ScopeModuleHomeBase } from 'zova-module-home-base';

export class TestA {
  @UseScope()
  $$scopeModuleHomeBase: ScopeModuleHomeBase;

  protected async __init__() {
    console.log(this.$$scopeModuleHomeBase);
  }
}
```

- 导入模块`home-base`的`Scope`对象的类型
- 使用`UseScope`装饰器函数
- 系统会自动找到模块`home-base`的`Scope`实例，并且注入给变量`$$scopeModuleHomeBase`
