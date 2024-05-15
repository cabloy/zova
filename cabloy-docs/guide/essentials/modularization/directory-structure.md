# Directory Structure

## Directory Structure

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
│  │    │  ├── a-homeapi
│  │    │  ├── a-homeicon
│  │    │  ├── a-homelayout
│  │    │  ├── a-homemock
│  │    │  ├── a-homepagesystem
│  │    │  └── a-homerouter
│  └── suite-vendor
```

## Module/Suite

| Name              | Description                             |
| ----------------- | --------------------------------------- |
| src/module        | Standalone module (not part of a suite) |
| src/module-vendor | Standalone module (from third-party)    |
| src/suite         | Suite                                   |
| src/suite-vendor  | Suite (from third-party)                |

## Development suggestions

Cabloy-Front has planned the modules/suites so that we can start business development immediately in the specified directory. The following conventions are only suggestions and are not mandatory:

1. Suite `suite/a-demo`: Contains some test or demo code, which can be disabled during build
2. Suite `suite/a-home`: Development in this suite
   - Module `suite/a-home/modules/a-home`: Development in this module
   - Other modules: Different modules are preset with different system functions, and custom logic can be added
3. 大型系统：随着业务的扩展，可以创建更多的套件和模块，对系统业务进行拆分

## 目录说明

| 名称                                      | 说明                                                                             |
| ----------------------------------------- | -------------------------------------------------------------------------------- |
| env                                       | [Env](../../techniques/env/introduction.md)                                      |
| src/front/config/config                   | [Config](../../techniques/config/introduction.md)                                |
| src/front/config/locales.ts               | [I18n国际化](../scope/locale.md)                                                 |
| src/suite/a-home/modules/a-homeapi        | [API](../../techniques/api/introduction.md)                                      |
| src/suite/a-home/modules/a-homeicon       | [图标](../../techniques/icon/icon-engine.md)                                     |
| src/suite/a-home/modules/a-homelayout     | [路由字段: meta.layout](../../techniques/router/route-fields.md#meta-layout)     |
| src/suite/a-home/modules/a-homemock       | [Mock](../../techniques/mock/introduction.md)                                    |
| src/suite/a-home/modules/a-homepagesystem | [路由字段: meta.absolute](../../techniques/router/route-fields.md#meta-absolute) |
| src/suite/a-home/modules/a-homerouter     | [导航守卫](../../techniques/router/navigation-guards.md)                         |
