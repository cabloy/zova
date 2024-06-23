import { AxiosInstance } from 'axios';
import { BeanApiLike } from './bean/bean.api.js';

import 'zova';
declare module 'zova' {
  export interface AppMeta {
    $axios: AxiosInstance;
    $api: BeanApiLike;
  }
  export interface BeanBase {
    $api: BeanApiLike;
  }
}
