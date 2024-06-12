export * from '../bean/theme.orange.js';
import { ThemeOrange } from '../bean/theme.orange.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'a-demo.theme.orange': ThemeOrange;
  }
}
