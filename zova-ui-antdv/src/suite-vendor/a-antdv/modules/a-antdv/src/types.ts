import { useAppProps } from 'ant-design-vue/es/app/context.js';

import 'zova';
import { ThemeToken } from './themeToken.js';
declare module 'zova' {
  export interface BeanBase {
    $antdv: UnwrapNestedRefs<useAppProps>;
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
