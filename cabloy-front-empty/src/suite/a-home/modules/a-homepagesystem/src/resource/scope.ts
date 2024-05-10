import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from '@cabloy/front';
import { config, Errors, locales, constants } from '../config/index.js';
import { components } from './components.js';

@Scope()
export class ScopeModuleAHomepagesystem extends BeanScopeBase {}

export interface ScopeModuleAHomepagesystem
  extends TypeModuleResource<
    typeof components,
    typeof config,
    typeof Errors,
    (typeof locales)[TypeLocaleBase],
    typeof constants
  > {}

declare module '@cabloy/front' {
  export interface IBeanScopeRecord {
    'a-homepagesystem': ScopeModuleAHomepagesystem;
  }

  export interface IBeanScopeConfig {
    'a-homepagesystem': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-homepagesystem': (typeof locales)[TypeLocaleBase];
  }
}
