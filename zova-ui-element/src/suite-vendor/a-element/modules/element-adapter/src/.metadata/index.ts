/** beans: begin */
export * from '../bean/model.theme.js';
export * from '../bean/themeHandler.default.js';
import { ModelTheme } from '../bean/model.theme.js';
import { ThemeHandlerDefault } from '../bean/themeHandler.default.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'element-adapter.model.theme': ModelTheme;
    'element-adapter.themeHandler.default': ThemeHandlerDefault;
  }
}
/** beans: end */
/** monkey: begin */
export * from '../monkey.js';
/** monkey: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'zova';

@Scope()
export class ScopeModuleElementAdapter extends BeanScopeBase {}

export interface ScopeModuleElementAdapter extends TypeModuleResource<never, never, never, never, never> {}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'element-adapter': ScopeModuleElementAdapter;
  }
}
/** scope: end */
