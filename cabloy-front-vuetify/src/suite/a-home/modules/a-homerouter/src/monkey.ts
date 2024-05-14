import { BeanBase, BeanContainerLike, BeanSimple, IMonkeySystem } from '@cabloy/front';
import { LocalRouter } from './local/local.router.js';

export class Monkey extends BeanSimple implements IMonkeySystem {
  router: LocalRouter;

  async appInitialize() {
    // router
    this.router = await this.bean._newBean(LocalRouter, false);
  }
  async appInitialized() {}

  async beanInit(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
  async beanInited(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
  beanDispose(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
  beanDisposed(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
}
