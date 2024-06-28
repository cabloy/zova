import { BeanBase, BeanContainer, BeanSimple, IMonkeySystem } from 'zova';
import { Storage } from './local/storage.js';
import { useQueryClient } from '@tanstack/vue-query';
import { markRaw } from 'vue';

export class Monkey extends BeanSimple implements IMonkeySystem {
  storage: Storage;

  async appInitialize(bean: BeanContainer) {
    // storage
    this.storage = await bean._newBean(Storage, false);
  }
  async appInitialized(_bean: BeanContainer) {}

  async beanInit(bean: BeanContainer, beanInstance: BeanBase) {
    bean.defineProperty(beanInstance, '$queryClient', {
      enumerable: false,
      configurable: true,
      get() {
        return markRaw(useQueryClient());
      },
    });
  }
  async beanInited(_bean: BeanContainer, _beanInstance: BeanBase) {}
  beanDispose(_bean: BeanContainer, _beanInstance: BeanBase) {}
  beanDisposed(_bean: BeanContainer, _beanInstance: BeanBase) {}
}
