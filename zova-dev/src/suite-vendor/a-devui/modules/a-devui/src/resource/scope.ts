import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'zova';
import { config, Errors, locales, constants } from '../config/index.js';
import { components } from './components.js';
import { services } from '../api/service/index.js';

@Scope()
export class ScopeModuleADevui extends BeanScopeBase {}

export interface ScopeModuleADevui
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
    'a-devui': ScopeModuleADevui;
  }

  export interface IBeanScopeConfig {
    'a-devui': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-devui': (typeof locales)[TypeLocaleBase];
  }
}
