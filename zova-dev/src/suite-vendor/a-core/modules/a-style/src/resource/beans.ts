export * from '../bean/store.theme.js';
import { StoreTheme } from '../bean/store.theme.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'a-style.store.theme': StoreTheme;
  }
}
