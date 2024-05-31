import { ExtractComposable } from '@cabloy/front';
import { DateInstance, DefaultsInstance, DisplayInstance, LocaleInstance, ThemeInstance } from 'vuetify';

export interface VuetifyGlobal {
  defaults: ExtractComposable<DefaultsInstance>;
  display: ExtractComposable<DisplayInstance>;
  theme: ExtractComposable<ThemeInstance>;
  icons: Record<string, any>;
  locale: ExtractComposable<LocaleInstance>;
  date: ExtractComposable<DateInstance>;
}

import '@cabloy/front';
declare module '@cabloy/front' {
  export interface BeanBase {
    $vuetify: VuetifyGlobal;
  }
}
