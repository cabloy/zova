import {
  BeanBase,
  BeanContainer,
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
  async appInitialize(_bean: BeanContainer) {}
  async appInitialized(_bean: BeanContainer) {}
  async beanInit(_bean: BeanContainer, _beanInstance: BeanBase) {}
  async beanInited(_bean: BeanContainer, _beanInstance: BeanBase) {}
  beanDispose(_bean: BeanContainer, _beanInstance: BeanBase) {}
  beanDisposed(_bean: BeanContainer, _beanInstance: BeanBase) {}
  controllerDataPrepare(_controllerData: IControllerData) {}
  controllerDataInit(_controllerData: IControllerData, _controller: BeanBase) {}
}
