# env

Zova SSR 提供了常用的 env 环境变量，可以非常方便的配置某些特性的表现行为

## SSR

| 名称                         | 说明                              |
| ---------------------------- | --------------------------------- |
| SSR_COOKIE_THEMENAME         | 是否启用Cookie，用于存储ThemeName |
| SSR_COOKIE_THEMEDARK         | 是否启用Cookie，用于存储ThemeDark |
| SSR_COOKIE_THEMEDARK_DEFAULT | 当启用Cookie时，默认的ThemeDark值 |
| SSR_BODYREADYOBSERVER        | 是否监测Body元素的加载过程        |
| SSR_API_BASE_URL             | 在服务端访问API用的BaseURL        |
| SSR_PROD_PORT                | SSR生产服务的端口号               |
