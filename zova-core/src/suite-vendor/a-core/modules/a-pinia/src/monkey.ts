import { BeanBase, BeanContainerLike, BeanSimple, IMonkeySystem } from '@cabloy/front';
import { Pinia } from './local/pinia.js';

export class Monkey extends BeanSimple implements IMonkeySystem {
  pinia: Pinia;

  async appInitialize() {
    // pinia
    this.pinia = await this.bean._newBean(Pinia, false);
  }
  async appInitialized() {}

  async beanInit(bean: BeanContainerLike, beanInstance: BeanBase) {
    const self = this;
    bean.defineProperty(beanInstance, '$pinia', {
      enumerable: false,
      configurable: true,
      get() {
        return self.pinia.pinia;
      },
    });
  }
  async beanInited(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
  beanDispose(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
  beanDisposed(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
}
