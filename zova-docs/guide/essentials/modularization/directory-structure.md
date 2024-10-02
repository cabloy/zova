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
│  │    │  ├── home-pagesystem
│  │    │  └── home-router
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

| Name                                      | Description                                                                          |
| ----------------------------------------- | ------------------------------------------------------------------------------------ |
| env                                       | [Env](../../techniques/env/introduction.md)                                          |
| src/front/config/config                   | [Config](../../techniques/config/introduction.md)                                    |
| src/front/config/locales.ts               | [I18n](../scope/locale.md)                                                           |
| src/suite/a-home/modules/home-api        | [API](../../techniques/api/introduction.md)                                          |
| src/suite/a-home/modules/home-icon       | [Icon](../../techniques/icon/icon-engine.md)                                         |
| src/suite/a-home/modules/home-layout     | [Route Fields: meta.layout](../../techniques/router/route-fields.md#meta-layout)     |
| src/suite/a-home/modules/home-pagesystem | [Route Fields: meta.absolute](../../techniques/router/route-fields.md#meta-absolute) |
| src/suite/a-home/modules/home-router     | [Navigation Guards](../../techniques/router/navigation-guards.md)                    |
