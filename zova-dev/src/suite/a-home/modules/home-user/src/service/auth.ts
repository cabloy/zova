import { ZovaApplication } from 'zova';
import { ServiceUserEntity } from './user.ts';

export interface ServiceAuthJWT {
  accessToken: string;
  refreshToken: string;
  expireTime: number;
}

export interface ServiceAuthLoginParams {
  username: string;
  password: string;
}

export interface ServiceAuthLoginResult {
  user?: ServiceUserEntity;
  jwt?: ServiceAuthJWT;
}

export default (app: ZovaApplication) => {
  return {
    login: (params: ServiceAuthLoginParams) =>
      app.meta.$api.post<any, ServiceAuthLoginResult, ServiceAuthLoginParams>('/home/user/login', params),
    logout: () => app.meta.$api.post<any, void, void>('/home/user/logout'),
  };
};
