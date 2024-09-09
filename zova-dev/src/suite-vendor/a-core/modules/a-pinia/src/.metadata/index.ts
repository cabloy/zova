/** beans: begin */
export * from '../bean/virtual.piniaStore.js';
import { VirtualPiniaStore } from '../bean/virtual.piniaStore.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'a-pinia.virtual.piniaStore': VirtualPiniaStore;
  }
}
/** beans: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'zova';

@Scope()
export class ScopeModuleAPinia extends BeanScopeBase {}

export interface ScopeModuleAPinia extends TypeModuleResource<any, any, any, any, any, any> {}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-pinia': ScopeModuleAPinia;
  }
}
/** scope: end */
