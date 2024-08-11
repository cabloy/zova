import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'zova';
import { config, Errors, locales, constants } from '../config/index.js';
import { components } from './components.js';
import { services } from '../api/service/index.js';

@Scope()
export class ScopeModuleAStyle extends BeanScopeBase {}

export interface ScopeModuleAStyle
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
    'a-style': ScopeModuleAStyle;
  }

  export interface IBeanScopeConfig {
    'a-style': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-style': (typeof locales)[TypeLocaleBase];
  }
}
