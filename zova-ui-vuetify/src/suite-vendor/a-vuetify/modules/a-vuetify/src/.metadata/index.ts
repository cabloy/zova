/** beans: begin */
export * from '../bean/tool.themeHandler.js';
import { ToolThemeHandler } from '../bean/tool.themeHandler.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'a-vuetify.tool.themeHandler': ToolThemeHandler;
  }
}
/** beans: end */
/** monkey: begin */
export * from '../monkey.js';
/** monkey: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'zova';

@Scope()
export class ScopeModuleAVuetify extends BeanScopeBase {}

export interface ScopeModuleAVuetify extends TypeModuleResource<any, any, any, any, any> {}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-vuetify': ScopeModuleAVuetify;
  }
}
/** scope: end */
