/** beans: begin */
export * from '../bean/model.theme.js';
export * from '../bean/tool.themeHandler.js';
import { ModelTheme } from '../bean/model.theme.js';
import { ToolThemeHandler } from '../bean/tool.themeHandler.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'a-quasar.model.theme': ModelTheme;
    'a-quasar.tool.themeHandler': ToolThemeHandler;
  }
}
/** beans: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'zova';

@Scope()
export class ScopeModuleAQuasar extends BeanScopeBase {}

export interface ScopeModuleAQuasar extends TypeModuleResource<any, any, any, any, any, any> {}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-quasar': ScopeModuleAQuasar;
  }
}
/** scope: end */
