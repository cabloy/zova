import { BeanScopeBase, Scope, TypeModuleResource } from '@cabloy/front-core';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleAAntdv extends BeanScopeBase {}

export interface ScopeModuleAAntdv
  extends TypeModuleResource<typeof config, typeof Errors, typeof locales, typeof constants> {}

declare module '@cabloy/front-core' {
  export interface IBeanScopeRecord {
    'a-antdv': ScopeModuleAAntdv;
  }

  export interface IBeanScopeConfig {
    'a-antdv': ReturnType<typeof config>;
  }
}
