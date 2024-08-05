import { BeanRouter } from '../bean/bean.router.js';

import 'zova';
declare module 'zova' {
  export interface IInjectRecord {
    'a-router:router': BeanRouter;
  }
}
