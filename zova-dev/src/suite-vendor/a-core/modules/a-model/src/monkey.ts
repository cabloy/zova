import { BeanBase, BeanContainer, BeanSimple, IMonkeySystem } from 'zova';
import { LocalStorage } from './bean/local.storage.js';
import { useQueryClient } from '@tanstack/vue-query';
import { markRaw } from 'vue';

export class Monkey extends BeanSimple implements IMonkeySystem {
  storage: LocalStorage;

  async appInitialize() {
    // storage
    this.storage = await this.bean._newBean(LocalStorage, false);
  }
  async appInitialized() {}
  async appReady() {}

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
