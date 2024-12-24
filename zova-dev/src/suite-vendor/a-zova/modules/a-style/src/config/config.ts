import { TypeBeanRecordSelectorKeys, ZovaApplication } from 'zova';

export const config = (_app: ZovaApplication) => {
  return {
    defaultStyle: 'home-base.style.default' as TypeBeanRecordSelectorKeys<'style'>,
    defaultTheme: 'home-base.theme.default' as TypeBeanRecordSelectorKeys<'theme'>,
    defaultThemeHandler: '' as TypeBeanRecordSelectorKeys<'themeHandler'>,
    model: {
      themename: {
        persister: {
          maxAge: Infinity,
        },
      },
    },
  };
};
