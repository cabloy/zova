import { BeanBase, BeanContainer, BeanSimple, IMonkeySystem } from 'zova';
import { LocalPinia } from './bean/local.pinia.js';

export class Monkey extends BeanSimple implements IMonkeySystem {
  pinia: LocalPinia;

  async appInitialize() {
    // pinia
    this.pinia = await this.bean._newBean(LocalPinia, false);
  }
  async appInitialized() {}
  async appReady() {}

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
