import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from '@cabloy/front';
import { config, Errors, locales, constants } from '../config/index.js';
import { components } from './components.js';

@Scope()
export class ScopeModuleAQuasar extends BeanScopeBase {}

export interface ScopeModuleAQuasar
  extends TypeModuleResource<
    typeof components,
    typeof config,
    typeof Errors,
    (typeof locales)[TypeLocaleBase],
    typeof constants
  > {}

declare module '@cabloy/front' {
  export interface IBeanScopeRecord {
    'a-quasar': ScopeModuleAQuasar;
  }

  export interface IBeanScopeConfig {
    'a-quasar': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-quasar': (typeof locales)[TypeLocaleBase];
  }
}
