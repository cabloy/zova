import { BeanBase, BeanContainer, BeanSimple, IMonkeySystem } from 'zova';
import { Router } from './local/router.js';

export class Monkey extends BeanSimple implements IMonkeySystem {
  router: Router;

  async appInitialize(bean: BeanContainer) {
    // router
    this.router = await bean._newBean(Router, false);
  }
  async appInitialized(_bean: BeanContainer) {}
  async appReady(_bean: BeanContainer) {}

  async beanInit(_bean: BeanContainer, _beanInstance: BeanBase) {}
  async beanInited(_bean: BeanContainer, _beanInstance: BeanBase) {}
  beanDispose(_bean: BeanContainer, _beanInstance: BeanBase) {}
  beanDisposed(_bean: BeanContainer, _beanInstance: BeanBase) {}
}
