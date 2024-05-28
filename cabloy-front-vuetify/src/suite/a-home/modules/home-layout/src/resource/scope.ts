import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from '@cabloy/front';
import { config, Errors, locales, constants } from '../config/index.js';
import { components } from './components.js';

@Scope()
export class ScopeModuleHomeLayout extends BeanScopeBase {}

export interface ScopeModuleHomeLayout
  extends TypeModuleResource<
    typeof components,
    typeof config,
    typeof Errors,
    (typeof locales)[TypeLocaleBase],
    typeof constants
  > {}

declare module '@cabloy/front' {
  export interface IBeanScopeRecord {
    'home-layout': ScopeModuleHomeLayout;
  }

  export interface IBeanScopeConfig {
    'home-layout': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'home-layout': (typeof locales)[TypeLocaleBase];
  }
}
