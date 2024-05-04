import { BeanScopeBase, Scope, TypeModuleResource } from '@cabloy/front-core';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleAHomelayout extends BeanScopeBase {}

export interface ScopeModuleAHomelayout
  extends TypeModuleResource<typeof config, typeof Errors, typeof locales, typeof constants> {}

declare module '@cabloy/front-core' {
  export interface IBeanScopeRecord {
    'a-homelayout': ScopeModuleAHomelayout;
  }

  export interface IBeanScopeConfig {
    'a-homelayout': ReturnType<typeof config>;
  }
}
