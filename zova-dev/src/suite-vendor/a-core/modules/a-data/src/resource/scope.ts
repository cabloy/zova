import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'zova';
import { config, Errors, locales, constants } from '../config/index.js';
import { components } from './components.js';
import { services } from '../api/service/index.js';

@Scope()
export class ScopeModuleAData extends BeanScopeBase {}

export interface ScopeModuleAData
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
    'a-model': ScopeModuleAData;
  }

  export interface IBeanScopeConfig {
    'a-model': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-model': (typeof locales)[TypeLocaleBase];
  }
}
