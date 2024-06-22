import { BeanControllerPageBase, Cast, Local } from 'zova';
import createRouter from '../router.js';

@Local()
export class ControllerPageApp extends BeanControllerPageBase {
  protected async __init__() {
    // router
    const router = createRouter();
    this.app.vue.provide('a-router:appRouter', router);
    // app
    Cast(this.app).initialized({ bean: this.bean });
    // use router
    this.app.vue.use(router);
  }
}
