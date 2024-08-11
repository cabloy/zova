import { App, getCurrentInstance } from 'vue';
import { BeanControllerPageBase, Local, PluginZova, ZovaApplication } from 'zova';
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
    // install
    await PluginZova.install(app, this.ctx, { modulesMeta, AppMonkey, locales, config });
  }

  protected async updateApp(app: ZovaApplication) {
    // update
    await PluginZova.update(app, this.ctx);
  }
}
