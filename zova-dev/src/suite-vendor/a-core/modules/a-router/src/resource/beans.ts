export * from '../bean/store.router.js';
export * from '../bean/virtual.router.js';
import { StoreRouter } from '../bean/store.router.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'a-router.store.router': StoreRouter;
  }
}
