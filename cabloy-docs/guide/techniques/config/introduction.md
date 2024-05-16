# Config

## meta & config file

Cabloy-Front loads config files from the `src/front/config/config` directory. File loading based on `meta` conditions is also supported. For specific rules, refer to: [meta & .env file](../env/introduction.md)

### For example

Execute `npm run dev` on the command line, then the corresponding meta variable values are:

| Name    | Value         |
| ------- | ------------- |
| mode    | 'development' |
| flavor  | 'web'         |
| appMode | 'spa'         |

The system will automatically load the configuration in the following files and merge them:

```txt
config.ts
config.mine.ts
config.web.ts
config.web.mine.ts
config.web.development.ts
config.web.development.mine.ts
config.web.development.spa.ts
config.web.development.spa.mine.ts
```

## Use global config

The global config object can be obtained directly through `this.app.config` in any bean instance

```typescript{6}
@Store()
export class StoreApi extends BeanBase {
  private [SymbolApi]: AxiosInstance;

  protected async __init__() {
    const baseURL = `${this.app.config.api.baseURL || ''}${this.app.config.api.prefix || ''}/`;
    this[SymbolApi] = markRaw(axios.create({ baseURL }));
  }
}
```

## Use module config

Modules can individually provide their own `config` configuration, which can be obtained through the `Scope` instance. Refer to: [Config](../../essentials/scope/config.md)

## Override module config

You can use `project-level` config to override `module-level` config, refer to: [Config](../../essentials/scope/config.md)

## The relationship between env and config

Some variables exist in both `env` and `config`. The basic logic is as follows:

1. Configure the value of the variable in `env`
2. Let the value in `config` equal the value in `env`
3. Prioritize using variable values through `config` in code
4. If you need to use the build-time tree shaking capability, use the value of the variable through `process.env.xxx`

### Variable comparison table

| Variables in env | Variables in config |
| ---------------- | ------------------- |
| META_MODE        | meta.mode           |
| META_FLAVOR      | meta.flavor         |
| META_APP_MODE    | meta.appMode        |
| APP_SERVER       | env.appServer       |
| APP_ROUTER_MODE  | env.appRouterMode   |
| APP_ROUTER_BASE  | env.appRouterBase   |
| APP_PUBLIC_PATH  | env.appPublicPath   |
| APP_NAME         | env.appName         |
| APP_TITLE        | env.appTitle        |
| APP_VERSION      | env.appVersion      |
| API_BASE_URL     | api.baseURL         |
| API_PREFIX       | api.prefix          |
