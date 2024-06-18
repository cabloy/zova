import { BeanBase, BeanContainerLike, BeanSimple, IMonkeySystem } from 'zova';
import { Storage } from './local/storage.js';
import { useQueryClient } from '@tanstack/vue-query';
import { markRaw, shallowReactive } from 'vue';

export class Monkey extends BeanSimple implements IMonkeySystem {
  storage: Storage;

  async appInitialize() {
    // storage
    this.storage = await this.bean._newBean(Storage, false);
  }
  async appInitialized() {}

  async beanInit(bean: BeanContainerLike, beanInstance: BeanBase) {
    bean.defineProperty(beanInstance, '$queryClient', {
      enumerable: false,
      configurable: true,
      get() {
        return markRaw(useQueryClient());
      },
    });
  }
  async beanInited(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
  beanDispose(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
  beanDisposed(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
}
