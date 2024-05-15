# Env

Cabloy-Front 通过`process.env`暴露环境变量，这些变量在构建时会被静态的替换掉

## .env文件

Cabloy-Front 使用[dotenv](https://github.com/motdotla/dotenv)从`env`目录中加载下列文件中的环境变量：

```env
.env                # 所有情况下都会加载
.env.mine           # 所有情况下都会加载，但会被 git 忽略
.env.[meta]         # 只在指定条件下加载
.env.[meta].mine    # 只在指定条件下加载，但会被 git 忽略
```

- `[meta]`可以是以下三个字段值的`任意组合`

| 名称    | 类型                                                                                               |
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

可以通过命令行传入 flavor 变量值，默认是`web`

```bash
$ npm run [dev/build]                # flavor is 'web'
$ FLAVOR=web npm run [dev/build]     # flavor is 'web'
$ FLAVOR=app npm run [dev/build]     # flavor is 'app'
```

### appMode

可以在`vite.config.ts`文件中修改 appMode 的变量值，默认是`spa`

```typescript{6}
export default defineConfig(async ({ mode }) => {
  const flavor = getFlavor();
  const configMeta: CabloyConfigMeta = {
    flavor,
    mode,
    appMode: 'spa',
  };
  ...
}
```

- `quasar`有自己的`appMode`设置机制，参见：[Commands List: Mode](https://quasar.dev/quasar-cli-vite/commands-list#mode)

### 举例：

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

为了进一步开箱即用，Cabloy-Front 提供了若干内置的环境变量：

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

| 名称 | 说明 |
| ---- | ---- |

## Mock

参见：
