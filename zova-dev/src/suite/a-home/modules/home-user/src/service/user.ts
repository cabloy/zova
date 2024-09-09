import { ZovaApplication } from 'zova';

export interface ServiceUserEntity {
  username?: string;
  avatar?: string;
}

export default (app: ZovaApplication) => {
  return {
    getUserInfo: () => app.meta.$api.get<any, ServiceUserEntity>('/home/user/info'),
  };
};
