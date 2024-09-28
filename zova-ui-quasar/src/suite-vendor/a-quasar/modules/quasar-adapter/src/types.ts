import { UnwrapNestedRefs } from 'vue';
import { QVueGlobals } from 'quasar';
import { ThemeToken } from './themeToken.js';

import 'zova';
declare module 'zova' {
  export interface BeanBase {
    $q: UnwrapNestedRefs<QVueGlobals>;
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
