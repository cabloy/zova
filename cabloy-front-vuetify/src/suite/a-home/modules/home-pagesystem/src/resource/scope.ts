import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from '@cabloy/front';
import { config, Errors, locales, constants } from '../config/index.js';
import { components } from './components.js';

@Scope()
export class ScopeModuleHomePagesystem extends BeanScopeBase {}

export interface ScopeModuleHomePagesystem
  extends TypeModuleResource<
    typeof components,
    typeof config,
    typeof Errors,
    (typeof locales)[TypeLocaleBase],
    typeof constants
  > {}

declare module '@cabloy/front' {
  export interface IBeanScopeRecord {
    'home-pagesystem': ScopeModuleHomePagesystem;
  }

  export interface IBeanScopeConfig {
    'home-pagesystem': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'home-pagesystem': (typeof locales)[TypeLocaleBase];
  }
}
