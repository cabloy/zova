import { ZovaApplication } from 'zova';

export const config = (_app: ZovaApplication) => {
  return {
    tabs: {
      scene: '',
      max: 3,
      persister: true,
    },
  };
};
