/** beans: begin */
export * from '../bean/tool.themeHandler.js';
import { ToolThemeHandler } from '../bean/tool.themeHandler.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'devui-adapter.tool.themeHandler': ToolThemeHandler;
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

export interface ScopeModuleDevuiAdapter extends TypeModuleResource<any, any, any, any, any> {}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'devui-adapter': ScopeModuleDevuiAdapter;
  }
}
/** scope: end */
