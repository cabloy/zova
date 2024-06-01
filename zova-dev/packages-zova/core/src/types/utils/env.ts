export interface ZovaConfigMeta {
  flavor: 'app' | 'web' | string;
  mode: 'development' | 'production' | string;
  appMode: 'spa' | 'ssr' | 'pwa' | 'cordova' | 'capacitor' | 'electron' | 'bex' | string | undefined;
}

export interface ZovaConfigEnv {
  appServer: boolean;
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
      NODE_ENV: string;
      META_FLAVOR: 'app' | 'web' | string;
      META_MODE: 'development' | 'production' | string;
      META_APP_MODE: 'spa' | 'ssr' | 'pwa' | 'cordova' | 'capacitor' | 'electron' | 'bex' | string | undefined;
      APP_SERVER: string | undefined;
      APP_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined;
      APP_ROUTER_BASE: string | undefined;
      APP_PUBLIC_PATH: string | undefined;
      APP_NAME: string | undefined;
      APP_TITLE: string | undefined;
      APP_VERSION: string | undefined;
      DEV_SERVER_HOST: string | undefined;
      DEV_SERVER_PORT: string | undefined;
    }
  }
}
