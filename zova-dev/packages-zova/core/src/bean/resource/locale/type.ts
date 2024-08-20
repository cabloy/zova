export interface IModuleLocale {
  (...args: any[]): string;
  locale: <T extends keyof ILocalInfos>(locale: T, ...args: any[]) => string;
}

export interface IModuleLocaleText {
  (text: string, ...args: any[]): string;
  locale: <T extends keyof ILocalInfos>(locale: T, text: string, ...args: any[]) => string;
}

export type TypeModuleLocales<T> = {
  [prop in string & keyof T]: IModuleLocale;
};

export type TypeLocaleBase = 'en-us';

export interface ILocalInfo {}
export interface ILocalInfos {
  'en-us': ILocalInfo;
  'zh-cn': ILocalInfo;
}
