import { Local } from 'zova';
import { ScopeModule } from '../resource/this.js';
import { BeanRouter, BeanRouterBase } from 'zova-module-a-router';

@Local()
export class LocalRouter extends BeanRouterBase<ScopeModule> {
  protected onRouterGuards(router: BeanRouter) {
    router.beforeEach(async _to => {
      //console.log(to);
    });
  }
}
