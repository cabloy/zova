# Constant常量

模块可以单独提供自己的 Constant 常量

## 定义Constant

以模块`demo-basic`为例，定义模块的 Constant 常量：

`src/suite/a-demo/modules/a-demo/src/config/constants.ts`

```typescript{2-5}
export const constants = {
  gender: {
    male: 1,
    female: 2,
  },
};
```

- 直接定义所需要的常量即可，系统会自动提取 Constant 的类型信息

## 使用Constant

可以通过 Scope 实例获取模块的 Constant 常量

```typescript{3-5}
export class TestA {
  protected async __init__() {
    const male = this.scope.constant.gender.male;
    const female = this.scope.constant.gender.female;
    console.log(male, female);
  }
}
```

- 动图演示
  ![scope-constant](https://cabloy-1258265067.cos.ap-shanghai.myqcloud.com/image/scope-constant.gif)

## 跨模块使用Constant

```typescript{1,4-5,8-10}
import { ScopeModuleDemoBasic } from 'zova-module-demo-basic';

export class TestA {
  @UseScope()
  $$scopeModuleDemoBasic: ScopeModuleDemoBasic;

  protected async __init__() {
    const male = this.$$scopeModuleDemoBasic.constant.gender.male;
    const female = this.$$scopeModuleDemoBasic.constant.gender.female;
    console.log(male, female);
  }
}
```
