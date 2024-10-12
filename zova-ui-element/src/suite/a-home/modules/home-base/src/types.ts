import { AxiosInstance } from 'axios';
import { BeanApi } from './bean/bean.api.js';
import { StyleDefault } from './bean/style.default.js';
import { ScopeModule } from './.metadata/this.js';
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
  }
}
