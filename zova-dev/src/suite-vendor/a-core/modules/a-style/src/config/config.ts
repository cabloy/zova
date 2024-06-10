import { IBeanRecord, ZovaApplication } from 'zova';

export const config = (_app: ZovaApplication) => {
  return {
    defaultStyle: 'home-style.style.default' as keyof IBeanRecord,
  };
};
