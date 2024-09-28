/** beans: begin */
export * from '../bean/model.theme.js';
export * from '../bean/tool.themeHandler.js';
import { ModelTheme } from '../bean/model.theme.js';
import { ToolThemeHandler } from '../bean/tool.themeHandler.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'quasar-adapter.model.theme': ModelTheme;
    'quasar-adapter.tool.themeHandler': ToolThemeHandler;
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

export interface ScopeModuleQuasarAdapter extends TypeModuleResource<any, any, any, any, any> {}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'quasar-adapter': ScopeModuleQuasarAdapter;
  }
}
/** scope: end */
