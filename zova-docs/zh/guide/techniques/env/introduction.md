# Env环境变量

Zova 通过`process.env`暴露环境变量，这些变量在构建时会被静态的替换掉

Zova 基于多维变量加载环境文件，从而提供更加灵活的配置机制，支持更复杂的业务场景

## meta与.env文件

Zova 使用[dotenv](https://github.com/motdotla/dotenv)从`env`目录中加载下列文件中的环境变量：

```txt
.env                # 所有情况下都会加载
.env.mine           # 所有情况下都会加载，但会被 git 忽略
.env.[meta]         # 只在指定条件下加载
.env.[meta].mine    # 只在指定条件下加载，但会被 git 忽略
```

- `[meta]`可以是以下三个字段值的`任意组合`，从而支持基于多维变量的加载机制

| 名称    | 类型                                                                                 |
| ------- | ------------------------------------------------------------------------------------ |
| mode    | 'development' \| 'production' \| string;                                             |
| flavor  | 'front' \| 'admin' \| string;                                                        |
| appMode | 'spa' \| 'ssr' \| 'pwa' \| 'cordova' \| 'capacitor' \| 'electron' \| 'bex' \| string |

- `appMode`: 更多信息，参见 [Commands List: Mode](https://quasar.dev/quasar-cli-vite/commands-list#mode)

## npm scripts

与多维变量相对应，命令行运行脚本也相应地分为三个部分，比如：

```bash
$ npm run dev:ssr:admin
$ npm run build:ssr:admin
```

为了方便起见，我们把最常用的脚本设为别名即可，比如：

```json
"scripts": {
  "dev": "npm run dev:ssr:admin",
  "build": "npm run build:ssr:admin",
  "preview": "npm run preview:ssr",
  "dev:ssr:admin": "npm run prerun && quasar dev --mode ssr --flavor admin",
  "build:ssr:admin": "npm run prerun && quasar build --mode ssr --flavor admin",
  "preview:ssr": "concurrently \"cd ./distMockServer && node index.js\" \"node ./dist/ssr/index.js\"",
},
```

### 举例

在命令行执行`npm run dev`，那么，对应的 meta 变量值是：

| 名称    | 值            |
| ------- | ------------- |
| mode    | 'development' |
| flavor  | 'admin'       |
| appMode | 'ssr'         |

系统就会自动加载下列文件中的环境变量，并进行合并:

```txt
.env
.env.admin
.env.admin.development
.env.admin.development.ssr
.env.mine
.env.admin.mine
.env.admin.development.mine
.env.admin.development.ssr.mine
```

## 内置环境变量

为了进一步实现开箱即用的效果，Zova 提供了若干内置的环境变量：

### meta

| 名称          | 说明          |
| ------------- | ------------- |
| META_MODE     | mode          |
| META_FLAVOR   | flavor        |
| META_APP_MODE | appMode       |
| NODE_ENV      | 等于META_MODE |

### 开发服务

| 名称            | 说明                                                                                          |
| --------------- | --------------------------------------------------------------------------------------------- |
| DEV_SERVER_HOST | 开发服务的host [Vite: server.host](https://vitejs.dev/config/server-options.html#server-host) |
| DEV_SERVER_PORT | 开发服务的port                                                                                |

### 应用

| 名称            | 说明                                                                                     |
| --------------- | ---------------------------------------------------------------------------------------- |
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
export default function (_app: ZovaApplication) {
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

| 名称               | 说明                                                                                            |
| ------------------ | ----------------------------------------------------------------------------------------------- |
| PROXY_API_ENABLED  | 是否启用proxy：[Vite: server.proxy](https://vitejs.dev/config/server-options.html#server-proxy) |
| PROXY_API_BASE_URL | proxy target                                                                                    |
| PROXY_API_PREFIX   | proxy key                                                                                       |

### Mock

参见：[Mock](../mock/introduction.md)
