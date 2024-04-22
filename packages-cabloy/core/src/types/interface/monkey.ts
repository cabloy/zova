import { IModule } from '@cabloy/module-info';
import { CabloyContext } from '../../core/context/context.js';
import { BeanBase } from '../../bean/beanBase.js';

export type TypeMonkeyName = keyof IMonkeyModule;

export interface IMonkeyApp {
  moduleLoading(module: IModule): Promise<void>;
  moduleLoaded(module: IModule): Promise<void>;
  configLoaded(module: IModule, config: any): Promise<void>;
}

export interface IModuleMain {
  moduleLoading(): Promise<void>;
  moduleLoaded(): Promise<void>;
  configLoaded(config: any): Promise<void>;
}

export interface IModuleMainContext {
  createContext(context: CabloyContext): void;
}

export interface IMonkeyModule {
  appInitialize(): Promise<void>;
  appInitialized(): Promise<void>;
  beanCreated(beanInstance: BeanBase): void;
  beanInited(beanInstance: BeanBase): void;
  beanDispose(beanInstance: BeanBase): void;
  beanDisposed(beanInstance: BeanBase): void;
  moduleLoading(module: IModule): Promise<void>;
  moduleLoaded(module: IModule): Promise<void>;
  configLoaded(module: IModule, config: any): Promise<void>;
}
