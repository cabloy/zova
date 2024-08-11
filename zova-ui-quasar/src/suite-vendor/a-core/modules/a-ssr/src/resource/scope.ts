import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'zova';
import { config, Errors, locales, constants } from '../config/index.js';
import { components } from './components.js';
import { services } from '../api/service/index.js';

@Scope()
export class ScopeModuleASsr extends BeanScopeBase {}

export interface ScopeModuleASsr
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
    'a-ssr': ScopeModuleASsr;
  }

  export interface IBeanScopeConfig {
    'a-ssr': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-ssr': (typeof locales)[TypeLocaleBase];
  }
}
