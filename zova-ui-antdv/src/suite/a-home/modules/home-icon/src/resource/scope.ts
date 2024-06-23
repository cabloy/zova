import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'zova';
import { config, Errors, locales, constants } from '../config/index.js';
import { components } from './components.js';
import { services } from '../api/service/index.js';

@Scope()
export class ScopeModuleHomeIcon extends BeanScopeBase {}

export interface ScopeModuleHomeIcon
  extends TypeModuleResource<
    typeof components,
    typeof config,
    typeof Errors,
    (typeof locales)[TypeLocaleBase],
    typeof constants,
    typeof services
  > {}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'home-icon': ScopeModuleHomeIcon;
  }

  export interface IBeanScopeConfig {
    'home-icon': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'home-icon': (typeof locales)[TypeLocaleBase];
  }
}
