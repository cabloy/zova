import { ServiceUserEntity } from './user.js';

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
