# Config

Modules can individually provide their own `Config` configuration

## Initialize code skeleton

::: tip
Context Menu - [Module Path]: `Zova Init/Config`
:::

## Define Config

Taking the module `demo-basic` as an example, define the `Config` configuration of the module:

`src/suite/a-demo/modules/demo-basic/src/config/config.ts`

```typescript{3}
export const config = (_app: ZovaApplication) => {
  return {
    prompt: 'Hello World',
  };
};
```

- Just define the required configuration fields directly, and the system will automatically extract the type information of config

## Use Config

The `Config` configuration of the module can be obtained through the `Scope` instance

```typescript{3-4}
export class TestA {
  protected async __init__() {
    const message = this.scope.config.prompt;
    console.log(message);
  }
}
```

- Gif Demonstration
  ![scope-config](https://cabloy-1258265067.cos.ap-shanghai.myqcloud.com/image/scope-config.gif)

## Use Config cross-module

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

## Override Config

You can use `project-level` Config to override `module-level` Config

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

- Change the `prompt` of the module `demo-basic` to `Hello World!!!`
