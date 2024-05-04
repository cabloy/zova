import { CabloyConfigEnv, CabloyConfigMeta, IBeanScopeConfig, PowerPartial } from '../../index.js';

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
    debounce: 200,
  },
  icon: {
    defaultModule: 'a-homeicon',
  },
  nprogress: {
    debounce: 500,
  },
  preload: {
    delay: 1000,
  },
  layout: {
    component: {
      default: 'a-homelayout:layoutDefault',
      empty: 'a-homelayout:layoutEmpty',
    },
  },
  locales: {
    'en-us': 'English',
    'zh-cn': 'Chinese',
  },
  modules: {},
};

export type CabloyConfig = {
  meta: CabloyConfigMeta;
  env: CabloyConfigEnv;
  base: {
    locale: string;
    jwt: boolean;
  };
  api: {
    baseURL: string;
    prefix: string;
  };
  icon: {
    defaultModule: string;
  };
  layout: {};
  modules: IBeanScopeConfig;
} & typeof configDefault;

export type CabloyConfigOptional = PowerPartial<CabloyConfig>;
