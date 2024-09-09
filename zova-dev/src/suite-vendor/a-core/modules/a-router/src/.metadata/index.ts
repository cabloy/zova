/** beans: begin */
export * from '../bean/bean.router.js';
export * from '../bean/virtual.router.js';
import { BeanRouter } from '../bean/bean.router.js';
import { VirtualRouter } from '../bean/virtual.router.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'a-router.bean.router': BeanRouter;
    'a-router.virtual.router': VirtualRouter;
  }
}
/** beans: end */
/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'zova';

@Scope()
export class ScopeModuleARouter extends BeanScopeBase {}

export interface ScopeModuleARouter extends TypeModuleResource<any, typeof config, any, any, any, any> {}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-router': ScopeModuleARouter;
  }

  export interface IBeanScopeConfig {
    'a-router': ReturnType<typeof config>;
  }
}
/** scope: end */
