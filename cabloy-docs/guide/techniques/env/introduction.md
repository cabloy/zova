# Env

Cabloy-Front exposes env variables on the special `process.env` object, which are statically replaced at build time

## .env file

Cabloy-Front uses [dotenv](https://github.com/motdotla/dotenv) to load additional environment variables from the following files in the directory `env`:

```env
.env                # loaded in all cases
.env.mine           # loaded in all cases, ignored by git
.env.[meta]         # only loaded in specified condition
.env.[meta].mine    # only loaded in specified condition, ignored by git
```

- `[meta]` can be `any combination` of the following three field values

| Name    | Description                                                                                        |
| ------- | -------------------------------------------------------------------------------------------------- |
| mode    | 'development' \| 'production' \| string;                                                           |
| flavor  | 'web' \| 'app' \| string;                                                                          |
| appMode | 'spa' \| 'ssr' \| 'pwa' \| 'cordova' \| 'capacitor' \| 'electron' \| 'bex' \| string \| undefined; |

### mode

```bash
$ npm run dev     # mode is 'development'
$ npm run build   # mode is 'production'
```

### flavor

The `flavor` variable value can be passed in through the command line. The default value is `web`

```bash
$ npm run [dev/build]                # flavor is 'web'
$ FLAVOR=web npm run [dev/build]     # flavor is 'web'
$ FLAVOR=app npm run [dev/build]     # flavor is 'app'
```

### appMode

The `appMode` variable value can be passed in through the command line. The default value is `spa`

```bash
$ npm run [dev/build]                # appMode is 'spa'
$ APPMODE=spa npm run [dev/build]    # appMode is 'spa'
$ APPMODE=ssr npm run [dev/build]    # appMode is 'ssr'
```

- `quasar` has its own `appMode` setting mechanism, refer to: [Commands List: Mode](https://quasar.dev/quasar-cli-vite/commands-list#mode)

### For example

在命令行执行`npm run dev`，那么，对应的 meta 变量值是：

| 名称    | 值            |
| ------- | ------------- |
| mode    | 'development' |
| flavor  | 'web'         |
| appMode | 'spa'         |

系统就会自动加载下列文件中的环境变量，并进行合并:

```env
.env
.env.mine
.env.web
.env.web.mine
.env.web.development
.env.web.development.mine
.env.web.development.spa
.env.web.development.spa.mine
```

## 内置环境变量

为了进一步实现开箱即用的效果，Cabloy-Front 提供了若干内置的环境变量：

### meta

| 名称          | 说明          |
| ------------- | ------------- |
| META_MODE     | mode          |
| META_FLAVOR   | flavor        |
| META_APP_MODE | appMode       |
| NODE_ENV      | 等于META_MODE |

### 应用

| 名称            | 说明                                                                                     |
| --------------- | ---------------------------------------------------------------------------------------- |
| APP_SERVER      | 是否在`server`端运行                                                                     |
| APP_ROUTER_MODE | [Vue Router: History Modes](https://router.vuejs.org/guide/essentials/history-mode.html) |
| APP_ROUTER_BASE | [Vue Router: base](https://router.vuejs.org/api/interfaces/RouterHistory.html#base)      |
| APP_PUBLIC_PATH | [Vite: Public Base Path](https://vitejs.dev/guide/build.html#public-base-path)           |
| APP_NAME        | 应用名称                                                                                 |
| APP_TITLE       | 应用标题                                                                                 |
| APP_VERSION     | 应用版本                                                                                 |

### 套件/模块

| 名称                     | 说明           |
| ------------------------ | -------------- |
| PROJECT_DISABLED_MODULES | 禁用的模块清单 |
| PROJECT_DISABLED_SUITES  | 禁用的套件清单 |

### API

| 名称         | 说明 |
| ------------ | ---- |
| API_BASE_URL |      |
| API_PREFIX   |      |

`src/front/config/config/config.ts`

```typescript{5-6}
export default function (_meta: CabloyConfigMeta) {
  const config = {
    base: {},
    api: {
      baseURL: process.env.API_BASE_URL,
      prefix: process.env.API_PREFIX,
    },
    layout: {},
  } as CabloyConfigOptional;
  return config;
}
```

`src/suite/a-home/modules/a-homeapi/src/bean/store.api.ts`

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

## Proxy

| 名称               | 说明                                                                                            |
| ------------------ | ----------------------------------------------------------------------------------------------- |
| PROXY_API_ENABLED  | 是否启用proxy：[Vite: server.proxy](https://vitejs.dev/config/server-options.html#server-proxy) |
| PROXY_API_BASE_URL | proxy target                                                                                    |
| PROXY_API_PREFIX   | proxy key                                                                                       |

## Mock

参见：[Mock](../mock/introduction.md)
