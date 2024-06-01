import { Local } from '@cabloy/front';
import { ScopeModule } from '../resource/this.js';
import { StoreRouterLike, BeanRouterBase } from 'cabloy-module-front-a-router';

@Local()
export class Router extends BeanRouterBase<ScopeModule> {
  protected onRouterGuards(router: StoreRouterLike) {
    router.beforeEach(async _to => {
      //console.log(to);
    });
  }
}
