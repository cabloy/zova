import { Local, Use } from 'zova';
import { ScopeModule } from '../resource/this.js';
import { BeanRouter, BeanRouterBase } from 'zova-module-a-router';
import type { ModelAuth } from 'zova-module-home-user';

@Local()
export class LocalRouter extends BeanRouterBase<ScopeModule> {
  @Use('home-user.model.auth')
  $$modelAuth: ModelAuth;

  protected onRouterGuards(router: BeanRouter) {
    router.beforeEach(async to => {
      if (to.meta.requiresAuth !== false && !this.$$modelAuth.jwt) {
        return '/home/user/login';
      }
    });
  }
}
