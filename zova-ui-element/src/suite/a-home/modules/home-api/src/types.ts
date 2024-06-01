import { AxiosInstance } from 'axios';
import { StoreApiLike } from './bean/store.api.js';

import 'zova';
declare module 'zova' {
  export interface AppMeta {
    $axios: AxiosInstance;
    $api: StoreApiLike;
  }
  export interface BeanBase {
    $api: StoreApiLike;
  }
}
