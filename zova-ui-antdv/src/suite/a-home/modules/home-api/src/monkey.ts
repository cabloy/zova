import { BeanBase, BeanContainer, BeanSimple, IMonkeySystem } from 'zova';
import axios from 'axios';
import { BeanApi } from './bean/bean.api.js';

export class Monkey extends BeanSimple implements IMonkeySystem {
  async appInitialize() {
    this.app.meta.$axios = axios;
    this.app.meta.$api = (await this.bean._getBean('home-api.bean.api', false)) as BeanApi;
  }
  async appInitialized() {}
  async appReady() {}
  async beanInit(bean: BeanContainer, beanInstance: BeanBase) {
    const self = this;
    bean.defineProperty(beanInstance, '$api', {
      enumerable: false,
      configurable: true,
      get() {
        return self.app.meta.$api;
      },
    });
  }
  async beanInited(_bean: BeanContainer, _beanInstance: BeanBase) {}
  beanDispose(_bean: BeanContainer, _beanInstance: BeanBase) {}
  beanDisposed(_bean: BeanContainer, _beanInstance: BeanBase) {}
}
