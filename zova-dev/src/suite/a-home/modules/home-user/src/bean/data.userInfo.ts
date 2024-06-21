import { Data, useCustomRef } from 'zova';
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
    const self = this;
    this.user = useCustomRef<User | undefined>((track, trigger) => {
      return {
        get() {
          track();
          const query = self.$useQuery<User>({
            queryKey: ['user'],
            meta: {
              persister: { storage: 'local', sync: true },
            },
          });
          if (query.data === undefined && true) {
            self.$persisterLoad;
          }
          return query.data;
        },
        set(newValue) {
          self.$setQueryData(['user'], newValue);
          trigger();
        },
      };
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
