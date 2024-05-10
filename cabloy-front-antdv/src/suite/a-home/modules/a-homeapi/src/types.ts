import { AxiosInstance } from 'axios';
import { StoreApiLike } from './bean/store.api.js';

declare module '@cabloy/front' {
  export interface AppMeta {
    $axios: AxiosInstance;
    $api: StoreApiLike;
  }
  export interface BeanBase {
    $api: StoreApiLike;
  }
}
