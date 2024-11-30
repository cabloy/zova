import { ZovaMetaAppMode, ZovaMetaFlavor, ZovaMetaMode } from 'zova-shared';

export interface ZovaConfigEnv {
  appRouterMode: 'hash' | 'history' | 'abstract' | undefined;
  appRouterBase: string | undefined;
  appPublicPath: string | undefined;
  appName: string | undefined;
  appTitle: string | undefined;
  appVersion: string | undefined;
  ssr: boolean;
  server: boolean;
  client: boolean;
  dev: boolean;
  prod: boolean;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: ZovaMetaMode;
      META_FLAVOR: ZovaMetaFlavor;
      META_MODE: ZovaMetaMode;
      META_APP_MODE: ZovaMetaAppMode;
      APP_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined;
      APP_ROUTER_BASE: string | undefined;
      APP_PUBLIC_PATH: string | undefined;
      APP_NAME: string | undefined;
      APP_TITLE: string | undefined;
      APP_VERSION: string | undefined;
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
      // others: if needed, set env var type as 'true' | 'false'
      // SSR_VITE_NODE: 'true' | 'false';
    }
  }
}
