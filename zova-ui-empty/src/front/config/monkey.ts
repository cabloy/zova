import {
  BeanBase,
  BeanContainerLike,
  BeanSimple,
  IModule,
  IMonkeyApp,
  IMonkeyController,
  IMonkeySystem,
  IControllerData,
} from 'zova';

export class AppMonkey extends BeanSimple implements IMonkeyApp, IMonkeySystem, IMonkeyController {
  async moduleLoading(_module: IModule) {}
  async moduleLoaded(_module: IModule) {}
  async configLoaded(_module: IModule, _config) {}
  async appInitialize() {}
  async appInitialized() {}
  async beanInit(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
  async beanInited(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
  beanDispose(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
  beanDisposed(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
  controllerDataPrepare(_controllerData: IControllerData) {}
  controllerDataInit(_controllerData: IControllerData, _controller: BeanBase) {}
}
