import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from '@cabloy/front';
import { config, Errors, locales, constants } from '../config/index.js';
import { components } from './components.js';

@Scope()
export class ScopeModuleHomeApi extends BeanScopeBase {}

export interface ScopeModuleHomeApi
  extends TypeModuleResource<
    typeof components,
    typeof config,
    typeof Errors,
    (typeof locales)[TypeLocaleBase],
    typeof constants
  > {}

import '@cabloy/front';
declare module '@cabloy/front' {
  export interface IBeanScopeRecord {
    'home-api': ScopeModuleHomeApi;
  }

  export interface IBeanScopeConfig {
    'home-api': ReturnType<typeof config>;
  }
}
