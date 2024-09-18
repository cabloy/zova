import 'zova';
import { components } from './.metadata/index.js';
declare module 'zova' {
  export interface BeanBase {
    $component: typeof components;
  }
}
