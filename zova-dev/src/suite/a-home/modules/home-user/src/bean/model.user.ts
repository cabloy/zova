import { Model } from 'zova';
import { BeanModelBase } from 'zova-module-a-model';
import { ScopeModule } from '../resource/this.js';
import { ServiceUserEntity, ServiceUserJWT, ServiceUserLoginParams, ServiceUserLoginResult } from '../api/index.js';

@Model()
export class ModelUser extends BeanModelBase<ScopeModule> {
  user?: ServiceUserEntity;
  jwt?: ServiceUserJWT;
  token?: string;

  protected async __init__() {
    this.user = this.$useQueryLocal({
      queryKey: ['user'],
    });
    this.jwt = this.$useQueryLocal({
      queryKey: ['jwt'],
    });
    this.token = this.$useQueryCookie({
      queryKey: ['token'],
    });
  }

  login() {
    return this.$useMutationExisting<ServiceUserLoginResult, ServiceUserLoginParams>({
      mutationKey: ['login'],
      mutationFn: async params => {
        return this.scope.service.user.login(params);
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
        return this.scope.service.user.logout();
      },
      onSuccess: () => {
        // clear
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

  private _setUser(data: ServiceUserLoginResult) {
    this.user = data.user;
    this.jwt = data.jwt;
    this.token = this.getJwtAuthorization();
  }
}
