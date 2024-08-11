import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'zova';
import { config, Errors, locales, constants } from '../config/index.js';
import { components } from './components.js';
import { services } from '../api/service/index.js';

@Scope()
export class ScopeModuleARouter extends BeanScopeBase {}

export interface ScopeModuleARouter
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
    'a-router': ScopeModuleARouter;
  }

  export interface IBeanScopeConfig {
    'a-router': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-router': (typeof locales)[TypeLocaleBase];
  }
}
