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

- 直接定义所需要的配置字段即可，系统会自动提取 Config 的类型信息

## 使用Config

可以通过 Scope 实例获取模块的 Config 配置

```typescript{7-8}
import { BeanBase, Local } from '@cabloy/front';
import { ScopeModule } from './resource/this.js';

@Local()
export class LocalTestA extends BeanBase<ScopeModule> {
  protected async __init__() {
    const message = this.scope.config.prompt;
    console.log(message);
  }
}
```

- 动图演示
  ![scope-config](https://cabloy-1258265067.cos.ap-shanghai.myqcloud.com/image/scope-config.gif)

## 跨模块使用Config

```typescript{3,7-8,11-12}
import { BeanBase, Local, UseScope } from '@cabloy/front';
import { ScopeModule } from './resource/this.js';
import type { ScopeModuleTestDemo } from 'cabloy-module-front-test-demo';

@Local()
export class LocalTestA extends BeanBase<ScopeModule> {
  @UseScope('test-demo')
  scopeModuleTestDemo: ScopeModuleTestDemo;

  protected async __init__() {
    const message = this.scopeModuleTestDemo.config.prompt;
    console.log(message);
  }
}
```

## 覆盖Config配置

可以使用项目级别的 Config 配置覆盖模块级别的 Config 配置

`src/front/config/config/config.ts`

```typescript{8-10}
import { CabloyConfigMeta, CabloyConfigOptional } from '@cabloy/front';

export default function (_meta: CabloyConfigMeta) {
  const config = {} as CabloyConfigOptional;

  // module config
  config.modules = {
    'test-demo': {
      prompt: 'Hello World!!!',
    },
  };

  return config;
}
```

- 将模块`test-demo`的`prompt`修改为`Hello World!!!`
