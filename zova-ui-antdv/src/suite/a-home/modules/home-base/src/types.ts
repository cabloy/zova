import { AxiosInstance } from 'axios';
import { BeanApi } from './bean/bean.api.js';
import { StyleDefault } from './bean/style.default.js';
import { components } from './.metadata/index.js';
import { createCache } from 'ant-design-vue';
import 'zova';

declare module 'zova' {
  export interface AppMeta {
    $axios: AxiosInstance;
    $api: BeanApi;
  }
  export interface BeanBase {
    $api: BeanApi;
    $class: StyleDefault;
    $component: typeof components;
    $antdvStyleCache: ReturnType<typeof createCache>;
  }
}
