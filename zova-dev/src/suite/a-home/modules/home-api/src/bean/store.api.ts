import { BeanBase, Store } from 'zova';
import axios, { AxiosInstance } from 'axios';
import { markRaw } from 'vue';

const SymbolApi = Symbol('SymbolApi');

export type StoreApiLike = StoreApi & AxiosInstance;

// const __ApiMethods = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch'];

@Store()
export class StoreApi extends BeanBase {
  private [SymbolApi]: AxiosInstance;

  protected async __init__() {
    const baseURL = `${this.app.config.api.baseURL || ''}${this.app.config.api.prefix || ''}/`;
    this[SymbolApi] = markRaw(axios.create({ baseURL }));
  }
  protected __get__(prop) {
    return this[SymbolApi] && this[SymbolApi][prop];
  }
}
