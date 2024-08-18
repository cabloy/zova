import {
  ZovaConfigEnv,
  ZovaConfigMeta,
  IBeanScopeConfig,
  ILocalInfos,
  PowerPartial,
  IComponentLayoutRecord,
  IBeanScopeRecord,
  ZovaConfigRoutes,
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
  routes: {
    path: {},
    name: {},
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
  ssr: {
    cookie: boolean;
    optimization: {
      bodyHiddenBeforeLoad: boolean;
    };
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
  routes: ZovaConfigRoutes;
  modules: IBeanScopeConfig;
};

export type ZovaConfigOptional = PowerPartial<ZovaConfig>;
