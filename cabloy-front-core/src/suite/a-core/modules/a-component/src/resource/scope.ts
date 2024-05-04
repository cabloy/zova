import { BeanScopeBase, Scope, TypeModuleResource } from '@cabloy/front-core';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleAComponent extends BeanScopeBase {}

export interface ScopeModuleAComponent
  extends TypeModuleResource<typeof config, typeof Errors, typeof locales, typeof constants> {}

declare module '@cabloy/front-core' {
  export interface IBeanScopeRecord {
    'a-component': ScopeModuleAComponent;
  }

  export interface IBeanScopeConfig {
    'a-component': ReturnType<typeof config>;
  }
}
