import { BeanScopeBase, Scope, TypeModuleResource } from '@cabloy/front-core';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleADemobasic extends BeanScopeBase {}

export interface ScopeModuleADemobasic
  extends TypeModuleResource<typeof config, typeof Errors, typeof locales, typeof constants> {}

declare module '@cabloy/front-core' {
  export interface IBeanScopeRecord {
    'a-demobasic': ScopeModuleADemobasic;
  }

  export interface IBeanScopeConfig {
    'a-demobasic': ReturnType<typeof config>;
  }
}
