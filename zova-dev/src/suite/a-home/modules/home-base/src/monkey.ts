import { BeanBase, BeanContainer, BeanSimple, IMonkeyAppInitialize, IMonkeyBeanInit } from 'zova';
import axios from 'axios';
import { BeanApi } from './bean/bean.api.js';
import { LocalRouter } from './bean/local.router.js';
import { LocalSSR } from './bean/local.ssr.js';

export class Monkey extends BeanSimple implements IMonkeyAppInitialize, IMonkeyBeanInit {
  localRouter: LocalRouter;
  localSSR: LocalSSR;

  async appInitialize() {
    // api
    this.app.meta.$axios = axios;
    this.app.meta.$api = (await this.bean._getBean('home-base.bean.api', false)) as BeanApi;
    // router
    this.localRouter = await this.bean._newBean(LocalRouter, false);
    // ssr
    this.localSSR = await this.bean._newBean(LocalSSR, false);
    await this.localSSR.initialize();
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
