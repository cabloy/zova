import { Local } from 'zova';
import { ScopeModule } from '../resource/this.js';
import { BeanRouterLike, BeanRouterBase } from 'zova-module-a-router';

@Local()
export class Router extends BeanRouterBase<ScopeModule> {
  protected onRouterGuards(router: BeanRouterLike) {
    router.beforeEach(async _to => {
      //console.log(to);
    });
  }
}
