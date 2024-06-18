import { Local, Use } from 'zova';
import { ScopeModule } from '../resource/this.js';
import { StoreRouterLike, BeanRouterBase } from 'zova-module-a-router';
import { StoreUserInfo } from 'zova-module-home-user';

@Local()
export class Router extends BeanRouterBase<ScopeModule> {
  @Use('home-user.store.userInfo')
  $$userInfo: StoreUserInfo;

  protected onRouterGuards(router: StoreRouterLike) {
    router.beforeEach(async to => {
      if (to.meta.requiresAuth !== false && !this.$$userInfo.jwt) {
        return '/home/user/login';
      }
    });
  }
}
