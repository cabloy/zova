import { style } from 'typestyle';
import 'zova';
import { StoreTheme } from './bean/store.theme.js';
declare module 'zova' {
  export interface BeanBase {
    $style: typeof style;
    $theme: StoreTheme;
  }
}
