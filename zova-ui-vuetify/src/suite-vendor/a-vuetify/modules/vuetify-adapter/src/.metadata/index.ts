/** beans: begin */
export * from '../bean/themeHandler.default.js';
import { ThemeHandlerDefault } from '../bean/themeHandler.default.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'vuetify-adapter.themeHandler.default': ThemeHandlerDefault;
  }
}
/** beans: end */
/** monkey: begin */
export * from '../monkey.js';
/** monkey: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'zova';

@Scope()
export class ScopeModuleVuetifyAdapter extends BeanScopeBase {}

export interface ScopeModuleVuetifyAdapter extends TypeModuleResource<never, never, never, never, never> {}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'vuetify-adapter': ScopeModuleVuetifyAdapter;
  }
}
/** scope: end */
