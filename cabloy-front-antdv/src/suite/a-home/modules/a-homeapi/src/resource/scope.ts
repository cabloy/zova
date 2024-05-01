import { BeanScopeBase, Scope, TypeModuleResource } from '@cabloy/front-core';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleAHomeapi extends BeanScopeBase {}

export interface ScopeModuleAHomeapi
  extends TypeModuleResource<typeof config, typeof Errors, typeof locales, typeof constants> {}

declare module '@cabloy/front-core' {
  export interface IBeanScopeRecord {
    'a-homeapi': ScopeModuleAHomeapi;
  }

  export interface IBeanScopeConfig {
    'a-homeapi': ReturnType<typeof config>;
  }
}
