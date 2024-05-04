export * from '../bean/store.component.js';
import { StoreComponent } from '../bean/store.component.js';
declare module '@cabloy/front-core' {
  export interface IBeanRecord {
    'a-component.store.component': StoreComponent;
  }
}
