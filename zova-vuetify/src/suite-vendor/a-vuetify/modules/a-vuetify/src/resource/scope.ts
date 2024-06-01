import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from '@cabloy/front';
import { config, Errors, locales, constants } from '../config/index.js';
import { components } from './components.js';

@Scope()
export class ScopeModuleAVuetify extends BeanScopeBase {}

export interface ScopeModuleAVuetify
  extends TypeModuleResource<
    typeof components,
    typeof config,
    typeof Errors,
    (typeof locales)[TypeLocaleBase],
    typeof constants
  > {}

import '@cabloy/front';
declare module '@cabloy/front' {
  export interface IBeanScopeRecord {
    'a-vuetify': ScopeModuleAVuetify;
  }

  export interface IBeanScopeConfig {
    'a-vuetify': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-vuetify': (typeof locales)[TypeLocaleBase];
  }
}
