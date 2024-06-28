export interface ServiceUserEntity {
  username?: string;
  avatar?: string;
}

export interface ServiceUserJWT {
  accessToken: string;
  refreshToken: string;
  expireTime: number;
}

export interface ServiceUserLoginParams {
  username: string;
  password: string;
}

export interface ServiceUserLoginResult {
  user?: ServiceUserEntity;
  jwt?: ServiceUserJWT;
}
