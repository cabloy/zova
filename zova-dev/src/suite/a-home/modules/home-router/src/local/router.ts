import { Local, Use } from 'zova';
import { ScopeModule } from '../resource/this.js';
import { BeanRouter, BeanRouterBase } from 'zova-module-a-router';
import type { ModelUserInfo } from 'zova-module-home-user';

@Local()
export class Router extends BeanRouterBase<ScopeModule> {
  @Use('home-user.model.userInfo')
  $$modelUserInfo: ModelUserInfo;

  protected onRouterGuards(router: BeanRouter) {
    router.beforeEach(async to => {
      if (to.meta.requiresAuth !== false && !this.$$modelUserInfo.jwt) {
        return '/home/user/login';
      }
    });
  }
}
