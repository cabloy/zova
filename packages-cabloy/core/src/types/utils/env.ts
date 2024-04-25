declare global {
  namespace NodeJS {
    interface ProcessEnv {
      META_FLAVOR: 'web' | 'app' | string;
      META_MODE: 'development' | 'production' | string;
      META_APP_MODE: 'spa' | 'ssr' | 'pwa' | 'cordova' | 'capacitor' | 'electron' | 'bex' | string | undefined;
      APP_SERVER: string | undefined;
      APP_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined;
      APP_ROUTER_BASE: string | undefined;
      APP_PUBLIC_PATH: string | undefined;
      APP_NAME: string | undefined;
      APP_TITLE: string | undefined;
      APP_VERSION: string | undefined;
    }
  }
}
