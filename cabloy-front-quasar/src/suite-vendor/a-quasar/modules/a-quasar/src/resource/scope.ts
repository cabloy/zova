import { BeanScopeBase, Scope, TypeModuleResource } from '@cabloy/front-core';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleAQuasar extends BeanScopeBase {}

export interface ScopeModuleAQuasar
  extends TypeModuleResource<typeof config, typeof Errors, typeof locales, typeof constants> {}

declare module '@cabloy/front-core' {
  export interface IBeanScopeRecord {
    'a-quasar': ScopeModuleAQuasar;
  }

  export interface IBeanScopeConfig {
    'a-quasar': ReturnType<typeof config>;
  }
}
