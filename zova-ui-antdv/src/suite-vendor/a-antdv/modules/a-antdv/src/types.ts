import { useAppProps } from 'ant-design-vue/es/app/context.js';

import 'zova';
import { ThemeToken } from './themeToken.js';
declare module 'zova' {
  export interface BeanBase {
    $antdv: UnwrapNestedRefs<useAppProps>;
    $antdvStyleCache: ReturnType<typeof createCache>;
    $token: ThemeToken;
  }
}

import 'zova-module-a-style';
import { UnwrapNestedRefs } from 'vue';
import { createCache } from 'ant-design-vue';
declare module 'zova-module-a-style' {
  export interface ThemeApplyResult {
    token: ThemeToken;
  }

  export interface ThemeHandlerApplyParams {
    token: ThemeToken;
  }
}
