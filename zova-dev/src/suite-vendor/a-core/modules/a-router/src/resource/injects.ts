import { Router } from 'vue-router';
import { StoreRouterLike } from '../bean/store.router.js';

import 'zova';
declare module 'zova' {
  export interface IInjectRecord {
    'a-router:appRouter': Router;
    'a-router:router': StoreRouterLike;
  }
}
