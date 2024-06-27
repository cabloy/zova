import { IBeanRecord, ZovaApplication } from 'zova';

export const config = (_app: ZovaApplication) => {
  return {
    defaultStyle: 'home-style.style.default' as keyof IBeanRecord,
    defaultTheme: 'home-theme.theme.default' as keyof IBeanRecord,
    defaultThemeHandler: '' as keyof IBeanRecord,
  };
};
