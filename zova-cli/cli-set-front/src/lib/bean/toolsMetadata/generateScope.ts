export interface GenerateScopeOptions {
  components: string;
  config: string;
  errors: string;
  locales: string;
  constants: string;
  services: string;
}
export async function generateScope(moduleName: string, relativeNameCapitalize: string, options: GenerateScopeOptions) {
  // combine
  const content = `/** scope: begin */
import { BeanScopeBase, Scope, ${options.locales ? 'TypeLocaleBase,' : ''} TypeModuleResource } from 'zova';

@Scope()
export class ScopeModule${relativeNameCapitalize} extends BeanScopeBase {}

export interface ScopeModule${relativeNameCapitalize}
  extends TypeModuleResource<
    ${options.components ? 'typeof components' : 'any'},
    ${options.config ? 'typeof config' : 'any'},
    ${options.errors ? 'typeof Errors' : 'any'},
    ${options.locales ? '(typeof locales)[TypeLocaleBase]' : 'any'},
    ${options.constants ? 'typeof constants' : 'any'},
    ${options.services ? 'typeof services' : 'any'},
  > {}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    '${moduleName}': ScopeModule${relativeNameCapitalize};
  }
  
  ${
    options.config
      ? `export interface IBeanScopeConfig {
    '${moduleName}': ReturnType<typeof config>;
  }`
      : ''
  }

  ${
    options.locales
      ? `export interface IBeanScopeLocale {
    '${moduleName}': (typeof locales)[TypeLocaleBase];
  }`
      : ''
  }
}
/** scope: end */
`;
  return content;
}
