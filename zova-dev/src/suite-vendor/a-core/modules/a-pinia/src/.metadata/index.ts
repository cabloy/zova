/** beans: begin */
export * from '../bean/bean.piniaStoreBase.js';
import { BeanPiniaStoreBase } from '../bean/bean.piniaStoreBase.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'a-pinia.bean.piniaStoreBase': BeanPiniaStoreBase;
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
