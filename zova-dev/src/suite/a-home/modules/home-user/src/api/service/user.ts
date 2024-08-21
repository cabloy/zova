import { ZovaApplication } from 'zova';
import { ServiceUserEntity } from '../interface/user.js';

export default (app: ZovaApplication) => {
  return {
    getUserInfo: () => app.meta.$api.get<any, ServiceUserEntity>('/home/user/info'),
  };
};
