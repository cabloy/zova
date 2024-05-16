# I18n

Modules can individually provide their own `I18n` language resources

## Define language resources

Taking the module `a-demo` as an example, define the `I18n` language resources of the module:

English: `src/module/a-demo/src/config/locale/en-us.ts`

```typescript{2}
export default {
  HelloWorld: 'Hello World',
};
```

Chinese: `src/module/a-demo/src/config/locale/zh-cn.ts`

```typescript{2}
export default {
  HelloWorld: '您好世界',
};
```

## Use language resources

The `I18n` language resources of the module can be obtained through the `locale` object of the `Scope` instance

```typescript{7-13}
import { BeanBase, Local } from '@cabloy/front';
import { ScopeModule } from './resource/this.js';

@Local()
export class LocalTestA extends BeanBase<ScopeModule> {
  protected async __init__() {
    // use current locale
    const message1 = this.scope.locale.HelloWorld();
    // use locale en-us
    const message2 = this.scope.locale.HelloWorld.locale('en-us');
    // use locale zh-cn
    const message3 = this.scope.locale.HelloWorld.locale('zh-cn');
    console.log(message1, message2, message3);
  }
}
```

- Gif Demonstration
  ![scope-locale](https://cabloy-1258265067.cos.ap-shanghai.myqcloud.com/image/scope-locale.gif)

## Use language resources cross-module

```typescript{3,7-8,11-17}
import { BeanBase, Local, UseScope } from '@cabloy/front';
import { ScopeModule } from './resource/this.js';
import type { ScopeModuleADemo } from 'cabloy-module-front-a-demo';

@Local()
export class LocalTestA extends BeanBase<ScopeModule> {
  @UseScope('a-demo')
  scopeModuleADemo: ScopeModuleADemo;

  protected async __init__() {
    // use current locale
    const message1 = this.scopeModuleADemo.locale.HelloWorld();
    // use locale en-us
    const message2 = this.scopeModuleADemo.locale.HelloWorld.locale('en-us');
    // use locale zh-cn
    const message3 = this.scopeModuleADemo.locale.HelloWorld.locale('zh-cn');
    console.log(message1, message2, message3);
  }
}
```

## Override language resources

You can use `project-level` language resources to override `module-level` language resources

English: `src/front/config/locale/en-us.ts`

```typescript{5-7}
import { CabloyLocaleOptional } from '@cabloy/front';

export default {
  modules: {
    'a-demo': {
      HelloWorld: 'Hello World!!!',
    },
  },
} as CabloyLocaleOptional;
```

Chinese: `src/front/config/locale/zh-cn.ts`

```typescript{5-7}
import { CabloyLocaleOptional } from '@cabloy/front';

export default {
  modules: {
    'a-demo': {
      HelloWorld: '您好世界!!!',
    },
  },
} as CabloyLocaleOptional;
```
