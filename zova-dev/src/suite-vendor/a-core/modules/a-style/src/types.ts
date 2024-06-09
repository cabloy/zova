import { style } from 'typestyle';
import 'zova';
declare module 'zova' {
  export interface BeanBase {
    $style: typeof style;
  }
}
