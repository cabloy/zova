/** beans: begin */
export * from '../bean/theme.default.js';
import { ThemeDefault } from '../bean/theme.default.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'home-theme.theme.default': ThemeDefault;
  }
}
/** beans: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'zova';

@Scope()
export class ScopeModuleHomeTheme extends BeanScopeBase {}

export interface ScopeModuleHomeTheme extends TypeModuleResource<any, any, any, any, any, any> {}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'home-theme': ScopeModuleHomeTheme;
  }
}
/** scope: end */
