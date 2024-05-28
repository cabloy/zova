import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from '@cabloy/front';
import { config, Errors, locales, constants } from '../config/index.js';
import { components } from './components.js';

@Scope()
export class ScopeModuleAHomemock extends BeanScopeBase {}

export interface ScopeModuleAHomemock
  extends TypeModuleResource<
    typeof components,
    typeof config,
    typeof Errors,
    (typeof locales)[TypeLocaleBase],
    typeof constants
  > {}

declare module '@cabloy/front' {
  export interface IBeanScopeRecord {
    'a-homemock': ScopeModuleAHomemock;
  }

  export interface IBeanScopeConfig {
    'a-homemock': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-homemock': (typeof locales)[TypeLocaleBase];
  }
}
