import { BeanScopeBase, Scope, TypeModuleResource } from '@cabloy/front';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleAVuetify extends BeanScopeBase {}

export interface ScopeModuleAVuetify
  extends TypeModuleResource<typeof config, typeof Errors, typeof locales, typeof constants> {}

declare module '@cabloy/front-core' {
  export interface IBeanScopeRecord {
    'a-vuetify': ScopeModuleAVuetify;
  }

  export interface IBeanScopeConfig {
    'a-vuetify': ReturnType<typeof config>;
  }
}
