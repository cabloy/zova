# API

Zova provides a module `home-api`, which provides a basic `API` code skeleton based on [axios](https://axios-http.com). Custom API logic can be added on this basis, or even the `axios` underlying library can be directly replaced

## $api

- Zova injects the `$api` object into the `BeanBase` base class, so that the `axios` instance can be obtained through `this.$api` in any bean instance
- Zova also injects the `$api` object in `app.meta`, so that the `axios` instance can be accessed outside the bean instance

For example, load menu data:

`src/suite/a-home/modules/home-layout/src/api/service/menu.ts`

```typescript
export default (app: ZovaApplication) => {
  return {
    select: () => app.meta.$api.get<any, ServiceMenuEntity[]>('/home/layout/menu/select'),
  };
};
```

## home-api.bean.api

The module `home-api` provides an `home-api.bean.api` bean, in which custom logic can be added directly

`src/suite/a-home/modules/home-api/src/bean/bean.api.ts`

```typescript{7}
export class BeanApi {
  private [SymbolApi]: AxiosInstance;

  protected async __init__() {
    const baseURL = `${this.app.config.api.baseURL || ''}${this.app.config.api.prefix || ''}/`;
    this[SymbolApi] = markRaw(axios.create({ baseURL }));
    // your custom logic maybe here
  }

  protected __get__(prop) {
    return this[SymbolApi] && this[SymbolApi][prop];
  }
}
```
