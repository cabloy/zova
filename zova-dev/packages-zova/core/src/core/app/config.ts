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
    jwt: false,
  },
  api: {
    baseURL: '',
    prefix: '',
  },
  icon: {
    defaultModule: 'home-icon',
  },
  locale: {
    default: 'en-us',
    storeKey: 'locale',
    items: {
      'en-us': 'English',
      'zh-cn': 'Chinese',
    },
  },
  layout: {
    component: {
      default: 'home-layout:layoutDefault',
      empty: 'home-layout:layoutEmpty',
    },
  },
  modules: {},
};

export type ZovaConfig = {
  meta: ZovaConfigMeta;
  env: ZovaConfigEnv;
  base: {
    jwt: boolean;
  };
  api: {
    baseURL: string;
    prefix: string;
  };
  icon: {
    defaultModule: keyof IBeanScopeRecord;
  };
  locale: {
    default: keyof ILocalInfos;
    storeKey: string;
    items: Record<keyof ILocalInfos, string>;
  };
  layout: {
    component: {
      default: keyof IComponentLayoutRecord;
      empty: keyof IComponentLayoutRecord;
    };
  };
  modules: IBeanScopeConfig;
};

export type ZovaConfigOptional = PowerPartial<ZovaConfig>;
