import { ZovaConfigMeta } from 'zova-shared';
import {
  ZovaConfigEnv,
  IBeanScopeConfig,
  ILocalInfos,
  PowerPartial,
  IComponentLayoutRecord,
  IBeanScopeRecord,
  ZovaConfigRoutes,
} from '../../index.js';

export function configDefault() {
  return {
    meta: {
      flavor: process.env.META_FLAVOR,
      mode: process.env.META_MODE,
      appMode: process.env.META_APP_MODE,
    },
    env: {
      appRouterMode: process.env.APP_ROUTER_MODE,
      appRouterBase: process.env.APP_ROUTER_BASE,
      appPublicPath: process.env.APP_PUBLIC_PATH,
      appName: process.env.APP_NAME,
      appTitle: process.env.APP_TITLE,
      appVersion: process.env.APP_VERSION,
      ssr: process.env.SSR,
      server: process.env.SERVER,
      client: process.env.CLIENT,
      dev: process.env.DEV,
      prod: process.env.PROD,
    },
    base: {
      jwt: process.env.APP_BASE_JWT !== 'false',
    },
    api: {
      baseURL: process.env.API_BASE_URL,
      prefix: process.env.API_PREFIX,
    },
    ssr: {
      cookieThemeName: process.env.SSR_COOKIE_THEMENAME === 'true',
      cookieThemeDark: process.env.SSR_COOKIE_THEMEDARK === 'true',
      cookieThemeDarkDefault: process.env.SSR_COOKIE_THEMEDARK_DEFAULT === 'true',
      optimization: {
        bodyReadyObserver: process.env.SSR_BODYREADYOBSERVER === 'true',
      },
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
      sidebar: {
        leftOpenPC: true,
        breakpoint: 1023,
      },
    },
    routes: {
      path: {},
      name: {},
    },
    modules: {},
  };
}

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
    cookieThemeName: boolean;
    cookieThemeDark: boolean;
    cookieThemeDarkDefault: boolean;
    optimization: {
      bodyReadyObserver: boolean;
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
    sidebar: {
      leftOpenPC: boolean;
      breakpoint: number;
    };
  };
  routes: ZovaConfigRoutes;
  modules: IBeanScopeConfig;
};

export type ZovaConfigOptional = PowerPartial<ZovaConfig>;
