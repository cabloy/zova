import { BeanBase, BeanContainer, BeanSimple, IMonkeySystem } from 'zova';
import { Pinia } from './local/pinia.js';

export class Monkey extends BeanSimple implements IMonkeySystem {
  pinia: Pinia;

  async appInitialize(bean: BeanContainer) {
    // pinia
    this.pinia = await bean._newBean(Pinia, false);
  }
  async appInitialized(_bean: BeanContainer) {}

  async beanInit(bean: BeanContainer, beanInstance: BeanBase) {
    const self = this;
    bean.defineProperty(beanInstance, '$pinia', {
      enumerable: false,
      configurable: true,
      get() {
        return self.pinia.pinia;
      },
    });
  }
  async beanInited(_bean: BeanContainer, _beanInstance: BeanBase) {}
  beanDispose(_bean: BeanContainer, _beanInstance: BeanBase) {}
  beanDisposed(_bean: BeanContainer, _beanInstance: BeanBase) {}
}
