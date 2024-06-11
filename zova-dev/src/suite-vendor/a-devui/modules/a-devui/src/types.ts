import 'zova';
import { ThemeToken } from './token.js';
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
}
