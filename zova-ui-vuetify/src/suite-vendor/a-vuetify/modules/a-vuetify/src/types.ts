import { ExtractComposable } from 'zova';
import { DateInstance, DefaultsInstance, DisplayInstance, LocaleInstance, ThemeInstance } from 'vuetify';

export interface VuetifyGlobal {
  defaults: ExtractComposable<DefaultsInstance>;
  display: ExtractComposable<DisplayInstance>;
  theme: ExtractComposable<ThemeInstance>;
  icons: Record<string, any>;
  locale: ExtractComposable<LocaleInstance>;
  date: ExtractComposable<DateInstance>;
}

import 'zova';
declare module 'zova' {
  export interface BeanBase {
    $vuetify: VuetifyGlobal;
  }
}
