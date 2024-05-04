export interface IModuleLocale {
  (...args: any[]): string;
  locale: (locale: string, ...args: any[]) => string;
}
export interface IModuleLocaleText {
  (text: string, ...args: any[]): string;
  locale: (locale: string, text: string, ...args: any[]) => string;
}

export type TypeModuleLocales<T extends { 'zh-cn': object }> = {
  [prop in string & keyof T['zh-cn']]: IModuleLocale;
};
