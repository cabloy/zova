import { Router } from 'vue-router';
import { BeanRouterLike } from '../bean/bean.router.js';

import 'zova';
declare module 'zova' {
  export interface IInjectRecord {
    'a-router:appRouter': Router;
    'a-router:router': BeanRouterLike;
  }
}
