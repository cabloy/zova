import 'zova';
import { ThemeToken } from './themeToken.js';
declare module 'zova' {
  export interface BeanBase {
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
