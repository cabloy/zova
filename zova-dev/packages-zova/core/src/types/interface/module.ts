import { IModuleInfo } from '@cabloy/module-info';
import { ZovaApplication } from '../../core/app/application.js';
import { IModuleMain, IMonkeyModule, IMonkeyController, IMonkeySystem } from './monkey.js';
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
  Monkey: new () => IMonkeyModule & IMonkeySystem & IMonkeyController;
  locales: TypeModuleResourceLocales;
  Errors: TypeModuleResourceErrors;
  config: (app: ZovaApplication) => object | Promise<object>;
  constants: unknown;
  icons: TypeModuleResourceIcons;
  components: TypeModuleResourceComponents;
}

export const SymbolInstalled = Symbol('SymbolInstalled');

declare module '@cabloy/module-info' {
  export interface IModule {
    /** @internal */
    [SymbolInstalled]: StateLock;
    resource: IModuleResource; // IModuleResource | Promise<IModuleResource>;
    info: IModuleInfo;
    mainInstance: IModuleMain;
    monkeyInstance: IMonkeyModule & IMonkeySystem & IMonkeyController;
  }
}
