export * from '../bean/store.router.js';
import { StoreRouter } from '../bean/store.router.js';
declare module '@cabloy/front' {
  export interface IBeanRecord {
    'a-router.store.router': StoreRouter;
  }
}
