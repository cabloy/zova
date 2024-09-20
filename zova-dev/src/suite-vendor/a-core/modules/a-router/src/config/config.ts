import { IBeanScopeRecord, ZovaApplication } from 'zova';

export const config = (_app: ZovaApplication) => {
  return {
    defaultComponent: 'home-base' as keyof IBeanScopeRecord,
  };
};
