import { Data } from 'zova';
import { BeanDataBase } from 'zova-module-a-data';
import { ScopeModule } from '../resource/this.js';

export interface User {
  username?: string;
  avatar?: string;
}

export interface JWT {
  accessToken: string;
  refreshToken: string;
  expireTime: number;
}

export interface UserInfoData {
  user?: User;
  jwt?: JWT;
}

@Data()
export class DataUserInfo extends BeanDataBase<ScopeModule> {
  user?: User;
  jwt?: JWT;

  protected async __init__() {
    this.user = this.$useQueryLocal({
      queryKey: ['user'],
    });
  }

  setUserInfo(data: UserInfoData) {
    this.user = data.user;
    this.jwt = data.jwt;
  }

  logout() {
    this.setUserInfo({});
    this.$router.replace('/home/user/login');
  }

  getJwtAuthorization() {
    if (!this.jwt) return '';
    return this.jwt.expireTime - Date.now() > 120 * 1000 ? this.jwt.accessToken : this.jwt.refreshToken;
  }
}
