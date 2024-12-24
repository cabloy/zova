import { AxiosInstance } from 'axios';
import { BeanApi } from './bean/bean.api.js';
import { StyleDefault } from './bean/style.default.js';
import { createCache } from 'ant-design-vue';
import { ScopeModule } from './.metadata/this.js';
import { ThemeToken } from './themeToken.js';
import 'zova';

declare module 'zova' {
  export interface AppMeta {
    $axios: AxiosInstance;
    $api: BeanApi;
  }
  export interface BeanBase {
    $api: BeanApi;
    $scopeBase: ScopeModule;
    $class: StyleDefault;
    $token: ThemeToken;
    $antdvStyleCache: ReturnType<typeof createCache>;
  }
}

import 'zova-module-a-style';
declare module 'zova-module-a-style' {
  export interface IThemeApplyResult {
    token: ThemeToken;
  }

  export interface IThemeHandlerApplyParams {
    token: ThemeToken;
  }
}
