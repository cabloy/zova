import { ZovaApplication } from 'zova';

export const config = (_app: ZovaApplication) => {
  return {
    layout: {
      leftDrawerOpenPC: true,
      breakpoint: 1023,
    },
  };
};
