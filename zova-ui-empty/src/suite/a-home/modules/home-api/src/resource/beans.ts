export * from '../bean/bean.api.js';
import { BeanApi } from '../bean/bean.api.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'home-api.bean.api': BeanApi;
  }
}
