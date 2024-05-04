import { Router } from 'vue-router';
import { StoreRouterLike } from '../bean/store.router.js';

declare module '@cabloy/front-core' {
  export interface IInjectRecord {
    'a-router:appRouter': Router;
    'a-router:router': StoreRouterLike;
  }
}
