export * from '../bean/store.api.js';
import { StoreApi } from '../bean/store.api.js';
import '@cabloy/front';
declare module '@cabloy/front' {
  export interface IBeanRecord {
    'home-api.store.api': StoreApi;
  }
}
