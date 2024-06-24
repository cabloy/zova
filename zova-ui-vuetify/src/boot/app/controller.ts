/* eslint-disable */

import { BeanControllerPageBase, Local } from 'zova';
import createRouter from '../router.js';
import { getCurrentInstance } from 'vue';
import { PluginZova } from 'zova';
import { modulesMeta } from '../../../.zova/modules-meta.js';
import { AppMonkey } from '../../front/config/monkey.js';
import { locales } from '../../front/config/locales.js';
import config from '../../../.zova/config.js';

@Local()
export class ControllerPageApp extends BeanControllerPageBase {
  protected async __init__() {
    // app
    const instance = getCurrentInstance();
    const app = instance!.appContext.app!;
    // router
    const router = createRouter();
    app.provide('a-router:appRouter', router);
    this.bean.provide('a-router:appRouter', router);
    // install
    await PluginZova.install(app, this.ctx.bean, { modulesMeta, AppMonkey, locales, config });
    // use router
    app.use(router);
  }
}
