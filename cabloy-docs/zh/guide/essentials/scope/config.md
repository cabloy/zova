# Config配置

模块可以单独提供自己的 Config 配置

## 定义Config

以模块`test-demo`为例，定义模块的 Config 配置：

`src/module/test-demo/src/config/config.ts`

```typescript{5}
import { CabloyApplication } from '@cabloy/front';

export const config = (_app: CabloyApplication) => {
  return {
    prompt: 'Hello World',
  };
};
```

- 直接定义所需要的配置字段即可，系统会自动提取 config 的类型信息

## 使用Config

可以通过 Scope 实例获取模块的 Config 配置

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

- 动图演示
  ![scope-config](https://cabloy-1258265067.cos.ap-shanghai.myqcloud.com/image/scope-config.gif)

## 跨模块使用Config

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
