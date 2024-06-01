export * from '../bean/store.api.js';
import { StoreApi } from '../bean/store.api.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'home-api.store.api': StoreApi;
  }
}
