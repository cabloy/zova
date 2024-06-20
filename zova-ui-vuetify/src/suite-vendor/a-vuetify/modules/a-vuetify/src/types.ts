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
import { ThemeToken } from './themeToken.js';
declare module 'zova' {
  export interface BeanBase {
    $vuetify: VuetifyGlobal;
    $token: ThemeToken;
  }
}

import 'zova-module-a-style';
import { UnwrapNestedRefs } from 'vue';
declare module 'zova-module-a-style' {
  export interface ThemeApplyResult {
    token: ThemeToken;
  }

  export interface ThemeHandlerApplyParams {
    token: ThemeToken;
  }
}
