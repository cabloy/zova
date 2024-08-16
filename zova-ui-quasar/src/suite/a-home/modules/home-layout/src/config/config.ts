import { ZovaApplication } from 'zova';

export const config = (_app: ZovaApplication) => {
  return {
    layout: {
      leftDrawerOpenPC: false,
      breakpoint: 1023,
    },
  };
};
