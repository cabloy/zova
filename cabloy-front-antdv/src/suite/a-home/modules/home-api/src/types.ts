import { AxiosInstance } from 'axios';
import { StoreApiLike } from './bean/store.api.js';

import '@cabloy/front';
declare module '@cabloy/front' {
  export interface AppMeta {
    $axios: AxiosInstance;
    $api: StoreApiLike;
  }
  export interface BeanBase {
    $api: StoreApiLike;
  }
}
