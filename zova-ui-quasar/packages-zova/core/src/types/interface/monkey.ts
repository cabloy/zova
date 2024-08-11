import { IModule } from '@cabloy/module-info';
import { BeanBase } from '../../bean/beanBase.js';
import { BeanContainer } from '../../bean/beanContainer.js';
import { IControllerData } from '../../bean/type.js';

export type TypeMonkeyName = keyof IMonkeyModule | keyof IMonkeySystem | keyof IMonkeyController;

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
  appInitialize(bean: BeanContainer): Promise<void>;
  appInitialized(bean: BeanContainer): Promise<void>;
  appReady(bean: BeanContainer): Promise<void>;
  beanInit(bean: BeanContainer, beanInstance: BeanBase): Promise<void>;
  beanInited(bean: BeanContainer, beanInstance: BeanBase): Promise<void>;
  beanDispose(bean: BeanContainer, beanInstance: BeanBase): void;
  beanDisposed(bean: BeanContainer, beanInstance: BeanBase): void;
}

export interface IMonkeyController {
  controllerDataPrepare(controllerData: IControllerData);
  controllerDataInit(controllerData: IControllerData, controller: BeanBase);
}
