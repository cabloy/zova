export * from '../bean/store.icon.js';
import { StoreIcon } from '../bean/store.icon.js';
declare module '@cabloy/front-core' {
  export interface IBeanRecord {
    'a-icon.store.icon': StoreIcon;
  }
}
