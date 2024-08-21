import { ZovaApplication } from 'zova';
import { ServiceAuthLoginParams, ServiceAuthLoginResult } from '../interface/auth.js';

export default (app: ZovaApplication) => {
  return {
    login: (params: ServiceAuthLoginParams) =>
      app.meta.$api.post<any, ServiceAuthLoginResult, ServiceAuthLoginParams>('/home/user/login', params),
    logout: () => app.meta.$api.post<any, void, void>('/home/user/logout'),
  };
};
