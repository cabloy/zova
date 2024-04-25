import { CabloyConfigEnv, CabloyConfigMeta, IBeanScopeConfig, PowerPartial } from '../../index.js';

export const configDefault = {
  meta: {},
  env: {},
  base: {
    locale: 'en-us',
    jwt: false,
  },
  nprogress: {
    debounce: 500,
  },
  api: {
    baseURL: '',
    debounce: 200,
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
  };
  layout: {};
  modules: IBeanScopeConfig;
} & typeof configDefault;

export type CabloyConfigOptional = PowerPartial<CabloyConfig>;
