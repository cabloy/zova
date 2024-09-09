/** beans: begin */
export * from '../bean/style.default.js';
import { StyleDefault } from '../bean/style.default.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'home-style.style.default': StyleDefault;
  }
}
/** beans: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'zova';

@Scope()
export class ScopeModuleHomeStyle extends BeanScopeBase {}

export interface ScopeModuleHomeStyle extends TypeModuleResource<any, any, any, any, any, any> {}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'home-style': ScopeModuleHomeStyle;
  }
}
/** scope: end */
