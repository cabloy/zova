import { BeanBase, BeanContainerLike, BeanSimple, IMonkeySystem } from 'zova';
import axios from 'axios';
import { StoreApiLike } from './bean/store.api.js';

export class Monkey extends BeanSimple implements IMonkeySystem {
  async appInitialize() {
    this.app.meta.$axios = axios;
    this.app.meta.$api = (await this.app.bean._getBean('home-api.store.api', false)) as StoreApiLike;
  }
  async appInitialized() {}
  async beanInit(bean: BeanContainerLike, beanInstance: BeanBase) {
    const self = this;
    bean.defineProperty(beanInstance, '$api', {
      enumerable: false,
      configurable: true,
      get() {
        return self.app.meta.$api;
      },
    });
  }
  async beanInited(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
  beanDispose(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
  beanDisposed(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
}
