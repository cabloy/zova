# Config配置

模块可以单独提供自己的 Config 配置

## 初始化代码骨架

::: tip
右键菜单 - [模块路径/src]: `Zova Init/Config`
:::

## 定义Config

以模块`demo-basic`为例，定义模块的 Config 配置：

`src/suite/a-demo/modules/demo-basic/src/config/config.ts`

```typescript{3}
export const config = (_app: ZovaApplication) => {
  return {
    prompt: 'Hello World',
  };
};
```

- 直接定义所需要的配置字段即可，系统会自动提取 Config 的类型信息

## 使用Config

可以通过 Scope 实例获取模块的 Config 配置

```typescript{3-4}
export class TestA {
  protected async __init__() {
    const message = this.scope.config.prompt;
    console.log(message);
  }
}
```

- 动图演示
  ![scope-config](https://cabloy-1258265067.cos.ap-shanghai.myqcloud.com/image/scope-config.gif)

## 跨模块使用Config

```typescript{1,4-5,8-9}
import { ScopeModuleDemoBasic } from 'zova-module-demo-basic';

export class TestA {
  @UseScope()
  $$scopeModuleDemoBasic: ScopeModuleDemoBasic;

  protected async __init__() {
    const message = this.$$scopeModuleDemoBasic.config.prompt;
    console.log(message);
  }
}
```

## 覆盖Config配置

可以使用`项目级别`的 Config 配置覆盖`模块级别`的 Config 配置

`src/front/config/config/config.ts`

```typescript{6-8}
export default function (_app: ZovaApplication) {
  const config: ZovaConfigOptional = {};

  // modules
  config.modules = {
    'demo-basic': {
      prompt: 'Hello World!!!',
    },
  };

  return config;
}
```

- 将模块`demo-basic`的`prompt`修改为`Hello World!!!`
