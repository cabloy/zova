/** beans: begin */
export * from '../bean/theme.default.js';
export * from '../bean/themeDark.js';
export * from '../bean/themeLight.js';
import { ThemeDefault } from '../bean/theme.default.js';
import { ThemeDark } from '../bean/themeDark.js';
import { ThemeLight } from '../bean/themeLight.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'home-theme.theme.default': ThemeDefault;
    'home-theme.themeDark': ThemeDark;
    'home-theme.themeLight': ThemeLight;
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
