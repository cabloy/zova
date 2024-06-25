import { App, getCurrentInstance } from 'vue';
import {
  BeanContainerInstances,
  BeanControllerIdentifier,
  BeanControllerPageBase,
  BeanRenderIdentifier,
  BeanStyleIdentifier,
  Cast,
  Local,
  PluginZova,
  ZovaApplication,
} from 'zova';
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
    if (!app.zova) {
      await this.initApp(app);
    } else {
      await this.updateApp(app.zova);
    }
  }

  protected async initApp(app: App) {
    // router
    const router = this.onCreateRouter();
    app.provide('a-router:appRouter', router);
    this.bean.provide('a-router:appRouter', router);
    // install
    await PluginZova.install(app, this.ctx.bean, { modulesMeta, AppMonkey, locales, config });
    // use router
    app.use(router);
  }

  protected async updateApp(app: ZovaApplication) {
    // update
    await PluginZova.update(app, this.ctx);
  }

  protected onCreateRouter() {
    return createRouter();
  }
}
