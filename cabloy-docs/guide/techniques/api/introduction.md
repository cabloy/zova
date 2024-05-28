# API

Cabloy-Front provides a module `home-api`, which provides a basic `API` code skeleton based on [axios](https://axios-http.com). Custom API logic can be added on this basis, or even the `axios` underlying library can be directly replaced

## $api

Cabloy-Front injects the `$api` object into the `BeanBase` base class, so that the `axios` instance can be obtained through `this.$api` in any bean instance

For example, load menu data:

`src/suite/a-home/modules/home-layout/src/component/layoutDefault/controller.ts`

```typescript{9-10}
export class MotherLayoutDefault {
  menu: TypeMenuItem[];

  protected async __init__() {
    await this.loadMenu();
  }

  async loadMenu() {
    const res = await this.$api.get('/home/mock/getMenu');
    this.menu = res.data.data;
  }
}
```

## home-api.store.api

The module `home-api` provides an `home-api.store.api` store bean, in which custom logic can be added directly

`src/suite/a-home/modules/home-api/src/bean/store.api.ts`

```typescript{7}
export class StoreApi {
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
