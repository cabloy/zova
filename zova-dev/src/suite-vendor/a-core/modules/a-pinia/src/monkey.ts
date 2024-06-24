import { BeanBase, BeanContainerLike, BeanSimple, IMonkeySystem } from 'zova';
import { Pinia } from './local/pinia.js';

export class Monkey extends BeanSimple implements IMonkeySystem {
  pinia: Pinia;

  async appInitialize(bean: BeanContainerLike) {
    // pinia
    this.pinia = await bean._newBean(Pinia, false);
  }
  async appInitialized(_bean: BeanContainerLike) {}

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
