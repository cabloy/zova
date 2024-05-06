import { BeanBase, BeanContainerLike, BeanSimple, IModule, IMonkeyApp, IMonkeySystem } from '@cabloy/front';

export class AppMonkey extends BeanSimple implements IMonkeyApp, IMonkeySystem {
  async moduleLoading(_module: IModule) {}
  async moduleLoaded(_module: IModule) {}
  async configLoaded(_module: IModule, _config) {}
  async appInitialize() {}
  async appInitialized() {}
  async beanInit(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
  async beanInited(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
  beanDispose(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
  beanDisposed(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
}
