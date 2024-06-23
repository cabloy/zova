import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'zova';
import { config, Errors, locales, constants } from '../config/index.js';
import { components } from './components.js';
import { services } from '../api/service/index.js';

@Scope()
export class ScopeModuleHomeStyle extends BeanScopeBase {}

export interface ScopeModuleHomeStyle
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
    'home-style': ScopeModuleHomeStyle;
  }

  export interface IBeanScopeConfig {
    'home-style': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'home-style': (typeof locales)[TypeLocaleBase];
  }
}
