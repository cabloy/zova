import { IModule } from '@cabloy/module-info';
import { BeanBase } from '../../bean/beanBase.js';

export type TypeMonkeyName = keyof IMonkeyModule | keyof IMonkeySystem;

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

export interface IMonkeyModule {
  moduleLoading(module: IModule): Promise<void>;
  moduleLoaded(module: IModule): Promise<void>;
  configLoaded(module: IModule, config: any): Promise<void>;
}

export interface IMonkeySystem {
  appInitialize(): Promise<void>;
  appInitialized(): Promise<void>;
  beanCreated(beanInstance: BeanBase): void;
  beanInited(beanInstance: BeanBase): void;
  beanDispose(beanInstance: BeanBase): void;
  beanDisposed(beanInstance: BeanBase): void;
}
