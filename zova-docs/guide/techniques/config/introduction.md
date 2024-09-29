# Config

## meta & config file

Zova loads config files from the `src/front/config/config` directory. File loading based on `meta` conditions is also supported. For specific rules, see: [meta & .env file](../env/introduction.md)

### For example

Execute `npm run dev` on the command line, then the corresponding meta variable values are:

| Name    | Value         |
| ------- | ------------- |
| mode    | 'development' |
| flavor  | 'admin'       |
| appMode | 'ssr'         |

The system will automatically load the configuration in the following files and merge them:

```txt
config.ts
config.admin.ts
config.admin.development.ts
config.admin.development.ssr.ts
config.mine.ts
config.admin.mine.ts
config.admin.development.mine.ts
config.admin.development.ssr.mine.ts
```

## Use global config

The global config object can be obtained directly through `this.app.config` in any bean instance

```typescript{5}
export class StoreApi {
  private [SymbolApi]: AxiosInstance;

  protected async __init__() {
    const baseURL = `${this.app.config.api.baseURL || ''}${this.app.config.api.prefix || ''}/`;
    this[SymbolApi] = markRaw(axios.create({ baseURL }));
  }
}
```

## Use module config

Modules can individually provide their own `config` configuration, which can be obtained through the `Scope` instance. See: [Config](../../essentials/scope/config.md)

## Override module config

You can use `project-level` config to override `module-level` config, see: [Config](../../essentials/scope/config.md)

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
| APP_ROUTER_MODE  | env.appRouterMode   |
| APP_ROUTER_BASE  | env.appRouterBase   |
| APP_PUBLIC_PATH  | env.appPublicPath   |
| APP_NAME         | env.appName         |
| APP_TITLE        | env.appTitle        |
| APP_VERSION      | env.appVersion      |
| API_BASE_URL     | api.baseURL         |
| API_PREFIX       | api.prefix          |
