import { IModuleInfo } from '@cabloy/module-info';
import { CabloyApplication } from '../../core/app/application.js';
import { IModuleMain, IMonkeyModule, IMonkeySystem } from './monkey.js';
import { StateLock } from '../../utils/stateLock.js';

export type TypeModuleResourceIcons = Record<string, string>;
export type TypeModuleResourceLocales = Record<string, object>;
export type TypeModuleResourceLocaleModules = Record<string, TypeModuleResourceLocales>;
export type TypeModuleResourceErrors = Record<number, string>;
export type TypeModuleResourceErrorModules = Record<string, TypeModuleResourceErrors>;

export interface IModuleResource {
  Main: new () => IModuleMain;
  Monkey: new () => IMonkeyModule & IMonkeySystem;
  locales: TypeModuleResourceLocales;
  Errors: TypeModuleResourceErrors;
  config: (app: CabloyApplication) => object | Promise<object>;
  constants: unknown;
  icons: TypeModuleResourceIcons;
}

declare module '@cabloy/module-info' {
  export interface IModule {
    /** @internal */
    __installed__: StateLock;
    resource: IModuleResource; // IModuleResource | Promise<IModuleResource>;
    info: IModuleInfo;
    mainInstance: IModuleMain;
    monkeyInstance: IMonkeyModule & IMonkeySystem;
  }
}
