/** beans: begin */

import 'zova';
declare module 'zova' {
  export interface IBeanRecord {}
}
/** beans: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'zova';

@Scope()
export class ScopeModuleHomeRouter extends BeanScopeBase {}

export interface ScopeModuleHomeRouter extends TypeModuleResource<any, any, any, any, any, any> {}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'home-router': ScopeModuleHomeRouter;
  }
}
/** scope: end */
