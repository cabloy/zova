import { getCurrentInstance } from 'vue';
import { BeanControllerPageBase, Local, PluginZova } from 'zova';
import createRouter from '../router.js';
import { locales } from '../../src/front/config/locales.js';
import { AppMonkey } from '../../src/front/config/monkey.js';
import config from '../config.js';
import { modulesMeta } from '../modules-meta.js';

@Local()
export class ControllerPageApp extends BeanControllerPageBase {
  protected async __init__() {
    // app
    const instance = getCurrentInstance();
    const app = instance!.appContext.app!;
    // router
    const router = this.onCreateRouter();
    app.provide('a-router:appRouter', router);
    this.bean.provide('a-router:appRouter', router);
    // install
    await PluginZova.install(app, this.ctx.bean, { modulesMeta, AppMonkey, locales, config });
    // use router
    app.use(router);
  }

  protected onCreateRouter() {
    return createRouter();
  }
}
