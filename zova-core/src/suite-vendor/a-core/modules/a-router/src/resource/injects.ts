import { Router } from 'vue-router';
import { StoreRouterLike } from '../bean/store.router.js';

import '@cabloy/front';
declare module '@cabloy/front' {
  export interface IInjectRecord {
    'a-router:appRouter': Router;
    'a-router:router': StoreRouterLike;
  }
}
