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
│  │    │  ├── home-api
│  │    │  ├── home-icon
│  │    │  ├── home-layout
│  │    │  ├── home-mock
│  │    │  ├── home-pagesystem
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
3. `Grow into a large system`: As the business expands, more suites and modules can be created to split the system business

## Directory cheat sheet

| Name                                      | Description                                                                          |
| ----------------------------------------- | ------------------------------------------------------------------------------------ |
| env                                       | [Env](../../techniques/env/introduction.md)                                          |
| src/front/config/config                   | [Config](../../techniques/config/introduction.md)                                    |
| src/front/config/locales.ts               | [I18n](../scope/locale.md)                                                           |
| src/suite/a-home/modules/home-api        | [API](../../techniques/api/introduction.md)                                          |
| src/suite/a-home/modules/home-icon       | [Icon](../../techniques/icon/icon-engine.md)                                         |
| src/suite/a-home/modules/home-layout     | [Route Fields: meta.layout](../../techniques/router/route-fields.md#meta-layout)     |
| src/suite/a-home/modules/home-mock       | [Mock](../../techniques/mock/introduction.md)                                        |
| src/suite/a-home/modules/home-pagesystem | [Route Fields: meta.absolute](../../techniques/router/route-fields.md#meta-absolute) |
| src/suite/a-home/modules/a-homerouter     | [Navigation Guards](../../techniques/router/navigation-guards.md)                    |
