import { UnwrapNestedRefs } from 'vue';
import { DateInstance, DefaultsInstance, DisplayInstance, LocaleInstance, ThemeInstance } from 'vuetify';

export interface VuetifyGlobal {
  defaults: UnwrapNestedRefs<DefaultsInstance>;
  display: UnwrapNestedRefs<DisplayInstance>;
  theme: UnwrapNestedRefs<ThemeInstance>;
  icons: Record<string, any>;
  locale: UnwrapNestedRefs<LocaleInstance>;
  date: UnwrapNestedRefs<DateInstance>;
}

import 'zova';
declare module 'zova' {
  export interface BeanBase {
    $vuetify: VuetifyGlobal;
  }
}
