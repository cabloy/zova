import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from '@cabloy/front';
import { config, Errors, locales, constants } from '../config/index.js';
import { components } from './components.js';

@Scope()
export class ScopeModuleACore extends BeanScopeBase {}

export interface ScopeModuleACore
  extends TypeModuleResource<
    typeof components,
    typeof config,
    typeof Errors,
    (typeof locales)[TypeLocaleBase],
    typeof constants
  > {}

declare module '@cabloy/front-core' {
  export interface IBeanScopeRecord {
    'a-core': ScopeModuleACore;
  }

  export interface IBeanScopeConfig {
    'a-core': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-core': (typeof locales)[TypeLocaleBase];
  }
}
