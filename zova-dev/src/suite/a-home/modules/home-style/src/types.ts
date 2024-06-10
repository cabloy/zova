import { StyleDefault } from './bean/style.default.js';
import 'zova';
declare module 'zova' {
  export interface BeanBase {
    $class: StyleDefault;
  }
}
