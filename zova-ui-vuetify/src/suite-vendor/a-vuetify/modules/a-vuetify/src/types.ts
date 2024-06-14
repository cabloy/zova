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
import { ThemeToken } from './themeToken.js';
declare module 'zova' {
  export interface BeanBase {
    $vuetify: VuetifyGlobal;
    $token: ThemeToken;
  }
}

import 'zova-module-a-style';
declare module 'zova-module-a-style' {
  export interface ThemeApplyResult {
    token: ThemeToken;
  }

  export interface ThemeHandlerApplyParams {
    token: ThemeToken;
  }
}
