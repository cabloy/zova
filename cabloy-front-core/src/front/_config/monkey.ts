import {
  BeanBase,
  BeanContainerLike,
  BeanMotherBase,
  BeanSimple,
  IModule,
  IMonkeyApp,
  IMonkeyMother,
  IMonkeySystem,
  IMotherData,
} from '@cabloy/front';

export class AppMonkey extends BeanSimple implements IMonkeyApp, IMonkeySystem, IMonkeyMother {
  async moduleLoading(_module: IModule) {}
  async moduleLoaded(_module: IModule) {}
  async configLoaded(_module: IModule, _config) {}
  async appInitialize() {}
  async appInitialized() {}
  async beanInit(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
  async beanInited(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
  beanDispose(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
  beanDisposed(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
  motherDataPrepare(_motherData: IMotherData) {}
  motherDataInit(_motherData: IMotherData, _mother: BeanMotherBase) {}
}
