import { BeanBase, BeanContainer, BeanSimple, IMonkeyAppInitialize, IMonkeyBeanInit } from 'zova';
import { LocalStorage } from './bean/local.storage.js';
import { useQueryClient } from '@tanstack/vue-query';
import { markRaw } from 'vue';

export class Monkey extends BeanSimple implements IMonkeyAppInitialize, IMonkeyBeanInit {
  storage: LocalStorage;

  async appInitialize() {
    // storage
    this.storage = await this.bean._newBean(LocalStorage, false);
  }

  async beanInit(bean: BeanContainer, beanInstance: BeanBase) {
    bean.defineProperty(beanInstance, '$queryClient', {
      enumerable: false,
      configurable: true,
      get() {
        return markRaw(useQueryClient());
      },
    });
  }
}
