import { ExtractComposable } from 'zova';
import { useAppProps } from 'ant-design-vue/es/app/context.js';

import 'zova';
import { ThemeToken } from './themeToken.js';
declare module 'zova' {
  export interface BeanBase {
    $antdv: ExtractComposable<useAppProps>;
    $token: ThemeToken;
  }
}

import 'zova-module-a-style';
declare module 'zova-module-a-style' {
  export interface ThemeApplyResult {
    token: ThemeToken;
  }
}
