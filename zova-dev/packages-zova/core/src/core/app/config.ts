import {
  ZovaConfigEnv,
  ZovaConfigMeta,
  IBeanScopeConfig,
  ILocalInfos,
  PowerPartial,
  IComponentLayoutRecord,
  IBeanScopeRecord,
} from '../../index.js';

export const configDefault = {
  meta: {},
  env: {},
  base: {
    locale: 'en-us',
    jwt: false,
  },
  api: {
    baseURL: '',
    prefix: '',
  },
  icon: {
    defaultModule: 'home-icon',
  },
  layout: {
    component: {
      default: 'home-layout:layoutDefault',
      empty: 'home-layout:layoutEmpty',
    },
  },
  locales: {
    'en-us': 'English',
    'zh-cn': 'Chinese',
  },
  modules: {},
};

export type ZovaConfig = {
  meta: ZovaConfigMeta;
  env: ZovaConfigEnv;
  base: {
    locale: keyof ILocalInfos;
    jwt: boolean;
  };
  api: {
    baseURL: string;
    prefix: string;
  };
  icon: {
    defaultModule: keyof IBeanScopeRecord;
  };
  layout: {
    component: {
      default: keyof IComponentLayoutRecord;
      empty: keyof IComponentLayoutRecord;
    };
  };
  locales: Record<keyof ILocalInfos, string>;
  modules: IBeanScopeConfig;
};

export type ZovaConfigOptional = PowerPartial<ZovaConfig>;
