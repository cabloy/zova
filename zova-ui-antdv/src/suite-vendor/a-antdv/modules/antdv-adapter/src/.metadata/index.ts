/** beans: begin */
export * from '../bean/themeHandler.default.js';
import { ThemeHandlerDefault } from '../bean/themeHandler.default.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'antdv-adapter.themeHandler.default': ThemeHandlerDefault;
  }
}
/** beans: end */
/** monkey: begin */
export * from '../monkey.js';
/** monkey: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'zova';

@Scope()
export class ScopeModuleAntdvAdapter extends BeanScopeBase {}

export interface ScopeModuleAntdvAdapter extends TypeModuleResource<never, never, never, never, never> {}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'antdv-adapter': ScopeModuleAntdvAdapter;
  }
}
/** scope: end */
