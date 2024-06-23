export * from '../bean/data.menu.js';
import { DataMenu } from '../bean/data.menu.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'home-layout.data.menu': DataMenu;
  }
}
