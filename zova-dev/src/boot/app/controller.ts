/* eslint-disable */
// @ts-ignore: ssss

import { BeanControllerPageBase, Cast, Local, SymbolBeanRoot } from 'zova';
import createRouter from '../router.js';
import { getCurrentInstance } from 'vue';
import { PluginZova } from 'zova';
// @ts-ignore: ssss
import { modulesMeta } from '../../../.zova/modules-meta.js';
import { AppMonkey } from '../../front/config/monkey.js';
import { locales } from '../../front/config/locales.js';
// @ts-ignore: ssss
import config from '../../../.zova/config.js';

@Local()
export class ControllerPageApp extends BeanControllerPageBase {
  protected async __init__() {
    // beanRoot
    this.bean.provide(SymbolBeanRoot, this.ctx.bean);
    // router
    const router = createRouter();
    this.bean.provide('a-router:appRouter', router);
    // app
    const instance = getCurrentInstance();
    const app = instance?.appContext.app;
    const app2 = await PluginZova.install(app!, { modulesMeta, AppMonkey, locales, config });
    await Cast(app2).initialized({ bean: this.bean });
    // use router
    this.app.vue.use(router);
  }
}
