import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'zova';
import { config, Errors, locales, constants } from '../config/index.js';
import { components } from './components.js';

@Scope()
export class ScopeModuleHomeMock extends BeanScopeBase {}

export interface ScopeModuleHomeMock
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
    'home-mock': ScopeModuleHomeMock;
  }

  export interface IBeanScopeConfig {
    'home-mock': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'home-mock': (typeof locales)[TypeLocaleBase];
  }
}
