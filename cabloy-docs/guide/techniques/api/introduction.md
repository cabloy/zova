# API

Cabloy-Front provides a module `a-homeapi`, which provides a basic `API` code skeleton based on [axios](https://axios-http.com). Custom API logic can be added on this basis, or even the `axios` underlying library can be directly replaced

## $api

Cabloy-Front injects the `$api` object into the `BeanBase` base class, so that the `axios` instance can be obtained through `this.$api` in any bean instance

For example, load menu data:

`src/suite/a-home/modules/a-homelayout/src/component/layoutDefault/mother.ts`

```typescript{10-11}
@Local()
export class MotherLayoutDefault extends BeanMotherBase<unknown, Props, Emits, Slots> {
  menu: TypeMenuItem[];

  protected async __init__() {
    await this.loadMenu();
  }

  async loadMenu() {
    const res = await this.$api.get('a/homemock/getMenu');
    this.menu = res.data.data;
  }
}
```

## a-homeapi.store.api

The module `a-homeapi` provides an `a-homeapi.store.api` store bean, in which custom logic can be added directly

`src/suite/a-home/modules/a-homeapi/src/bean/store.api.ts`

```typescript{8}
@Store()
export class StoreApi extends BeanBase {
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
