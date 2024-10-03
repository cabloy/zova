# API

Zova 提供了一个模块`home-base`，该模块基于[axios](https://axios-http.com)提供了基本的`API`代码骨架。可以在此基础上添加自定义的 API 逻辑，甚至也可以直接替换掉`axios`底层库

## $api

- Zova 在`BeanBase`基类中注入了`$api`对象，从而可以在任何 bean 实例中通过`this.$api`访问`axios`实例
- Zova 同时在`app.meta`中注入了`$api`对象，从而可以在 bean 实例的外部访问`axios`实例

比如，获取菜单数据：

`src/suite/a-home/modules/home-layout/src/service/menu.ts`

```typescript
export default (app: ZovaApplication) => {
  return {
    select: () => app.meta.$api.get<any, ServiceMenuEntity[]>('/home/layout/menu/select'),
  };
};
```

## home-base.bean.api

模块`home-base`提供了一个`home-base.bean.api`bean，可以直接在里面添加自定义逻辑

`src/suite/a-home/modules/home-base/src/bean/bean.api.ts`

```typescript{7}
export class BeanApi {
  private [SymbolApi]: AxiosInstance;

  protected async __init__() {
    const baseURL = this.app.meta.util.getApiBaseURL();
    this[SymbolApi] = markRaw(axios.create({ baseURL }));
    // your custom logic maybe here
  }

  protected __get__(prop) {
    return this[SymbolApi] && this[SymbolApi][prop];
  }
}
```
