import { IBeanRecord, ZovaApplication } from 'zova';

export const config = (_app: ZovaApplication) => {
  return {
    defaultStyle: 'home-base.style.default' as keyof IBeanRecord,
    defaultTheme: 'home-base.theme.default' as keyof IBeanRecord,
    defaultThemeHandler: '' as keyof IBeanRecord,
    model: {
      themename: {
        persister: {
          maxAge: Infinity,
        },
      },
    },
  };
};
