/** beans: begin */
export * from '../bean/themeHandler.default.js';
import { ThemeHandlerDefault } from '../bean/themeHandler.default.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'devui-adapter.themeHandler.default': ThemeHandlerDefault;
  }
}
/** beans: end */
/** monkey: begin */
export * from '../monkey.js';
/** monkey: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'zova';

@Scope()
export class ScopeModuleDevuiAdapter extends BeanScopeBase {}

export interface ScopeModuleDevuiAdapter extends TypeModuleResource<never, never, never, never, never> {}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'devui-adapter': ScopeModuleDevuiAdapter;
  }
}
/** scope: end */
