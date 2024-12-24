/** beans: begin */
export * from '../bean/model.theme.js';
export * from '../bean/themeHandler.default.js';
import { ModelTheme } from '../bean/model.theme.js';
import { ThemeHandlerDefault } from '../bean/themeHandler.default.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'quasar-adapter.model.theme': ModelTheme;
    'quasar-adapter.themeHandler.default': ThemeHandlerDefault;
  }
}
/** beans: end */
/** monkey: begin */
export * from '../monkey.js';
/** monkey: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'zova';

@Scope()
export class ScopeModuleQuasarAdapter extends BeanScopeBase {}

export interface ScopeModuleQuasarAdapter extends TypeModuleResource<never, never, never, never, never> {}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'quasar-adapter': ScopeModuleQuasarAdapter;
  }
}
/** scope: end */
