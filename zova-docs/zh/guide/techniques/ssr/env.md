# env

Zova SSR 提供了常用的 env 环境变量，可以非常方便的配置某些功能和特性的表现行为

## 可配置环境参数

| 名称                         | 说明                              |
| ---------------------------- | --------------------------------- |
| SSR_COOKIE_THEMENAME         | 是否启用Cookie，用于存储ThemeName |
| SSR_COOKIE_THEMEDARK         | 是否启用Cookie，用于存储ThemeDark |
| SSR_COOKIE_THEMEDARK_DEFAULT | 当启用Cookie时，默认的ThemeDark值 |
| SSR_BODYREADYOBSERVER        | 是否监测Body元素的加载过程        |
| SSR_API_BASE_URL             | 在服务端访问API用的BaseURL        |
| SSR_PROD_PORT                | SSR生产服务的端口号               |

## 动态环境参数

以下是根据运行环境动态设定的环境参数：

| 名称   | 说明           |
| ------ | -------------- |
| SSR    | 是否是SSR模式  |
| DEV    | 是否是开发环境 |
| PROD   | 是否是生产环境 |
| CLIENT | 是否是客户端   |
| SERVER | 是否是服务端   |
