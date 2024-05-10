import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from '@cabloy/front';
import { config, Errors, locales, constants } from '../config/index.js';
import { components } from './components.js';

@Scope()
export class ScopeModuleAHome extends BeanScopeBase {}

export interface ScopeModuleAHome
  extends TypeModuleResource<
    typeof components,
    typeof config,
    typeof Errors,
    (typeof locales)[TypeLocaleBase],
    typeof constants
  > {}

declare module '@cabloy/front' {
  export interface IBeanScopeRecord {
    'a-home': ScopeModuleAHome;
  }

  export interface IBeanScopeConfig {
    'a-home': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-home': (typeof locales)[TypeLocaleBase];
  }
}
