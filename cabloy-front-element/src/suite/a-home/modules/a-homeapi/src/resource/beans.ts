export * from '../bean/store.api.js';
import { StoreApi } from '../bean/store.api.js';
declare module '@cabloy/front' {
  export interface IBeanRecord {
    'a-homeapi.store.api': StoreApi;
  }
}
