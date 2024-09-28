/** beans: begin */
export * from '../bean/model.theme.js';
export * from '../bean/tool.themeHandler.js';
import { ModelTheme } from '../bean/model.theme.js';
import { ToolThemeHandler } from '../bean/tool.themeHandler.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'element-adapter.model.theme': ModelTheme;
    'element-adapter.tool.themeHandler': ToolThemeHandler;
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

export interface ScopeModuleElementAdapter extends TypeModuleResource<any, any, any, any, any> {}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'element-adapter': ScopeModuleElementAdapter;
  }
}
/** scope: end */
