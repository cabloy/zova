import { ZovaApplication } from 'zova';
import { ServiceUserLoginParams, ServiceUserLoginResult } from '../interface/user.js';

export default (app: ZovaApplication) => {
  return {
    login: (params: ServiceUserLoginParams) =>
      app.meta.$api.post<any, ServiceUserLoginResult, ServiceUserLoginParams>('/home/user/login', params),
    logout: () => app.meta.$api.post<any, void, void>('/home/user/logout'),
  };
};
