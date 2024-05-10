import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from '@cabloy/front';
import { config, Errors, locales, constants } from '../config/index.js';
import { components } from './components.js';

@Scope()
export class ScopeModuleAHomeicon extends BeanScopeBase {}

export interface ScopeModuleAHomeicon
  extends TypeModuleResource<
    typeof components,
    typeof config,
    typeof Errors,
    (typeof locales)[TypeLocaleBase],
    typeof constants
  > {}

declare module '@cabloy/front' {
  export interface IBeanScopeRecord {
    'a-homeicon': ScopeModuleAHomeicon;
  }

  export interface IBeanScopeConfig {
    'a-homeicon': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-homeicon': (typeof locales)[TypeLocaleBase];
  }
}
