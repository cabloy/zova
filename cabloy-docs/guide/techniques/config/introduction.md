# Config

## meta与config文件

Cabloy-Front 从`src/front/config/config`目录中加载 config 文件。同样支持基于`meta`条件的文件加载，具体规则参见：[meta与.env文件](http://localhost:5173/zh/guide/techniques/env/introduction.html)

### 举例

在命令行执行`npm run dev`，那么，对应的 meta 变量值是：

| 名称    | 值            |
| ------- | ------------- |
| mode    | 'development' |
| flavor  | 'web'         |
| appMode | 'spa'         |

系统就会自动加载下列文件中的 Config 配置，并进行合并:

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

## 访问全局config

在任何 bean 实例中可以直接通过`this.app.config`访问全局 config 对象

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

## 访问模块config

模块可以单独提供自己的 Config 配置，可以通过 Scope 实例获取模块的 Config 配置，参见：[Config配置
](http://localhost:5173/zh/guide/essentials/scope/config.html)

## 覆盖Config配置

可以使用项目级别的 Config 配置覆盖模块级别的 Config 配置，参见：[Config配置
](http://localhost:5173/zh/guide/essentials/scope/config.html)

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
