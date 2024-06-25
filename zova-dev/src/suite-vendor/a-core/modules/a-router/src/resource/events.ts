import { BeanRouter } from './beans.js';

import 'zova';
declare module 'zova' {
  export interface IEventRecord {
    'a-router:routerGuards': BeanRouter;
  }

  export interface IEventResultRecord {
    'a-router:routerGuards': void;
  }
}
