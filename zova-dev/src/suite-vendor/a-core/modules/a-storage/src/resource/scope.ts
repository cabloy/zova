import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'zova';
import { config, Errors, locales, constants } from '../config/index.js';
import { components } from './components.js';

@Scope()
export class ScopeModuleAStorage extends BeanScopeBase {}

export interface ScopeModuleAStorage
  extends TypeModuleResource<
    typeof components,
    typeof config,
    typeof Errors,
    (typeof locales)[TypeLocaleBase],
    typeof constants
  > {}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-storage': ScopeModuleAStorage;
  }

  export interface IBeanScopeConfig {
    'a-storage': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-storage': (typeof locales)[TypeLocaleBase];
  }
}
