/** beans: begin */
export * from '../bean/model.theme.js';
export * from '../bean/tool.themeHandler.js';
import { ModelTheme } from '../bean/model.theme.js';
import { ToolThemeHandler } from '../bean/tool.themeHandler.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'a-element.model.theme': ModelTheme;
    'a-element.tool.themeHandler': ToolThemeHandler;
  }
}
/** beans: end */
/** monkey: begin */
export * from '../monkey.js';
/** monkey: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'zova';

@Scope()
export class ScopeModuleAElement extends BeanScopeBase {}

export interface ScopeModuleAElement extends TypeModuleResource<any, any, any, any, any, any> {}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-element': ScopeModuleAElement;
  }
}
/** scope: end */
