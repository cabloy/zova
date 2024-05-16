# I18n国际化

模块可以单独提供自己的 I18n 语言资源

## 定义语言资源

以模块`a-demo`为例，定义模块的语言资源：

英文：`src/module/a-demo/src/config/locale/en-us.ts`

```typescript{2}
export default {
  HelloWorld: 'Hello World',
};
```

中文：`src/module/a-demo/src/config/locale/zh-cn.ts`

```typescript{2}
export default {
  HelloWorld: '您好世界',
};
```

## 使用语言资源

可以通过 Scope 实例提供的`locale`对象获取模块的语言资源

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

- 动图演示
  ![scope-locale](https://cabloy-1258265067.cos.ap-shanghai.myqcloud.com/image/scope-locale.gif)

## 跨模块使用语言资源

```typescript{3,7-8,11-17}
import { BeanBase, Local, UseScope } from '@cabloy/front';
import { ScopeModule } from './resource/this.js';
import type { ScopeModuleTestDemo } from 'cabloy-module-front-a-demo';

@Local()
export class LocalTestA extends BeanBase<ScopeModule> {
  @UseScope('a-demo')
  scopeModuleTestDemo: ScopeModuleTestDemo;

  protected async __init__() {
    // use current locale
    const message1 = this.scopeModuleTestDemo.locale.HelloWorld();
    // use locale en-us
    const message2 = this.scopeModuleTestDemo.locale.HelloWorld.locale('en-us');
    // use locale zh-cn
    const message3 = this.scopeModuleTestDemo.locale.HelloWorld.locale('zh-cn');
    console.log(message1, message2, message3);
  }
}
```

## 覆盖语言资源

可以使用`项目级别`的语言资源覆盖`模块级别`的语言资源

英文：`src/front/config/locale/en-us.ts`

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

中文：`src/front/config/locale/zh-cn.ts`

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
