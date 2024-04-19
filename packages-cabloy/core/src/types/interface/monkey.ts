import { IModule } from '@cabloy/module-info';
import { CabloyContext } from '../../core/context/context.js';

export type TypeMonkeyName = keyof IMonkeyModule;

export interface IMonkeyApp {
  moduleLoading(module: IModule): Promise<void>;
  moduleLoaded(module: IModule): Promise<void>;
  configLoaded(module: IModule, config: any): Promise<void>;
}

export interface IModuleMain {
  moduleLoading(module: IModule): Promise<void>;
  moduleLoaded(module: IModule): Promise<void>;
  configLoaded(module: IModule, config: any): Promise<void>;
}

export interface IModuleMainContext {
  createContext(context: CabloyContext): void;
}

export interface IMonkeyModule {
  appInitialize(moduleSelf: IModule): Promise<void>;
  appInitialized(moduleSelf: IModule): Promise<void>;
  moduleLoading(moduleSelf: IModule, module: IModule): Promise<void>;
  moduleLoaded(moduleSelf: IModule, module: IModule): Promise<void>;
  configLoaded(moduleSelf: IModule, module: IModule, config: any): Promise<void>;
}
