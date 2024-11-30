export type ZovaMetaFlavor = 'front' | 'admin' | keyof ZovaMetaFlavorExtend;
export type ZovaMetaMode = 'development' | 'production';
export type ZovaMetaAppMode =
  | 'spa'
  | 'ssr'
  | 'pwa'
  | 'cordova'
  | 'capacitor'
  | 'electron'
  | 'bex'
  | keyof ZovaMetaAppModeExtend;

export interface ZovaConfigMeta {
  flavor: ZovaMetaFlavor;
  mode: ZovaMetaMode;
  appMode: ZovaMetaAppMode;
}

export interface ZovaMetaFlavorExtend {}
export interface ZovaMetaAppModeExtend {}
