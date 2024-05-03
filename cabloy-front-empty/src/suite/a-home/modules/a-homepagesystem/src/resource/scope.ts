import { BeanScopeBase, Scope, TypeModuleResource } from '@cabloy/front-core';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleAHomepagesystem extends BeanScopeBase {}

export interface ScopeModuleAHomepagesystem
  extends TypeModuleResource<typeof config, typeof Errors, typeof locales, typeof constants> {}

declare module '@cabloy/front-core' {
  export interface IBeanScopeRecord {
    'a-homepagesystem': ScopeModuleAHomepagesystem;
  }

  export interface IBeanScopeConfig {
    'a-homepagesystem': ReturnType<typeof config>;
  }
}
