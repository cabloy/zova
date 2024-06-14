import { ReturnTypeComposable } from 'zova';
import useQuasar from 'quasar/src/composables/use-quasar/use-quasar.js';
import { ThemeToken } from './themeToken.js';

import 'zova';
declare module 'zova' {
  export interface BeanBase {
    $q: ReturnTypeComposable<typeof useQuasar>;
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
