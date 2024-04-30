import { BeanScopeBase, Scope, TypeModuleResource } from '@cabloy/core';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModule<%=argv.relativeNameCapitalize%> extends BeanScopeBase {}

export interface ScopeModule<%=argv.relativeNameCapitalize%>
  extends TypeModuleResource<
    IModuleLocal,
    IModuleModel,
    typeof config,
    typeof Errors,
    typeof locales,
    typeof constants
  > {}

declare module '@cabloy/core' {
  export interface IBeanScopeRecord {
    '<%=argv.moduleInfo.relativeName%>': ScopeModule<%=argv.relativeNameCapitalize%>;
  }

  export interface IBeanScopeConfig {
    '<%=argv.moduleInfo.relativeName%>': ReturnType<typeof config>;
  }
}
