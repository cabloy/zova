import { BeanBase, BeanContainer, BeanSimple, IMonkeySystem } from 'zova';

export class Monkey extends BeanSimple implements IMonkeySystem {
  async appInitialize(_bean: BeanContainer) {}
  async appInitialized(_bean: BeanContainer) {}
  async beanInit(_bean: BeanContainer, _beanInstance: BeanBase) {}
  async beanInited(_bean: BeanContainer, _beanInstance: BeanBase) {}
  beanDispose(_bean: BeanContainer, _beanInstance: BeanBase) {}
  beanDisposed(_bean: BeanContainer, _beanInstance: BeanBase) {}
}
