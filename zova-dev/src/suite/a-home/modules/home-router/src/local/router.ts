import { Local, Use } from 'zova';
import { ScopeModule } from '../resource/this.js';
import { BeanRouter, BeanRouterBase } from 'zova-module-a-router';
import type { DataUserInfo } from 'zova-module-home-user';

@Local()
export class Router extends BeanRouterBase<ScopeModule> {
  @Use('home-user.data.userInfo')
  $$userInfo: DataUserInfo;

  protected onRouterGuards(router: BeanRouter) {
    router.beforeEach(async to => {
      if (to.meta.requiresAuth !== false && !this.$$userInfo.jwt) {
        return '/home/user/login';
      }
    });
  }
}
