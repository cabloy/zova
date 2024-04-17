import { Router } from 'vue-router';
import { BeanSimple } from '../../bean/beanSimple.js';
import { ViewRouter, ViewRouterLike } from './router.js';

export class AppView extends BeanSimple {
  router: ViewRouterLike;

  protected __init__() {
    this.router = ViewRouter.create(this.app);
  }

  /** @internal */
  public async initialize(router: Router) {
    await this.router.initialize(router);
  }
}
