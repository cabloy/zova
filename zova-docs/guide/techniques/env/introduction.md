# Env

Zova exposes env variables on the special `process.env` object, which are statically replaced at build time

## meta & .env file

Zova uses [dotenv](https://github.com/motdotla/dotenv) to load additional environment variables from the following files in the directory `env`:

```txt
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

The `flavor` variable value can be passed in through the command line. The default value is `app`

```bash
$ npm run [dev/build]                # flavor is 'app'
$ FLAVOR=app npm run [dev/build]     # flavor is 'app'
$ FLAVOR=web npm run [dev/build]     # flavor is 'web'
```

### appMode

The `appMode` variable value can be passed in through the command line. The default value is `spa`

```bash
$ npm run [dev/build]                # appMode is 'spa'
$ APPMODE=spa npm run [dev/build]    # appMode is 'spa'
$ APPMODE=ssr npm run [dev/build]    # appMode is 'ssr'
```

- `quasar` has its own `appMode` setting mechanism, see: [Commands List: Mode](https://quasar.dev/quasar-cli-vite/commands-list#mode)

### For example

Execute `npm run dev` on the command line, then the corresponding meta variable values are:

| Name    | Value         |
| ------- | ------------- |
| mode    | 'development' |
| flavor  | 'app'         |
| appMode | 'spa'         |

The system will automatically load the environment variables in the following files and merge them:

```txt
.env
.env.mine
.env.app
.env.app.mine
.env.app.development
.env.app.development.mine
.env.app.development.spa
.env.app.development.spa.mine
```

## Built-in env variables

To further achieve out-of-box functionality, Zova provides several built-in env variables:

### meta

| Name          | Description       |
| ------------- | ----------------- |
| META_MODE     | mode              |
| META_FLAVOR   | flavor            |
| META_APP_MODE | appMode           |
| NODE_ENV      | equal `META_MODE` |

### Dev server

| Name            | Description                                                                                    |
| --------------- | ---------------------------------------------------------------------------------------------- |
| DEV_SERVER_HOST | Dev server host [Vite: server.host](https://vitejs.dev/config/server-options.html#server-host) |
| DEV_SERVER_PORT | Dev server port                                                                                |

### App

| Name            | Description                                                                              |
| --------------- | ---------------------------------------------------------------------------------------- |
| APP_ROUTER_MODE | [Vue Router: History Modes](https://router.vuejs.org/guide/essentials/history-mode.html) |
| APP_ROUTER_BASE | [Vue Router: base](https://router.vuejs.org/api/interfaces/RouterHistory.html#base)      |
| APP_PUBLIC_PATH | [Vite: Public Base Path](https://vitejs.dev/guide/build.html#public-base-path)           |
| APP_NAME        | App Name                                                                                 |
| APP_TITLE       | App Title                                                                                |
| APP_VERSION     | App Version                                                                              |

### Suite/Module

| Name                     | Description              |
| ------------------------ | ------------------------ |
| PROJECT_DISABLED_MODULES | List of disabled modules |
| PROJECT_DISABLED_SUITES  | List of disabled suites  |

### API

| Name         | Description |
| ------------ | ----------- |
| API_BASE_URL |             |
| API_PREFIX   |             |

`src/front/config/config/config.ts`

```typescript{5-6}
export default function (_meta: ZovaConfigMeta) {
  const config: ZovaConfigOptional = {
    base: {},
    api: {
      baseURL: process.env.API_BASE_URL,
      prefix: process.env.API_PREFIX,
    },
    layout: {},
  };
  return config;
}
```

`src/suite/a-home/modules/home-api/src/bean/store.api.ts`

```typescript{5}
export class StoreApi {
  private [SymbolApi]: AxiosInstance;

  protected async __init__() {
    const baseURL = `${this.app.config.api.baseURL || ''}${this.app.config.api.prefix || ''}/`;
    this[SymbolApi] = markRaw(axios.create({ baseURL }));
  }
}
```

### Proxy

| Name               | Description                                                                                               |
| ------------------ | --------------------------------------------------------------------------------------------------------- |
| PROXY_API_ENABLED  | Whether to enable proxy: [Vite: server.proxy](https://vitejs.dev/config/server-options.html#server-proxy) |
| PROXY_API_BASE_URL | proxy target                                                                                              |
| PROXY_API_PREFIX   | proxy key                                                                                                 |

### Mock

See: [Mock](../mock/introduction.md)
