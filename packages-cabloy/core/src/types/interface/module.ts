import { IModuleInfo } from '@cabloy/module-info';
import { IModuleRoute } from '../../bean/resource/route/type.js';
import { CabloyApplication } from '../../core/app/application.js';
import { IModuleMain, IModuleMainContext, IMonkeyModule } from './monkey.js';
import { Component } from 'vue';
import { StateLock } from '../../utils/stateLock.js';

export type TypeModuleResourceErrors = Record<number, string>;
export type TypeModuleResourceLocales = Record<string, object>;

// todo:
export interface IModuleResource {
  Main: new () => IModuleMain & IModuleMainContext;
  Monkey: new () => IMonkeyModule;
  locales: TypeModuleResourceLocales;
  Errors: TypeModuleResourceErrors;
  config: (app: CabloyApplication) => object | Promise<object>;
  constants: unknown;
  routes: IModuleRoute[];
  components: Record<string, Component>;
}

declare module '@cabloy/module-info' {
  export interface IModule {
    /** @internal */
    __installed__: StateLock;
    resource: IModuleResource; // IModuleResource | Promise<IModuleResource>;
    info: IModuleInfo;
    mainInstance: IModuleMain & IModuleMainContext;
    monkeyInstance: IMonkeyModule;
  }
}
