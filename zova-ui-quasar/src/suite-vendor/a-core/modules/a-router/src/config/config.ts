import { IBeanScopeRecord, ZovaApplication } from 'zova';

export const config = (_app: ZovaApplication) => {
  return {
    defaultComponent: 'home-component' as keyof IBeanScopeRecord,
  };
};
