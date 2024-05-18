import { Local } from '@cabloy/front';
import { ScopeModule } from '../resource/this.js';
import { StoreRouterLike, VirtualRouter } from 'cabloy-module-front-a-router';

@Local()
export class Router extends VirtualRouter<ScopeModule> {
  protected onRouterGuards(router: StoreRouterLike) {
    router.beforeEach(async _to => {
      //console.log(to);
    });
  }
}
