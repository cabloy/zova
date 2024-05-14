import { Local } from '@cabloy/front';
import { ScopeModule } from '../resource/this.js';
import { StoreRouterLike, VirtualRouter } from 'cabloy-module-front-a-router';

@Local()
export class LocalRouter extends VirtualRouter<ScopeModule> {
  protected onRouterGuards(router: StoreRouterLike) {
    router.beforeEach(async to => {
      console.log(to);
    });
  }
}
