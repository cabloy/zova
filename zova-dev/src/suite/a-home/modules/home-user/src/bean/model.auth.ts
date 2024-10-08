import { Model, Use } from 'zova';
import { BeanModelBase } from 'zova-module-a-model';
import { ScopeModule } from '../.metadata/this.js';
import { ModelUser } from './model.user.js';
import { ServiceAuthJWT, ServiceAuthLoginParams, ServiceAuthLoginResult } from '../service/auth.js';

@Model()
export class ModelAuth extends BeanModelBase<ScopeModule> {
  jwt?: ServiceAuthJWT;
  token?: string;
  @Use()
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
        this.$router.replace('/login');
      },
    });
  }

  get jwtAuthorization() {
    if (process.env.SERVER) {
      return this.token;
    } else {
      return this._getTokenFromJwt(this.jwt);
    }
  }

  get isAuthenticated(): boolean {
    if (process.env.SERVER) {
      return !!this.token;
    } else {
      return !!this.jwt;
    }
  }

  private _setUser(data: ServiceAuthLoginResult) {
    this.$$modelUser.user = data.user;
    this.jwt = data.jwt;
    this.token = this._getTokenFromJwt(this.jwt);
  }

  private _getTokenFromJwt(jwt?: ServiceAuthJWT) {
    if (!jwt) return undefined;
    return jwt.expireTime - Date.now() > 120 * 1000 ? jwt.accessToken : jwt.refreshToken;
  }
}
