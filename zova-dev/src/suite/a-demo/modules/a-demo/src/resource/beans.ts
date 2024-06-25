export * from '../bean/store.counter.js';
export * from '../bean/theme.orange.js';
import { ThemeOrange } from '../bean/theme.orange.js';
import { StoreCounter } from '../bean/store.counter.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'a-demo.theme.orange': ThemeOrange;
    'a-demo.store.counter': StoreCounter;
  }
}
