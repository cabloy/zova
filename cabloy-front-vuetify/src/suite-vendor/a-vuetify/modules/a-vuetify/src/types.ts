import { ExtractHook } from '@cabloy/front';
import { DateInstance, DefaultsInstance, DisplayInstance, LocaleInstance, ThemeInstance } from 'vuetify';

export interface VuetifyGlobal {
  defaults: ExtractHook<DefaultsInstance>;
  display: ExtractHook<DisplayInstance>;
  theme: ExtractHook<ThemeInstance>;
  icons: Record<string, any>;
  locale: ExtractHook<LocaleInstance>;
  date: ExtractHook<DateInstance>;
}

declare module '@cabloy/front-core' {
  export interface BeanBase {
    $vuetify: VuetifyGlobal;
  }
}
