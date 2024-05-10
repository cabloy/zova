import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from '@cabloy/front';
import { config, Errors, locales, constants } from '../config/index.js';
import { components } from './components.js';

@Scope()
export class ScopeModuleAHomerouter extends BeanScopeBase {}

export interface ScopeModuleAHomerouter
  extends TypeModuleResource<
    typeof components,
    typeof config,
    typeof Errors,
    (typeof locales)[TypeLocaleBase],
    typeof constants
  > {}

declare module '@cabloy/front' {
  export interface IBeanScopeRecord {
    'a-homerouter': ScopeModuleAHomerouter;
  }

  export interface IBeanScopeConfig {
    'a-homerouter': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-homerouter': (typeof locales)[TypeLocaleBase];
  }
}
