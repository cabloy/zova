import { BeanBase, BeanContainer, BeanSimple, IMonkeyAppInitialize, IMonkeyBeanInit } from 'zova';
import axios from 'axios';
import { BeanApi } from './bean/bean.api.js';
import { LocalRouter } from './bean/local.router.js';

export class Monkey extends BeanSimple implements IMonkeyAppInitialize, IMonkeyBeanInit {
  localRouter: LocalRouter;

  async appInitialize() {
    // api
    this.app.meta.$axios = axios;
    this.app.meta.$api = (await this.bean._getBean('home-base.bean.api', false)) as BeanApi;
    // router
    this.localRouter = await this.bean._newBean(LocalRouter, false);
  }
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
}
