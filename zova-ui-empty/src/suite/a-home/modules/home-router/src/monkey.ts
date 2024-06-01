import { BeanBase, BeanContainerLike, BeanSimple, IMonkeySystem } from 'zova';
import { Router } from './local/router.js';

export class Monkey extends BeanSimple implements IMonkeySystem {
  router: Router;

  async appInitialize() {
    // router
    this.router = await this.bean._newBean(Router, false);
  }
  async appInitialized() {}

  async beanInit(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
  async beanInited(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
  beanDispose(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
  beanDisposed(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
}
