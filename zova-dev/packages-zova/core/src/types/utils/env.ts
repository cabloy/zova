export interface ZovaConfigEnv {
  appRouterMode: 'hash' | 'history' | 'abstract' | undefined;
  appRouterBase: string | undefined;
  appPublicPath: string | undefined;
  appName: string | undefined;
  appTitle: string | undefined;
  appVersion: string | undefined;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      META_FLAVOR: 'front' | 'admin' | string;
      META_MODE: 'development' | 'production';
      META_APP_MODE: 'spa' | 'ssr' | 'pwa' | 'cordova' | 'capacitor' | 'electron' | 'bex' | string | undefined;
      APP_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined;
      APP_ROUTER_BASE: string | undefined;
      APP_PUBLIC_PATH: string | undefined;
      APP_NAME: string | undefined;
      APP_TITLE: string | undefined;
      APP_VERSION: string | undefined;
      APP_BASE_JWT: string | undefined;
      DEV_SERVER_HOST: string | undefined;
      DEV_SERVER_PORT: string | undefined;
      // compatible with quasar
      // @ts-ignore ignore
      SSR: boolean;
      // @ts-ignore ignore
      DEV: boolean;
      // @ts-ignore ignore
      PROD: boolean;
      // @ts-ignore ignore
      // DEBUGGING: boolean;
      // @ts-ignore ignore
      CLIENT: boolean;
      // @ts-ignore ignore
      SERVER: boolean;
      // @ts-ignore ignore
      // MODE: string | undefined;
    }
  }
}
