export interface ZovaConfigMeta {
  flavor: 'front' | 'admin' | string;
  mode: 'development' | 'production' | string;
  appMode: 'spa' | 'ssr' | 'pwa' | 'cordova' | 'capacitor' | 'electron' | 'bex' | string | undefined;
}
