import { StoreRouterLike } from './beans.js';

import 'zova';
declare module 'zova' {
  export interface IEventRecord {
    'a-router:routerGuards': StoreRouterLike;
  }

  export interface IEventResultRecord {
    'a-router:routerGuards': void;
  }
}
