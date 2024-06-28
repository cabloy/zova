import { Local, Use } from 'zova';
import { ScopeModule } from '../resource/this.js';
import { BeanRouter, BeanRouterBase } from 'zova-module-a-router';
import type { ModelUser } from 'zova-module-home-user';

@Local()
export class Router extends BeanRouterBase<ScopeModule> {
  @Use('home-user.model.user')
  $$modelUser: ModelUser;

  protected onRouterGuards(router: BeanRouter) {
    router.beforeEach(async to => {
      if (to.meta.requiresAuth !== false && !this.$$modelUser.jwt) {
        return '/home/user/login';
      }
    });
  }
}
