import { IModuleInfo } from '@cabloy/module-info';
import { CabloyApplication } from '../../core/app/application.js';
import { IModuleMain, IMonkeyModule, IMonkeyMother, IMonkeySystem } from './monkey.js';
import { StateLock } from '../../utils/stateLock.js';
import { Component } from 'vue';

export type TypeModuleResourceIcons = Record<string, string>;
export type TypeModuleResourceLocales = Record<string, object>;
export type TypeModuleResourceLocaleModules = Record<string, TypeModuleResourceLocales>;
export type TypeModuleResourceErrors = Record<number, string>;
export type TypeModuleResourceErrorModules = Record<string, TypeModuleResourceErrors>;
export type TypeModuleResourceComponents = Record<string, Component>;

export interface IModuleResource {
  Main: new () => IModuleMain;
  Monkey: new () => IMonkeyModule & IMonkeySystem & IMonkeyMother;
  locales: TypeModuleResourceLocales;
  Errors: TypeModuleResourceErrors;
  config: (app: CabloyApplication) => object | Promise<object>;
  constants: unknown;
  icons: TypeModuleResourceIcons;
  components: TypeModuleResourceComponents;
}

declare module '@cabloy/module-info' {
  export interface IModule {
    /** @internal */
    __installed__: StateLock;
    resource: IModuleResource; // IModuleResource | Promise<IModuleResource>;
    info: IModuleInfo;
    mainInstance: IModuleMain;
    monkeyInstance: IMonkeyModule & IMonkeySystem & IMonkeyMother;
  }
}
