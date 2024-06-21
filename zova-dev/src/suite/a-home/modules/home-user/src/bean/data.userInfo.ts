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
          const query = self.$useQuery({
            queryKey: ['user'],
            enabled: false,
            staleTime: Infinity,
            meta: {
              persister: { storage: 'local', sync: true },
            },
          }) as any;
          if (query.data.value === undefined) {
            const data = self.$persisterLoad(['user']);
            if (data !== undefined) {
              self.$setQueryData(['user'], data);
            }
          }
          return query.data;
        },
        set(newValue) {
          self.$setQueryData(['user'], newValue, true);
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
