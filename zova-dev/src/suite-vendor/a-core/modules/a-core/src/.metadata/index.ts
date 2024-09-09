/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'zova';

@Scope()
export class ScopeModuleACore extends BeanScopeBase {}

export interface ScopeModuleACore extends TypeModuleResource<any, any, any, any, any, any> {}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-core': ScopeModuleACore;
  }
}
/** scope: end */
