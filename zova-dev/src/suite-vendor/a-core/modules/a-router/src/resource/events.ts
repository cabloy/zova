import { BeanRouterLike } from './beans.js';

import 'zova';
declare module 'zova' {
  export interface IEventRecord {
    'a-router:routerGuards': BeanRouterLike;
  }

  export interface IEventResultRecord {
    'a-router:routerGuards': void;
  }
}
