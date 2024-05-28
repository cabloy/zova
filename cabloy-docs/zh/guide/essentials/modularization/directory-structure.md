# 目录结构

## 目录结构

```bash
project
├── env
├── src
│  ├── front
│  │  ├── config
│  │  │  ├── config
│  │  │  ├── locales.ts
│  │  │  └── monkey.ts
│  ├── module
│  ├── module-vendor
│  ├── suite
│  │  ├── a-demo
│  │  └── a-home
│  │    ├── modules
│  │    │  ├── a-home
│  │    │  ├── home-api
│  │    │  ├── home-icon
│  │    │  ├── home-layout
│  │    │  ├── home-mock
│  │    │  ├── home-pagesystem
│  │    │  └── a-homerouter
│  └── suite-vendor
```

## 模块/套件

| 名称              | 说明                   |
| ----------------- | ---------------------- |
| src/module        | 独立模块（不属于套件） |
| src/module-vendor | 独立模块（来自第三方） |
| src/suite         | 套件                   |
| src/suite-vendor  | 套件（来自第三方）     |

## 开发建议

Cabloy-Front 对模块/套件进行了规划，方便我们在约定的目录立即开始业务开发。以下约定仅仅是建议，没有强制约束：

1. 套件`suite/a-demo`：包含一些测试或者演示代码，在构建时禁用即可
2. 套件`suite/a-home`：业务开发在这个套件中展开
   - 模块`suite/a-home/modules/a-home`：常规的业务代码在这个模块中展开
   - 其他模块：不同模块预置了不同的系统功能，可以添加自定义逻辑
3. `成长为大型系统`：随着业务的扩展，可以创建更多的套件和模块，对系统业务进行拆分

## 目录说明

| 名称                                      | 说明                                                                             |
| ----------------------------------------- | -------------------------------------------------------------------------------- |
| env                                       | [Env](../../techniques/env/introduction.md)                                      |
| src/front/config/config                   | [Config](../../techniques/config/introduction.md)                                |
| src/front/config/locales.ts               | [I18n国际化](../scope/locale.md)                                                 |
| src/suite/a-home/modules/home-api        | [API](../../techniques/api/introduction.md)                                      |
| src/suite/a-home/modules/home-icon       | [图标](../../techniques/icon/icon-engine.md)                                     |
| src/suite/a-home/modules/home-layout     | [路由字段: meta.layout](../../techniques/router/route-fields.md#meta-layout)     |
| src/suite/a-home/modules/home-mock       | [Mock](../../techniques/mock/introduction.md)                                    |
| src/suite/a-home/modules/home-pagesystem | [路由字段: meta.absolute](../../techniques/router/route-fields.md#meta-absolute) |
| src/suite/a-home/modules/a-homerouter     | [导航守卫](../../techniques/router/navigation-guards.md)                         |
