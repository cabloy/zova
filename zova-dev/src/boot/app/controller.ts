import { BeanControllerPageBase, Cast, Local, SymbolBeanRoot } from 'zova';
import createRouter from '../router.js';

@Local()
export class ControllerPageApp extends BeanControllerPageBase {
  protected async __init__() {
    // beanRoot
    this.bean.provide(SymbolBeanRoot, this.ctx.bean);
    // router
    const router = createRouter();
    this.bean.provide('a-router:appRouter', router);
    // app
    await Cast(this.app).initialized({ bean: this.bean });
    // use router
    this.app.vue.use(router);
  }
}
