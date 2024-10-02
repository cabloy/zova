# 目录结构

## 目录结构

```bash
project
├── env
├── src
│  ├── front
│  │  ├── config
│  │  │  ├── config
│  │  │  └── locales.ts
│  ├── legacy
│  ├── module
│  ├── module-vendor
│  ├── suite
│  │  ├── a-demo
│  │  └── a-home
│  │    ├── modules
│  │    │  ├── home-base
│  │    │  ├── home-icon
│  │    │  ├── home-index
│  │    │  └── home-layout
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

Zova 对模块/套件进行了规划，方便我们在约定的目录立即开始业务开发。以下约定仅仅是建议，没有强制约束：

1. 套件`suite/a-demo`：包含一些测试或者演示代码，在构建时禁用即可
2. 套件`suite/a-home`：业务开发在这个套件中展开
3. `成长为大型系统`：随着业务的扩展，可以创建更多的套件和模块，对系统业务进行拆分

## 目录说明

| 名称                                 | 说明                                                                                                 |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| env                                  | [Env](../../techniques/env/introduction.md)                                                          |
| src/front/config/config              | [Config](../../techniques/config/introduction.md)                                                    |
| src/front/config/locales.ts          | [I18n国际化](../scope/locale.md)                                                                     |
| legacy                               | [传统写法](../../vue/legacy.md)                                                                      |
| src/suite/a-home/modules/home-base   | [API](../../techniques/api/introduction.md) [导航守卫](../../techniques/router/navigation-guards.md) |
| src/suite/a-home/modules/home-icon   | [图标](../../techniques/icon/icon-engine.md)                                                         |
| src/suite/a-home/modules/home-index  | [路由别名](../../techniques/router/route-alias.md)                                                   |
| src/suite/a-home/modules/home-layout | [路由字段: meta.layout](../../techniques/router/route-fields.md#meta-layout)                         |
