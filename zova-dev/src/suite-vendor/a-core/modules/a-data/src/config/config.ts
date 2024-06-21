import { ZovaApplication } from 'zova';

export const config = (_app: ZovaApplication) => {
  return {
    persister: {
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
    },
  };
};
