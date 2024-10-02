# I18n国际化

模块可以单独提供自己的 I18n 语言资源

## 定义语言资源

以模块`a-demo`为例，定义模块的语言资源：

英文：`src/suite/a-demo/modules/a-demo/src/config/locale/en-us.ts`

```typescript{2}
export default {
  HelloWorld: 'Hello World',
};
```

中文：`src/suite/a-demo/modules/a-demo/src/config/locale/zh-cn.ts`

```typescript{2}
export default {
  HelloWorld: '您好世界',
};
```

## 使用语言资源

可以通过 Scope 实例提供的`locale`对象获取模块的语言资源

```typescript{3-9}
export class TestA {
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

```typescript{1,4-5,8-14}
import { ScopeModuleDemoBasic } from 'zova-module-demo-basic';

export class TestA {
  @UseScope()
  $$scopeModuleDemoBasic: ScopeModuleDemoBasic;

  protected async __init__() {
    // use current locale
    const message1 = this.$$scopeModuleDemoBasic.locale.HelloWorld();
    // use locale en-us
    const message2 = this.$$scopeModuleDemoBasic.locale.HelloWorld.locale('en-us');
    // use locale zh-cn
    const message3 = this.$$scopeModuleDemoBasic.locale.HelloWorld.locale('zh-cn');
    console.log(message1, message2, message3);
  }
}
```

## 覆盖语言资源

可以使用`项目级别`的语言资源覆盖`模块级别`的语言资源

英文：`src/front/config/locale/en-us.ts`

```typescript{3-5}
export default {
  modules: {
    'a-demo': {
      HelloWorld: 'Hello World!!!',
    },
  },
};
```

中文：`src/front/config/locale/zh-cn.ts`

```typescript{3-5}
export default {
  modules: {
    'a-demo': {
      HelloWorld: '您好世界!!!',
    },
  },
};
```
