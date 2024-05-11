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
    console.log(this.scope.config);
  }
}
```
