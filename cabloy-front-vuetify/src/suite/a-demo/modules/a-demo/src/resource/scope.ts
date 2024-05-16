import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from '@cabloy/front';
import { config, Errors, locales, constants } from '../config/index.js';
import { components } from './components.js';

@Scope()
export class ScopeModuleADemo extends BeanScopeBase {}

export interface ScopeModuleADemo
  extends TypeModuleResource<
    typeof components,
    typeof config,
    typeof Errors,
    (typeof locales)[TypeLocaleBase],
    typeof constants
  > {}

declare module '@cabloy/front' {
  export interface IBeanScopeRecord {
    'a-demo': ScopeModuleADemo;
  }

  export interface IBeanScopeConfig {
    'a-demo': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-demo': (typeof locales)[TypeLocaleBase];
  }
}
