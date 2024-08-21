import { Model } from 'zova';
import { BeanModelBase } from 'zova-module-a-model';
import { ScopeModule } from '../resource/this.js';
import { ServiceAuthJWT, ServiceAuthLoginParams, ServiceAuthLoginResult } from '../api/interface/auth.js';
import { ModelUser } from './model.user.js';

@Model()
export class ModelAuth extends BeanModelBase<ScopeModule> {
  jwt?: ServiceAuthJWT;
  token?: string;
  $$modelUser: ModelUser;

  protected async __init__() {
    this.jwt = this.$useQueryLocal({
      queryKey: ['jwt'],
    });
    this.token = this.$useQueryCookie({
      queryKey: ['token'],
    });
  }

  login() {
    return this.$useMutationExisting<ServiceAuthLoginResult, ServiceAuthLoginParams>({
      mutationKey: ['login'],
      mutationFn: async params => {
        return this.scope.service.auth.login(params);
      },
      onSuccess: data => {
        // save
        this._setUser(data);
        // page: home
        this.$router.replace('/');
      },
    });
  }

  logout() {
    return this.$useMutationExisting<void, void>({
      mutationKey: ['logout'],
      mutationFn: async () => {
        return this.scope.service.auth.logout();
      },
      onSuccess: () => {
        // clear
        this.$clear(); // not await
        this._setUser({});
        // page: login
        this.$router.replace('/home/user/login');
      },
    });
  }

  getJwtAuthorization() {
    if (!this.jwt) return undefined;
    return this.jwt.expireTime - Date.now() > 120 * 1000 ? this.jwt.accessToken : this.jwt.refreshToken;
  }

  private _setUser(data: ServiceAuthLoginResult) {
    this.$$modelUser.user = data.user;
    this.jwt = data.jwt;
    this.token = this.getJwtAuthorization();
  }
}
