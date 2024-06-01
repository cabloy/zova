import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'zova';
import { config, Errors, locales, constants } from '../config/index.js';
import { components } from './components.js';

@Scope()
export class ScopeModuleAAntdv extends BeanScopeBase {}

export interface ScopeModuleAAntdv
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
    'a-antdv': ScopeModuleAAntdv;
  }

  export interface IBeanScopeConfig {
    'a-antdv': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-antdv': (typeof locales)[TypeLocaleBase];
  }
}
