import { StoreRouterLike } from './beans.js';

import '@cabloy/front';
declare module '@cabloy/front' {
  export interface IEventRecord {
    'a-router:routerGuards': StoreRouterLike;
  }

  export interface IEventResultRecord {
    'a-router:routerGuards': void;
  }
}
