export * from '../bean/bean.theme.js';
import { BeanTheme } from '../bean/bean.theme.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'a-style.bean.theme': BeanTheme;
  }
}
