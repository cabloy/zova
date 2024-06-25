import { AxiosInstance } from 'axios';
import { BeanApi } from './bean/bean.api.js';

import 'zova';
declare module 'zova' {
  export interface AppMeta {
    $axios: AxiosInstance;
    $api: BeanApi;
  }
  export interface BeanBase {
    $api: BeanApi;
  }
}
