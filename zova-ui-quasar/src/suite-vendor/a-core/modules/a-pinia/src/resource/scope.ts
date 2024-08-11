import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'zova';
import { config, Errors, locales, constants } from '../config/index.js';
import { components } from './components.js';
import { services } from '../api/service/index.js';

@Scope()
export class ScopeModuleAPinia extends BeanScopeBase {}

export interface ScopeModuleAPinia
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
    'a-pinia': ScopeModuleAPinia;
  }

  export interface IBeanScopeConfig {
    'a-pinia': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-pinia': (typeof locales)[TypeLocaleBase];
  }
}
