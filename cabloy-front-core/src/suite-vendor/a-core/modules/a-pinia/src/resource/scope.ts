import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from '@cabloy/front';
import { config, Errors, locales, constants } from '../config/index.js';
import { components } from './components.js';

@Scope()
export class ScopeModuleAPinia extends BeanScopeBase {}

export interface ScopeModuleAPinia
  extends TypeModuleResource<
    typeof components,
    typeof config,
    typeof Errors,
    (typeof locales)[TypeLocaleBase],
    typeof constants
  > {}

declare module '@cabloy/front' {
  export interface IBeanScopeRecord {
    'a-pinia': ScopeModuleAPinia;
  }

  export interface IBeanScopeConfig {
    'a-pinia': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-pinia': (typeof locales)[TypeLocaleBase];
  }
}
