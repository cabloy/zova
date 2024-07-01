import 'zova';
import { components } from './resource/components.js';
declare module 'zova' {
  export interface BeanBase {
    $component: typeof components;
  }
}
