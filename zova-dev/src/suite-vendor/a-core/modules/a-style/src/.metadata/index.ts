/** beans: begin */
export * from '../bean/bean.theme.js';
import { BeanTheme } from '../bean/bean.theme.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'a-style.bean.theme': BeanTheme;
  }
}
/** beans: end */
/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** monkey: begin */
export * from '../monkey.js';
/** monkey: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'zova';

@Scope()
export class ScopeModuleAStyle extends BeanScopeBase {}

export interface ScopeModuleAStyle extends TypeModuleResource<any, typeof config, any, any, any, any> {}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-style': ScopeModuleAStyle;
  }

  export interface IBeanScopeConfig {
    'a-style': ReturnType<typeof config>;
  }
}
/** scope: end */
