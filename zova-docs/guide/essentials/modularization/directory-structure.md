# Directory Structure

## Directory Structure

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

## Module/Suite

| Name              | Description                             |
| ----------------- | --------------------------------------- |
| src/module        | Standalone module (not part of a suite) |
| src/module-vendor | Standalone module (from third-party)    |
| src/suite         | Suite                                   |
| src/suite-vendor  | Suite (from third-party)                |

## Development suggestions

Zova has planned the modules/suites so that we can start business development immediately in the specified directory. The following conventions are only suggestions and are not mandatory:

1. Suite `suite/a-demo`: Contains some test or demo code, which can be disabled during build
2. Suite `suite/a-home`: Development in this suite
3. `Grow into a large-scale system`: As the business expands, more suites and modules can be created to split the system business

## Directory cheat sheet

| Name                                 | Description                                                                                                   |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| env                                  | [Env](../../techniques/env/introduction.md)                                                                   |
| src/front/config/config              | [Config](../../techniques/config/introduction.md)                                                             |
| src/front/config/locales.ts          | [I18n](../scope/locale.md)                                                                                    |
| legacy                               | [Legacy Usage](../../vue/legacy.md)                                                                           |
| src/suite/a-home/modules/home-base   | [API](../../techniques/api/introduction.md) [Navigation Guards](../../techniques/router/navigation-guards.md) |
| src/suite/a-home/modules/home-icon   | [Icon](../../techniques/icon/icon-engine.md)                                                                  |
| src/suite/a-home/modules/home-index  | [Route Alias](../../techniques/router/route-alias.md)                                                         |
| src/suite/a-home/modules/home-layout | [Route Fields: meta.layout](../../techniques/router/route-fields.md#meta-layout)                              |
