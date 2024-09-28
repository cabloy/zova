import { Local, Use } from 'zova';
import { ScopeModule } from '../.metadata/this.js';
import { BeanRouter, BeanRouterBase } from 'zova-module-a-router';
import { ModelAuth } from 'zova-module-home-user';

@Local()
export class LocalRouter extends BeanRouterBase<ScopeModule> {
  @Use()
  $$modelAuth: ModelAuth;

  protected onRouterGuards(router: BeanRouter) {
    router.beforeEach(async to => {
      if (to.meta.requiresAuth !== false && !this.$$modelAuth.isAuthenticated) {
        return '/login';
      }
    });
  }
}
