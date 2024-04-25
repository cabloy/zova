import { CabloyConfigEnv, CabloyConfigMeta, IBeanScopeConfig, PowerPartial } from '../../index.js';

export const configDefault = {
  meta: {},
  env: {
    appServer: Boolean(process.env.APP_SERVER),
    appRouterMode: process.env.APP_ROUTER_MODE,
    appRouterBase: process.env.APP_ROUTER_BASE,
    appPublicPath: process.env.APP_PUBLIC_PATH,
    appName: process.env.APP_NAME,
    appTitle: process.env.APP_TITLE,
    appVersion: process.env.APP_VERSION,
  },
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
