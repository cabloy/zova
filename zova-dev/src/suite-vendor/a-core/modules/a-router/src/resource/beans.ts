export * from '../bean/bean.router.js';
export * from '../bean/virtual.router.js';
import { BeanRouter } from '../bean/bean.router.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'a-router.bean.router': BeanRouter;
  }
}
