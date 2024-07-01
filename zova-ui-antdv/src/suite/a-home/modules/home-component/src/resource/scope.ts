import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'zova';
import { config, Errors, locales, constants } from '../config/index.js';
import { components } from './components.js';
import { services } from '../api/service/index.js';

@Scope()
export class ScopeModuleHomeComponent extends BeanScopeBase {}

export interface ScopeModuleHomeComponent
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
    'home-component': ScopeModuleHomeComponent;
  }

  export interface IBeanScopeConfig {
    'home-component': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'home-component': (typeof locales)[TypeLocaleBase];
  }
}
