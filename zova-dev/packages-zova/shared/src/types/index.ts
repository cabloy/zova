export interface ZovaConfigMeta {
  flavor: 'front' | 'admin' | string;
  mode: 'development' | 'production';
  appMode: 'spa' | 'ssr' | 'pwa' | 'cordova' | 'capacitor' | 'electron' | 'bex' | string | undefined;
}
