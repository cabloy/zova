import { BeanScopeBase, Scope, TypeModuleResource } from '@cabloy/front-core';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleACore extends BeanScopeBase {}

export interface ScopeModuleACore
  extends TypeModuleResource<typeof config, typeof Errors, typeof locales, typeof constants> {}

declare module '@cabloy/front-core' {
  export interface IBeanScopeRecord {
    'a-core': ScopeModuleACore;
  }

  export interface IBeanScopeConfig {
    'a-core': ReturnType<typeof config>;
  }
}
