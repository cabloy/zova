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

```config
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

## env与config的关系

有些变量同时存在于 env 和 config 中，基本逻辑如下：

1. 在 env 中配置变量的值
2. 让 config 中的值等于 env 中的值
3. 在代码中优先通过 config 来访问变量的值
4. 如果需要使用构建时 tree shaking 的能力，就通过`process.env.xxx`来访问变量的值

### 变量对照表

| env中的变量     | config中的变量    |
| --------------- | ----------------- |
| META_MODE       | meta.mode         |
| META_FLAVOR     | meta.flavor       |
| META_APP_MODE   | meta.appMode      |
| APP_SERVER      | env.appServer     |
| APP_ROUTER_MODE | env.appRouterMode |
| APP_ROUTER_BASE | env.appRouterBase |
| APP_PUBLIC_PATH | env.appPublicPath |
| APP_NAME        | env.appName       |
| APP_TITLE       | env.appTitle      |
| APP_VERSION     | env.appVersion    |
| API_BASE_URL    | api.baseURL       |
| API_PREFIX      | api.prefix        |
