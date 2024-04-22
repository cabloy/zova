import { IBeanScopeConfig, PowerPartial } from '../../index.js';

export const configDefault = {
  meta: {},
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
    breakpoint: 600,
    items: {
      mobile: {
        module: 'a-layoutmobile',
        component: 'layout',
      },
      pc: {
        module: 'a-layoutpc',
        component: 'layout',
      },
    },
    notification: {
      closeTimeout: -1,
    },
  },
  markdown: {
    style: {
      module: 'a-markdownstyle',
    },
  },
  theme: {
    type: 'builtIn',
    builtIn: {
      layout: 'light',
      bars: 'empty',
      color: 'blue',
      customColor: null,
    },
    thirdParty: null,
  },
  locales: {
    'en-us': 'English',
    'zh-cn': 'Chinese',
  },
  modules: {},
};

export type CabloyConfig = {
  meta: {
    flavor: string;
    mode: object;
    modeName: string;
    dev: boolean;
    prod: boolean;
  };
  base: {
    jwt: boolean;
  };
  api: {
    baseURL: string;
  };
  layout: {};
  modules: IBeanScopeConfig;
} & typeof configDefault;

export type CabloyConfigOptional = PowerPartial<CabloyConfig>;
