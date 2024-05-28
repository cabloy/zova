import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from '@cabloy/front';
import { config, Errors, locales, constants } from '../config/index.js';
import { components } from './components.js';

@Scope()
export class ScopeModuleHomeIcon extends BeanScopeBase {}

export interface ScopeModuleHomeIcon
  extends TypeModuleResource<
    typeof components,
    typeof config,
    typeof Errors,
    (typeof locales)[TypeLocaleBase],
    typeof constants
  > {}

declare module '@cabloy/front' {
  export interface IBeanScopeRecord {
    'home-icon': ScopeModuleHomeIcon;
  }

  export interface IBeanScopeConfig {
    'home-icon': ReturnType<typeof config>;
  }
}
