import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from '@cabloy/front';
import { config, Errors, locales, constants } from '../config/index.js';
import { components } from './components.js';

@Scope()
export class ScopeModuleAHomelayout extends BeanScopeBase {}

export interface ScopeModuleAHomelayout
  extends TypeModuleResource<
    typeof components,
    typeof config,
    typeof Errors,
    (typeof locales)[TypeLocaleBase],
    typeof constants
  > {}

declare module '@cabloy/front' {
  export interface IBeanScopeRecord {
    'a-homelayout': ScopeModuleAHomelayout;
  }

  export interface IBeanScopeConfig {
    'a-homelayout': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-homelayout': (typeof locales)[TypeLocaleBase];
  }
}
