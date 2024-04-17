import { IModule } from '@cabloy/module-info';
import { CabloyContext } from '../../core/context/context.js';

export type TypeMonkeyName = 'moduleLoading' | 'moduleLoaded' | 'configLoaded';
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
  moduleLoading(moduleSelf: IModule, module: IModule): Promise<void>;
  moduleLoaded(moduleSelf: IModule, module: IModule): Promise<void>;
  configLoaded(moduleSelf: IModule, module: IModule, config: any): Promise<void>;
}
